const User = require("../models/User");

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const regex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regex.test(email)){
            return res.status(400).json({message:"Invalid email"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters long"});
        }

        const user = await User.create({name, email, password});
        res.status(201).json({message:"User registered successfully", user});
    } catch (error) {
        console.error("Registration failed:", error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password"});
        }

        res.status(200).json({message:"User logged in successfully", user});
    } catch (error) {
        console.error("Login failed:", error.message);
        res.status(500).json({message:"Internal server error"});
    }
}
const logoutUser = async (req, res) => {
    try {
        res.status(200).json({message:"User logged out successfully"});
    } catch (error) {
        console.error("Logout failed:", error.message);
        res.status(500).json({message:"Internal server error"});
    }
}
module.exports = {registerUser, loginUser, logoutUser, googleLogin};