import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import CustomError from './errors/CustomError'
import MissingEnvVariablesError from './errors/MissingEnvVariablesError'
import NotFoundError from './errors/NotFoundError'
import { signupRoute } from './routes/signup'
import { loginRoute } from './routes/login'

//Pure javascript to import .env file content to process.env
require('dotenv').config()

const app_path = process.env.APP_PATH
if (!app_path) throw new MissingEnvVariablesError('Must set APP_PATH env variable.')

const app = express()
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//Path to the client interface
app.use(app_path + '/', express.static('public'))

//Path to the app API
app.use(app_path + '/api/', signupRoute)
app.use(app_path + '/api/', loginRoute)

app.all('*', () => {
    throw new NotFoundError()
})

/**
 * Custom error handling.
 * 
 * return A object containing a list of errors. Each error has a 'message', 
 * a 'code' and a [optional] 'field' parameters.
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.code).json({
            message: err.message,
            code: err.code,
            errors: err.errors
        })
    }

    console.error(err)

    res.status(500).send({
        message: 'Something is not right... :('
    })
})

export { app }
