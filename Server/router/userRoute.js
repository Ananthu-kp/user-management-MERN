const express = require('express')
const router = express.Router()

const userController = require('../controller/userController');
const upload = require('../config/multer');

router.post('/userSignup', userController.userSignup);
router.post('/userLogin', userController.userLogin);
router.post('/editProfile', upload.single('image'), userController.editProfile)

module.exports = router;