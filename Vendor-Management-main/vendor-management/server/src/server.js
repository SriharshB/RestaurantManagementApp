const app = require('./app')
const http = require('http');
const { mongoConnect } = require('./services/mongo');
const {getVendors} = require('./models/vendors.model')


const PORT = process.env.PORT || 8000;

const server = http.createServer(app)


async function startServer(){

    await mongoConnect();
    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT} . . .`)
        // console.log(getVendors())
    })
}

startServer()