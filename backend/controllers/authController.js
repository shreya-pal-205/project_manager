const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { route } = require("../routes/authRoutes");



const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_TOKEN, {expiresIn: "7d"});
}




const registerUser = async (req, res) => {
    try{
        const {name, email, password, adminInviteToken} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }

        let role = "member";
        if(
            adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN
        ){
            role = "admin"
        }

        // hash password...
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user...
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    }
    catch (error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};








const loginUser = async (req, res) => {
   try{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({message: "Invalid email oe password"});
    }


    //Compare password...
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({message: "Invalid email oe password"});
    }


    //Return user data with jwt...
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
    })

   } catch(error){
    res.status(500).json({message: "Server error", error: error.message});
   }
};






const getUserProfile = async (req, res) => {
  try {
    // req.user is set by protect middleware
    const user = await User.findById(req.user._id).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const updateUserProfile = async (req, res) => {
  try {
    // Get the authenticated user from req.user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    // Update password if provided
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    // Save updated user
    const updatedUser = await user.save();

    // Return updated user info (exclude password)
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





module.exports = {registerUser, loginUser, getUserProfile, updateUserProfile};