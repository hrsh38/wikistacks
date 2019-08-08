const express = require('express');
const {addPage} = require('../views');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.send('GET /wiki/');
});

router.post('/', (req, res, next) => {
    res.json(req.body);
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
});

module.exports = router;
