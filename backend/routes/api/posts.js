const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Blog, Post, Like } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const router = express.Router()
const { createBlogPost } = require('../../utils/blog')

//post an image
router.post(
    '/image',
    singleMulterUpload('content'),
    asyncHandler(async (req, res) => {
        const { type, userId, caption } = req.body;
        const content = await singlePublicFileUpload(req.file);

        const post = await Post.create({
            type,
            content,
            caption,
            userId
        });
        // const blogPost = createBlogPost(userId, post);
        return res.json({ post })
    })
)


//post some words
router.post(
    '/words',
    asyncHandler(async (req, res) => {
        const { type, content, caption, userId } = req.body;
        const post = await Post.create({
            type,
            content,
            caption,
            userId
        });
        return res.json({ post })
    })
)

//post a link
router.post(
    '/link',
    asyncHandler(async (req, res) => {
        const { type, content, caption, userId } = req.body;
        const post = await Post.create({
            type,
            content,
            caption,
            userId
        });
        return res.json({ post })
    })
)

//like a post
router.post(
    '/like/:id',
    asyncHandler(async (req, res) => {
        const { userId, postId } = req.body;
        const like = await Like.create({
            userId,
            postId
        });
        return res.json({ like })
    })
)


//get posts

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const posts = await Post.findAll({
            include: User
        });
        return res.json({ posts })
    })
)









module.exports = router;