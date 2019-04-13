const express = require('express');

const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/',userController.showList);
router.get('/add',userController.getAddList);
router.get('/login',userController.getLogin);
router.get('/logout',userController.getLogout);

router.post('/add',userController.postAddList);
router.post('/delete',userController.postDeleteList);
router.post('/login',userController.postLogin);

module.exports = router;