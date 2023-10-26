import path from 'node:path';

function resolveStorage(storage) {
  const isAbsolute = path.isAbsolute(storage);
  return isAbsolute ? path.resolve(storage) : path.resolve(process.cwd(), storage);
}

function getConfig() {
  return {
    maxUploadFileSize: +process.env.UPLOAD_MAX_FILE_SIZE || 10_000_000,
    port: +process.env.PORT || 9009,
    withAuth: !!process.env.ENABLE_AUTH,
    jwtSecret: process.env.JWT_SECRET,
    defaultTokenAge: process.env.DEFAULT_TOKEN_AGE || 5 * 60,
    host: process.env.HOST || 'localhost',
    storagePath: resolveStorage(process.env.STORAGE_PATH ?? 'storage'),
  };
}
export const config = getConfig();
