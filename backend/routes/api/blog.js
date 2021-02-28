const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Blog, Follow } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const router = express.Router()
const { createBlogPost } = require('../../utils/blog');
const { restoreUser } = require('../../utils/auth')

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
    '/follows',
    restoreUser,
    asyncHandler(async (req, res) => {
        const user = req.user;
        const follows = await Follow.findAll({
            where: {
                userId: user.id
            }
        })
        return res.json({ follows })
    })
)

//unfollow a blog
router.delete(
    '/:blogId(\\d+)/follows',
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