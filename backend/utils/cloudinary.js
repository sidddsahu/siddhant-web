const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadToCloudinary = async (filePath, folder = 'portfolio') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    // Delete file from local storage after upload
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    throw new Error('Cloudinary upload failed: ' + error.message);
  }
};

exports.deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('Cloudinary delete failed: ' + error.message);
  }
};