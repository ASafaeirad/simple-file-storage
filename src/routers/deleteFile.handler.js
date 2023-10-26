// @ts-check
import fs from 'node:fs/promises';
import { config } from '../configs/app.config.js';

export async function deleteFile(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: 'validation.failed',
        fields: { id: 'required' },
      });
    }

    const filePath = `${config.storagePath}/${id}`;
    await fs.unlink(filePath);

    return res.status(204);
  } catch (e) {
    next(e);
  }
}
