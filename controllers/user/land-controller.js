const Land = require("../../model/land-model");
const User = require("../../model/user-model");

//                              <<<<<<<<<----------USER_Property-------------->>>>>>>>>>>>

const getmyland = async (req, res) => {
  try {
    console.log("my land");
    let _id = req.body;
    const user = await User.find({ _id }).populate(
      "land",
      "title address images video"
    );
    if (user) {
      console.log(user + " : User details");

      const userandland = user.map((u) => ({
        _id: u._id,
        lands: u.land.map((l) => ({
          _id: l._id,
          title: l.title,
          address: l.address,
          images: l.images,
          video: l.video,
        })),
      }));

      return res.status(200).json({ "my land": userandland });
    } else {
      return res.status(400).json("No User land");
    }
  } catch (error) {
    console.log("Network Server Error : " + error);
    return res.status(500).json("Network Server Error");
  }
};

//User__Register__land......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const register = async (req, res) => {
//   try {
//     const { title, address, area, price, description, imageUrl, ownerId } =
//       req.body;
//     console.log("Working101" + title + ":" + address.city);
//     const land = new Land({
//       title,
//       address,
//       area,
//       price,
//       description,
//       imageUrl,
//       owner: ownerId,
//     });
//     console.log("find User");
//     const user = await User.findById({ _id: ownerId });
//     if (user) {
//       await land.save();
//       console.log("found User: " + user);

//       console.log(land + ": this is land");
//       user.land.push(land._id);
//       await user.save();
//       // res.status(200).send("Product is registered.")
//       res.status(200).send("Product is registered.");
//     } else {
//       return res.status(400).send(" User Not registered.");
//     }
//   } catch (error) {
//     res.status(400).json("Error registering property/Land");
//   }
// };

//User__Update__Listed__land......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const update = async (req, res) => {
  const images = req.files["images"]
    ? req.files["images"].map((file) => file.path)
    : [];
  const video = req.files["video"] ? req.files["video"][0].path : "";

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
      land.images = images;
      land.video = video;
      land.status = "pending";
      land.save();
      console.log("This is update land " + _id);
      res.json({ msg: "Property Update Sucessful", property: land });
    } else {
      return res.status(404).json("No propertyListed with id: " + _id);
    }
  } catch (error) {
    console.log("error");
    res.status(500).json("Internal Server Error");
  }
};

//User__Remove__Listed__land......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const remove = async (req, res) => {
  try {
    let _id = req.body._id;
    console.log(_id + " : ");
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

// const getunverified = async (req, res) => {
//     try {
//         console.log("Unverified Lands");
//         const data = await Land.find({ status: 'pending' }).populate('verifiedby', 'phonenumber').populate('owner', 'phonenumber')
//         if (data.length != 0) {
//             console.log(data);
//             res.status(200).json({ "data": data })
//         }
//         else {
//             return res.status(200).json({ "no unverified land": data })
//         }
//     } catch (error) {
//         res.status(500).send("Internal Server Error")
//     }
// }

// //Agent__Verify/Update__land......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const verifyland = async (req, res) => {
//     try {
//         let { _id, status, verifiedby } = req.body
//         console.log("Agent verification");
//         const land = await Land.findById(_id);

//         if (land) {
//             land.status = status
//             land.verifiedby = verifiedby
//             land.save();
//             return res.status(200).json("Land verification Done")
//         }
//         else {
//             return res.status(500).json("No Land found")

//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).send("Network Server Error")
//     }
// }

// //                              <<<<<<<<<----------ADMIN-------------->>>>>>>>>>>>

// //Get__all......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

// const getallland = async (req, res) => {
//     try {
//         console.log("all for admin: ");
//         const data = await Land.find()
//             .populate("owner", "phonenumber").populate("verifiedby", "phonenumber")

//         if (data.length != 0) {
//             console.log("all for admin: " + data);
//             return res.status(200).send(data)
//         }
//         else {
//             console.log("all for admin: " + data);
//             return res.status(400).json({ "No data found": data })
//         }
//     } catch (error) {
//         console.log("Network server Error: " + error);
//         return res.status(500).send("Network Server Error")

//     }
// }

// shortlist code.

const shortlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const property = await Land.findById(req.params.propertyId);

    if (!user || !property) {
      return res.status(404).json({ message: "User or Property not found" });
    }

    user.shortlisted.push(property);
    await user.save();

    res.json({ message: "Property shortlisted", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//   Upload Image/Video and register Land

const register = async (req, res) => {
  const { title, address, area, price, description, ownerId } = req.body;

  const images = req.files["images"]
    ? req.files["images"].map((file) => file.path)
    : [];
  const video = req.files["video"] ? req.files["video"][0].path : "";

  try {
    const land = new Land({
      title,
      address,
      area,
      price,
      description,
      images,
      video,
      owner: ownerId,
    });

    const user = await User.findById({ _id: ownerId });
    console.log("find User");
    if (user) {
      await land.save();
      console.log("found User: " + user);

      console.log(land + ": this is land");
      user.land.push(land._id);
      await user.save();
      // res.status(200).send("Product is registered.")
      res.status(201).json({ message: "Product added successfully" });
    } else {
      return res.status(400).send(" User Not registered.");
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// getall, getbylocation,  verifyland, getunverified, getalluser, getallland,
module.exports = {
  register,
  update,
  remove,
  getmyland,
  shortlist,
};
