const express = require('express');
const app = express();
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', function(req, res, next) {
  res.render('register', { title: 'register' });
});

app.use(express.urlencoded({ extended: true }))
router.post(
  '/',
  [
    check('username').not().isEmpty().withMessage('usernameが空です。'),
    check('email').not().isEmpty().withMessage('emailが空です。'),
    check('password').not().isEmpty().withMessage('passwordが空です。'),
    check('password').isLength({ min: 7 }).withMessage('passwordは７文字以上必要です。'),
    check('password').custom((value, { req }) => {
        return value === req.body.confirmPassword
    }).withMessage('passwordとconfirmPasswordが一致しません。'),
  ], 
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let messages = [];
        errors.errors.forEach((error) => {
            messages.push(error.msg);
        });
        console.log(messages);
        res.render('/register', { messages: messages });
    } else {
      router.get('/', function(req, res, next) {
        res.render('/', { title: 'index' });
      });
    }
  }
);

module.exports = router;
