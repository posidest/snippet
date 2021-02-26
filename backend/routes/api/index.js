const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const postsRouter = require('./posts.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter)

// get /api/set-token-cookie
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//     const { blogName } = req.body;
//     const user = await User.findOne({
//         where: {
//             blogName
//         },
//     })
//     setTokenCookie(res, user);
//     return res.json({ user });
// }));


// // GET /api/restore-user

// router.get(
//     '/restore-user',
//     restoreUser,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

// // GET /api/require-auth

// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );


module.exports = router;