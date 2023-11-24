import dotenv from 'dotenv';
import express, {NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// importing routes
import student from './routes/student.routes';
import school from './routes/school.routes';

// importing middleware
import { verifyAuthentication } from './middleware/verifyAuth';

const app = express();
const result = dotenv.config();

const port = 3000;
const ip = process.env.IP_ADDRESS ?? 'localhost';

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(verifyAuthentication);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// routes
app.use('/api', student);
app.use('/api', school);

app.get('/Test', (req: Request, res: Response) => {
    console.log("The backend is hit")
    res.json({message: 'Hello World!'});
});

// server start
const server = app.listen(port, ip, () => {
    console.log(`Example app listening at http://${ip}:${port}`);
});

export default app;
export {server};