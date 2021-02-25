const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Blog, Post } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const { default: PostButton } = require('../../../frontend/src/components/Navigation/PostButton');


router.post(
    '/',
    singleMulterUpload('image'),
    asyncHandler(async (req, res) => {
        const { userId, caption }
        const imageUrl = await singlePublicFileUpload(req.file);
        const post = await Post.create({
            type: 'image',
            content: imageUrl,
            caption,
            userId
        });
        return res.json({ post })
    })
)
