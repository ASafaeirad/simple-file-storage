import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import sanitize from 'sanitize-filename';
import { upload } from '../configs/multer.config.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { generateId } from '../utils/helpers.js';

const router = Router();

const saveSingleFile = upload.single('myFile');
router.post('/upload', authMiddleware, async (req, res) => saveSingleFile(req, res, (err) => {
  console.log('\n====== Received new file ======', '\nRequest info:\n', {
    ip: req.ip,
    hostname: req.hostname,
  });
  if (err) {
    console.error('Error:\n', err.message);
    return res.status(400).send({ message: err.message });
  }
  console.log('File:\n', req.file);

  const p = path.parse(sanitize(req.file.originalname));

  if (req.file) {
    return res.json({
      fileName: req.file.filename,
      originalName: (p.name.trim() || generateId(5)) + p.ext.toLowerCase().trim(),
      mimeType: req.file.mimetype,
      size: req.file.size,
    });
  }
  return res.status(400).send({ message: 'No file Received' });
}));

router.delete('/:fileName', authMiddleware, async (req, res) => {
  const { fileName } = req.params;
  if (!fileName) {
    return res.status(400).json({ message: 'Invalid fileName' });
  }

  const filePath = `storage/${fileName}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Not found' });
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    return res.json({ message: 'File deleted successfully' });
  });
});

router.get('/:fileName', async (req, res) => {
  const fileName = sanitize(req.params.fileName ?? '');
  if (!fileName) {
    return res.status(400).json({ message: 'Invalid fileName' });
  }

  const filePath = `storage/${fileName}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.setHeader('Content-Disposition', `inline; fileName="${fileName}"`);
  const fileStream = fs.createReadStream(filePath);

  fileStream.pipe(res);
});

router.get('/', authMiddleware, async (req, res) => {
  const directoryPath = 'storage';
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }

    const allFiles = files.filter((file) => {
      const filePath = path.join(directoryPath, file);
      return fs.statSync(filePath).isFile();
    });

    return res.json({ items: allFiles });
  });
});

export { router as fileRouter };
