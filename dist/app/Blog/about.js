'use strict';

var About = function (options) {
	var templateId = 'Blog/about.html',
		timeoutID,
		template = document.getElementById(templateId);
    
	    options = options || {};
	    this.view = document.getElementById('cool');

	this.view.innerHTML = template.innerHTML;

	timeoutID = window.setTimeout( function () {
		document.getElementById('cool').className = "cool_active"; 
		document.getElementById('log').className = "log_inactive";
		document.getElementById('topBackGround').className = "topBackGround_active"
		document.getElementById('aboutPage').className = "about_active";
		document.getElementById('projectsPage').className = "projects_inactive";}, 10);
};