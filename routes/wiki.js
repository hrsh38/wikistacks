const express = require('express');
const {addPage, wikiPage, main} = require('../views');
const router = express.Router();
const { Page, User } = require("../models");
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

    let user = await User.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    })
    console.log(user);
    try {
        await page.save();
        page.setAuthor(user[0]);
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
    const user = await User.findOne({
        where: {id: page.authorId}
    })
    //console.log(page);
    res.send(wikiPage(page, user));
});

router.get('/:slug/delete', async (req, res, next) => {
    const page = await Page.findOne({
        where: {slug: req.params.slug}
    });
    await page.destroy();
    res.redirect('/wiki');
})

module.exports = router;
