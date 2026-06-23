import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check if the header exists and uses the proper Bearer format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2. Try to verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Attach the decoded payload (e.g., { id, email }) to req.user
    req.user = decoded;
    
    // 4. Move to the controller safely
    next();
  } catch (err) {
    // 5. If verification fails (expired or altered token), catch block intercepts
    res.status(401);
    throw new Error("Not authorized, token failed or expired");
  }
};