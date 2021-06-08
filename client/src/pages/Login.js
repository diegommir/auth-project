import '../css/Login.css'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const login = async () => {
        if (!email) return
        if (!password) return

        try {
            const response = await axios.post('/auth/api/login', {
                email, password
            })
            console.log(response)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="text-center">
            <form className="form-signin">
                <img className="mb-3" alt="" />
                <h3 className="mb-3">Login</h3>
                <input type="email" id="email" name="email" className="form-control" 
                    onChange={e => setEmail(e.target.value)} value={email} required placeholder="Enter your Email" />
                <input type="password" id="password" name="password" className="form-control" 
                    onChange={e => setPassword(e.target.value)} value={password} required placeholder="Enter your Password" />
                <div className="m-3">
                    <input type="checkbox" value="remember" /> Remember Me
                </div>
                <button className="btn btn-lg btn-primary btn-block" onClick={login}>Login</button>
            </form>
        </div>
    )
}

export default Login
