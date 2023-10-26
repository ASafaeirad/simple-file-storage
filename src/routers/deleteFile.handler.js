// @ts-check
import fs from 'node:fs/promises';
import { resolvePath } from '../utils/storage.js';

export async function deleteFile(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: 'validation.failed',
        fields: { id: 'required' },
      });
    }

    const filePath = resolvePath(id);
    await fs.unlink(filePath);

    return res.status(204).end();
  } catch (e) {
    next(e);
  }
}
