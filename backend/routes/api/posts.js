const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Blog, Post, Like, BlogPost, Follow } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const router = express.Router()
const { createBlogPost } = require('../../utils/blog');
const { restoreUser } = require('../../utils/auth')
// const { Sequelize } = require('sequelize/types');
// const Op = Sequelize.Op;

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


// get posts
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const posts = await Post.findAll({
            include: [User, Like, Blog]
        });
        return res.json({ posts })
    })
)


//get posts from blogs the user follows
// router.get('/',
//     restoreUser,
//     asyncHandler(async (req, res) => {
//         const user = req.user;
//         const following = await Follow.findAll({
//             where: {
//                 userId: user.id
//             },
//             include: Blog
//         })

//         // let blogs = []
//         // following.forEach(async (follow) => {
//         //     let data = await Blog.findAll({
//         //         where: {
//         //             id: follow.B
//         //         }
//         //     })
//         //     blogs.push(data);
//         // })
//         let posts = [];
//         // console.log(blogs);
//         following.forEach(async (follow) => {
//             let post = await BlogPost.findAll({
//                 where: {
//                     blogId: follow.Blog.id
//                 },
//                 include: Post
//             })
//             posts.push(post.Post)
//         })
//         return res.json({ posts })
//     }))
// const posts = [];

// blogs.forEach(async (blog) => {
//     let blogPosts = await BlogPost.findAll({
//         where: {
//             blogId: blog.blogId
//         },
//         include: Post,
//     })
//     posts.push(blogPosts)
//     // posts.push(blogPosts)
// })
// console.log('posts', posts)
// return res.json({ posts })
// }))







module.exports = router;