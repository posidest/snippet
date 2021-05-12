const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Follow, Post, Like, BlogPost, Blog } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const router = express.Router()
const { restoreUser } = require('../../utils/auth')


// populate user blog
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const blogPosts = await Post.findAll({
            where: {
                userId: id,
            },
            include: [Like, User, Blog],
        })
        if(blogPosts) {
            console.log(blogPosts, 'blogPosts from api')
            return res.json({ blogPosts })
        } else {
            return {blogPosts, error: 'this did not work'};
        }
    })
)


//follow a blog
router.post(
    '/follows',
    restoreUser,
    asyncHandler(async (req, res) => {
        const user = req.user;
        const { blogId, userId } = req.body;
        if (user.id === userId) {
            const follow = await Follow.create({
                userId: user.id,
                blogId
            });
            return res.json({ follow })
        }
    })
)

//get follows for a logged in user
router.get(
    '/following',
    restoreUser,
    asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const following = await Follow.findAll({
            where: {
                userId
            }
        })
        return res.json({ following })
    })
)

//get followers for a blog
router.get(
    '/:id/followers',
    asyncHandler(async (req, res) => {
        const blogId = req.params.id;
        const followers = await Follow.findAll({
            where: {
                blogId
            }
        })
        return res.json({ followers })
    })
)

//unfollow a blog
router.delete(
    '/:blogId/follows',
    restoreUser,
    asyncHandler(async (req, res) => {
        const user = req.user;
        const { blogId, userId } = req.body;
        const id = req.params.blogId;
        if (user.id === userId && blogId === id) {
            const follow = await Follow.findAll({
                where: {
                    userId,
                    blogId
                }
            })
            await follow.destroy()
            return res.json()
        }
    })
)

module.exports = router;