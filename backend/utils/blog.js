const { User, Blog, BlogPost } = require('../db/models')
const express = require('express')
const asyncHandler = require('express-async-handler');



async function createBlog(user) {
    const userBlog = await Blog.create({ userId: user.id });
    return userBlog;
}


async function createBlogPost(userId, post) {
    const user = await User.findByPk(userId, {
        include: Blog
    })
    const blogPost = await BlogPost.create({
        blogId: user.Blog.id,
        postId: post.id
    })
    return blogPost;
}


module.exports = { createBlog, createBlogPost };