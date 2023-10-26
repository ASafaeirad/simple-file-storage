import path from 'node:path';
import { config } from '../configs/app.config.js';

export function resolvePath(name) {
  return path.resolve(config.storagePath, name);
}
