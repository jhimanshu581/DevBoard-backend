const express = require('express');
const https = require('https');
const router  = new express.Router();
const axios = require('axios');
var FormData = require('form-data');

router.get('/createRoleService', (req,res)=>{
    var formdata = new FormData();
    formdata.append('SERVICE_ID',req.body.SERVICE_ID);
    formdata.append('name', req.body.name);
    formdata.append('displayName', req.body.displayName);
    formdata.append('description', req.body.description);
    formdata.append('onAccess', req.body.onAccess + '');
    formdata.append('visible', req.body.visible + '');
    formdata.append('type', req.body.type);
    formdata.append('composable',req.body.composable + '');
    formdata.append('bundled', req.body.bundled + '');

    const formDataObj = new HashMap();
      formdata.forEach((value, key) => (formDataObj[key] = value));
      var json = JSON.stringify(formDataObj);
      console.log(json); return 1;

    // axios.post('https://horizon-devfw.svc.eng.vmware.com/job/GroupOnBoarding/buildWithParameters', formdata,
    // { headers: {
    //     'Authorization' : req.headers.authorization
    //     }
    // })
});

module.exports = router;