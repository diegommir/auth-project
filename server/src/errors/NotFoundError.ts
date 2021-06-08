import CustomError from "./CustomError";

export default class NotFoundError extends CustomError {
    constructor() {
        super('Path not found', 404)

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}
