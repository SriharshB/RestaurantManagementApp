import React, {useContext} from 'react';
import {Route, Navigate,Outlet} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext_consumer';

const PrivateRoute=()=>{
     const { isAuthenticated, user} = useContext(AuthContext);
     return( isAuthenticated? <Outlet/>:<Navigate to="/login"/>)
}
export default PrivateRoute;
