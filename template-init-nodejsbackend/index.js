const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  


mongoose.connect('mongodb://localhost:27017/easy-app-demo',(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log('Connect to Mongodb success');
        const app = express();


        app.use(bodyParser.json());


        app.listen(3000,(err)=>{
            if(err){
                console.log();
            }
            else{
                console.log('Server listen on port 3000 ...');
            }
        });
    }
});