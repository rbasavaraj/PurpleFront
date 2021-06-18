import React, { useState } from 'react';
import Axios from 'axios';
import validator from 'validator';
import { Link } from 'react-router-dom';

function Registration() {
    var title = 'Purple Front Application';

    const [fname, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [phnumber, setPhnumber] = useState('');

    const [fnameErr, setNameErr] = useState({});
    const [emailErr, setEmailErr] = useState({});
    const [pwdErr, setPwdErr] = useState({});
    const [cpwdErr, setCPwdErr] = useState({});
    const [phnumErr, setPhNumErr] = useState({});

    function isDigit(event) {
        var x = event.charCode;
        if (!(x >= 48 && x <= 57)) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();

        if (isValid) {
            Axios.post("http://localhost:3001/api/register", {
                fname: fname,
                email: email,
                password: password,
                phnumber: phnumber,
            }).then(response => {
                alert("Successful Registration");
                window.location.href = "#/";
            });
        }
    }

    const formValidation = () => {
        const fnameErr = {};
        const phnumErr = {};
        const emailErr = {};
        const pwdErr = {};
        const cpwdErr = {};
        let isValid = true;

        if (!fname) {
            fnameErr.fnameEmpty = "Please enter your Name";
            isValid = false;
        }
        else if (fname.length < 3) {
            fnameErr.fnameShort = "Name is too short, Please enter your Name";
            isValid = false;
        }

        if (!phnumber) {
            phnumErr.phnumEmpty = "Please enter a valid 10 digit Mobile number";
            isValid = false;
        }
        else if (phnumber.length < 10) {
            phnumErr.phnumShort = "Please enter a valid 10 digit Mobile number";
            isValid = false;
        }

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
        else if (!validator.isStrongPassword(password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            pwdErr.pwdStrong = "Please use atleast one Uppercase, one Lowercase, one number and one special character in the password and minimum length should be 8";
            isValid = false;
        }

        if (!cpassword) {
            cpwdErr.cpwdEmpty = "Please enter your password to confirm";
            isValid = false;
        }
        else if (password !== cpassword) {
            cpwdErr.cpwdConfirm = "Please re-enter your password";
            isValid = false;
        }

        setNameErr(fnameErr);
        setPhNumErr(phnumErr);
        setEmailErr(emailErr);
        setPwdErr(pwdErr);
        setCPwdErr(cpwdErr);

        return isValid;
    }

    return (
        <div className='container mt-3'>
            <form onSubmit={onSubmit}>
                <div className='row mt-6'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4 col-sm-12'>
                        <h2 className='text-center'>{title}</h2>
                        
                        <div>
                            <label>Name:</label>
                            <input id='name' name='name' type='text' className='form-control' onChange={(e) => { setName(e.target.value) }} />
                            {Object.keys(fnameErr).map((key) => {
                                return <small className="text-danger">{fnameErr[key]}</small>
                            })}
                        </div>
                        <div>
                            <label>Email:</label>
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
                        <div>
                            <label>Confirm Password:</label>
                            <input id='cpassword' name='cpassword' type='password' className='form-control' onChange={(e) => { setCPassword(e.target.value) }} />
                            {Object.keys(cpwdErr).map((key) => {
                                return <small className="text-danger">{cpwdErr[key]}</small>
                            })}
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input id='phnumber' name='phnumber' type='text' label='Phone Number:' className='form-control' maxLength='10' onKeyPress={(e) => { isDigit(e) }} onChange={(e) => { setPhnumber(e.target.value) }} />
                            {Object.keys(phnumErr).map((key) => {
                                return <small className="text-danger">{phnumErr[key]}</small>
                            })}
                        </div>
                        <br />
                        <button className='btn btn-primary form-control'>Sign Up</button>
                        <p className='text-center'>Already Registered, <Link style={{ textDecoration: 'none' }} to="./Login">Login</Link></p>
                    </div>
                    <div className='col-md-4'>
                    <div className="d-flex flex-row-reverse">
                            <div className="p-2"><Link className="btn btn-primary" to="/SignUp"><i className="fa fa-headset"></i>Sign Up</Link></div>
                            <div className="p-2"><Link className="btn btn-success" to="/Login"><i className="fa fa-user"></i>Login</Link></div>
                            <div className="p-2"><Link className="btn btn-warning" to="/"><i className="fa fa-user"></i>Home</Link></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Registration;