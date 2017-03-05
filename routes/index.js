var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');
var path = require("path");
var mongoose = require('mongoose');
var assert = require('assert');
var parser = require('json-parser');
var orders = require('../models/orders');



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
            global.CustomerUsername = user.username;

            var dir =path.join(__dirname,'../','/views');
            res.sendFile(dir + '/index.html');
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

router.get('/login/orders', function (req,res,next) {

    var db = mongoose.connection;
    User.find({'username':CustomerUsername}, function (err, user) {
        if (err) throw err;
        var admin = user[0].admin;
        if(admin == true){
            orders.find({}, function (err, orders) {
                if (err) throw err;
                var i = 0;
                var n = orders.length;
                var orderdatatemp = '';
                for( i = 0; i < n; i++){
                var order_id = orders[i]._id;
                var name = orders[i].order[0].orderperson[0].name;
                var frame = orders[i].order[0].item[0].frame;
                var frameColor = orders[i].order[0].item[0].framecolor;
                var screen = orders[i].order[0].item[0].screen;
                var screenColor = orders[i].order[0].item[0].screencolor;
                var keyboard = orders[i].order[0].item[0].keyboard;
                var keyboardColor = orders[i].order[0].item[0].keyboardcolor;
                var quantity = orders[i].order[0].item[0].quantity;
                var shippingAddress = orders[i].order[0].shipto[0].shippingaddress;
                var ordertemp = "--------------------\n" + "order id: "+order_id+"\n" +"\n" +"name: "+name+"\n" + "frame type: "+frame+"\n" +"frame color: "+frameColor+"\n"
                                    +"screen type: "+screen+"\n" +"screen color: "+screenColor+"\n" +"keyboard type: "+keyboard+"\n" +"keyboard color: "+keyboardColor+"\n"
                                    +"quantity: "+quantity+"\n" +"shippingAddress: "+shippingAddress+"\n" +"\n\n\n";
                orderdatatemp = orderdatatemp + ordertemp;}
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end('====YOU HAVE ADMIN PRIVILEGE====\n\n' + "----All THE CUSTOMER & ORDERS ARE BELOW---- \n\n" + orderdatatemp);
                });
        }
        else{orders.find({'order.orderperson.name':CustomerUsername}, function (err, orders) {
            if (err) throw err;
            var n = orders.length;
            var i = 0;
            //console.log(n);
            var orderdatatemp = '';
            for( i = 0; i < n; i++){
                var order_id = orders[i]._id;
                var name = orders[i].order[0].orderperson[0].name;
                var frame = orders[i].order[0].item[0].frame;
                var frameColor = orders[i].order[0].item[0].framecolor;
                var screen = orders[i].order[0].item[0].screen;
                var screenColor = orders[i].order[0].item[0].screencolor;
                var keyboard = orders[i].order[0].item[0].keyboard;
                var keyboardColor = orders[i].order[0].item[0].keyboardcolor;
                var quantity = orders[i].order[0].item[0].quantity;
                var shippingAddress = orders[i].order[0].shipto[0].shippingaddress;
                var ordertemp = "--------------------\n" + "order id: "+order_id+"\n" +"\n" +"name: "+name+"\n" + "frame type: "+frame+"\n" +"frame color: "+frameColor+"\n"
                    +"screen type: "+screen+"\n" +"screen color: "+screenColor+"\n" +"keyboard type: "+keyboard+"\n" +"keyboard color: "+keyboardColor+"\n"
                    +"quantity: "+quantity+"\n" +"shippingAddress: "+shippingAddress+"\n" +"\n\n\n";
                orderdatatemp = orderdatatemp + ordertemp;}
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end('====YOU ARE NORMAL USER====\n\n' + "----All THE ORDERS ARE BELOW---- \n\n" + orderdatatemp);
        });
        }
    });
});
router.get('/login/users', function (req,res,next) {
    var db = mongoose.connection;
    User.find({'username':CustomerUsername}, function (err, user) {
        if (err) throw err;
        var admin = user[0].admin;
        console.log(admin);
        if(admin == true){
            User.find({}, function (err, users) {
                var usernum = users.length;
                var j = 0;
                var user_order_data = "";
                var userData = "";
                for( j = 0; j < usernum; j++){
                    var user_id = users[j]._id;
                    var name = users[j].username;
                    var admin = users[j].admin;
                    var lastName = users[j].lastname;
                    var firstName = users[j].firstname;
                    var usertemp = "--------------------\n"+"customer id: "+user_id+"\n" +"admin: "+admin+"\n" +"username: "+name+"\n" + "firstname: "+firstName+"\n" +"lastname: "+lastName+ "\n\n\n";
                    userData = userData + usertemp;
                }
                // user_order_data = user_order_data + userData;
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end('====YOU HAVE ADMIN PRIVILEGE====\n\n' + "----All THE USERS ARE BELOW---- \n\n" + userData);});
        }else
        {
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end("You are not authorised to view other users");
        }
    });
});

module.exports = router;
