import jwt from 'jsonwebtoken';
import dotenv  from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;

// middleware to verify token
function authenticateToken(req, res, next) {

  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).json({
    message: "no token provided"
  });

  jwt.verify(token, SECRET, (err, user) => {

    if (err) return res.status(403);

    req.user = user;

    next();
  });
}


export { authenticateToken };