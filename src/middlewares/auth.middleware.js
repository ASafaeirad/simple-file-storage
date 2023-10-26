import { decodeJwt } from '../utils/helpers.js';
import { config } from '../configs/app.config.js';

export async function authMiddleware(req, res, next) {
  if (!config.withAuth || req.method === 'GET') return next();

  const token = await decodeJwt(req.query.token);
  if (!token) return res.status(401).end();
}
