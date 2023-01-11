const express = require('express')

const {
    HttpGetAllVendors, HttpGetVendorByID
} = require('./vendors.controller');

const vendorsRouter = express.Router();


vendorsRouter.get('/', HttpGetAllVendors);
vendorsRouter.get('/:id', HttpGetVendorByID)


module.exports = vendorsRouter;