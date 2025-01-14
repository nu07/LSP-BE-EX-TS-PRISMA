import multer from 'multer';
import { Request } from 'express';

const fileFilterImages = (req: Request, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storageUser = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    // Define the destination folder for uploaded files
    cb(null, './public/images/user/');
  },
  filename: function (req, file, cb) {
    // Create a unique filename using current date and time + original filename; // Extract the file extension
    const newFilename = new Date().getTime() + '-' + file.originalname;

    cb(null, newFilename);
  },
});

export const uploadUser = multer({
  storage: storageUser,
  fileFilter: fileFilterImages,
});
