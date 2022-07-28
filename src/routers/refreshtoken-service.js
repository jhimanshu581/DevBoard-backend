const express = require('express');
const https = require('https');
const router  = new express.Router();
const axios = require('axios');
var FormData = require('form-data');

router.post('/generateToken', (req,res)=>{
    var formdata = new FormData();
        formdata.append('refresh_token',req.body.refresh_token);
         console.log(refreshToken);
    axios.post('https://console-stg.cloud.vmware.com/csp/gateway/am/api/auth/api-tokens/authorize', formdata)
});

module.exports = router;