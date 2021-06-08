import { Router } from "express";
import { body, validationResult } from 'express-validator'
import CustomError from "../errors/CustomError";
import ValidationError from "../errors/ValidationError";
import User from "../models/User";
import Password from "../utils/Password";

const router = Router()

router.post(
    '/signup', 
    body('email').isEmail().withMessage('Must be a valid email.'),
    body('password').isLength({ min: 4, max: 20 }).withMessage('Password must be between 8 and 20 characters.'),
    async (req, res) => {
        //Params validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) throw new ValidationError('Invalid data', errors.array())

        const email = req.body.email
        const password = Password.hashPassword(req.body.password)

        const user = new User({
            email, password
        })
        await user.save()

        res.status(201).send(user)
    }
)

export { router as signupRoute }
