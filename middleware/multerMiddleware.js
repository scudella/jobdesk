import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/dist/uploads');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

// Some free tiers does not allow diskStorage
// So, providing memory storage
// It requires package datauri to upload the buffer to cloudinary
// For now I am leaving at disk storage
// Otherwise, userController also requires a couple of lines change

const memStorage = multer.memoryStorage({});

const upload = multer({ storage });

const parser = new DataParser();

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

export default upload;
