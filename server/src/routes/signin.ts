import Router from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import IncorrectCredentialsError from '../errors/IncorrectCredentialsError'
import Password from '../utils/Password'
import { body, validationResult } from 'express-validator'
import User from '../models/User'
import ValidationError from '../errors/ValidationError'
import TokenAdmin from '../utils/TokenAdmin'

const router = Router()

router.post(
    '/signin', 
    body('email').isEmail().withMessage('Must be a valid email.'),
    body('password').trim().notEmpty().withMessage('Type your password.'),
    async (req, res) => {
        //Params validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) throw new ValidationError('Invalid data', errors.array())

        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({ email })
        if (!user) throw new IncorrectCredentialsError('Invalid user or password.')

        if (Password.compare(password, user.password)) {
            const payload = {
                id: user.id,
                email: user.email,
                given_name: user.given_name,
                family_name: user.family_name,
            }

            const token = jwt.sign(payload, TokenAdmin.getJwtKey(), {
                expiresIn: '10m'
            })

            res.cookie('auth_token', token, {
                httpOnly: true
            })

            return res.sendStatus(204)
        } else {
            throw new IncorrectCredentialsError('Invalid user or password.')
        }
    }
)

export { router as signinRoute }
