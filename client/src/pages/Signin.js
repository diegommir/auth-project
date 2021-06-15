import '../css/Signin.css'
import { useState } from 'react'
import axios from 'axios'
import preventDefaultHandler from '../utils/preventDefaultHandler'
import RenderErrors from '../components/RenderErrors'
import getSearchParam from '../utils/getSearchParam'

const Signin = (props) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errors, setErrors ] = useState([])

    const signin = async () => {
        const errorList = []

        try {
            const response = await axios.post(process.env.PUBLIC_URL + '/api/signin', {
                email, password
            })

            console.log(response)

            let redirect_url = getSearchParam('redirect_url')
            if (redirect_url) {
                window.location.replace(redirect_url)
            } else {
                window.location.reload()
            }
        } catch(error) {
            if (error.response.data.errors.length) {
                error.response.data.errors.forEach(err => {
                    errorList.push(err.msg)
                })
            } else {
                errorList.push(error.response.data.message)
            }
            setErrors(errorList)
        }
    }

    return (
        <div className="text-center">
            <RenderErrors errors={errors} />

            <form onSubmit={preventDefaultHandler}>
                <img className="mb-3" alt="" />
                <h3 className="mb-3">Sign In</h3>
                <input type="email" id="email" name="email" className="form-control" 
                    onChange={e => setEmail(e.target.value)} value={email} placeholder="Enter your Email" />
                <input type="password" id="password" name="password" className="form-control" 
                    onChange={e => setPassword(e.target.value)} value={password} placeholder="Enter your Password" />
                <br />
                <button className="btn btn-lg btn-primary btn-block" onClick={signin}>Signin</button>

                <div className="row">
                    <div className="col-6 mt-3">
                        <a href={process.env.PUBLIC_URL + '/signup' + window.location.search}>Create an Acount?</a>
                    </div>
                    <div className="col-6 mt-3">
                        <a href={process.env.PUBLIC_URL + '/forgot' + window.location.search}>Forgot password?</a>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signin
