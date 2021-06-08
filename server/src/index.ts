import mongoose from 'mongoose'
import { app } from './app'
import MissingEnvVariablesError from './errors/MissingEnvVariablesError'

const start = async () => {
    if (!process.env.MONGO_URI) throw new MissingEnvVariablesError('Must set MONGO_URI env variable.')

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connected to MongoDB.')

        const port = process.env.PORT ? process.env.PORT : 3000
        app.listen(port, () => {
            console.log(`Express listening on port ${port}`)
        })
    } catch(err) {
        console.error(err)
    }
}
start()
