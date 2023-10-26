import jwt from 'jsonwebtoken';
import assert from 'assert';
import { promisify } from 'util';
import { config } from '../configs/app.config.js';

const signJwt = promisify(jwt.sign);
const verifyJwt = promisify(jwt.verify);

export async function decodeJwt(token) {
  assert(token, 'token is required to decode');
  return verifyJwt(token, config.jwtSecret);
}

export async function encodeJwt(token, maxAge = config.defaultTokenAge) {
  assert(token, 'token is required to encode');
  return signJwt(token, config.jwtSecret, { expiresIn: maxAge });
}
