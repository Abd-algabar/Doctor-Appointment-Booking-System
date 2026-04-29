import jwt from "jsonwebtoken";

// doctor auth middleware

const authDoctor = (req, res, next) => {
  try {
    const dToken = req.headers.dtoken || req.headers["dtoken"];

    if (!dToken) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);
    // console.log("dToken decode:"+ token_decode.id)
    if (!req.body) {
      req.body = {}; 
    }
    req.body.docId = token_decode.id;

    next();
  } catch (error) {
    console.error("Error in userAuth:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error. Please try again." });
  }
};

export default authDoctor;
