// @ts-check
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { deleteFile } from './deleteFile.handler.js';
import { uploadFile } from './uploadFile.handler.js';
import { getFile } from './getFile.handler.js';
import { getFiles } from './getFiles.handler.js';

const fileRouter = Router();

fileRouter.post('/upload', authMiddleware, uploadFile);
fileRouter.delete('/:fileName', authMiddleware, deleteFile);
fileRouter.get('/:fileName', getFile);
fileRouter.get('/', authMiddleware, getFiles);

export { fileRouter };
