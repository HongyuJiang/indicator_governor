const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const JSONDB = require('node-json-db')

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

var file = require("./server/file.js")
var db = new JSONDB.JsonDB(new JSONDB.Config("database", true, false, "/"));

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(express.static(__dirname + '/dist'))

app.get('*', function(req, res){
    res.sendFile(__dirname + "/dist/index.html");
});

app.post('/atomic', async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(await db.getData("/index/atomic"));
});

app.post('/dimension', async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(await db.getData("/index/dimensions"));
});

app.post('/attributes', async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(await db.getData("/index/attributes"));
});

app.post('/stat_rules', async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(await db.getData("/index/rules"));
});

app.post('/init', async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var data = await file.readCsvFile(__dirname + "/server/dataset/原子指标.csv")
  await db.push('/index/atomic', data)
  var data2 = await file.readCsvFile(__dirname + "/server/dataset/维度.csv")
  await db.push('/index/dimensions', data2)
  var data3 = await file.readCsvFile(__dirname + "/server/dataset/维度属性.csv")
  await db.push('/index/attributes', data3)
  var data4 = await file.readCsvFile(__dirname + "/server/dataset/统计规则.csv")
  await db.push('/index/rules', data4)
  res.send(await db.getData("/"));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});