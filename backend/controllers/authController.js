
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // generate ID 
        const lastUser = await User.findOne().sort({ userId: -1 });
        let nextNumber = 1;
        if (lastUser && lastUser.userId) {
            nextNumber = parseInt(lastUser.userId.replace('U', ''), 10) + 1;
        }
        const userId = 'U' + String(nextNumber).padStart(3, '0');

        //Making data to create: userStatus and role is default until admin change
        const user = await User.create({
            userId,
            name,
            email,
            password,
            userStatus: 'active',
            role: 'R002'
        });
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            userStatus: user.userStatus,
            role: user.role,
            token: generateToken(user.id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                userStatus: user.userStatus,
                role: user.role,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            name: user.name,
            email: user.email,
            userStatus: user.userStatus,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { name, email, userStatus, role } = req.body;
        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.userStatus = userStatus ?? user.userStatus;
        user.role = role ?? user.role;

        const updatedUser = await user.save();
        res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            userStatus: updatedUser.userStatus,
            role: updatedUser.role,
            token: generateToken(updatedUser.id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete profile
const deleteProfile = async (req, res) => {
    try {
        console.log("starting delete")
        const profile = await User.findOneAndDelete({ userId: req.params.userId });
        if (!profile) return res.status(400).json({ message: 'User not found' });

        res.json({ profile });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

//get all users for user list (except for password)
const getUserList = async (req, res) => {
    try {
        console.log('getUsers controller started');
        const users = await User.find().select('-password');
        console.log('Users found:', users);
        res.status(200).json(users);
    } catch (error) {
        console.error('getUsers error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    getProfile,
    deleteProfile,
    getUserList
};
