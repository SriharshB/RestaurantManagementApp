import {useCallback, useEffect, useState} from "react"

import { httpGetVendors } from "./requests"

function useVendors(){

    const [vendors, saveVendors] = useState([])
    const getVendors = useCallback(async() => {
        const fetchedVendors = await httpGetVendors();
        saveVendors(fetchedVendors)

    }, []);

    useEffect(() => {
        getVendors();
    }, [getVendors])

    return vendors;
}

export default useVendors;