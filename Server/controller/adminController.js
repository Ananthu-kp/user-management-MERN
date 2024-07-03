const User = require('../model/userModel')
const { createToken } = require('../config/jwt')
const bcrypt = require('bcrypt')
require('dotenv').config()

const adminLogin = async (req, res) => {
    try {
        console.log("working");
        const { email, password } = req.body
        console.log(email, password);
        orginalEmail = process.env.ADMIN_EMAIL
        orginalPass = process.env.ADMIN_PASS
        if (email == orginalEmail) {
            if (orginalPass == password) {
                const adminToken = createToken(email);
                // console.log(adminToken);
                res.json(adminToken);
            } else {
                res.send("wrongpassword")
            }
        } else {
            res.send("EmailNotFound")
        }
    } catch (error) {
        console.log(error.message);
    }
}


const fetchUserData = async (req, res) => {
    try {
        const usersList = await User.find({}, { password: 0 });
        console.log(usersList);
        res.json(usersList);
    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        console.log("wrkng");
        const userID = req.body.userID;
        const deleteUser = await User.deleteOne({ _id: userID });
        res.send(deleteUser);
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userID, username } = req.body;
        const updateUser = await User.updateOne({ _id: userID }, { username: username });
        res.json(updateUser);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    adminLogin,
    fetchUserData,
    deleteUser,
    updateUser
}