
const express = require('express');
const {
    registerUser,
    loginUser,
    updateUserProfile,
    getProfile,
    deleteProfile,
    getUserList,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:userId', protect, getProfile);
router.put('/profile/:userId', protect, updateUserProfile);
router.delete('/profile/:userId', protect, deleteProfile);
router.get('/userlist', getUserList);

module.exports = router;
