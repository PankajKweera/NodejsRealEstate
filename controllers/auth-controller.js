const User = require("../model/user-model");
const jwt = require("jsonwebtoken");

//user__Register......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const register = async (req, res) => {
  try {
    // Check the database if user already registered then send then otp for login
    // otherwise create a new user and send otp.
    const phonenumber = req.body.phonenumber;
    const otp = req.body.otp;
    console.log(phonenumber + " exist");
    const user = await User.findOne({ phonenumber });

    console.log(user + ": User");
    if (user) {
      // const id = user.id;
      console.log(" new 1");
      const compareOtp = user.otp;
      if (compareOtp == otp && user.role == 'user') {
        user.verify = true;
        user.role = "user";
        user.isverified = true;
        user.uniqueid = "user" + user._id;
        user.save();

        const token = jwt.sign(
          {
            phonenumber: user.phonenumber,
            role: user.role,
            uniqueid: user.uniqueid,
          },
          process.env.SECRET_KEY,
          { expiresIn: '5min' }
        );

        // const updatedata = await User.findOneAndUpdate(id, { phonenumber, verify }, { new: true })
        // res.redirect('/register/student');
        return res.status(200).send({ "User Login ": user, token: token });
        // .redirect('/user/' + user._id)
      } else {
        console.log(" new nnn");
        res.status(400).send({ msg: "OTP Does not match" });
      }
    } else {
      console.log(" new 3");
      res.status(404).send({ msg: "User is not registered" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error." });
  }
};

//agent__Register......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const agentregister = async (req, res) => {
  try {
    // Check the database if user already registered then send then otp for login
    // otherwise create a new user and send otp.
    const phonenumber = req.body.phonenumber;
    const otp = req.body.otp;
    console.log(phonenumber + " exist");
    const user = await User.findOne({ phonenumber });

    console.log(user + ": User");
    if (user) {
      // const id = user.id;
      console.log(" new 1");
      const compareOtp = user.otp;
      if (compareOtp == otp && user.role == 'agent') {
        user.verify = true;
        console.log(" new 2");
        user.role = "agent";
        user.uniqueid = "agent" + user._id;
        user.save();
        // const updatedata = await User.findOneAndUpdate(id, { phonenumber, verify }, { new: true })
        // res.redirect('/register/student');

        if (user.isverified) {
          const token = jwt.sign(
            {
              phonenumber: user.phonenumber,
              role: user.role,
              uniqueid: user.uniqueid,
            },
            process.env.SECRET_KEY
          );
          return res.status(200).send({ "User Login ": user, token: token });
        } else {
          return res
            .status(200)
            .send({ "once verified by admin agent can login ": user });
        }
        // .redirect('/user/' + user._id)
      } else {
        console.log(" new nnn");
        res.status(400).send({ msg: "OTP Does not match" });
      }
    } else {
      console.log(" new 3");
      res.status(404).send({ msg: "User is not registered" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error." });
  }
};

//admin__Register......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const adminregister = async (req, res) => {
  try {
    // Check the database if user already registered then send then otp for login
    // otherwise create a new user and send otp.
    const phonenumber = req.body.phonenumber;
    const otp = req.body.otp;
    console.log(phonenumber + " exist");
    const user = await User.findOne({ phonenumber });

    console.log(user + ": User");
    if (user && user.role == 'admin') {
      // const id = user.id;
      console.log(" new 1");
      const compareOtp = user.otp;
      if (compareOtp == otp) {
        user.verify = true;
        user.uniqueid = "admin" + user._id;
        user.save();
        console.log(" new 2");
        if (
          (user.phonenumber == "7251939694" || user.isverified) &&
          user.role == "admin"
        ) {
          // user.role = "admin";
          // user.isverified = true;

          const token = jwt.sign(
            {
              phonenumber: user.phonenumber,
              role: user.role,
              uniqueid: user.uniqueid,
            },
            process.env.SECRET_KEY
          );
          return res.status(200).send({ "User Login ": user, token: token });

          // return res.status(200).redirect("/admin/" + user._id);
        } else {
          return res
            .status(200)
            .send({ "once verified by admin other admins can login ": user });
          // return res.status(400).json("admin can not be a unknown person");
        }

        // const updatedata = await User.findOneAndUpdate(id, { phonenumber, verify }, { new: true })
        // res.redirect('/register/student');
        // .send({ "User Login ": user })
      } else {
        console.log(" new nnn");
        res.status(400).send({ msg: "OTP Does not match" });
      }
    } else {
      // const userdata = await User.create({ phonenumber: phonenumber });
      res.status(404).send({ msg: "User is not registered" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error." });
  }
};

module.exports = { register, agentregister, adminregister };
