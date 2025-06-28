import User from "../models/User";
import { type Request, type Response } from "express";

/**
 * TODO:
 * Find an existing User
 */
export async function findUser(req: Request, res: Response) {
  try{
    const { email } = req.body;
    //
    if(!email || typeof email !== 'string') {
      return res.status(400).json({message: "Email query is required"});
    }

    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    return res.status(200).json({
      message: "User found",
      user: {
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error in finding user :" , error)
    return res.status(500).json({message: "server error"});
  }
}

/**
 * TODO:
 * 1. Verify request body contains {email, password, role} or not.
 * 2. Check if user already exists
 * 3. Verify email format
 * 4. Verify password strength
 * 5. (Option) Encrypt password?
 * 6. Create a new User, save the User on the server
 * 7. Handle success and error messages
 */
export async function createUser(req: Request, res: Response) {
  try {
    const { email, password, role } = req.body;
    // Base case
    if (!email || !password || !role) {
      return res.status(400).json({
        message:
          "Please double check if Email, Password, and role is a valid input.",
      });
    }

    // Check if user already exists
    const isExisting = await User.findOne({ email });
    if (isExisting) {
      return res.status(400).json({
        message:
          "Sorry, the email has been used, please use another email to sign up.",
      });
    }
    // Create a new User
    const newUser = new User({
      email,
      password,
      role,
    });
    // Save this User to server
    await newUser.save();
    res.status(201).json({
      message: "Successfully created a new user.",
      user: {
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(505).json({
      message: "Internal server error:",
      error,
    });
  }
}

/**
 * TODO:
 * Update User password
 */
export async function updatePassword(req: Request, res: Response) {}

/**
 * TODO:
 * Get User role
 */
export async function getUserRole(req: Request, res: Response) {}

/**
 * TODO:
 * Email verify to help user find password
 */
export async function emailVerify(req: Request, res: Response) {}
