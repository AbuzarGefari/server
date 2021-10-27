const express = require('express');
const cors=require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7poyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
    //   console.log('conncet')
      const database = client.db("MecanicInfo");
      const servicesCollection = database.collection("services");

    //   POST API
    app.post('/services',async(req,res)=>{
        const service=req.body;
        console.log('Hit the post api',service);
        const result=await servicesCollection.insertOne(service)
        console.log(result)
        res.send(result)

    });
 
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('My CURD server')
});

app.listen(port,()=>{
    console.log('server running',port)
});