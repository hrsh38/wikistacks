const morgan = require('morgan');
const express = require('express');
const main = require('./views/main.js');
const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded( {extended: false}));

app.get('/', (req, res) => {
    res.send(main(''));
});

app.listen(1337, () => {
    console.log('listening...');
});
