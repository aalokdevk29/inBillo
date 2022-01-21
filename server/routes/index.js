const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.post('/create', controller.createUser);
router.post('/login', controller.login);
router.put('/payment/:receiverId/:senderId', controller.payment);
router.get('/all', controller.getUsers);
router.get('/transactions/:id', controller.getUserTransaction);

module.exports = router;