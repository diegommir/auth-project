export default class CustomError extends Error {
    code: number

    constructor(message: string, code = 500) {
        super(message)

        this.code = code
    }
}
