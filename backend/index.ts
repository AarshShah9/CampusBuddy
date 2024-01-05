import dotenv from 'dotenv';
import express, {NextFunction, Request, Response} from 'express';
import multer from 'multer';


import cookieParser from 'cookie-parser';
// importing routes
import student from './routes/user.routes';
import school from './routes/school.routes';
import UploadToS3 from "./util/S3Uploader";

const app = express();
const upload = multer({ dest: 'uploads/' });
const result = dotenv.config();

const port = 3000;
const ip = process.env.IP_ADDRESS ?? 'localhost';

// middleware
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

// routes
app.use('/api', student);
app.use('/api', school);

app.get('/Test', (req: Request, res: Response) => {
    console.log('The backend is hit');
    res.json({ message: 'Hello World!' });
});

app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // The 'path' should be a unique identifier for your file (like a filename)
        const path = `your/path/${req.file.originalname}`;

        // Call your function to upload to S3
        await UploadToS3(req.file, path);

        res.status(200).send('File uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading the file');
    }
});

// server start
const server = app.listen(port, ip, () => {
    console.log(`Example app listening at http://${ip}:${port}`);
});

export default app;
export { server };
