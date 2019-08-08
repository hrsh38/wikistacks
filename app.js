const morgan = require('morgan');
const express = require('express');
const main = require('./views/main.js');
const wikiRouter = require('./routes/wiki.js');
const usersRouter = require('./routes/user.js');
const app = express();
const { db } = require('./models');

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded( {extended: false}));

app.get('/', (req, res) => {
    res.redirect('/wiki');
});

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

async function dbSync() {
    await db.sync({force: true});
    app.listen(1337, () => {
        console.log('listening...');
    });
}

dbSync();

db.authenticate().then(() => console.log('connected to database'));
