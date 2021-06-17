import Router from 'express'

const router = Router()

router.get('/signout', (req, res) => {
    res.cookie('auth_token', '', {
        httpOnly: true
    })

    return res.sendStatus(204)
})

export { router as signoutRoute }
