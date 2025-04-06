const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Routes CRUD
router.get('/', controller.getAllProfiles);
router.get('/:id', controller.getProfileById);
router.post('/', controller.createProfile);
router.put('/:id', controller.updateProfile);
router.delete('/:id', controller.softDeleteProfile);

// Expériences
router.post('/:id/experience', controller.addExperience);
router.delete('/:id/experience/:expId', controller.deleteExperience);

// Compétences
router.post('/:id/skills', controller.addSkill);
router.delete('/:id/skills/:skill', controller.deleteSkill);

// Information
router.put('/:id/information', controller.updateInformation);

// Bonus: Friends
router.post('/:id/friends/:friendId', controller.addFriend);
router.delete('/:id/friends/:friendId', controller.removeFriend);

module.exports = router;
