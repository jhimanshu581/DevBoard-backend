const express = require('express');
const fs = require('fs');
const https = require('https');
const { exec } = require("child_process");
const router  = new express.Router();

router.post("/infra-dependency",(req,res)=>{
    console.log(req.body);
    let command = '';
    const fileContent = fs.readFileSync('./git-scripts/CSexist.txt', 'utf-8');
    fileContent.split(/\r?\n/).forEach(line =>  {
    command += line + " & ";
    });
    command = command.trim().substring(0,command.length-2);
    command = command.replaceAll("<personal-token>",req.header("PRIVATE-TOKEN"));
    command = command.replaceAll("<group-name>",req.body.groupName);

    removeCommand = '';
    if(req.body.kafka==false){
        removeCommand += "RMDIR /S /Q kafka"+" & ";
    }
    if(req.body.redis==false){
        removeCommand += "RMDIR /S /Q redis"+" & ";
    }
    if(req.body.mongodb==false){
        removeCommand += "RMDIR /S /Q mongodb"+" & ";
    }
    if(req.body.commonServicesExist==true){
        removeCommand += "RMDIR /S /Q group-config"+" & ";
    }
    removeCommand = removeCommand.trim().substring(0,removeCommand.length-2);
    command = command.replaceAll("<Remove Folders>",removeCommand);

    console.log(command);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.send(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.send("Successful");
    });
})

module.exports = router;   