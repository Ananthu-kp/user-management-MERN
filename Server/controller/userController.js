const User = require('../model/userModel');
const bcrypt = require('bcrypt');


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

module.exports = {
    userSignup
};
