const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [{
    type: String,
    required: true
  }]
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  fullDescription: {
    type: String,
    required: [true, 'Full description is required'],
    maxlength: [1000, 'Full description cannot exceed 1000 characters']
  },
  image: {
    type: String,
    required: [true, 'Main image is required']
  },
  images: [{
    type: String,
    required: true
  }],
  liveUrl: {
    type: String,
    required: [true, 'Live URL is required'],
    match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Please enter a valid URL']
  },
  githubUrl: {
    type: String,
    required: [true, 'GitHub URL is required'],
    match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Please enter a valid URL']
  },
  tags: [{
    type: String,
    required: true
  }],
  features: [{
    type: String,
    required: true
  }],
  technologies: [technologySchema],
  challenges: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to get active projects
projectSchema.statics.getActiveProjects = function() {
  return this.find({ status: 'active' }).sort({ displayOrder: 1, createdAt: -1 });
};

// Instance method to get project summary
projectSchema.methods.getSummary = function() {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    image: this.image,
    tags: this.tags,
    liveUrl: this.liveUrl,
    githubUrl: this.githubUrl
  };
};

module.exports = mongoose.model('Project', projectSchema);