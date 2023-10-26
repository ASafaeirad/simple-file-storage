import { promises as fs, createReadStream } from 'node:fs';
import sanitize from 'sanitize-filename';
import { resolvePath } from '../utils/storage.js';

export async function getFile(req, res, next) {
  try {
    const id = sanitize(req.params.id ?? '');
    if (!id) {
      return res.status(400).json({
        message: 'validation.failed',
        fields: { id: 'required' },
      });
    }

    const filePath = resolvePath(id);
    await fs.stat(filePath).catch(() => {
      throw { status: 404, message: 'not.found' };
    });

    res.setHeader('Content-Disposition', `inline; fileName="${id}"`);
    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);
  } catch (e) {
    next(e);
  }
}
