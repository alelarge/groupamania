const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const postCtrl = require('./../controllers/post');

router.get('/', auth, postCtrl.getAllPost);

router.get('/:id', auth, postCtrl.getOnePost);

router.put('/:id', auth, multer, postCtrl.modifyPost);

router.post('/', auth, multer, postCtrl.createPost);

router.post('/:id/like', auth, postCtrl.likeorDislike);

router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;