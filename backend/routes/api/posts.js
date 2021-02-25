const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Blog, Post } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const router = express.Router()

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

        return res.json({ post })
    })
)





module.exports = router;