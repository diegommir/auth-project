import bcrypt from 'bcrypt'

export default class Password {
    static hashPassword(password: string) {
        return password ? bcrypt.hashSync(password, 10) : password
    }
}
