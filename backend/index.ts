import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
// import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
// importing routes
import student from './routes/user.routes';
import school from './routes/school.routes';
import event from './routes/event.routes';

// importing middleware
import { verifyAuthentication } from './middleware/verifyAuth';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const result = dotenv.config();

const port = 3000;
const ip = process.env.IP_ADDRESS ?? 'localhost';

// middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json()); // parsing JSON in the request body
app.use(cookieParser());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.use(express.urlencoded({ extended: true })); // parsing URL-encoded form data
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // file upload path

// routes
app.use('/api', student);
app.use('/api', school);
app.use('/api/events', event);

app.get('/Test', (req: Request, res: Response) => {
    console.log('The backend is hit');
    res.json({ message: 'Hello World!' });
});

// Global error handling middleware - Must be the last middleware
app.use(errorHandler);

// server start
const server = app.listen(port, ip, () => {
    console.log(`Example app listening at http://${ip}:${port}`);
});

export default app;
export { server };
