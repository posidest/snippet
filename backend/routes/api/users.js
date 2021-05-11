const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Blog } = require('../../db/models');
const { createBlog } = require('../../utils/blog')
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')
const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('blogName')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a blog name with at least 4 characters.'),
    check('blogName')
        .not()
        .isEmail()
        .withMessage('Blog name cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

//user signup
router.post(
    '/',
    singleMulterUpload('avatar'),
    validateSignup,
    asyncHandler(async (req, res) => {
        // console.log('request file: ', req.file)
        const { email, password, blogName } = req.body;
        const avatar = await singlePublicFileUpload(req.file);

        const user = await User.signup({
            avatar,
            email,
            blogName,
            password,
        });

        const userBlog = await createBlog(user);

        await setTokenCookie(res, user);

        return res.json({
            user,
            userBlog,
        });
    }),
);

//find a user
router.get(
    '/:name(\\w{4+})',
    asyncHandler(async (req, res) => {
        const blogName = req.params.name;
        const user = await User.findAll({
            where: {
                blogName: blogName,
            }
        })
        return res.json({ user });
    }))




module.exports = router;