const API_ENDPOINT = "/vendors"
const axios = require('axios')

const vendors = [
    {
        "_id": {
            "$oid": "621ad4fccb12d77d1c0940b6"
        },
        "cuisines": "All you'll find here is death",
        "name": "Poison",
        "owner": "Garvit",
        "phone": "1234567890",
        "email": "zeher@gmail.com",
        "password": "123456",
        "gst": "asdfsadfas",
        "address": "Hell",
        "rating": 0,
        "orders": [],
        "menu": []
    },

    {
        "_id": {
            "$oid": "621ad4fccb12d77d1c0940b7"
        },
        "cuisines": "This place should not exist",
        "name": "Don't eat Here",
        "owner": "Sauvadip",
        "phone": "1234567890",
        "email": "matkhao@gmail.com",
        "password": "654321",
        "gst": "GST",
        "address": "54 Worst Ever Road, India",
        "rating": -10,
        "orders": [],
        "menu": []
    }
]

export function getVendors() {
    return vendors;
}



