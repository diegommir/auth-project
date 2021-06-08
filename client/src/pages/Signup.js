import '../css/Signup.css'
import { useState } from 'react'
import axios from 'axios'
import preventDefaultHandler from '../utils/preventDefaultHandler'
import RenderErrors from '../components/RenderErrors'

const Signup = (props) => {
    const [ given_name, setGivenName ] = useState('')
    const [ family_name, setFamilyName] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ password_confirmation, setPasswordConfirmation ] = useState('')
    const [ errors, setErrors ] = useState([])

    const signup = async () => {
        const errorList = []

        if (!email) {
            errorList.push('You must type your email')
        }
        if (!password) {
            errorList.push('You must type your password')
        }
        if (password !== password_confirmation) {
            errorList.push('Password and confirmation must be the same')
        }

        if (errorList.length > 0) {
            setErrors(errorList)
            return
        }

        console.log('Sending signup post request...')

        try {
            const response = await axios.post(process.env.PUBLIC_URL + '/api/signup', {
                given_name, family_name, email, password
            })
            console.log(response)
            window.location.reload()
        } catch(error) {
            if (error.response.data.errors) {
                error.response.data.errors.forEach(err => {
                    errorList.push(err.msg)
                })
            }
            setErrors(errorList)
        }
    }

    return (
        <div className="text-center">
            <RenderErrors errors={errors} />
            <form className="form-signin" onSubmit={preventDefaultHandler}>
                <img className="mb-3" alt="" />
                <h3 className="mb-3">Sign Up</h3>

                <div className="row">
                    <div className="col-6 pe-0">
                        <input type="text" id="given_name" name="given_name" className="form-control" 
                            onChange={e => setGivenName(e.target.value)} value={given_name} required placeholder="Enter your given name" />
                        </div>
                    <div className="col-6 ps-0">
                        <input type="text" id="family_name" name="family_name" className="form-control" 
                            onChange={e => setFamilyName(e.target.value)} value={family_name} required placeholder="Enter your family name" />
                    </div>
                </div>

                <input type="email" id="email" name="email" className="form-control" 
                    onChange={e => setEmail(e.target.value)} value={email} required placeholder="Enter your Email" />
                <input type="password" id="password" name="password" className="form-control" 
                    onChange={e => setPassword(e.target.value)} value={password} required placeholder="Enter Password" />
                <input type="password" id="passwordConfirmation" name="passwordConfirmation" className="form-control" 
                    onChange={e => setPasswordConfirmation(e.target.value)} value={password_confirmation} required placeholder="Retype Password" />
                <br />
                <button className="btn btn-lg btn-primary btn-block" onClick={signup}>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
