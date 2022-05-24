import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user_models.js";

export const signin = async (req, res) => {

    ///dictraction the email, 
    const { email, password } = req.body;
    console.log("0...")
    try {
        ///check the user by the email in the database.
        const existingUser = await User.findOne({ email });
        console.log("1...")
        if (!existingUser) {

            ///if not exist
            return res.status(404).json({ message: "User doesn't exist." })
        }

        console.log("2...")


        ///verifier the password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        console.log("3...")

        if (!isPasswordCorrect) {

            ///if wrong password 
            return res.status(400).json({ message: "Invalid credentials." })
        }
        console.log("4...")

        ///create token.
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });
        console.log("5...")

        res.status(200).json({ result: existingUser, token })
        console.log("6...")

    } catch (error) {

        res.status(500).json({ message: "Something went wrong." })
    }
}


export const signup = async (req, res) => {

    ///disctration the all variable.
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    try {
        /// check is this email already use by other users.

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            //the email is already exist;
            return res.status(400).json({ message: "User already exist" });
        }

        if (password !== confirmPassword) {
            ///check if the passworld is the same of the comfirm password
            return res.status(400).json({ message: "Passworld don't match." })
        }

        ///hash password by the bcrypd.
        const hashedPassword = await bcrypt.hash(password, 12);

        ///create the new user.
        const result = await User.create({ email, password: hashedPassword, name: `${firstname} ${lastname}` });

        ///create the token .
        const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });

        res.status(200).json({ result, token });

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: "Something went wrong" })
    }
}