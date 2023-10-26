export const config = {
  maxUploadFileSize: +process.env.UPLOAD_MAX_FILE_SIZE || 10_000_000,
  port: +process.env.PORT || 9009,
  withAuth: !!process.env.ENABLE_AUTH,
  jwtSecret: process.env.JWT_SECRET,
  defaultTokenAge: process.env.DEFAULT_TOKEN_AGE || 5 * 60,
  host: process.env.HOST || 'localhost',
};
