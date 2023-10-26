import { promises as fs, createReadStream } from 'node:fs';
import sanitize from 'sanitize-filename';
import { config } from '../configs/app.config.js';

export async function getFile(req, res, next) {
  try {
    const id = sanitize(req.params.id ?? '');
    if (!id) {
      return res.status(400).json({
        message: 'validation.failed',
        fields: { id: 'required' },
      });
    }

    const filePath = `${config.storagePath}/${id}`;
    await fs.stat(filePath).catch(() => new Error('404'));

    res.setHeader('Content-Disposition', `inline; fileName="${id}"`);
    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);
  } catch (e) {
    next(e);
  }
}
