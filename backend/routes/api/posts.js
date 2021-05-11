const express = require('express')
const asyncHandler = require('express-async-handler');
const { User, Follow, Post, Like, Blog, BlogPost } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const router = express.Router()
const { restoreUser } = require('../../utils/auth');



//post an image
router.post(
    '/image',
    restoreUser,
    singleMulterUpload('content'),
    asyncHandler(async (req, res) => {
        const { type, caption } = req.body;
        const userId = req.user.id;
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
    restoreUser,
    asyncHandler(async (req, res) => {
        const { type, content, caption } = req.body;
        const userId = req.user.id;
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
    restoreUser,
    asyncHandler(async (req, res) => {
        const { type, content, caption } = req.body;
        const userId = req.user.id;
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
    `/likes`,
    restoreUser,
    asyncHandler(async (req, res) => {
        const user = req.user;
        const { postId } = req.body;
        const like = await Like.create({
            userId: user.id,
            postId
        });
        return res.json({ like })
    })
)


//get likes for a logged in user
router.get(
    '/likes',
    restoreUser,
    asyncHandler(async (req, res) => {
        const user = req.user;
        const likes = await Like.findAll({
            where: {
                userId: user.id
            }
        })
        return res.json({ likes })
    })
)


//unlike a post
router.delete(
    '/:postId(\\d+)/likes',
    restoreUser,
    asyncHandler(async (req, res) => {
        const user = req.user;
        const { postId, userId } = req.body;
        const id = req.params.postId;
        if (user.id === userId && postId === id) {
            const like = await Like.findAll({
                where: {
                    userId,
                    postId
                }
            })
            await like.destroy();
            return res.json()
        }
    })
)



// get posts from blogs a person follows
router.get(
    '/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const user = req.user;
        const following = await Follow.findAll({
            where: {
                userId: user.id
            },
            include: Blog,
        })

        let postData = []
        for (let i = 0; i < following.length; i++) {
            let follow = following[i];
            const posts = await Post.findAll({
                where: {
                    userId: follow.Blog.userId,
                },
                include: [Like, User, Blog],
        });
        postData.push(...posts)
    }
        return res.json({ postData })
})
)


module.exports = router;