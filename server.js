const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const JSONDB = require('node-json-db')
var bodyParser = require('body-parser');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

var file = require("./server/file.js")
var db = new JSONDB.JsonDB(new JSONDB.Config("database", true, false, "/"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(express.static(__dirname + '/dist'))

app.get('*', function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

app.post('/atomic', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(await db.getData("/index/atomic"));
});

app.post('/dimension', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(await db.getData("/index/dimensions"));
});

app.post('/attributes', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(await db.getData("/index/attributes"));
});

app.post('/stat_rules', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(await db.getData("/index/rules"));
});

app.post('/init', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var data = await file.readCsvFile(__dirname + "/server/dataset/原子指标.csv")
  await db.push('/index/atomic', data)
  //var data2 = await file.readCsvFile(__dirname + "/server/dataset/维度.csv")
  await db.push('/index/dimensions', bigdata)
  // var data3 = await file.readCsvFile(__dirname + "/server/dataset/维度属性.csv")
  // await db.push('/index/attributes', data3)
  var data4 = await file.readCsvFile(__dirname + "/server/dataset/统计规则.csv")
  await db.push('/index/rules', data4)
  res.send(await db.getData("/"));
});

app.post('/overview', async function (req, res) {
  res.send(await db.getData("/"));
});

app.post('/add_atomic', async function (req, res) {
  await db.push('/index/atomic[]', req.body)
  res.end();
});

app.post('/delete_atomic', async function (req, res) {
  const name = req.body.name
  const index = await db.getIndex("/index/atomic", name, "指标名称");
  await db.delete(`/index/atomic[${index}]`)
  res.end();
});

app.post('/update_atomic', async function (req, res) {
  const name = req.body.name
  const index = await db.getIndex("/index/atomic", name, "指标名称");
  const data = req.body.data
  await db.push(`/index/atomic[${index}]`, data)
  res.end();
});

app.post('/add_dimension', async function (req, res) {
  await db.push('/index/dimensions[]', req.body)
  res.end();
});

app.post('/update_dimension', async function (req, res) {
  const name = req.body.name
  const index = await db.getIndex("/index/dimensions", name, "维度");
  const data = req.body.data
  await db.push(`/index/dimensions[${index}]`, data)
  res.end();
});

app.post('/delete_dimension', async function (req, res) {
  const name = req.body.name
  const index = await db.getIndex("/index/dimensions", name, "维度");
  await db.delete(`/index/dimensions[${index}]`)
  res.end();
});

app.listen(8521, '0.0.0.0', function () {
  console.log('Example app listening\n');
});