const Land = require('../../model/land-model')
const User = require('../../model/user-model')


//                              <<<<<<<<<----------USER/AGENT/ADMIN-------------->>>>>>>>>>>>

//Get__all......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Show only the verified land
const getall = async (req, res) => {
    try {
        
        const data = await Land.find().populate("owner", "phonenumber").populate("verifiedby", "phonenumber")
        console.log(data);
        res.json(data)
    } catch (error) {
        console.log("Server Error" + error);
        res.json("error")
    }
}

const getbylocation = async (req, res) => {
    try {
      let { state, city, pin_code } = req.body;
      // req.body.location
      console.log("length of pin " + pin_code);
      var data;
      var query = { status: "verified" };
  
      if (pin_code) {
        query["address.pin_code"] = pin_code;
      } else if (city) {
        query["address.city"] = city;
      } else {
        query["address.state"] = state;
      }
      data = await Land.find(query).populate("owner", "phonenumber").populate("verifiedby", "phonenumber");
      console.log("Products Details.: " + data);
      res.send({ data: data });
    } catch (error) {
      console.log(data + " : lands by location");
  
      res.send("Not found");
    }
  };
  
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

// const update = async (req, res) => {
//     try {
//         let { _id, title, location, area, price, description, imageUrl } = req.body;
//         console.log(_id + " : ");
//         const land = await Land.findById(_id);
//         console.log(_id + " : " + land);
//         if (land) {
//             land.title = title
//             land.location = location
//             land.area = area
//             land.price = price
//             land.description = description
//             land.imageUrl = imageUrl
//             land.status = 'pending'
//             land.save();
//             console.log("This is update land " + _id)
//             res.json('update Land');
//         }
//         else {
//             return res.status(404).json("No propertyListed with id: " + _id);
//         }

//     } catch (error) {
//         console.log("error");
//         res.status(500).json("Internal Server Error")
//     }
// }

//User__Remove__Listed__land......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const remove = async (req, res) => {
//     try {
//         let _id = req.body._id;
//         console.log(_id + " : ");
//         const land = await Land.findByIdAndDelete(_id);
//         console.log(_id + " : " + land);
//         if (land) {

//             console.log("This is removed land " + _id)
//             res.json('Land Removed');
//         }
//         else {
//             return res.status(404).json("No property found with id: " + _id);
//         }

//     } catch (error) {
//         console.log("error");
//         res.status(500).json("Internal Server Error")
//     }
// }



//                              <<<<<<<<<----------AGENT-------------->>>>>>>>>>>>

// get all unverified lands to be verified

const getunverified = async (req, res) => {
    try {
         // get agents current location 
        // and only allowed to view Plots form that state 
        console.log("Unverified Lands");
        const data = await Land.find({ status: 'pending' }).populate('verifiedby', 'phonenumber').populate('owner', 'phonenumber')
        if (data.length != 0) {
            console.log(data);
            res.status(200).json({ "data": data })
        }
        else {
            return res.status(200).json({ "no unverified land": data })
        }
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}


//Agent__Verify/Update__land......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const verifyland = async (req, res) => {
    try {
        let { _id, status, verifiedby } = req.body
        console.log("Agent verification");
        const land = await Land.findById(_id);

        if (land) {
            land.status = status
            land.verifiedby = verifiedby
            land.save();
            return res.status(200).json("Land verification Done")
        }
        else {
            return res.status(500).json("No Land found")

        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Network Server Error")
    }
}





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



// Mark property as contacted
const contacted =  async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const property = await Property.findById(req.params.propertyId);

        if (!user || !property) {
            return res.status(404).json({ message: 'User or Property not found' });
        }

        user.contacted.push(property);
        await user.save();

        res.json({ message: 'Property marked as contacted', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = { getall, getbylocation, verifyland, getunverified, contacted }