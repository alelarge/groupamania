const express = require('express');
const router = express.Router();
// const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const commentCtrl = require('./../controllers/comment');

router.get('/:postId', auth, commentCtrl.getPostComment);

router.put('/:commentId', auth, commentCtrl.modifyComment);

router.post('/:postId', auth, commentCtrl.createComment);

router.delete('/:commentId', auth, commentCtrl.deleteComment);

module.exports = router;