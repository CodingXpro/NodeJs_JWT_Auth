const router = require("express").Router();
const { publicPosts } = require('../db');
const { privatePosts } = require('../db')

router.get('/public', (req, res) => {
    res.json(publicPosts)
})
router.get('/private', (req, res) => {
    res.json(privatePosts)
})








module.exports = router;