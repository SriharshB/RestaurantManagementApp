import React, {useState,useContext} from 'react';
import AuthService from '../services/customerAuthservice';
import Message from './Message';
import {AuthContext} from '../Context/AuthContext_consumer'
import { Navigate, useNavigate } from 'react-router-dom';

const Vendorlogin = props=>{
    const navigate=useNavigate();
    const [user,setUser] = useState({username: "", password : "",email:"",role:""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.vlogin(user).then(data=>{
            //console.log(data);
            const { isAuthenticated,user,message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);

                navigate('/Dashboard');
            }
            else
                setMessage(message);
        });
    }

    return(
        <div>
            <div className="row justify-content-center">
                <div className="col-md-10 mt-4 text-left">
            <form onSubmit={onSubmit}>
            
                <h2 className="m-3" style={{fontSize:'25px'}}>Vendor Login</h2>
                <input type="text" 
                       name="username" 
                       onChange={onChange} 
                       required
                       className="form-control" 
                       placeholder="Enter the Email Id"/>
                <input type="password" 
                       name="password" 
                       onChange={onChange} 
                       required
                       className="form-control" 
                       placeholder="Enter Password"/>
                <br/>
                <button className="btn btn-primary btn-block" 
                        type="submit">Enter</button>
            <br/>
            <br />
            <a style={{ color: 'black' }} href='/signup' className="mt-2"> New Here? Click here to register</a>
                    <br />
            {message ? <Message message={message} /> : null}
            </form>
        </div>
        </div>
        </div>
    )
}

export default Vendorlogin;