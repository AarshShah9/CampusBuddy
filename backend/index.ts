import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const result = dotenv.config();

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
app.listen(port, '10.13.148.91', () => {
    console.log(`Example app listening at http://10.13.148.91:${port}`);
});