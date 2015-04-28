

var fs = require('fs');
var	util = require('util');
var finder = require('findit')(process.argv[2] || '.');
var express = require('express');
var path = require('path');
var colors = require('colors');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var server = express();	
server.use(express.static(path.resolve(__dirname + '/../public/bower_components/'))); 
server.use(express.static(path.resolve(__dirname + '/../public'))); 
server.use(express.static(path.resolve('.'))); 

server.use(morgan('dev'));                                         // log every request to the console
server.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
server.use(bodyParser.json());                                     // parse application/json
server.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
server.use(methodOverride());

var videos = [];
var images = [];

var videoFormat = ['.mp4','.ogg','.avi','.mkv'];
var imageFormat = ['.jpg','.gif','.png'];

var apiVersion = 0.1;

var init = function(){
	console.log('init');
	console.log(__dirname.green);
	finder.on('file', function (file, stat) {
    	console.log(file);
    	if(videoFormat.indexOf(path.extname(file)) != -1){
    		videos.push(file)
    		console.log(file.cyan)
    	}else if(imageFormat.indexOf(path.extname(file)) != -1){
    		images.push(file)
    		console.log(file.cyan)
    	}
	});

};


exports.createServer = function(){
	console.log("wrigley start");
	init();

	finder.on('end',function(){
		server.get('/api/version', function(req,res){
			res.json(apiVersion);
		});

		server.get('/api/videos',function(req,res){					
			res.json(videos);
		});

		server.get('/api/images',function(req,res){
			res.json(images);
		});

		server.get('*', function(req,res){
			res.sendfile(path.resolve(__dirname + '/../public/index.html'));
		});

	}).on('err', function(){
		server.get('*', function(req,res){
			res.sendfile(path.resolve(__dirname + '/../public/misc/fail_init.html'));
		});
	})
	server.listen(3000);

};