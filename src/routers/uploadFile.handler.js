// @ts-check
import sanitize from 'sanitize-filename';
import { upload } from '../configs/multer.config.js';
import { logger } from '../utils/logger.js';

const saveSingleFile = upload.single('file');
export async function uploadFile(req, res, next) {
  return saveSingleFile(req, res, (err) => {
    req.log.info('\n====== Received new file ======', '\nRequest info:\n', {
      ip: req.ip,
      hostname: req.hostname,
    });
    if (!req.file) {
      return res.status(400).json({
        message: 'validation.failed',
        fields: { file: 'required' },
      });
    }
    if (err) return next(err);
    req.log.info('File:\n', req.file);

    const fileName = sanitize(req.file.originalname);

    if (!req.file) return res.status(400).send({ message: 'No file Received' });

    return res.json({
      id: req.file.filename,
      name: fileName,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });
  });
}
