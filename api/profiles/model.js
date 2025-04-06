const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  dates: { type: String },
  description: { type: String },
});

const InformationSchema = new mongoose.Schema({
  bio: { type: String },
  location: { type: String },
  website: { type: String },
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  experience: [ExperienceSchema],
  skills: [String],
  information: InformationSchema,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  deleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
