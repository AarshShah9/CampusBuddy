const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(function(req, res, next) {
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
