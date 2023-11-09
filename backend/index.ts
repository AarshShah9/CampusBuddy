import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import {internalIpV4, internalIpV4Sync} from 'internal-ip';

const result = dotenv.config();

const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/Test', (req: Request, res: Response) => {
    console.log("The backend is hit")
    res.json({message: 'Hello World!'});
});

app.listen(port, '192.168.1.72', () => {
    console.log(internalIpV4Sync());
    console.log(`Example app listening at http://192.168.1.72:${port}`);
});