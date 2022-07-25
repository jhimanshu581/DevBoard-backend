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

    addCommand = '';
    if(req.body.kafka==true){
        addCommand += 'XCOPY "C:\\Angular\\DevBoard\\Git Workspace\\kafka\\" "C:\\Angular\\DevBoard\\temp\\common-services" /E'+" & ";
    }
    if(req.body.redis==true){
        addCommand += 'XCOPY "C:\\Angular\\DevBoard\\Git Workspace\\redis\\" "C:\\Angular\\DevBoard\\temp\\common-services" /E'+" & ";
    }
    if(req.body.mongodb==true){
        addCommand += 'XCOPY "C:\\Angular\\DevBoard\\Git Workspace\\mongodb\\" "C:\\Angular\\DevBoard\\temp\\common-services" /E'+" & ";
    }
    if(req.body.commonServicesExist==false){
        addCommand += 'XCOPY "C:\\Angular\\DevBoard\\Git Workspace\\group-config\\" "C:\\Angular\\DevBoard\\temp\\common-services" /E'+" & ";
    }
    addCommand = addCommand.trim().substring(0,addCommand.length-2);
    command = command.replaceAll("<Add Folders>",addCommand);

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