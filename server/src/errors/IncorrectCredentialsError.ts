import CustomError from "./CustomError";

export default class IncorrectCredentialsError extends CustomError {
    constructor(message: string) {
        super(message, 404)

        Object.setPrototypeOf(this, IncorrectCredentialsError.prototype)
    }
}
