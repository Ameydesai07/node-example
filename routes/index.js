var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var flash = require('connect-flash');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var jquery = require('jquery');
var mail = require('../public/javascripts/mail');
var objectId = require('mongodb').ObjectID;
var imageurl = '/images/default-user.jpg';

// console.log($);

var url = "mongodb://localhost:27017/mramerica";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express-tutorial'});
});

router.get('/register', function(req, res, next) {
  res.render('register',{success:req.session.success, error:req.session.errors});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
    //res.render('login');

    // var resultArray = [];

    req.check('lunm','Email is required').isEmail();
    req.check('lpass','Password is required').notEmpty();

    var errors = req.validationErrors();
    if(errors)
    {
        res.render('login',{
            errors:errors
        });

    }
    else
    {
        var lunm = req.body.lunm;
        var lpas = req.body.lpass;

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('userdata').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            // console.log(doc);
            if(lunm == doc.email && lpas == doc.password)
            {


                res.render('dashboard', {item: doc});
            }


         }, function () {
            db.close();

        });
    });
    }
});

router.get('/logout', function(req,res, next){
    // req.logout();
    // console.log('logout');
    res.redirect('/login');
});

var getDate = function () {
    var today = new Date();
    var dd = today.toString().split(" ");
    var date = dd[1]+"-"+dd[2]+"-"+dd[3];
    return date;
};

// Edit Information
router.post('/edit', function(req,res, next){

    var eunm = req.body.eunm;
    var efnm = req.body.efnm;
    var elnm = req.body.elnm;
    var eeml = req.body.eemail;
    var img = req.body.image_src;
    var updateUser = {
        username:eunm,
        firstname:efnm,
        lastname:elnm,
        email:eeml,
        imgurl:img,
        lastupdated:getDate()
            };
    var id = req.body.dbid;

    // console.log("Id"+id);
    mongo.connect(url, function (err, db) {
        //assert.equal(null,err);
        if(err) throw  err;

        db.collection('userdata').updateOne({"_id":objectId(id)},{$set:updateUser}, function (err, result) {
            assert.equal(null, err);
            if (err) {
                throw err;
            }
            else {
                // req.flash('aaa');
                console.log('Item updated');
                 res.redirect('/login');

            }
            db.close();
        });

    });
    // console.log("Edit email:"+eunm+efnm+elnm+eeml+img);
});

router.post('/register', function (req,res,next) {
    var unm = req.body.unm;
    var email = req.body.email;
    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;
    var fname = req.body.fname;
    var lname = req.body.lname;

    //Validation
    req.check('unm','Name is required').notEmpty();
    req.check('fname','Name is required').notEmpty();
    req.check('lname','Name is required').notEmpty();
    req.check('email','Email is required').isEmail();
    req.check('pass1','Password is required').notEmpty();
    req.check('pass2','Password do not match').equals(pass1);
    var errors = req.validationErrors();
    if(errors)
    {
        res.render('register',{
            errors:errors
        });

    }
    else
    {
        var newUser = {
            username:unm,
            firstname:fname,
            lastname:lname,
            email:email,
            password:pass1,
            imgurl:imageurl,
            createddate:getDate(),
            lastupdated:getDate()
        };


        mongo.connect(url, function (err, db) {
            //assert.equal(null,err);
            if(err) throw  err;

            db.collection('userdata').insertOne(newUser, function (err, result) {
                assert.equal(null, err);
                if (err) {
                    throw err;
                }
                else {
                    // req.flash('aaa');
                    res.redirect('/login');
                    // console.log('Item inserted');
                }
                db.close();
            });

        });
        // req.flash('success_msg','You are registered and can login now');
        // res.redirect('/login');

    }

});
// Send mail
    router.get('/sendmail', function(req,res, next){
        mail();
        console.log('sent');
        res.redirect('/login');
    });


// router.get('/dashboard',function (req,res,next) {});
module.exports = router;
