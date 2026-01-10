const express = require('express');
const {
  uploadProjectImages,
  uploadMainImage,
  deleteProjectImage
} = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/auth');
const { uploadMultiple, uploadSingle } = require('../middleware/upload');

const router = express.Router();

router.post(
  '/project/:id',
  protect,
  authorize('admin'),
  uploadMultiple('projectImages', 10),
  uploadProjectImages
);

router.put(
  '/project/:id/main-image',
  protect,
  authorize('admin'),
  uploadSingle('mainImage'),
  uploadMainImage
);

router.delete(
  '/project/:id/image',
  protect,
  authorize('admin'),
  deleteProjectImage
);

module.exports = router;