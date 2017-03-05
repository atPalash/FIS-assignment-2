var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');
var path = require("path");

/* GET home page. */
// router.get('/register', function(req, res, next) {
//     res.render('register');
// });
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            var token = Verify.getToken({"username":user.username, "_id":user._id, "admin":user.admin});
            var dir =path.join(__dirname,'../','/views');

            console.log(dir);
            res.sendFile(dir + '/index.html');
            // res.status(200).json({
            //   status: 'Login successful!',
            //   success: true,
            //   token: token
            // });
        });
    })(req, res, next);
});

router.post('/register', function (req, res) {
    User.register(new User({
            username: req.body.username
        }),
        req.body.password,
        function (err, user) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            if (req.body.firstname) {
                user.firstname = req.body.firstname;
            }
            if (req.body.lastname) {
                user.lastname = req.body.lastname;
            }
            user.save(function (err, user) {
                passport.authenticate('local')(req, res, function () {
                    return res.status(200).json({
                        status: 'Registration Successful!, Please login to continue'
                    });
                });
            });
        });
});

module.exports = router;
