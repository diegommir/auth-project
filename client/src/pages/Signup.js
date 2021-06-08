import '../css/Signup.css'
import { useState } from 'react'
import axios from 'axios'
import preventDefaultHandler from '../utils/preventDefaultHandler'

const Signup = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('')
    const [ errors, setErrors ] = useState([])

    const signup = async () => {
        const errorList = []

        if (!email) {
            errorList.push('You must type your email')
        }
        if (!password) {
            errorList.push('You must type your password')
        }
        if (password !== passwordConfirmation) {
            errorList.push('Password and confirmation must be the same')
        }

        setErrors(errorList)
        if (errorList.length > 0) {
            return
        }

        try {
            const response = await axios.post(process.env.PUBLIC_URL + '/api/signup', {
                email: email, 
                password: password
            })
            console.log(response)
        } catch(error) {
            console.log(error)
        }
    }

    const renderError = error => {
        return (<li>{error}</li>)
    }

    return (
        <div className="text-center">
            <div id="errors">
                {errors.map(renderError)}
            </div>
            <form className="form-signin" onSubmit={preventDefaultHandler}>
                <img className="mb-3" />
                <h3 className="mb-3">Sign Up</h3>
                <input type="email" id="email" name="email" className="form-control" 
                    onChange={e => setEmail(e.target.value)} value={email} required placeholder="Enter your Email" />
                    <input type="password" id="password" name="password" className="form-control" 
                        onChange={e => setPassword(e.target.value)} value={password} required placeholder="Enter Password" />
                    <input type="password" id="passwordConfirmation" name="passwordConfirmation" className="form-control" 
                        onChange={e => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} required placeholder="Retype Password" />
                <br />
                <button className="btn btn-lg btn-primary btn-block" onClick={signup}>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
