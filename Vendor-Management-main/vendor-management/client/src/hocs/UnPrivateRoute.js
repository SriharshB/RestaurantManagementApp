import React, {useContext} from 'react';
import {Route, Navigate,Outlet} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext_consumer';

const UnPrivateRoute=()=>{
     const { isAuthenticated} = useContext(AuthContext);
     return( isAuthenticated? <Navigate to="/"/>:<Outlet/>);
}
export default UnPrivateRoute;
