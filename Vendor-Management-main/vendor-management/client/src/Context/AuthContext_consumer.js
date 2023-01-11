import React, {createContext,useState,useEffect} from 'react';
import AuthService from '../services/customerAuthservice';

export const AuthContext = createContext();

export default ({ children })=>{
    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
       // if(user.role==="customer")
        AuthService.isAuthenticated().then(data =>{
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
        // ---------Garvit Look at this once-----------------
        //else if(user.role==="vendor")
        // AuthService.isVAuthenticated().then(data =>{
        //     setUser(data.user);
        //     setIsAuthenticated(data.isAuthenticated);
        //     setIsLoaded(true);
        // });
    },[]);

    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> : 
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
}