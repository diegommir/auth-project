export default class CustomError extends Error {
    code: number
    errors: Array<Object>

    constructor(message: string, code = 500) {
        super(message)

        this.code = code
        this.errors = []

        Object.setPrototypeOf(this, CustomError.prototype)
    }
}
