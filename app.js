const morgan = require('morgan');
const express = require('express');
const main = require('./views/main.js');
const app = express();
const { db } = require('./models');

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded( {extended: false}));

app.get('/', (req, res) => {
    res.send(main(''));
});

async function dbSync() {
    await db.sync({force: true});
    app.listen(1337, () => {
        console.log('listening...');
    });
}

dbSync();

db.authenticate().then(() => console.log('connected to database'));
