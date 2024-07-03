const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const { createToken } = require('../config/jwt')


const userSignup = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        const isUserExists = await User.findOne({ email });

        if (isUserExists) {
            return res.status(400).send("UserExist");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            phone,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send("Internal Server Error");
    }
};



const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(404).send("User not found");
        }
        // console.log(userData);

        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(400).send("wrongPassword");
        }

        const token = createToken(userData._id);
        console.log(token);
        res.json({ userData, token });
    } catch (err) {
        console.error('Error during login:', err.message);  
        res.status(500).send("Internal Server Error");
    }
};

const editProfile = async (req, res) => {
    try {
        const { userId, username } = req.body;
        const file = req.file;
        const updatedData = {
            username: username,
            ...(file && { profileURL: file.originalname })
        };
        const updateUser = await User.updateOne({ _id: userId }, updatedData);
        res.json(updateUser);
    } catch (error) {
        console.error("Error updating profile: ", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    userSignup,
    userLogin,
    editProfile
};
