import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized: Token expired" });
      }
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.userId = verifyToken.userId; // Attach user info to request object
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
