var express= require('express');
var bodyParser = require('body-parser');
var middleware=require('./middleware');
var server=require('./server');
const { json } = require('body-parser');
var app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const MongoClient=require('mongodb').MongoClient;
const url='mongodb://127.0.0.1:27017';
const databasename='proj1';
const ventname ="ventilators";
const hospitalsc='hospitals';
let db
MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true},(err,client)=>{
    if(err) return console.log(err);
    db=client.db(databasename);
app.get('/hospdata',middleware.checkToken, (req, res) => {
    db.collection(hospitalsc).find().toArray().then(result => res.json(result));
    });
app.get('/ventdata',middleware.checkToken, (req, res) => {
    db.collection(ventname).find().toArray().then(result => res.json(result));
    });
app.post('/hn1',middleware.checkToken, (req, res) => {
    var hon=req.body.hon;
    console.log(hon);
    db.collection(ventname).find({"name":new RegExp(hon,'i')}).toArray().then(result => res.json(result));
    });
app.post('/hn2',middleware.checkToken, (req, res) => {
    var hon=req.body.hon;
    console.log(hon);
    db.collection(hospitalsc).find({"name":new RegExp(hon,'i')}).toArray().then(result => res.json(result));  
    });  
app.post('/Vst',middleware.checkToken, (req, res) => {
    var vs=req.body.vs;
    db.collection(ventname).find({"status":vs}).toArray().then(result => res.json(result));  
    });
app.put('/upd',middleware.checkToken,(req,res)=>{
        db.collection(ventname, function (err, collection) {
        
            collection.update({"ventid":req.body.ventid}, { $set: {"status" : req.body.vs} },
                                                         function(err, result){
                                                                    if(err) throw err;    
                                                                    res.json("updated");
                                                                    console.log('Document Updated Successfully');
                                                            });
            });
        });
app.post('/add',middleware.checkToken,(req,res)=>
    {
        db.collection(ventname,function(err,collection)
        {
            collection.insert({ "hid" :req.body.hid,
            "ventid" : req.body.vid,
            "status" : req.body.vs,
            "name" : req.body.hn})
        });
        res.json("Added");
    });
app.delete('/del',middleware.checkToken,(req,res)=>
{
    db.collection(ventname,function(err,collection)
    {
    collection.remove({"ventid":req.body.vid});
    });
    res.json("deleted");
});

    app.listen(3007);
    


});
