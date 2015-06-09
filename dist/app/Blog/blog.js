'use strict';

var Blog = function (options) {
	var templateId = 'Blog/blog.html',
		timeoutID,
		template = document.getElementById(templateId);
    
	    options = options || {};
	    this.view = document.getElementById('log');

	this.view.innerHTML = template.innerHTML;

	timeoutID = window.setTimeout( function () {
		document.getElementById('cool').className = "cool_inactive"; 
		document.getElementById('log').className = "log_active";
		document.getElementById('topBackGround').className = "topBackGround_active";
		document.getElementById('aboutPage').className = "about_inactive";
		document.getElementById('projectsPage').className = "projects_inactive";}, 10)

};
