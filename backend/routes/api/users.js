const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Blog } = require('../../db/models');
const { createBlog } = require('../../utils/blog')

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


router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, blogName } = req.body;
        const user = await User.signup({ email, blogName, password });
        const userBlog = await createBlog(user);

        await setTokenCookie(res, user);

        return res.json({
            user,
            userBlog,
        });
    }),
);






module.exports = router;