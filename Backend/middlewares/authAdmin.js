import jwt from "jsonwebtoken";

// admin auth middleware

const authAdmin = (req, res, next) => {
  try {
    const aToken = req.headers.atoken || req.headers["aToken"];

 
   
    if (!aToken) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const token_decode = jwt.verify(aToken, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.error("Error in adminAuth:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error. Please try again." });
  }
};

export default authAdmin;
