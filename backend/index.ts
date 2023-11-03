const os = require('os');

import express, { Request, Response, NextFunction } from 'express';

// import cors from 'cors';

const app = express();
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

app.listen(port, getIP().toString(), () => {
    console.log(`Example app listening at http://${getIP().toString()}:${port}`);
});

// DEV CODE -> SWAPS IN IP AUTOMATICALLY
function getIP() {
    const interfaces = Object.keys(os.networkInterfaces());

    if (interfaces.includes('Wi-Fi')) {
        return os.networkInterfaces()['Wi-Fi'][3]['address'];

    }
    else if (interfaces.includes('en1')) {
        return os.networkInterfaces()['Wi-Fi'][3]['address'];
    }
}
// DEV CODE -> SWAPS IN IP AUTOMATICALLY