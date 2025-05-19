const jwt = require("jsonwebtoken");

const JWT_SECRET = "jwt"; // В реальном проекте должен быть в .env

function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Требуется авторизация" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Неверный токен" });
  }
}

module.exports = {
  authMiddleware,
  JWT_SECRET,
};
