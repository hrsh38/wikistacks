const express = require('express');
const {addPage} = require('../views');
const router = express.Router();
const { Page } = require("../models");
const slugify = require('slugify');


router.get('/', (req, res, next) => {
    res.send('GET /wiki/');
});

router.post('/', async (req, res, next) => {
    const page = new Page({
        title: req.body.title,
        slug: slugify(req.body.title, {
            replacement: '_',
            remove: /[^a-zA-Z\d\s:]/g
        }),
        content: req.body.content
    });
    try {
        await page.save();
        res.redirect(`/wiki/${page.id}`);
    } catch (error) {
        next(error);
    }
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
});

module.exports = router;
