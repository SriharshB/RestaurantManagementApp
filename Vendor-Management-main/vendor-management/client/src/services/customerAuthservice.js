export default{
    login : async user=>{
        const res = await fetch('/customer/login', {
            method : "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },

    vlogin : async user=>{
        const res = await fetch('/vendor/login', {
            method : "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },

    register : async user=>{
        const res = await fetch('/customer/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },

    vregister : async user=>{
        const res = await fetch('/vendor/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },

    logout: async ()=> {
        const res = await fetch('/customer/logout');
        const data = await res.json();
        return data;
    },

    vlogout: async ()=> {
        const res = await fetch('/vendor/logout');
        const data = await res.json();
        return data;
    },

    isAuthenticated : async ()=>{   //sync backend and frontend for keeping the user signed in in case app is closed and open again, we will use the context api to call this function
        const res1 = await fetch('/customer/authenticated');
        if (res1.status !== 401)
            return res1.json().then(data => data);
        const res2= await fetch('/vendor/authenticated');
        if (res2.status !== 401)
            return res2.json().then(data => data);
        else
            return { isAuthenticated: false, user: { username: "", email:"", role:""} };
    }
    // },
    // isVAuthenticated : async ()=>{   //sync backend and frontend for keeping the user signed in in case app is closed and open again, we will use the context api to call this function
    //     const res = await fetch('/vendor/authenticated');
    //     if (res.status !== 401)
    //         return res.json().then(data => data);
    //     else
    //         return { isAuthenticated: false, user: { username: "", email:"", role:""} };
    // }
}
