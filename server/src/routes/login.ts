import Router from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import IncorrectCredentialsError from '../errors/IncorrectCredentialsError'
import Password from '../utils/Password'

const router = Router()

router.post('/login', (req, res) => {
    //Is coming from db
    const email = 'test@test.com'
    const password = Password.hashPassword('pass')
    const key = crypto.randomBytes(64).toString('base64')

    if (req.body.email === email && bcrypt.compareSync(req.body.password, password)) {
        const payload = {
            given_name: 'Diego',
            family_name: 'Miranda',
            email: 'test@test.com',
        }

        const token = jwt.sign(payload, key, {
            expiresIn: '10m'
        })

        res.cookie('auth_token', token, {
            httpOnly: true
        })

        return res.sendStatus(204)
    } else {
        throw new IncorrectCredentialsError('Usuário ou senha incorretos.')
    }
})

export { router as loginRoute }
