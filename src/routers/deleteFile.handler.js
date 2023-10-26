// @ts-check
import fs from 'node:fs/promises';
import { config } from '../configs/app.config.js';

export async function deleteFile(req, res) {
  try {
    const { fileName } = req.params;
    if (!fileName) return res.status(400).json({ message: 'Invalid fileName' });

    const filePath = `${config.storagePath}/${fileName}`;
    await fs.unlink(filePath);

    return res.status(204);
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
}
