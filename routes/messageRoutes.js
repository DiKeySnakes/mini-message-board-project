const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.get('/create', messageController.message_create_get);
router.get('/', messageController.message_index);
router.post('/', messageController.message_create_post);

module.exports = router;
