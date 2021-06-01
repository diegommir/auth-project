import Router from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import IncorrectCredentials from '../errors/IncorrectCredentialsError'
import IncorrectCredentialsError from '../errors/IncorrectCredentialsError'

const router = Router()

router.post('/login', (req, res) => {
    //Is coming from db
    const email = 'test@test.com'
    const password = bcrypt.hashSync('pass', 10)
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

        return res.sendStatus(200)
    } else {
        throw new IncorrectCredentialsError('Usuário ou senha incorretos.')
    }

    res.sendStatus(401)
})

export { router as loginRoute }
