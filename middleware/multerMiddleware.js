import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

// Some free tiers do not allow diskStorage
// It requires package datauri to upload the buffer to cloudinary
// Also, PM2 restart the app with file upload, as it detects changes in the fs

const storage = multer.memoryStorage();

const upload = multer({ storage });

const parser = new DataParser();

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

export default upload;
