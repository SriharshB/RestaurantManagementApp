export default{
    login : async user=>{
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
        const res = await fetch('/vendor/logout');
        const data = await res.json();
        return data;
    },

    isVAuthenticated : async ()=>{   //sync backend and frontend for keeping the Vuser signed in in case app is closed and open again, we will use the context api to call this function
        const res = await fetch('/vendor/authenticated');
        if (res.status !== 401)
            return res.json().then(data => data);

        else
            return { isAuthenticated: false, user: { username: "", email:"", role:"" }};
    }
}
