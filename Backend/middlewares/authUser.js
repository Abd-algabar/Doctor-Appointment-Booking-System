import jwt from "jsonwebtoken";

// user auth middleware

const authUser = (req, res, next) => {
  try {
    const token = req.headers.token || req.headers["token"];
    console.log(token);

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token decode:"+ token_decode.id)
    if (!req.body) {
      req.body = {}; 
    }
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.error("Error in userAuth:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error. Please try again." });
  }
};

export default authUser;
