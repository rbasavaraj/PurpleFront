import React from 'react';
import { Link } from 'react-router-dom';

function Routing() {
    var title = 'Purple Front Application';
    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-md-4'>
                </div>
                <div className='col-md-4 col-sm-12'>
                    <h2 className='text-center'>{title}</h2>
                    <h4 className='text-center' style={{ color: 'purple'}}>Welcome to Purple Front</h4>
                </div>
                <div className='col-md-4'>
                    <div className="d-flex flex-row-reverse">
                        <div className="p-2"><Link className="btn btn-primary" to="/SignUp"><i className="fa fa-headset"></i>Sign Up</Link></div>
                        <div className="p-2"><Link className="btn btn-success" to="/Login"><i className="fa fa-user"></i>Login</Link></div>
                        <div className="p-2"><Link className="btn btn-warning" to="/"><i className="fa fa-user"></i>Home</Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Routing;


