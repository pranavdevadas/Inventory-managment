import jwt from "jsonwebtoken";

const adminGenerateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie('adminJwt', token, {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default adminGenerateToken;
