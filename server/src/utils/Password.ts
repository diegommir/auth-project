import bcrypt from 'bcrypt'

export default class Password {
    static encrypt(password: string) {
        return password ? bcrypt.hashSync(password, 10) : password
    }

    static compare(givenPassword: string, storedPassword: string) {
        return bcrypt.compareSync(givenPassword, storedPassword)
    }
}
