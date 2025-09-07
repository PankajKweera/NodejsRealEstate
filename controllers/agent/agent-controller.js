const User = require('../../model/user-model')
const Land = require('../../model/land-model')

//                              <<<<<<<<<----------USER-------------->>>>>>>>>>>>
//set_user__profile......-------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const profile = async (req, res) => {
//     try {
//         User.findById()
//     } catch (error) {

//     }
// }


// const getmyland = async (req, res) => {
//     try {
//         console.log("my land");
//         let _id = req.body;
//         const user = await User.find({ _id })
//             .populate('land', 'title location imageUrl')
//         if (user) {

//             console.log(user + " : USer details")

//             const userandland = user.map(u => ({
//                 _id: u._id,
//                 lands: u.land.map(l => ({
//                     _id: l._id,
//                     title: l.title,
//                     location: l.location,
//                     images: l.imageUrl
//                 }))
//             }))

//             return res.status(200).json({ "my land": userandland })
//         }
//         else {
//             return res.status(400).json("No User land")

//         }
//     } catch (error) {
//         console.log("Network Server Error : " + error)
//         return res.status(500).json("Network Server Error")
//     }
// }


//                              <<<<<<<<<----------ADMIN-------------->>>>>>>>>>>>

//Get__all......--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const getalluser = async (req, res) => {
    try {
        // get agents current location 
        // and only allowed to view user form that state 
        console.log("get all for agent: ");
        const data = await User.find({ role: { $nin: ['admin', 'agent'] } })
            .populate('land', 'title address')
        if (data) {
            console.log("all for agent: " + data);
            return res.status(200).send(data)
        }
        else {
            console.log("all for agent: " + data);
            return res.status(400).send("No data found")
        }
    } catch (error) {
        console.log("Network server Error: " + error);
        return res.status(500).send("Network Server Error")

    }
}


const userDetails = async (req, res) => {
    try {
        // userId
        const _id = req.params.userId;
        // const _id = req.query.userId;
        // let _id = req.body._id;
        console.log("ID of user to get: " + _id);
        const user = await User.findById(_id).populate('land','status _id title imageUrl');
        if (user) {
            console.log("User exist");
            return res.status(200).send({ "msg": user })
        }
        else {
            res.status(404).send({ msg: "user not found with id: " + _id })
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal server Error" + error });
    }
}




module.exports = { getalluser, userDetails }