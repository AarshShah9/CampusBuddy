
import express, { Request, Response, NextFunction } from 'express';

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
app.get('/Test', (req: Request, res: Response) => {
    console.log("The backend is hit")
    res.json({message: 'Hello World!'});
});

app.listen(port, '10.13.178.23', () => {
    console.log(`Example app listening at http://192.168.0.240:${port}`);
});
