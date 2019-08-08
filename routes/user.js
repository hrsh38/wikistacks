const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('GET /users/');
});

router.get('/:id', (req, res, next) => {
    res.send(`GET /users/${req.params.id}`);
});

router.post('/', (req, res, next) => {
    res.send('POST /users/');
});

router.put('/:id', (req, res, next) => {
    res.send(`PUT /users/${req.params.id}`);
});

router.delete('/:id', (req, res, next) => {
    res.send(`DELETE /users/${req.params.id}`);
});

module.exports = router;
