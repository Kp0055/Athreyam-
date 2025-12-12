import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: 'No token found' });
    return;  // <-- just return void here
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded || !decoded.id) {
      res.status(401).json({ message: 'Invalid token' });
      return;  // <-- don't return the res object itself
    }

    req.user = { id: decoded.id, email: decoded.email };
    next(); // proceed to next middleware
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;  // <-- void return
  }
};

export default authMiddleware;
