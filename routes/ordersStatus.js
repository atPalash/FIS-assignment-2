var express = require('express');
var jsonxml = require('jsontoxml');
var mongoose = require('mongoose');
var assert = require('assert');
var parser = require('json-parser');
var orders = require('../models/orders');
var Verify = require('./verify');


var router = express.Router();

router.route('/')
    .post(function (req,res,next) {

        var db = mongoose.connection;
        var username = req.body.username;
        console.log(username);
        //console.log(n);

        orders.find({'order.orderperson.name':username}, function (err, orders) {
            if (err) throw err;
            var n = orders.length;
            var i = 0;
            //console.log(n);
            var data = '';
            for( i = 0; i < n; i++){
                var name = orders[i].order[0].orderperson[0].name;
                var screen = orders[i].order[0].item[0].screen;
                var temp = "customer name: " + name + " and screen type: " + screen ;
                var data = data + temp + '\n';
            }
            console.log(data);
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end("customer order: \n" + data);
        });
    });

module.exports = router;
