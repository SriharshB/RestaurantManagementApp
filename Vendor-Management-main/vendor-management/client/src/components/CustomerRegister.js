import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../services/customerAuthservice';
import Message from './Message';
import { useNavigate, Link } from 'react-router-dom';
import styles from './styles.module.css'
// import {AuthContext} from '../Context/AuthContext_consumer';


export default function Register(){
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", password: "", role: "customer", phoneNo: "", email: "", address: "",cart: {items: [], vendorID: ""}, orderList: [] });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const resetForm = () => {
        setUser({ username: "", password: "", role: "customer", phoneNo: "", email: "", address: "", cart: {items: [], vendorID: ""}});
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) { // if any error show the message to the user for 2seconds and then redirect to login page
                timerID = setTimeout(() => {
                    navigate('/login');
                }, 2000)
            }
        });
    }

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-10 mt-5 text-left">
                    <form onSubmit={onSubmit}>
                        <h2 className="m-2" style={{fontSize:'25px'}}>Customer Registeration</h2>
                        
                        <input type="text"
                            name="email"
                            value={user.email}
                            onChange={onChange}
                            required
                            className="form-control"
                            placeholder="Enter your full name" />
                        
                        <input type="text"
                            name="username"
                            value={user.username}
                            onChange={onChange}
                            required
                            className="form-control"
                            placeholder="Enter your Email id " />
                            
                        <input type="password"
                            name="password"
                            value={user.password}
                            onChange={onChange}
                            required
                            className="form-control"
                            placeholder="Enter Password" />
                        <input type="number"
                            name="phoneNo"
                            value={user.phoneNo}
                            onChange={onChange}
                            required
                            className="form-control"
                            placeholder="Enter Phone Number"/>
                        <input type="text"
                            name="address"
                            value={user.address}
                            onChange={onChange}
                            required
                            className="form-control"
                            placeholder="Enter the permanent address" />
                        <button className="btn mt-3"
                            type="submit">Register</button>
                        <br />
                    </form>
                    <br/>
                    <a style={{ color: 'black' }} href='/login' className="mt-2"> Click Here To Login</a>
                    <br />
                    {message ? <Message message={message} /> : null}
                </div>
            </div>
        </div>
    )
}