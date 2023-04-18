import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//new user registration

export const registerUser = async (req, res) => {
   

    const { firstName, lastName, email, password } = req.body
    const user = await userModel.findOne({ email })
    try {
        if (user) {
            res.status(200).json({ message: "User already exist" })
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = new userModel({ firstName, lastName, email, password: hashedPassword })
            const user = await newUser.save()


            const token = jwt.sign({
                email: user.email, id: user._id
            }, process.env.JWT_KEY, { expiresIn: "1h" })

            res.status(200).json({ user, token })

        }

    } catch (error) {
        res.status(500).json({ message: error.message })

    }

}

// user login

export const loginUser = async (req, res) => {
   
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            const passwordValidity = await bcrypt.compare(password, user.password)
            if (!passwordValidity) {
                res.status(200).json({ message: "Wrong Password" })
            }
            else {
                const token = jwt.sign({    
                    email: user.email, id: user._id
                }, process.env.JWT_KEY, { expiresIn: "1h" })
                
                res.status(200).json({ user, token })
            }
        }
        else {
            res.status(200).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}