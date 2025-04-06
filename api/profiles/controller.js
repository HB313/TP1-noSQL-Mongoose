const Profile = require('./model');

// GET all profiles (with search and filters)
exports.getAllProfiles = async (req, res) => {
  try {
    const { name, email, skills, location, friends, deleted } = req.query;
  
    // Création du filtre dynamique
    const filters = {
      deleted: deleted ? deleted === 'true' : false, // Si deleted est 'true', on filtre les profils supprimés
    };

    if (name) filters.name = { $regex: name, $options: 'i' }; // Recherche par nom (case insensitive)
    if (email) filters.email = { $regex: email, $options: 'i' }; // Recherche par email (case insensitive)
    if (skills) filters.skills = { $in: skills.split(',') }; // Recherche par compétences (séparées par des virgules)
    if (location) filters['information.location'] = { $regex: location, $options: 'i' }; // Recherche par localisation
  
    if (friends) {
      // Si un ID d'ami est passé, on filtre les profils ayant cet ami dans leur liste
      filters.friends = { $in: [friends] };
    }
  
    const profiles = await Profile.find(filters).populate('friends'); // Appliquer les filtres et récupérer les amis
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  

// GET one profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('friends');
    if (!profile || profile.deleted) return res.status(404).json({ message: 'Profil introuvable' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a profile
exports.createProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newProfile = new Profile({ name, email });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update a profile (name & email only)
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updated = await Profile.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE (soft delete)
exports.softDeleteProfile = async (req, res) => {
  try {
    await Profile.findByIdAndUpdate(req.params.id, { deleted: true });
    res.json({ message: 'Profil supprimé (soft delete)' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST add experience
exports.addExperience = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    profile.experience.push(req.body);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE experience
exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    profile.experience = profile.experience.filter(exp => exp._id.toString() !== req.params.expId);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// POST add skill
exports.addSkill = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    profile.skills.push(req.body.skill);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE skill
exports.deleteSkill = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    profile.skills = profile.skills.filter(skill => skill !== req.params.skill);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update information
exports.updateInformation = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    profile.information = { ...profile.information, ...req.body };
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// BONUS: add friend
exports.addFriend = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile.friends.includes(req.params.friendId)) {
      profile.friends.push(req.params.friendId);
    }
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// BONUS: remove friend
exports.removeFriend = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    profile.friends = profile.friends.filter(id => id.toString() !== req.params.friendId);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
