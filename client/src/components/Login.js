import React, { useState } from 'react';
import Axios from 'axios';
import validator from 'validator';
import { Link } from 'react-router-dom';

function Login() {
    var title = 'Purple Front Application';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailErr, setEmailErr] = useState({});
    const [pwdErr, setPwdErr] = useState({});

    const [LoginStatus, setLoginStatus] = useState(''); 

    const onLogin = (e) => {
        e.preventDefault();
        const isValid = loginValidation();
        if (isValid) {
            Axios.post("http://localhost:3001/api/login", {
                email: email,
                password: password,
            }).then((response) => {
                if(response.data.message){
                    setLoginStatus(response.data.message)
                }
                else {
                    //setLoginStatus(response.data[0].name);
                    sessionStorage.setItem('fname', response.data[0].name);
                    sessionStorage.setItem('email', response.data[0].email);
                    sessionStorage.setItem('phnumber', response.data[0].phnumber);
                    window.location.href="#/Dashboard";
                }
            });
        };
    }

    const loginValidation = () => {
        const emailErr = {};
        const pwdErr = {};
        let isValid = true;

        if (!email) {
            emailErr.emailEmpty = "Please enter an e-mail";
            isValid = false;
        }
        else if (!validator.isEmail(email)) {
            emailErr.emailValid = "Please enter the valid e-mail";
            isValid = false;
        }
        if (!password) {
            pwdErr.pwdEmpty = "Please enter your password";
            isValid = false;
        }

        setEmailErr(emailErr);
        setPwdErr(pwdErr);

        return isValid;
    }

    return (
        <div className='container mt-3'>
            <div className='row mt-6'>
                <div className='col-md-4'></div>
                <div className='col-md-4 col-sm-12'>
                    <h2 className='text-center'>{title}</h2>
                    <h5 className='text-center text-danger'>{LoginStatus}</h5>
                    <div>
                        <label>Email-ID or Username:</label>
                        <input id='email' name='email' type='text' className='form-control' onChange={(e) => { setEmail(e.target.value) }} />
                        {Object.keys(emailErr).map((key) => {
                            return <small className="text-danger">{emailErr[key]}</small>
                        })}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input id='password' name='password' type='password' className='form-control' onChange={(e) => { setPassword(e.target.value) }} />
                        {Object.keys(pwdErr).map((key) => {
                            return <small className="text-danger">{pwdErr[key]}</small>
                        })}
                    </div>
                    <br />
                    <button className='btn btn-success form-control' onClick={onLogin}>Login</button>
                </div>
                <div className='col-md-4'>
                    <div className="d-flex flex-row-reverse">
                        <div className="p-2"><Link className="btn btn-primary" to="/SignUp"><i className="fa fa-headset"></i>Sign Up</Link></div>
                        <div className="p-2"><Link className="btn btn-success" to="/Login"><i className="fa fa-user"></i>Login</Link></div>
                        <div className="p-2"><Link className="btn btn-warning" to="/"><i className="fa fa-user"></i>Home</Link></div>
                    </div>
                </div>
                <p className='text-center'>Already Registered, <Link style={{ textDecoration: 'none' }} to="./SignUp">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login;