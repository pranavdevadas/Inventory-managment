import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";


const adminProtect = expressAsyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, No Token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
});

export default adminProtect;
