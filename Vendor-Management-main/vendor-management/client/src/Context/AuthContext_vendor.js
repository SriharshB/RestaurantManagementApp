import React, {createContext,useState,useEffect} from 'react';
import VendorAuthService from '../services/vendorAuthservice';

export const VendorAuthContext = createContext();

export default ({ children })=>{
    const [Vuser,setVUser] = useState(null);
    const [isVAuthenticated,setIsVAuthenticated] = useState(false);
    const [isVLoaded,setIsVLoaded] = useState(false);

    useEffect(()=>{
        VendorAuthService.isVAuthenticated().then(data =>{
            setVUser(data.Vuser);
            setIsVAuthenticated(data.isVAuthenticated);
            setIsVLoaded(true);
        });
    },[]);

    return (
        <div>
            {!isVLoaded ? <h1>Loading</h1> : 
            <VendorAuthContext.Provider value={{Vuser,setVUser,isVAuthenticated,setIsVAuthenticated}}>
                { children }
            </VendorAuthContext.Provider>}
        </div>
    )
}