const express = require('express');
const https = require('https');
const router  = new express.Router();
const axios = require('axios');
var FormData = require('form-data');

router.post('/onBoardingGroup', (req,res)=>{
    var formdata = new FormData();
    formdata.append('GITLAB_GROUP',req.body.GITLAB_GROUP);
    formdata.append('redis',req.body.redis);
    formdata.append('kafka',req.body.kafka);
    formdata.append('mongodb',req.body.mongodb);
    axios.post('https://horizon-devfw.svc.eng.vmware.com/job/GroupOnBoarding/buildWithParameters', formdata,
    { headers: {
        'Authorization' : req.headers.authorization
        }
    })
});

router.post('/onBoardingService', (req,res)=>{
    var formdata = new FormData();
    formdata.append('GITLAB_GROUP',req.body.GITLAB_GROUP);
    formdata.append('PROJECT_NAME',req.body.PROJECT_NAME);
    formdata.append('JAVA_PACKAGE',req.body.JAVA_PACKAGE);
    formdata.append('ARCHETYPE_TYPE',req.body.ARCHETYPE_TYPE);

    axios.post('https://horizon-devfw.svc.eng.vmware.com/job/ServiceOnBoarding/buildWithParameters', formdata,
    { headers: {
        'Authorization' : req.headers.authorization
        }
    })
});

router.get('/getAllBuilds', (req,res)=>{
    axios.get("https://horizon-devfw.svc.eng.vmware.com/job/{job-name}/api/json?tree=builds[name,result,url,timestamp,id]".replace("{job-name}",req.body.jobName))
});

router.get('/getConsoleOutput', (req,res)=>{
    var url = "https://horizon-devfw.svc.eng.vmware.com/job/{job-name}/{build-id}/logText/progressiveText"
    url = url.replace("{job-name}",req.body.jobName);
    url = url.replace("{build-id}",req.body.buildId);
    axios.get(url,{responseType: 'text'})
});

module.exports = router;