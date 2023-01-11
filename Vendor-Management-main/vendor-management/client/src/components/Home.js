import React, {useContext,useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AuthService from '../services/customerAuthservice';
import { AuthContext } from '../Context/AuthContext_consumer';



const Home = props =>{
    const navigate=useNavigate();
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

    const unauthenticatedHome = ()=>{
        return (
            <div style={{padding:200}}>
                <h2 className="m-3" style={{fontSize:'30px', textAlign:'center'}}>Welcome to SmartVMC</h2>
            </div>
        )
    }

    const authenticatedHome = ()=>{
        //console.log(user.email);
        return(
            <div style={{padding:200}}>
                 <h2 className="m-3" style={{fontSize:'30px', textAlign:'center'}}>Welcome {user.email}</h2>
                 <h2 className="m-3" style={{fontSize:'20px', textAlign:'center'}}>Great to see you back!!</h2>
            </div>
        )
    }

    return(
            <div className="home-page">
                    {isAuthenticated ? authenticatedHome() : unauthenticatedHome()}
            </div>
    )
}

export default Home;