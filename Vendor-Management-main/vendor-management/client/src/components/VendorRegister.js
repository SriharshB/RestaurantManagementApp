/* TODO
0) Think about register in Navbar, How will that look better opt1) Direct User Register Page/ Choose user page
1) add ratings to the vendors model
2) add the vendorAuthservice
3) change user in the line 23 here, also make default cart, ratings, menu and orderlist
4) Make the Vendor login page
5) Add the role feature to render different Navbars, Home Pages
6) Add the Vendor user in Vendor database

*/

/*
username----------will have the email of the resteraunt 
outletName
ownerName
phoneNo
password
gstNo
address
rating
orderList
menu

    menu:{
        type:[Object],
        default:[],
        required:false
    },
*/
import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../services/customerAuthservice';
import Message from './Message';
import { useNavigate, Link } from 'react-router-dom';
import styles from './styles.module.css'
// import {AuthContext} from '../Context/AuthContext_consumer';


export default function Register(){
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", password: "", role:"vendor", phoneNo: "", email: "",gstNo:"", address: "",rating:"", orderList: [Object], menu:[{}]});

    //username: "", password: "", phoneNo: "", outletName: "", ownerName:"", address: "", cart: {items: [], vendorID: ""}});
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
        setUser({ username: "", password: "",role:"vendor", phoneNo: "", outletName: "", email: "",gstNo:"", address: "",rating:"",menu:[{}] });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.vregister(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) { // if any error show the message to the user for 2seconds and then redirect to login page
                timerID = setTimeout(() => {
                    navigate('/Vendorlogin');
                }, 2000)
            }
        });
    }

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-10 mt-3 text-left">
                    <form onSubmit={onSubmit}>
                        <h2 className="m-2" style={{fontSize:'25px'}}>Vendor Registeration</h2>
                        
                        <input type="text"
                            name="outletName"
                            value={user.outletName}
                            onChange={onChange}
                            required
                            className="form-control"
                            placeholder="Enter the name of the Resteraunt" />

                            <input type="text"
                            name="email"
                            value={user.email}
                            onChange={onChange}
                            required
                            className="form-control"
                            placeholder="Enter owner's name"/>     
                        
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
                            placeholder="Enter the Contact Number"/>

                        <input type="text"
                            name="address"
                            value={user.address}
                            onChange={onChange}
                            required
                            className="form-control"
                            placeholder="Enter the Resteraunt Address" />

                         <input type="text"
                            name="gstNo"
                            value={user.gstNo}
                            onChange={onChange}
                            required
                            className="form-control"
                            placeholder="Enter the GST registration number" />

                        <button className="btn mt-3"
                            type="submit">Register</button>
                        <br />
                    </form>
                    <br/>
                    <a style={{ color: 'black' }} href='/Vendorlogin' className="mt-2"> Click Here To Login</a>
                    <br />
                    {message ? <Message message={message} /> : null}
                </div>
            </div>
        </div>
    )
}