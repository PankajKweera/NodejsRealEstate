const User = require("../../model/user-model");
const Land = require("../../model/land-model");

//admin......------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//User......------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// all user

const getalluser = async (req, res) => {
  try {
    console.log("get all for admin: ");
    const data = await User.find().populate("land", "title address");

    if (data) {
      console.log("all for admin: " + data);
      return res.status(200).send(data);
    } else {
      console.log("all for admin: " + data);
      return res.status(400).send("No data found");
    }
  } catch (error) {
    console.log("Network server Error: " + error);
    return res.status(500).send("Network Server Error");
  }
};

const userDetails = async (req, res) => {
  try {
    let _id = req.body.id;
    console.log("ID of user to get: " + _id);
    const user = await User.findById(_id);
    if (user) {
      console.log("User exist");
      return res.status(200).send({ msg: user });
    } else {
      res.status(404).send({ msg: "user not found with id: " + _id });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server Error" + error });
  }
};

//admin_update_user......------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const updateuser = async (req, res) => {
  try {
    let _id = req.params.userId;
    console.log(_id + ": uSer if");
  } catch (error) {
    console.log(error + ": error");
  }
};

//admin_delete_user......------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const deleteuser = async (req, res) => {
  try {
    let _id = req.body.id;
    console.log(_id + " user ID");
    const user = await User.findByIdAndDelete(_id);
    console.log(user + " userDetails");

    return res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

//admin......------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Land......------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const updateland = async (req, res) => {
//     try {
//         let _id = req.params.landId;
//         let land = Land.findById(_id)
//         if (!land) {
//             return res.status(400).json("No product with id" + _id)
//         }
//         else{
//             console.log(land);
//             return res.status(200).send({
//                 "msg": "Land Updated"
//             })
//         }
//     } catch (error) {

//     }
// }

//
const getallunverifedAdmin = async (req, res) => {
  try {
    console.log("get all admin request: ");
    const data = await User.find({ role: "admin", isverified: false });

    if (data) {
      console.log("all unverified admin: " + data);
      return res.status(200).send(data);
    } else {
      console.log("all for admin: " + data);
      return res.status(400).send("No request found");
    }
  } catch (error) {
    console.log("Network server Error: " + error);
    return res.status(500).send("Network Server Error");
  }
};

const verifyAdmin = async (req, res) => {
  const _id = req.body._id;
  const user = await User.findOne({_id});
  if(user){
    user.isverified = true;
    await user.save();
    return res.status(201).send({msg: `Admin with id ${user._id} can now access.`})
  }
  else{
    
    return res.status(400).send({msg: `Admin with id ${user._id} Not found.`})
  }

};

const verifyAgent = async (req, res) => {
  const _id = req.body._id;
  const user = await User.findOne({_id});
  if(user){
    user.isverified = true;
    user.save();
    return res.status(201).send({msg: `Agent with id ${user._id} can now access.`})
  }
  else{
    
    return res.status(400).send({msg: `Agent with id ${user._id} Not found.`})
  }
};

const removeVerified = async (req, res) => {
  const _id = req.body._id;
  const user = await User.findOne({_id});
  if(user){
    user.isverified = false;
    user.save();
    return res.status(201).send({msg: `User with id ${user._id} access has revoked.`})
  }
  else{
    
    return res.status(400).send({msg: `User with id ${user._id} Not found.`})
  }
}


module.exports = {
  getalluser,
  userDetails,
  deleteuser,
  updateuser,
  getallunverifedAdmin,
  verifyAdmin,
  verifyAgent,
  removeVerified
};
