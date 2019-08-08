const express = require('express');
const router = express.Router();
const { User, Page } = require('../models');
const { userList, userPages } = require('../views');


router.get('/', async (req, res, next) => {
    const users = await User.findAll();
    res.send(userList(users));
});

router.get('/:id', async (req, res, next) => {
    const user = await User.findOne({
        where: {id: req.params.id}
    });
    console.log(req.params.id);
    const pages = await Page.findAll({
       where: {authorId: req.params.id}
     })
    console.log(user, pages);
    res.send(userPages(user, pages));
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
