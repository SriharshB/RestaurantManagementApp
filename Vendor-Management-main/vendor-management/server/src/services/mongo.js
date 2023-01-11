const mongoose = require('mongoose')

const MONGO_URL = "mongodb+srv://group_5:group_5@bits-cluster-se.5gpxx.mongodb.net/vendorManagement?retryWrites=true&w=majority";

mongoose.connection.once('open', () => {

    console.log("MongoDB Connected!");
})

mongoose.connection.on('error', (err) => {

    console.error(err);
})

async function mongoConnect() {

    await mongoose.connect(MONGO_URL, {

        useNewUrlParser: true,
        useUnifiedTopology: true
    })
};


async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}