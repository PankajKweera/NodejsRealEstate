const Land = require("../../model/land-model");
const User = require("../../model/user-model");

//                              <<<<<<<<<----------ADMIN_ACTION_ON_LAND-------------->>>>>>>>>>>>

const getallland = async (req, res) => {
  try {
    console.log("all for admin: ");
    const data = await Land.find()
      .populate("owner", "phonenumber")
      .populate("verifiedby", "phonenumber");

    if (data.length != 0) {
      console.log("all for admin: " + data);
      return res.status(200).send(data);
    } else {
      console.log("all for admin: " + data);
      return res.status(400).json({ "No data found": data });
    }
  } catch (error) {
    console.log("Network server Error: " + error);
    return res.status(500).send("Network Server Error");
  }
};

const verifyland = async (req, res) => {
  try {
    let { _id, status, verifiedby } = req.body;
    console.log("Admin verification");
    const land = await Land.findById(_id);

    if (land) {
      land.status = status;
      land.verifiedby = verifiedby;
      land.save();
      return res
        .status(200)
        .json({ msg: "Land verification Done", "statusIs": status });
    } else {
      return res.status(500).json("No Land found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Network Server Error");
  }
};

const getunverified = async (req, res) => {
  try {
    console.log("Unverified Lands");
    const data = await Land.find({ status: "pending" })
      .populate("verifiedby", "phonenumber")
      .populate("owner", "phonenumber");
    if (data.length != 0) {
      console.log(data);
      res.status(200).json({ data: data });
    } else {
      return res.status(200).json({ "no unverified land": data });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

//Get__all......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Show only the verified land
// const getall = async (req, res) => {
//     try {

//         const data = await Land.find({ status: 'verified' }).populate("owner", "phonenumber").populate("verifiedby", "phonenumber")
//         console.log(data);
//         res.json(data)
//     } catch (error) {
//         console.log("Server Error" + error);
//         res.json("error")
//     }
// }

// const getbylocation = async (req, res) => {
//     try {
//         let location = req.body.location;
//         console.log(location + " : lands by location");
//         const data = await Land.find({ location: { $regex: location, $options: 'i' }, status: 'verified' })
//         console.log(data + " : lands by location");
//         res.send({ "data": data });
//     } catch (error) {
//         console.log(data + " : lands by location");
//         res.send("Not found")

//     }
// }

//                              <<<<<<<<<----------USER-------------->>>>>>>>>>>>

//User__Register__land......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const register = async (req, res) => {
//     try {
//         const { title, location, area, price, description, imageUrl, ownerId } = req.body;
//         const land = new Land({
//             title,
//             location,
//             area,
//             price,
//             description,
//             imageUrl,
//             owner: ownerId
//         })
//         const user = await User.findById({ _id: ownerId })
//         console.log("find User")
//         if (user) {
//             await land.save();
//             console.log("found User: " + user)

//             console.log(land + ": this is land");
//             user.land.push(land._id);
//             await user.save();
//             // res.status(200).send("Product is registered.")
//             res.status(200).send("Product is registered.")
//         }
//         else {
//             return res.status(400).send(" User Not registered.")

//         }
//     } catch (error) {
//         res.status(400).json("Error registering property/Land")
//     }
// }

//User__Update__Listed__land......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const getland = async (req, res) => {
  try {
    let _id = req.params.landId;
    console.log("land for admin: ");
    const data = await Land.find({ _id: _id })
      .populate("owner", "phonenumber")
      .populate("verifiedby", "phonenumber");

    if (data) {
      console.log("land details for admin: " + data);
      return res.status(200).send(data);
    } else {
      console.log("land for admin: " + data);
      return res.status(400).json({ "Property not found": data });
    }
  } catch (error) {
    console.log("Network server Error: " + error);
    return res.status(500).send("Network Server Error");
  }
};

const update = async (req, res) => {
  try {
    let { _id, title, address, area, price, description } = req.body;
    console.log(_id + " : ");
    const land = await Land.findById(_id);
    console.log(_id + " : " + land);
    if (land) {
      land.title = title;
      land.address = address;
      land.area = area;
      land.price = price;
      land.description = description;
      land.status = "pending";
      land.save();
      console.log("This is update land " + _id);
      res.json("update Land");
    } else {
      return res.status(404).json("No propertyListed with id: " + _id);
    }
  } catch (error) {
    console.log("error");
    res.status(500).json("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    let _id = req.params.landId;
    console.log(_id + " remove ");
    const land = await Land.findByIdAndDelete(_id);
    console.log(_id + " : " + land);
    if (land) {
      console.log("This is removed land " + _id);
      res.json("Land Removed");
    } else {
      return res.status(404).json("No property found with id: " + _id);
    }
  } catch (error) {
    console.log("error");
    res.status(500).json("Internal Server Error");
  }
};

//                              <<<<<<<<<----------AGENT-------------->>>>>>>>>>>>

// get all unverified lands to be verified

//                              <<<<<<<<<----------ADMIN-------------->>>>>>>>>>>>

//Get__all......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const getalluser = async (req, res) => {
//     try {
//         console.log("get all for admin: ");
//         const data = await User.find().populate('land', 'title location');

//         if (data) {
//             console.log("all for admin: " + data);
//             return res.status(200).send(data)
//         }
//         else {
//             console.log("all for admin: " + data);
//             return res.status(400).send("No data found")
//         }
//     } catch (error) {
//         console.log("Network server Error: " + error);
//         return res.status(500).send("Network Server Error")

//     }
// }

module.exports = {
  getallland,
  getland,
  update,
  remove,
  verifyland,
  getunverified,
};
