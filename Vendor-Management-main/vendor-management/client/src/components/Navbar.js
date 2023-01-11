import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AuthService from '../services/customerAuthservice';
import { AuthContext } from '../Context/AuthContext_consumer';

const Navbar = props =>{
    const navigate=useNavigate();
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    // console.log(user);
    //Customer Logout handler
    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
                navigate('/');
            }
        });
    }

    // Vendor logout handler
    const onClickLogoutHandler2 = ()=>{
        AuthService.vlogout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
                navigate('/');
            }
        });
    }

    const unauthenticatedNavBar = ()=>{
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>

                <Link to="/vendors">
                    <li className="nav-item nav-link">
                        Food Outlets
                    </li>
                </Link>

                <Link to="/Login">
                    <li className="nav-item nav-link">
                        Login
                    </li>
                </Link>  
                <Link to="/ChooseUser">
                    <li className="nav-item nav-link">
                        Register
                    </li>
                </Link>  

                <Link to="/Contact">
                    <li className="nav-item nav-link">
                        Contact Us
                    </li>
                </Link>
            </>
        )
    }

    const authenticatedNavBar = ()=>{
        return(
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link> 
                <Link to="/Cart">
                    <li className="nav-item nav-link">
                        Cart
                    </li>
                </Link>
                <Link to="/Orders">
                    <li className="nav-item nav-link">
                        Orders
                    </li>
                </Link>
                <Link to="/Vendors">
                    <li className="nav-item nav-link">
                    Food Outlets
                    </li>
                </Link>      
                <btn1 type="button" 
                        className="btn btn-link nav-item nav-link" 
                        onClick={onClickLogoutHandler}>Logout</btn1>
            </>
        )
    }

    const vendorauthenticatedNavBar = ()=>{
        return(
            <>
                <Link to="/Dashboard">
                    <li className="nav-item nav-link">
                        Dashboard
                    </li>
                </Link>
                <Link to="/Menu">
                    <li className="nav-item nav-link">
                        Menu
                    </li>
                </Link>
                <Link to="/menu/add">
                    <li className="nav-item nav-link">
                        Add Item to Menu
                    </li>
                </Link>
                <Link to="/VendorOrders">
                    <li className="nav-item nav-link">
                        Orders
                    </li>
                </Link>
                <btn1 type="button" 
                        className="btn btn-link nav-item nav-link" 
                        onClick={onClickLogoutHandler2}>Logout</btn1>
            </>
        )
    }

    return(
        <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
            <Link to="/">
                <div className="navbar-brand">SmartVMC</div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav ms-auto">
                    {
                       !isAuthenticated ? unauthenticatedNavBar() : !(user.role ==="vendor")? authenticatedNavBar():vendorauthenticatedNavBar() }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
