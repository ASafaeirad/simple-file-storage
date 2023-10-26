import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { config } from './app.config.js';
import { generateId } from '../utils/uuid.js';

export const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      const filePath = config.storagePath;
      fs.mkdirSync(filePath, { recursive: true });
      cb(null, filePath);
    },
    filename(req, file, cb) {
      cb(null, generateId() + path.extname(file.originalname).trim().toLowerCase());
    },
  }),
  limits: { fileSize: config.maxUploadFileSize },
  fileFilter(req, file, cb) {
    cb(null, true);
  },
});
