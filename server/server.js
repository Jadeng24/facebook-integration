require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    // , massive = require('massive')
    , cors = require('cors')
    , axios = require('axios');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

// massive(process.env.CONNECTION_STRING).then(db => {
//     console.log('Connected to the database')
//     app.set('db', db);
// })

app.use((req, res, next) => {
    console.log(req.method, req.url); next();
})


 
//=====| Authentication |==================================
app.get('/auth/me'), (req, res) => {
    if (!req.user) {
        return res.status(404).send('User Not Found');
    }
    else {
        return res.status(200).send(req.user);
    }
}


const PORT = 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
