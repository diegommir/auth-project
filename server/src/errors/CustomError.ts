export default class CustomError extends Error {
    code: number

    constructor(message: string) {
        super(message)

        this.code = 500
    }
}
