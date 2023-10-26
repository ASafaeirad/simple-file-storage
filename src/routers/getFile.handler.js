import { promises as fs, createReadStream } from 'node:fs';
import sanitize from 'sanitize-filename';
import { config } from '../configs/app.config.js';

export async function getFile(req, res) {
  const fileName = sanitize(req.params.fileName ?? '');
  if (!fileName) return res.status(400).json({ message: 'Invalid fileName' });

  const filePath = `${config.storagePath}/${fileName}`;

  await fs.stat(filePath).catch(() => new Error('404'));
  res.setHeader('Content-Disposition', `inline; fileName="${fileName}"`);
  const fileStream = createReadStream(filePath);

  fileStream.pipe(res);
}
