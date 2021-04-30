const express = require("express");
const cors = require('cors');
const MongoClient=require('mongodb').MongoClient;
const url='mongodb://127.0.0.1:27017';
const databasename='proj3';
const product ="product";
const sale='sale';

let db;
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true},(err,client)=>{
        if(err) return console.log(err);
        db=client.db(databasename);
    app.get('/home', (req, res) => {
        db.collection(product).find().toArray().then(result => res.json(result));
        });
    app.get('/sales', (req, res) => {
        db.collection(sale).find().toArray().then(result => res.json(result));
        });
    
    app.post('/editget', (req, res) => {
        var id=req.body.product_id;
        db.collection(product).find({"product_id":id}).toArray().then(result => res.json(result));  
        console.log(req.body)
        });
    app.put('/edit',(req,res)=>{
            db.collection(product, function (err, collection) {
            
                collection.update({"product_id":req.body.product_id}, { $set: {"quantity":req.body.posts.quantity,"cost_price" : req.body.posts.cost_price,"selling_price":req.body.posts.selling_price} },
                                                             function(err, result){
                                                                        if(err) throw err;    
                                                                        res.json("updated");
                                                                        console.log('Document Updated Successfully');
                                                                });
                });
            });
            
    app.post('/add_product',(req,res)=>
        {
           
            db.collection(product,function(err,collection)
            {   
                
                collection.insert({ "product_id" :req.body.product_id,
                "brand" : req.body.brand,
                "category" : req.body.category,
                "name" : req.body.name,
                "size":req.body.size,
                "quantity":req.body.quantity,
                "cost_price":req.body.cost_price,
                "selling_price":req.body.selling_price
            })
            });
            res.json("Added");
            console.log(req.body)
            
        });
        app.post('/update_sales',(req,res)=>
        {
            db.collection(sale,function(err,collection)
            {
                collection.insert({ "purchase_date":req.body.purchase_date,
                "product_id":req.body.product_id,
                "unit_price":req.body.unit_price,
                "quantity":req.body.quantity,
                "total_sales":String(Number(req.body.unit_price)*Number(req.body.quantity))})
            });
            res.json("Added");
        });
    app.delete('/del/:id',(req,res)=>
    {
        db.collection(product,function(err,collection)
        {
        collection.remove({"product_id":req.params.id});
        });
        res.json("deleted");
    });
    
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
      });
    
    
    });
