const express = require('express');
const router = express.Router();
const apiRouter = require('./api')

router.use('/api', apiRouter)

// static routes
// serve react build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // serve the frontend index.html file at the root route
    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'index.html')
        );
    });

    // serve the static assets in the frontend build folder
    router.use(express.static(path.resolve("../frontend)));

    // Serve the frontend index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'index.html')
        );
    });
}

// add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.status(201).json({});
    });
}


module.exports = router;