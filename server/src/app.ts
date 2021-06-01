import express, { Request, Response } from 'express'
import CustomError from './errors/CustomError'
import MissingEnvVariablesError from './errors/MissingEnvVariablesError'
import { loginRoute } from './routes/login'

//Pure javascript to import .env file content to process.env
require('dotenv').config()

const app_path = process.env.APP_PATH

if (!app_path) throw new MissingEnvVariablesError('Must set APP_PATH env variable.')

const app = express()
app.use(express.urlencoded({ extended: true}))

//Path to the client interface
app.use(app_path + '/', express.static('public'))

//Path to the app API
app.use(app_path + '/api/', loginRoute)

/**
 * Custom error handling.
 * 
 * return A object containing a list of errors. Each error has a 'message', 
 * a 'code' and a [optional] 'field' parameters.
 */
app.use((err: CustomError, req: Request, res: Response, next: any) => {
    res.status(err.code).json({
        errors: [
            {
                message: err.message,
                code: err.code
            }
        ]
    })
})

const port = process.env.PORT ? process.env.PORT : 3000
app.listen(port, () => {
    console.log(`Express listening on port ${port}`)
})
