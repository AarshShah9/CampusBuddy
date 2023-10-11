
import express, { Express, Request, Response } from 'express';
// import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
dotenv.config();
const port = 3000;

// app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/Test', (req, res) => {
    console.log("The backend is hit")
    res.json({message: 'Hello World!'});
});

app.listen(port, '192.168.0.163', () => {
    console.log(`Example app listening at http://192.168.0.163:${port}`);
});
