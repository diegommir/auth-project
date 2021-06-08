import { Router } from "express";
import { body, validationResult } from 'express-validator'
import ValidationError from "../errors/ValidationError";
import User from "../models/User";

const router = Router()

router.post(
    '/signup', 
    body('given_name').trim().notEmpty().withMessage('Given name is required.'),
    body('family_name').trim().notEmpty().withMessage('Family name is required.'),
    body('email').isEmail().withMessage('Must be a valid email.'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters.'),
    async (req, res) => {
        //Params validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) throw new ValidationError('Invalid data', errors.array())

        const given_name = req.body.given_name
        const family_name = req.body.family_name
        const email = req.body.email
        const password = req.body.password

        const user = new User({
            given_name, family_name, email, password
        })
        await user.save()

        res.status(201).send(user)
    }
)

export { router as signupRoute }
