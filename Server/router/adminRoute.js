const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')



router.post('/login', adminController.adminLogin)
router.get('/fetchuser', adminController.fetchUserData)
router.delete('/deleteUser', adminController.deleteUser)
router.post('/updateUser', adminController.updateUser)

module.exports = router