var express = require('express'),
	 app = express(),
	 http = require('http'),
	 server = http.createServer(app),
	 io = require('socket.io').listen(server),
	 fs = require("fs");;

 	server.listen(3000);

var Twitter = require('twitter');

app.get('/', function (req, res) {
  res.sendfile('test.html');;
}); 

io.sockets.on('connection', function(socket){
	console.log('user is connected');
	socket.emit('messages', {hello: 'world'});

	socket.on('tweet', function(data){
		console.log("tweet socket: " + data);

		client.stream('statuses/filter', {track: 'Mad max'}, function(stream) {
			stream.on('data', function(tweet) {
				socket.emit('stream', tweet.text);
			});

			stream.on('error', function(error) {
				throw error;
			});
		});
	});

	socket.on('getEntry', function(data){

		fs.readFile('../Blog/blog.json', 'utf8', function read(err, data) {
			if (err) {
				throw err;
			}

			var obj = JSON.parse(data),
				location = obj.entries[0].location,
				entry = obj.entries[0].content;

			console.log(entry);		
			socket.emit('entry', entry);  
		});

	});
});

var client = new Twitter({
  consumer_key: 'zVXrzlnsiKPkoNIUtxEHt4L2G',
  consumer_secret: 'ODN0CgMzW1JaaanvfGcFpOMnPX3yw5RDJPLyg2UAFLsXbtCwWx',
  access_token_key: '3323469159-zNgAKADtIDINphEXvi1D7ZYYfRVL9tYZYGpl4hy',
  access_token_secret: 'zvStlkjyaKPH5NmmMSv6EGh35tcYovk7qbyf9tDmX8SUR'
});

// var express = require('express');
// var app = express();

// var Twitter = require('twitter');
// var http = require('http').Server(app);

// var io = require('socket.io')(http);

// app.get('/', function (req, res) {
//   res.sendfile('index.html');
// });
 
// console.log("twitter")

// var client = new Twitter({
//   consumer_key: 'zVXrzlnsiKPkoNIUtxEHt4L2G',
//   consumer_secret: 'ODN0CgMzW1JaaanvfGcFpOMnPX3yw5RDJPLyg2UAFLsXbtCwWx',
//   access_token_key: '3323469159-zNgAKADtIDINphEXvi1D7ZYYfRVL9tYZYGpl4hy',
//   access_token_secret: 'zvStlkjyaKPH5NmmMSv6EGh35tcYovk7qbyf9tDmX8SUR'
// });

// io.on('connection', function(socket){
// 	console.log('user is connected');
// });

// // app.get('/test', function (req, res) {

// // 	client.stream('statuses/filter', {track: 'Mad max'}, function(stream) {
// // 		stream.on('data', function(tweet) {
// // 			//console.log(tweet.text);
// // 			res.sendfile(tweet.text);	
// // 		});

// // 		stream.on('error', function(error) {
// // 		throw error;
// // 		});
// // 	});
// // });

// var server = app.listen(3000, function () {

//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);

// });