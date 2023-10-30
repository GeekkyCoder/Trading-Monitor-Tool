const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(500).json({status:"error",msg:"you are not authroized to access this route"})
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN);
    const { userId, userName } = decoded;
    req.user = { userId, userName };
    next();
  } catch (err) {
    return res.status(500).json({status:"error",msg:"you are not authroized to access this route"})
  }
};

module.exports = authMiddleware;
