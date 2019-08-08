const express = require('express');
const {addPage, wikiPage, main} = require('../views');
const router = express.Router();
const { Page } = require("../models");
const slugify = require('slugify');


router.get('/', async (req, res, next) => {
    const pages = await Page.findAll();
    res.send(main(pages));
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
        res.redirect(`/wiki/${page.slug}`);
    } catch (error) {
        next(error);
    }
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
    const page = await Page.findOne({
        where: {slug: req.params.slug}
    });
    //console.log(page);
    res.send(wikiPage(page, page.author));
});

module.exports = router;
