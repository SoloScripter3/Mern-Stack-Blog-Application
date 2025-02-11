import { Request, Response } from "express";
import User from "../models/users";
import { z } from "zod";
import hashPassword from "../utils/hasher";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Used zod library which is typescript first library to validations
 * used for checking types of the data coming from the user request
 * if any validation error occurs then sends the error message as response
 */
const registerZodSchema = z.object({
  username: z.string().min(3, "username must be atleast three characters"),
  email: z.string().email("invalid email format"),
  password: z.string().min(3, "password must be atleast 6 characters"),
});

//function for registration for register route
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    /**
     * here the parse function checks the data in the request body from the user
     * if the data parsed successfully then next steps are executed
     * if data is not parsed successfully the error message is sent in response
     */
    const validatedData = registerZodSchema.parse(req.body);

    /**
     * here we are checking whether existing user is present or not
     * inside the findOne() method email property is checked
     * so only writing {email} is not sufficient, we need to specify the value came from the request
     */
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    /**
     * hashing the password before saving into the db is mandatory
     * the hashPassword() function is from utils/hasher.ts
     */
    const hashedPassword = await hashPassword(validatedData.password);

    const newUser = new User({ ...validatedData, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "user registration successfull" });
    return;
  } catch (error) {
    /**
     * here we are checking the error caught is whether from zod error or not
     */
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors });
      return;
    }
    console.log("error while registering", error);
    res.status(500).json({ message: "internal server error" });
    return;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user doesn't exist" });
      return;
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "invalid password" });
        return;
      }

      const loginToken = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY as string,
        { expiresIn: "24h" }
      );
      res.status(200).json({ message: "login success", token: loginToken });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
