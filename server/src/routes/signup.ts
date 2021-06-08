import { Router } from "express";
import CustomError from "../errors/CustomError";
import User from "../models/User";
import Password from "../utils/Password";

const router = Router()

router.post('/signup', (req, res) => {
    console.log('Signup...')

    const email = req.body.email
    const password = Password.hashPassword(req.body.password)

    console.log(email, password)

    const user = new User({
        email, password
    })
    user.save((err: Error, user: typeof User) => {
        throw new CustomError(err.message)
    })

    console.log('Saved user...')

    res.status(201).send(user)
})

export { router as signupRoute }
