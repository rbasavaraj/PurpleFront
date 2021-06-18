import React from 'react';
import Routing from './Routing'

function Dashboard() {
    if(sessionStorage.getItem('fname')){
        <Dashboard />   
      }
      else{
        <Routing />
      }
    function logout(){
        sessionStorage.clear();
        window.location.href="#/";
    }
    return (
        <div className='container mt-3'>
            <div className='row mt-6'>
                <div className='col-md-4'></div>
                <div className='col-md-4 col-sm-12'>
                    <h2 className='text-center'>Purplefront Application</h2>
                    <h2 className='text-center'>Dashboard</h2>
                    <h5>Name: {sessionStorage.getItem('fname')}</h5>
                    <h5>E-Mail: {sessionStorage.getItem('email')}</h5>
                    <h5>Phone Number: {sessionStorage.getItem('phnumber')}</h5>
                </div>
                <div className='col-md-4'>
                    <div className="d-flex flex-row-reverse">
                        <div className="p-2"><button className="btn btn-primary" onClick={logout}><i className="fa fa-headset"></i>Logout</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;