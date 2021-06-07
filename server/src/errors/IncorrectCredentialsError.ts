import CustomError from "./CustomError";

export default class IncorrectCredentialsError extends CustomError {
    constructor(message: string) {
        super(message, 404)
    }
}
