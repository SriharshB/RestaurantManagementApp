// import React from 'react'
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
let role="default"

const ChooseUser = () => {
    return (
        <div >
             <h2 className="m-2" style={{fontSize:'25px'}}>Choose User for Registration</h2>

             <a href="/Signup">
                <button className="btn mt-3 m-5" role="student">
                    Customer
                </button>
            </a>


            <a href="/VendorSignup">
            <button className='btn mt-3 m-5' role="vendor">
                  <span> Vendor </span>
            </button>
            </a>

            <br/>
            <a style={{ color: 'black' }} href='/login' className="mt-5 m-5"> Click Here To Login</a> 
        </div>
    )
}


export default ChooseUser;

  {/* <button href='/login' className='btn'>
                  <span>Student </span>
                </button> */}
