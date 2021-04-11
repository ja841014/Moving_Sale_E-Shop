"use strict";

var cloudinary = require('cloudinary').v2;

var _require = require('multer-storage-cloudinary'),
    CloudinaryStorage = _require.CloudinaryStorage;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // folder in cloudinary
    folder: 'YelpCamp',
    allowedFormats: ['jpeg', 'png', 'jpg']
  }
});
module.exports = {
  cloudinary: cloudinary,
  storage: storage
};