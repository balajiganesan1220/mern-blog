import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return next(errorHandler(400, 'All Fields are Required'));
        
    
    }
const existingUser = await User.findOne({ $or: [{ username }, { email }] }); 
    if (existingUser) {
        return next(errorHandler(400, 'Username or email already exists'));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    })
    try {
          await newUser.save();
    res.json('Signup succesfully');        
    }catch(error){
        next(error);
    }
    
  
}