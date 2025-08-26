const jwt = require("jsonwebtoken");

let authenticateToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];
  console.log("Token received:", token);
  

  if (!token) return res.status(401).json({ msg: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid/Expired token" });


    console.log("Decoded Token:",decoded );

    req.user = decoded;
    next();
  });
};

let isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ msg: "Admin access required" });
  }
};

let isUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else 
{
    return res.status(403).json({ msg: "User access required" });
  }
};

let isHr =(req,res,next)=>{
    if(req.user && req.user.role==="hr")
    {
        next();


    }else
    {
        return res.status(403).json({ msg: "HR access required" });
    }
}

module.exports = { authenticateToken, isAdmin, isUser, isHr };
