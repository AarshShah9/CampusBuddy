import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

const app = express();
const result = dotenv.config();

const port = 3000;
const ip = process.env.IP_ADDRESS ?? 'localhost';

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// route requires
const user = require('./routes/student.routes');
const school = require('./routes/school.routes');

// routes
app.use('/api', user);
app.use('/api', school);

app.get('/Test', (req: Request, res: Response) => {
    console.log("The backend is hit")
    res.json({message: 'Hello World!'});
});

// server start
app.listen(port, ip, () => {
    console.log(`Example app listening at http://${ip}:${port}`);
});
