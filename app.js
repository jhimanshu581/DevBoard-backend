const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const infraDependencyRouter = require('./src/routers/infra-dependency');
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  
app.use(bodyParser.json())

app.use(infraDependencyRouter);

var server = app.listen(port, function () {
})