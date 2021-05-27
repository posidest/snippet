const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Follow, Post, Like, BlogPost, Blog } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const router = express.Router()
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
        '/following',
        restoreUser,
        asyncHandler(async (req, res) => {
            const user = req.user;
            const following = await Follow.findAll({
                where: {
                    userId: user.id,
                },
            });
            return res.json({ following })
        })
    )
        
        
    // populate user blog
    router.get(
        '/:id',
        asyncHandler(async (req, res) => {
            const id = req.params.id;

            let blogPosts = await Post.findAll({
                order: [['createdAt', 'DESC']],
                where: {
                    userId: id,
                    },
                    include: [{
                        model: User,
                        as: 'Owner'
                    },
                    {model: Like},
                    {model: User,
                    include: [Blog]}]
                });
                
            return res.json({ blogPosts })
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
                const follow = await Follow.findOne({
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