// @ts-check
import { promises as fs, statSync } from 'node:fs';
import { config } from '../configs/app.config.js';
import { resolvePath } from '../utils/storage.js';

export async function getFiles(_, res, next) {
  try {
    const items = await fs.readdir(config.storagePath);

    const files = items.filter((file) => {
      const filePath = resolvePath(file);
      return statSync(filePath).isFile();
    });

    return res.json({ files });
  } catch (e) {
    return next(e);
  }
}
