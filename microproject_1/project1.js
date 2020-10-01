var express= require('express');
var bodyParser = require('body-parser');
var middleware=require('./middleware');
var server=require('./server');
var app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const MongoClient=require('mongodb').MongoClient;
const url='mongodb://127.0.0.1:27017';
const databasename='proj1';
const ventname ="ventilators";
const hospitalsc='hospitals';
let db
MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true},(err,client)=>{
    if(err) return console.log(err);
    db=client.db(databasename);
app.get('/hospitaldetails',middleware.checkToken, (req, res) => {
    var hospitaldetails=db.collection(hospitalsc).find().toArray().then(result => res.json(result));
    });
app.get('/ventilatordetails',middleware.checkToken, (req, res) => {
    var ventilatordetails=db.collection(ventname).find().toArray().then(result => res.json(result));
    });
app.post('/hospitalname1',middleware.checkToken, (req, res) => {
    var hon=req.body.hon;
    var vs=req.body.vs;
    console.log(hon);
    var ventilatordetails=db.collection(ventname).find({"name":new RegExp(hon,'i')}).toArray().then(result => res.json(result));
    });
    app.post('/hospitalname2',middleware.checkToken, (req, res) => {
        var hon=req.body.hon;
        console.log(hon);
        var ventilatordetails=db.collection(hospitalsc).find({"name":new RegExp(hon,'i')}).toArray().then(result => res.json(result));  
        });  
app.post('/status',middleware.checkToken, (req, res) => {
    var vs=req.body.vs;
    var ventilatorstatus=db.collection(ventname).find({"status":vs}).toArray().then(result => res.json(result));  
    });
       app.put('/update',middleware.checkToken,(req,res)=>{
        db.collection(ventname, function (err, collection) {
        
            collection.update({"ventid":req.body.ventid}, { $set: {"status" : req.body.vs} },
                                                         function(err, result){
                                                                    if(err) throw err;    
                                                                    console.log('Document Updated Successfully');
                                                            });
            });
        });
        app.post('/add',middleware.checkToken,(req,res)=>
        {
            db.collection(ventname,function(err,collection)
            {
                collection.insert({ "hid" :req.body.nid,
                "ventid" : req.body.nvid,
                "status" : req.body.ns,
                "name" : req.body.nn})
            });
        });
        app.delete('/remove',middleware.checkToken,(req,res)=>
        {
            db.collection(ventname,function(err,collection)
            {
                collection.remove({"ventilatorId":req.body.ventid});
            });
        });

    app.listen(3006);
    


});