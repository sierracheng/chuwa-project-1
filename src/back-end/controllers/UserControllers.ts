import { EMAIL_REGEX, PASSWORD_REGEX } from "../../utils/regex";
import User from "../models/User";
import { type Request, type Response } from "express";
import { sendEmail } from "../SendGrid/SendEmail";
import jwt from "jsonwebtoken";

/**
 * Private function
 * Call and reuse this function while try-catch the error
 * Report error msg on server console
 * @param res
 * @param error
 * @param context Additional context you want to report
 */
function reportError(res: Response, error: unknown, context: string) {
  console.error(`Error in ${context}:`, error);
  return res.status(500).json({ message: "Internal server error." });
}

/**
 * Validate request.body's email is valid or not
 * @param email
 * @returns True if email is valid
 */
function validateEmailRequest(email: string): boolean {
  return email.length > 0 && EMAIL_REGEX.test(email);
}
/**
 * Validate request.body's password is valid or not
 * @param password
 * @returns True if password if valid
 */
function validatePasswordStrength(password: string): boolean {
  return password.length > 0 && PASSWORD_REGEX.test(password);
}

/**
 * DONE:
 * 1. Verify request body contains {email} or not.
 * 2. Validate email format
 * 3. Check if user already exists
 * 4. If user exists, return the user data
 * 5. If user does not exist, return 404 error
 * 6. Handle success and error messages
 */
export async function findUser(req: Request, res: Response) {
  try {
    const email = req.query.email as string;

    // Validate client side API's request is valid or not
    if (!validateEmailRequest(email)) {
      return res.status(400).json({ message: "Email query is not valid" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User found",
      user: {
        role: user.role,
      },
    });
  } catch (error) {
    return reportError(res, error, "Finding a single User");
  }
}

/**
 * DONE:
 * 1. Verify request body contains {email, password, role} or not.
 * 2. Check if user already exists
 * 3. Verify email format
 * 4. Verify password strength
 * 5. (Option) Encrypt password? -- maybe not implement this?
 * 6. Create a new User, save the User on the server
 * 7. Handle success and error messages
 */
export async function createUser(req: Request, res: Response) {
  console.log("Creating User API called");
  try {
    const { email, password, role } = req.body;
    // Base case
    if (
      !validateEmailRequest(email) ||
      !validatePasswordStrength(password) ||
      !role
    ) {
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
      success: true,
      message: "Successfully created a new user.",
      user: {
        role: newUser.role,
      },
    });
  } catch (error) {
    return reportError(res, error, "Creating User");
  }
}

/**
 * TODO:
 * Update User password- done
 */
export async function updatePassword(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Base case
    if (!validateEmailRequest(email) || !validatePasswordStrength(password)) {
      return res.status(400).json({
        message: "Invalid email or password format.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the password
    user.password = password;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    return reportError(res, error, "Updating User Password");
  }
}

/**
 * DONE:
 * Get a single user's role
 * 1. Verify request body if the email is existing in database
 * 2. Try find this user
 * 3. return the role of this user
 * @returns data.role
 */
export async function getUserRole(req: Request, res: Response) {
  try {
    const email = req.params.email;

    // Base case
    if (!validateEmailRequest(email)) {
      return res.status(400).json({ message: "Email query is not valid" });
    }

    // Try find this user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return the role
    return res.status(200).json({
      success: true,
      message: "Successfully found the user.",
      role: user.role,
    });
  } catch (error) {
    return reportError(res, error, "Getting User's role");
  }
}

/**
 * DONE:
 * Call this API when user click forgot password
 * 1. Validate email is valid or not
 * 2. Find user
 * 3. Generate a token
 * 4. Send email to user
 */
export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;

    // Validate email
    if (!validateEmailRequest(email)) {
      return res.status(400).json({ message: "Email query is not valid" });
    }

    // Try find this user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a naive token
    const token = Date.now();
    const resetUrl = `${process.env.PASSWORD_RESET_URL}/${email}/reset-password/${token}`;

    // Send email
    const msg = {
      to: email, // Target email
      from: process.env.DEFAULT_FROM_EMAIL!, // Use my default email
      subject: "Password Reset - Chuwa Management System",
      text: `Please click the link to reset your password:\n ${resetUrl}`,
      html: `<p>Please click the link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
    };
    await sendEmail(msg);

    return res.status(200).json({
      success: true,
      message: `Password reset email sent to: ${user.email}`,
    });
  } catch (error) {
    return reportError(res, error, "Sending email thru forgot password api");
  }
}

/**
 * TODO:
 * 1. Validate email
 * 2. Validate user and password
 * 3. use JWT to generate the authToken
 */
export async function authLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Validate Email
    if (!validateEmailRequest(email)) {
      return res.status(400).json({ message: "Email query is not valid" });
    }

    // Validate User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Validate password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const authToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env._KEY || "chuwa-proj-auth-token-jwt-secrete"
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: authToken,
      user: {
        _id: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    return reportError(res, error, "Auth login api");
  }
}
