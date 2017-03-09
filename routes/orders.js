var express = require('express');
var jsonxml = require('jsontoxml');
var mongoose = require('mongoose');
var assert = require('assert');
var parser = require('json-parser');
var orders = require('../models/orders');
var validator = require('xsd-schema-validator');
var xsdFileName = "users.xsd";
var fs = require('fs');

var router = express.Router();

try {
    fs.accessSync(xsdFileName, fs.F_OK);
} catch (e) {
    console.log('XSD file ' + xsdFileName + ' is not accessible. Existing the program');
    console.log(e);
    process.exit(1);
}

router.route('/')
    .post(function(req,res,next){
        console.log("request setup");
        console.log(req.body);
        var json = {order:{
            "orderperson": {
                "name" : req.body.name,
                "email": req.body.email,
                "phone": req.body.phone},
            "item":{
                "frame":req.body.frame,
                "framecolor":req.body.framecolor,
                "screen":req.body.screen,
                "screencolor":req.body.screencolor,
                "keyboard":req.body.key,
                "keyboardcolor":req.body.keycolor,
                "note": req.body.note,
                "quantity":req.body.quantity,
            },
            "shipto":{
                "shippingname":req.body.Rname,
                "shippingemail":req.body.Remail,
                "shippingphone": req.body.Rphone,
                "shippingaddress": req.body.Raddress,
                "shippingcountry":req.body.Rcountry
            }}};
        console.log("json setup");
        console.log(json);
        var xml = jsonxml(json);
        console.log(xml);
        validator.validateXML(xml, xsdFileName, function(err, result) {
            if (err) {
                console.log('Error was found during validation of file:');
                console.log(err);
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end("Order not created: INVALID INPUT" + err.message.split('\n')[1]);
            }
            console.log('XML file is valid: ' + result.valid); // true

            var db = mongoose.connection;
            orders.create(json, function (err,order) {
                    if (err) throw err;
                    console.log('Order created!');
                    var id = order._id;
                    console.log(id);

                orders.find({}, function (err, orders) {
                        if (err) throw err;
                    });
                });
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end("New order created \n" + xml);
        })
    });

module.exports = router;
