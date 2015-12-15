'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');

var app = express();

app.use('/static' , express.static(__dirname + '/public'))

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

// This is when you want to create a RESTful API and send data from the route
app.post('/contact', function(req, res) {

	// This is checking to see if there is a query variable named raw. 
	if ( req.query.raw ) {
		res.json(posts);
	}
	
});

app.listen(3000, function() {
	console.log("The frontend server is running on port 3000!");
});