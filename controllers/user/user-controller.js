const twilio = require("twilio");
const nodemailer = require("nodemailer");
const User = require("../../model/user-model");
const Land = require("../../model/land-model");

//                    <<<<<<<<<----------USER-------------->>>>>>>>>>>>

const myprofile = async (req, res) => {
  try {
    let _id = req.body.id;
    console.log("ID of user to get: " + _id);
    const user = await User.findById(_id);
    if (user) {
      console.log("User exist");
      return res.status(200).send({ msg: user });
    } else {
      return res.status(404).send({ msg: "user not found with id: " + _id });
    }
  } catch (error) {
    console.log("ERRRRRR" + error + ":::::ERRRRRR");
    return res.status(500).json({ msg: "Internal server Error" + error });
  }
};

const updateprofile = async (req, res) => {
  try {
    let { _id, username, email, address } = req.body;
    if (email == "") {
      res.status(400).send({ msg: "email is required." });
    } else {
      let user = await User.findById({ _id });
      user.username = username;
      user.address.city = address.city;
      user.address.pin = address.pin;
      user.address.state = address.state;
      user.email = email;
      user.save();
      res.status(200).json({ msg: "Profile Update Success" });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Profile cant be Updated",
    });
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReasonToAdminOrAgent = async (data) => {
  console.log(data.reason + " This is the reason for removal");
  // Find the location agent or admin then send mail
  const mailOption = {
    from: process.env.EMAIL_USER,
    to: "himanshunainwal0@gmail.com",
    subject: "Reason for Deletion of account",
    text: data.data,
  };

  try {
    const info = await transporter.sendMail(mailOption);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};

const removeuser = async (req, res) => {
  try {
    // let reason = req.body.reson;

    // Mail the reason to agent /admin
    const data = req.body.reason;
    const _id = req.body._id;

    console.log(_id + " user ID" + ": " + data);
    const user = await User.findById(_id);
    if (!user) {
      return res.status(500).send("User Not Found");
    }
    const mail = user.email;
    /*
     */
    const mailyourReason = await sendReasonToAdminOrAgent({ data, mail });
    if (!mailyourReason) {
      console.log("Failed to send feedback !");
    }
    // // remove all plot registered

    // const user = await User.findByIdAndDelete(_id);
    console.log(user + " userDetails");
    user.remove();
    return res.status(200).send({ msg: "User REmoved", data: user });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Twilio credentials

const inviteuser = async (req, res) => {
  // await process.env.WEBSITE_LINK;
  try {
    const invitedBy = await User.findOne({ _id });
    const owner = invitedBy.phonenumber;

    const accountSid = process.env.ACCOUNTSID;
    const authToken = process.env.AUTHTOKEN;
    const virtualNumber = process.env.VIRTUALNUMBER;

    const client = twilio(accountSid, authToken);

    const phonenumber = req.body.phonenumber;

    const sendInvitation = (newuser) => {
      console.log("sending sms");
      return client.messages.create({
        body: `${owner} Invited you to join us at ->--- `,
        from: virtualNumber,
        to: `+91${newuser}`,
      });
    };
    const existingUser = await User.findOne({ phonenumber });

    if (existingUser) {
      console.log("USer exist");
      return res.status(400).json({ msg: "User already exists" });
    } else {
      const response = await sendInvitation(phonenumber);
      res
        .status(200)
        .json({ msg: `Invitation sent Successfully to ${phonenumber}` });
    }
  } catch (error) {
    res.status(500).json({ msg: `Internal server error` });
  }
};

module.exports = { myprofile, updateprofile, removeuser, inviteuser };
