const express = require('express');

const router = express.Router();
const userController = require('../controllers/userControllers');
const authController = require('../controllers/auth');

router.get('/', authController.getLS);
router.post('/login',authController.postLogin);
router.get('/homepage',userController.showList);
router.post('/signup',authController.postSignup);
router.get('/add',userController.getAddList);
router.post('/add',userController.postAddList);
router.post('/delete',userController.postDeleteList);
router.get('/logout',authController.getLogout);

module.exports = router;