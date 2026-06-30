import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - Verifies JWT token
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ FIX: Explicitly exclude password from attached user object
      // Even though `select: false` is on the schema, being explicit here
      // prevents accidental password leaks if schema changes later
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        return next(new Error('Not authorized, user not found'));
      }

      return next();
    } catch (error) {
      res.status(401);
      return next(new Error('Not authorized, token failed'));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, no token provided'));
  }
};

// Restrict access based on roles (e.g., 'employer' or 'seeker')
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      return next(
        new Error(`Role (${req.user?.role || 'Guest'}) is not allowed to access this resource`)
      );
    }
    next();
  };
};
