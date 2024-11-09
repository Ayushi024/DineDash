import jwt from 'jsonwebtoken';  // Import the entire module

const { verify } = jwt;  // Destructure the 'verify' function

import { UNAUTHORIZED } from '../constants/httpStatus.js';

export default (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) return res.status(UNAUTHORIZED).send();

  try {
    const decoded = verify(token, process.env.JWT_SECRET);  // Use 'verify' as you did before
    req.user = decoded;
  } catch (error) {
    res.status(UNAUTHORIZED).send();
  }

  return next();
};
