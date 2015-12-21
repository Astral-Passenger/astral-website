'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');

var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');

var app = express();

app.use(bodyParser());
app.use('/static' , express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname +  '/templates');

app.get('/', function(req,res){
	res.render('index');
});

app.get('/blog/:title?', function(req,res) {
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.send("This page is under construction");
	} else {
		var post = posts[title] || {};
		res.render('post', {post: post});
	}
});

// Contact form submission route.
app.post('/', function(req, res) {

	// This is checking to see if there is a query variable named raw. 
	var fullName = req.body.FirstName + " " + req.body.LastName;
	var subject = "Astral website contact form";
	var company = req.body.companyname;
	var email = req.body.email;
	var message = req.body.message;

	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'connor.myers21@gmail.com',
	        pass: 'Astral21!'
	    }
	});

	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: fullName + " " + email, // sender address
	    to: 'connor.myers21@gmail.com', // list of receivers
	    subject: 'Contact Form Submission', // Subject line
	    text: message, // plaintext body
	    html: '<p>' + message + '</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});

	var backURL=req.header('Referer') || '/';
    // do your thang
	res.render('index',{
		formSubmission: true
	});

	
});

app.listen(3000, function() {
	console.log("The frontend server is running on port 3000!");
});