const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    console.log("HTTP Method - " + req.method + " URL - " + req.url);
    let token = req.headers.authorization;
    console.log(token);
    if (token) {
      token = token.split(" ")[1];
      console.log(token);
      let user;
      try {
        user = await jwt.verify(token, process.env.SECRET_KEY);
      } catch (error) {
        return res.status(401).json({ msg: " TokenExpired: jwt expired" });
      }
      console.log("USER ROLE:: " + user.role);
      if (user.role == "user" || user.role == "admin") {
        req.role = user.role;
        next();
      } else {
        return res
          .status(401)
          .json({ msg: "Trying to access unauthorized Resources" });
      }
    } else {
      return res.status(401).json({ msg: "Unauthorized User/Token" });
    }
  } catch (error) {
    console.log("Error is : " + error);
    return res.status(401).json({ msg: "Something went wrong" });
  }
};

const authAgent = async (req, res, next) => {
  try {
    console.log("HTTP Method - " + req.method + " URL - " + req.url);
    let token = req.headers.authorization;
    console.log(token);
    if (token) {
      token = token.split(" ")[1];
      console.log(token);
      let user;
      try {
        user = await jwt.verify(token, process.env.SECRET_KEY);
      } catch (error) {
        return res.status(401).json({ msg: " TokenExpired: jwt expired" });
      }
      if ("agent" == user.role || user.role == "admin") {
        req.role = user.role;
        next();
      } else {
        return res
          .status(401)
          .json({ msg: "Trying to access unauthorized Resources" });
      }
    } else {
      return res.status(401).json({ msg: "Unauthorized User/Token" });
    }
  } catch (error) {
    console.log("Error is : " + error);
    return res.status(401).json({ msg: "Something went wrong" });
  }
};

const authAdmin = async (req, res, next) => {
  try {
    console.log("HTTP Method - " + req.method + " URL - " + req.url);
    let token = req.headers.authorization;
    console.log(token);
    if (token) {
      token = token.split(" ")[1];
      console.log(token);
      console.log("CHeeeekkkkk1111");
      let user;
      try {
        user = await jwt.verify(token, process.env.SECRET_KEY);
      } catch (error) {
        return res.status(401).json({ msg: " TokenExpired: jwt expired" });
      }
      if ("admin" == user.role) {
        req.role = user.role;
        next();
      } else {
        return res
          .status(401)
          .json({ msg: "Trying to access unauthorized Resources" });
      }
    } else {
      return res.status(401).json({ msg: "Unauthorized User/Token" });
    }
  } catch (error) {
    console.log("Error is : " + error);
    return res.status(401).json({ msg: "Something went wrong" });
  }
};

module.exports = { authUser, authAdmin, authAgent };
