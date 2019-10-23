import express from 'express';

const router = express.Router();
router.get('/', (req, res) => {
    // @ts-ignore
    const data = req.session.authenticatedData;
    res.render('info', {
        data
    });
});

export default router;
