const os = require('os');
import dotenv from 'dotenv';

import express, {Request, Response} from 'express';

const result = dotenv.config();
const ip = process.env.IP_ADDRESS ?? 'localhost';


const app = express();
const port = 3000;

d
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/Test', (req: Request, res: Response) => {
    console.log("The backend is hit")
    res.json({message: 'Hello World!'});
});

app.listen(port, ip, () => {
    console.log(`Example app listening at http://${ip}:${port}`);
});
