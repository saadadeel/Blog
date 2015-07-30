'use strict';

var Blog = function () {
	var socket= io.connect('http://localhost:3000');
	Blog.prototype.getBlogs(socket);

};

Blog.prototype.getStream = function (topic){

	var socket= io.connect('http://localhost:3000');

	socket.on('messages', function (data){
		console.log(data);
	});

	socket.emit('tweet', {topic: 'Mad Max'});

	var idNumber = 0;

	socket.on('stream', function (data){
		console.log("received");
		console.log(idNumber);
		$("#tweets").append("<div id=" + idNumber + " 		class='aTweet'>hello world</div>")
		document.getElementById(idNumber).innerHTML = data;
		idNumber = idNumber + 1;
	});
}

Blog.prototype.getTags = function (topic) {

}

Blog.prototype.getBlogs = function (socket) {
	socket.emit('getEntry', 'call');

	socket.on('entry', function (data){
		$(".main").empty();
		$(".main").append(data);
	});
}