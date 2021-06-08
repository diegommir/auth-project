import CustomError from "./CustomError";

export default class ValidationError extends CustomError {
    constructor(message: string, errors: Array<Object>) {
        super(message, 400)

        this.errors = errors

        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}
