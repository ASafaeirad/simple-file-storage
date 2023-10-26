// @ts-check
import { promises as fs, statSync } from 'node:fs';
import path from 'node:path';
import { config } from '../configs/app.config.js';

export async function getFiles(_, res, next) {
  try {
    const files = await fs.readdir(config.storagePath);

    const allFiles = files.filter((file) => {
      const filePath = path.join(config.storagePath, file);
      return statSync(filePath).isFile();
    });

    return res.json({ items: allFiles });
  } catch (e) {
    return next(e);
  }
}
