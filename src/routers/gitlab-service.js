const express = require('express');
const https = require('https');
const router  = new express.Router();
const axios = require('axios');

router.get('/createGitlabGroup', (req,res)=>{
    axios.post('https://gitlab.eng.vmware.com/api/v4/groups/',{
        name: req.body.name,
        path: req.body.path
    }, { headers: {
            'PRIVATE-TOKEN': req.headers.PRIVATE-TOKEN
        }
    })
});

router.get('/addBotAsMemberToGroup', (req,res)=>{
    axios.post('https://gitlab.eng.vmware.com/api/v4/groups/{group-id}/members'.replace('{group-id}',req.body.groupId+''),{
        access_level: 50,
        user_id: 11704
    }, { headers: {
            'PRIVATE-TOKEN': req.headers.PRIVATE-TOKEN
        }
    })
});

router.get('/getAllGroups', (req,res)=>{
    var groups = new Map();
    var response = axios.get("https://gitlab.eng.vmware.com/api/v4/groups?owned=true",{ 
        headers: {
            'PRIVATE-TOKEN': req.headers.PRIVATE-TOKEN
        }
    });
    response.subscribe(function (data) {
        for (var d in data) {
            groups.set(JSON.parse(JSON.stringify(data))[d]['full_path'], JSON.parse(JSON.stringify(data))[d]['id']);
        }
    });
    return groups;
});

router.get('/getAllProjectsOfParticularGroup', (req,res)=>{
    var projects = new Map();

    var response = axios.get("https://gitlab.eng.vmware.com/api/v4/groups/{group-id}/projects".replace("{group-id}",req.body.groudId),{ 
        headers: {
            'PRIVATE-TOKEN': req.headers.PRIVATE-TOKEN
        }
    });
    response.subscribe(function (data) {
        for (var d in data) {
            projects.set(JSON.parse(JSON.stringify(data))[d]['path'], JSON.parse(JSON.stringify(data))[d]['id']);
        }
    });
    return response;
});

router.get('/getDependencies', (req,res)=>{
    var dependencies = new Array();

    var response = axios.get("https://gitlab.eng.vmware.com/api/v4/projects/{project-id}/repository/tree".replace("{project-id}",req.body.projectId),{ 
        headers: {
            'PRIVATE-TOKEN': req.headers.PRIVATE-TOKEN
        }
    }).subscribe(function (data) {
        for (var d in data) {
            dependencies.push(JSON.parse(JSON.stringify(data))[d]['path']);
        }
    });
    return dependencies;
});

module.exports = router;  