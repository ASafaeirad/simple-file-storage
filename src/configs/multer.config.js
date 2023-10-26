import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { generateId } from '../utils/uuid.js';
import { config } from './app.config.js';

export const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      const dir = config.storagePath;
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
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
