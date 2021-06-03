const express = require('express')
const asyncHandler = require('express-async-handler');
const { User, Follow, Post, Like, Blog, Owner } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const router = express.Router()
const { restoreUser } = require('../../utils/auth');
const { createBlogPost } = require('../../utils/blog');


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
            userId,
            ownerId: userId,
        });
        // await createBlogPost(userId, post);
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
            userId,
            ownerId: userId,
        });
        // await createBlogPost(userId, post);
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
            userId,
            ownerId: userId,
        });
        // await createBlogPost(userId, post);
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

    // router.get(
//     '/',
//     restoreUser,
//     asyncHandler(async (req, res) => {
    //         const postData= await Post.findAll({
//             include: [Like, User, Blog],
//         });
//         return res.json({postData})
//     }))




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
                order: [['createdAt', 'DESC']],
                where: {
                    userId: follow.Blog.userId,
                    },
                    include: [{
                        model: User,
                        as: 'Owner'
                     },
                    {model: Like},
                    {model: User,
                    include:[Blog]}]
                });
            postData.push(...posts)
        }

        let userPosts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                userId: user.id,
                },
                include: [{
                    model: User,
                    as: 'Owner'
                },
                {model: Like},
                {model: User,
                include: [Blog]}]
            });
            postData.push(...userPosts)
        return res.json({ postData })
        })
    )
    

    //reblog a post 
    router.post(
        '/reblog',
        restoreUser,
        asyncHandler(async (req, res) => {
            let { type, content, caption, ownerId } = req.body;
            const userId = req.user.id;
            if (ownerId === null) ownerId = userId;
            const post = await Post.create({
                type,
                content,
                caption,
                userId,
                ownerId,
            })
            // await createBlogPost(userId, post)
            return res.json({post})
        })
    )
    

    //get post by id
    router.get(
        '/:postId',
        asyncHandler(async(req, res) => {
            const id = req.params.postId;
            const post = await Post.findByPk(id);
            return res.json({post})
        })
    )


    //unlike a post
    router.delete(
        '/:postId/likes',
        restoreUser,
        asyncHandler(async (req, res) => {
            const user = req.user;
            const id = req.params.postId;
            // if (user.id === userId && postId === id) {
            const unlike = await Like.findOne({
                where: {
                    userId: user.id,
                    postId: id
                    }
                })
            let like = unlike;
            await unlike.destroy();
            return res.json({like})
        })
        )
        


        module.exports = router;