import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Cards from './dbCards.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
const pass = process.env.DB_PASS;
const dbname = process.env.DB_NAME;
const connection_url = 'mongodb+srv://Jatin11499:'+pass+'@cluster0.masoc.mongodb.net/'+dbname+'?retryWrites=true&w=majority';

app.use(express.json());
app.use(Cors());

mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.get("/", (req,res) => {
    res.status(200).send("Hello World!");
});

app.post("/tinder/card", (req,res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get("/tinder/card", (req,res) => {
    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.listen(port,() => {
    console.log(`listening on localhost:${port}`);
});