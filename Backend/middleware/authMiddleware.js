import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET)?.user;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token invalid or expired' });
  }
};
