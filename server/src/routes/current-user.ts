import Router from 'express'
import jwt from 'jsonwebtoken'
import TokenAdmin from '../utils/TokenAdmin'

const router = Router()

router.get('/current-user', (req, res) => {
    if (req.cookies.auth_token) {
        try {
            const payload = jwt.verify(req.cookies.auth_token, TokenAdmin.getJwtKey())
            return res.status(200).send(payload)
        } catch(err) {
            //Do Nothing
        }
    }

    res.status(200).send({})
})

export { router as currentUserRoute }
