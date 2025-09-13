// middleware/authenticate.js
import jwt from 'jsonwebtoken';
import 'dotenv/config'; // Make sure to load environment variables

export function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token format is invalid' });

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = { id: payload.sub, roles: payload.roles };
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// role check
export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      // This case should be handled by the authentication middleware
      return res.status(401).end();
    }
    
    // Check if the user's roles include any of the allowed roles
    const hasRole = req.user.roles.some(role => allowedRoles.includes(role));
    
    if (!hasRole) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  };
}