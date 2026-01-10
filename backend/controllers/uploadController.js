const Project = require('../models/Projects');
const AppError = require('../utils/appError');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

// @desc    Upload project images
// @route   POST /api/upload/project/:id
// @access  Private
exports.uploadProjectImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next(new AppError('Please upload at least one image', 400));
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    // Upload images to Cloudinary (or use local paths)
    const uploadedImages = [];
    for (const file of req.files) {
      if (process.env.USE_CLOUDINARY === 'true') {
        const result = await uploadToCloudinary(file.path, 'portfolio/projects');
        uploadedImages.push(result.secure_url);
      } else {
        // Store local path
        uploadedImages.push(`/uploads/projects/${file.filename}`);
      }
    }

    // Update project with new images
    project.images = [...project.images, ...uploadedImages];
    await project.save();

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      data: {
        images: uploadedImages
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload main project image
// @route   PUT /api/upload/project/:id/main-image
// @access  Private
exports.uploadMainImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('Please upload an image', 400));
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    let imageUrl;
    if (process.env.USE_CLOUDINARY === 'true') {
      const result = await uploadToCloudinary(req.file.path, 'portfolio/projects');
      imageUrl = result.secure_url;
    } else {
      imageUrl = `/uploads/images/${req.file.filename}`;
    }

    // Delete old main image if exists and using cloudinary
    if (process.env.USE_CLOUDINARY === 'true' && project.image) {
      const publicId = project.image.split('/').pop().split('.')[0];
      await deleteFromCloudinary(`portfolio/projects/${publicId}`);
    }

    project.image = imageUrl;
    await project.save();

    res.status(200).json({
      success: true,
      message: 'Main image updated successfully',
      data: {
        image: imageUrl
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project image
// @route   DELETE /api/upload/project/:id/image
// @access  Private
exports.deleteProjectImage = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return next(new AppError('Image URL is required', 400));
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    // Remove image from project's images array
    project.images = project.images.filter(img => img !== imageUrl);
    await project.save();

    // Delete from Cloudinary if using cloud storage
    if (process.env.USE_CLOUDINARY === 'true') {
      const publicId = imageUrl.split('/').pop().split('.')[0];
      await deleteFromCloudinary(`portfolio/projects/${publicId}`);
    }

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};