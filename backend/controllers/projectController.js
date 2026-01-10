const Project = require('../models/Projects');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getAllProjects = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    let query = {};
    if (status) {
      query.status = status;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const projects = await Project.find(query)
      .sort(sort)
      .limit(limitNum)
      .skip(skip);

    const total = await Project.countDocuments(query);

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: projects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching projects',
      error: error.message
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching project',
      error: error.message
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
  try {
    console.log('Received project data:', JSON.stringify(req.body, null, 2));

    const projectData = { ...req.body };

    // Validate required fields
    const requiredFields = ['title', 'description', 'fullDescription', 'image', 'liveUrl', 'githubUrl', 'startDate'];
    const missingFields = requiredFields.filter(field => !projectData[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Ensure technologies is always an array
    if (!projectData.technologies || !Array.isArray(projectData.technologies)) {
      projectData.technologies = [];
    }

    // Clean and validate technologies array
    projectData.technologies = projectData.technologies
      .filter(tech => tech && typeof tech === 'object')
      .map(tech => ({
        name: tech.name || 'Unnamed',
        items: Array.isArray(tech.items) ? tech.items.filter(item => item && typeof item === 'string').map(item => item.trim()) : []
      }))
      .filter(tech => tech.name.trim() !== '' && tech.items.length > 0);

    // Handle other array fields
    const arrayFields = ['tags', 'features', 'challenges', 'images'];
    arrayFields.forEach(field => {
      if (projectData[field]) {
        // If it's a string, try to parse it or split by comma
        if (typeof projectData[field] === 'string') {
          try {
            const parsed = JSON.parse(projectData[field]);
            if (Array.isArray(parsed)) {
              projectData[field] = parsed;
            } else {
              throw new Error('Not an array');
            }
          } catch {
            // Split by comma if JSON parsing fails
            projectData[field] = projectData[field]
              .split(',')
              .map(item => item.trim())
              .filter(item => item.length > 0);
          }
        }
        // Ensure it's an array
        if (!Array.isArray(projectData[field])) {
          projectData[field] = [];
        }
      } else {
        projectData[field] = [];
      }
    });

    // Handle dates
    projectData.startDate = new Date(projectData.startDate);
    projectData.endDate = projectData.endDate ? new Date(projectData.endDate) : null;

    // Set default values
    projectData.status = projectData.status || 'active';
    projectData.displayOrder = Number(projectData.displayOrder) || 0;

    console.log('Creating project with data:', JSON.stringify(projectData, null, 2));

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error details:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating project',
      error: error.message
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
  try {
    console.log('Update project data:', JSON.stringify(req.body, null, 2));

    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const projectData = { ...req.body };

    // Handle technologies
    if (projectData.technologies !== undefined) {
      if (!Array.isArray(projectData.technologies)) {
        projectData.technologies = [];
      } else {
        projectData.technologies = projectData.technologies
          .filter(tech => tech && typeof tech === 'object')
          .map(tech => ({
            name: tech.name || 'Unnamed',
            items: Array.isArray(tech.items) ? tech.items.filter(item => item && typeof item === 'string').map(item => item.trim()) : []
          }))
          .filter(tech => tech.name.trim() !== '' && tech.items.length > 0);
      }
    }

    // Handle other array fields
    const arrayFields = ['tags', 'features', 'challenges', 'images'];
    arrayFields.forEach(field => {
      if (projectData[field] !== undefined) {
        if (typeof projectData[field] === 'string') {
          try {
            const parsed = JSON.parse(projectData[field]);
            if (Array.isArray(parsed)) {
              projectData[field] = parsed;
            } else {
              throw new Error('Not an array');
            }
          } catch {
            projectData[field] = projectData[field]
              .split(',')
              .map(item => item.trim())
              .filter(item => item.length > 0);
          }
        }
        if (!Array.isArray(projectData[field])) {
          projectData[field] = [];
        }
      }
    });

    // Handle dates
    if (projectData.startDate) {
      projectData.startDate = new Date(projectData.startDate);
    }
    if (projectData.endDate) {
      projectData.endDate = new Date(projectData.endDate);
    }

    // Update numeric fields
    if (projectData.displayOrder !== undefined) {
      projectData.displayOrder = Number(projectData.displayOrder) || 0;
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      projectData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating project',
      error: error.message
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Delete project error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting project',
      error: error.message
    });
  }
};

// @desc    Get active projects for portfolio
// @route   GET /api/projects/portfolio/active
// @access  Public
exports.getActiveProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'active' })
      .sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Get active projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching active projects',
      error: error.message
    });
  }
};