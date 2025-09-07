const User = require('../model/user-model')
//Generate__OTP......------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const generateRandomOTP = () => {
    let otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}

const sendOTP = async (otp, userphonenumber) => {

    try {
        const accountSid = process.env.ACCOUNTSID;
        const authToken = process.env.AUTHTOKEN;
        const virtualNumber = process.env.VIRTUALNUMBER

        const client = twilio(accountSid, authToken);


        const phonenumber = userphonenumber;

        const sendInvitation = (newuser) => {

            console.log("sending sms");
            return client.messages.create({
                body: `Your OTP for Realassets account is ${otp}`,
                from: virtualNumber,
                to: `+91${newuser}`
            });
        };
        return await sendInvitation(phonenumber);
    } catch (error) {
        return `Internal server error ${error}`;
    }
};

const userotpCreation = async (req, res) => {
    try {
        let phonenumber = req.body.phonenumber
        // const otp = generateRandomOTP();
        const otp = 123456;
        console.log("otp Generated: " + phonenumber + ": " + otp);
        const userExist = await User.findOne({ phonenumber });
        if (userExist) {
            const id = userExist.id;
            console.log(userExist);
            let verify = false
            const update = await User.findOneAndUpdate(userExist, { phonenumber, otp, verify }, { new: true });
            // await sendOTP(otp, phonenumber);
            return res.status(200).send({ msg: "otp send" })
        }
        let role = 'user'

        await User.create({ phonenumber: phonenumber, otp: otp, role: role })
        await sendOTP(otp, phonenumber);
        return res.status(200).send({ msg: "otp send" })

    } catch (error) {
        console.log("error creating otp:" + error);
        return res.status(500).send({ msg: "Something went wrong try again" })
    }
}
const agentotpCreation = async (req, res) => {
    try {
        let phonenumber = req.body.phonenumber
        // const otp = generateRandomOTP();
        const otp = 123456
        console.log("otp Generated: " + phonenumber + ": " + otp);
        const userExist = await User.findOne({ phonenumber });
        if (userExist) {
            const id = userExist.id;
            console.log(userExist);
            let verify = false
            await User.findOneAndUpdate(userExist, { phonenumber, otp, verify }, { new: true });
            // await sendOTP(otp, phonenumber);
            return res.status(200).send({ msg: "otp send" })
        }
        let role = 'agent'

        await User.create({ phonenumber: phonenumber, otp: otp, role: role })
        await sendOTP(otp, phonenumber);
        return res.status(200).send({ msg: "otp send" })

    } catch (error) {
        console.log("error creating otp:" + error);
        return res.status(500).send({ msg: "Something went wrong try again" })
    }
}

const adminotpCreation = async (req, res) => {
    try {
        let phonenumber = req.body.phonenumber
        const otp = 123456;
        // const otp = generateRandomOTP();
        console.log("otp Generated: " + phonenumber + ": " + otp);
        const userExist = await User.findOne({ phonenumber });
        let role = 'admin'
        if (userExist) {
            const id = userExist.id;
            console.log(userExist);
            let verify = false

            await User.findOneAndUpdate(userExist, { phonenumber, otp, verify, role }, { new: true });
            // await sendOTP(otp, phonenumber);
            return res.status(200).send({ msg: "otp send" })
        }

        await User.create({ phonenumber: phonenumber, otp: otp, role: role })
        await sendOTP(otp, phonenumber);
        return res.status(200).send({ msg: "otp send" })

    } catch (error) {
        console.log("error creating otp:" + error);
        return res.status(500).send({ msg: "Something went wrong try again" })
    }
}


module.exports = { userotpCreation, agentotpCreation, adminotpCreation }