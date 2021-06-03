const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Blog, Follow } = require('../../db/models');
const { createBlog } = require('../../utils/blog')
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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



//get users
router.get(
    '/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const user = req.user;
        // let following = await Follow.findAll({
        //     where: {
        //         userId: user.id,
        //     },
        //     include: [Blog],
        // });
        // following = JSON.stringify(following)
        // console.log(following, 'folowing from get users api')
        // let follows = following.map((follow => {
        //     follow = follow.Blog.userId
        // }))
        // console.log(follows, 'follows map from users api')
        const users = await User.findAll({
            where: {
                // [Op.and]: [
                    id: {
                        [Op.ne]: user.id
                    },
                    // {id: {
                    //     [Op.notIn]: follows
                    // }}
            },
            // limit: 5,
            offset: 4,
            include: [Blog],
        }
        )
        console.log(users, 'users from api')
        return res.json({ users })
    })
    )
    
    //find a user by blogname
    router.get(
        '/:name(*)',
        asyncHandler(async (req, res) => {
            const blogName = req.params.name;
            const user = await User.findOne({
                where: {
                    blogName,
                },
                include: [Blog],
            })
            if (user) {
                return res.json({ user });
            } else {
                return {error:"User not found"}
            }
        }))



module.exports = router;