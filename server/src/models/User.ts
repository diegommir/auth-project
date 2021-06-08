import mongoose from "mongoose";
import Password from "../utils/Password";

const userSchema = new mongoose.Schema({
    given_name: String,
    family_name: String,
    email: String,
    password: String
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
})

userSchema.pre('save', function(done) {
    if (this.isModified('password')) {
        this.set('password', Password.hashPassword(this.get('password')))
    }
    done()
})

const User = mongoose.model('User', userSchema)

export default User
