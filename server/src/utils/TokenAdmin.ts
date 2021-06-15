import MissingEnvVariablesError from "../errors/MissingEnvVariablesError"

export default class TokenAdmin {
    static getJwtKey() {
        if (!process.env.JWT_KEY) throw new MissingEnvVariablesError('Must set JWT_KEY env variable.')
        return process.env.JWT_KEY
    }
}
