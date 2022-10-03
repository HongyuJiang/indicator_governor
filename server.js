const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

var file = require("./Server/file.js")

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(express.static(__dirname + '/dist'))

app.get('/', function(req, res){
    res.sendFile(__dirname + "/dist/index.html");
});

app.get('/atomic', async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    data = await file.readCsvFile(__dirname + "/Server/dataset/原子指标.csv")
    res.send(data);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});