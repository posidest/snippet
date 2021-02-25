const { User, Blog } = require('../db/models')
const express = require('express')
const asyncHandler = require('express-async-handler');



async function createBlog(user) {
    const userBlog = await Blog.create({ userId: user.id, avatar: '' });
    return userBlog;
}


module.exports = { createBlog };