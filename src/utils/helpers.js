import jwt from 'jsonwebtoken';
import { customAlphabet } from 'nanoid';
import { config } from '../configs/app.config.js';

export const generateId = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  20,
);

export async function signJwt(token = {}, secret = '', opt = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign(token, secret, opt, (err, encoded) => {
      if (err) reject(err);
      else resolve(encoded);
    });
  });
}

export async function verifyJwt(token, secret, opt = {}) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, opt, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
}

export async function decodeJwt(string = '') {
  return verifyJwt(string, config.jwtSecret);
}

export async function encodeJwt(token, maxAge = config.defaultTokenAge) {
  return signJwt(token, config.jwtSecret, { expiresIn: maxAge });
}

export function logConfigs() {
  console.log('App started with configs:\n', config);
}
