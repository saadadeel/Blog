'use strict';

var Projects = function (options) {
	var templateId = 'Blog/projects.html',
		timeoutID,
		template = document.getElementById(templateId);
    
	    options = options || {};
	    this.view = document.getElementById('cool');

	this.view.innerHTML = template.innerHTML;


	timeoutID = window.setTimeout( function () {
		document.getElementById('log').className = "log_inactive";
		document.getElementById('topBackGround').className = "topBackGround_active";
		document.getElementById('cool').className = "cool_projects";
		document.getElementById('projectsPage').className = "projects_active"
		document.getElementById('aboutPage').className = "about_inactive";}, 10);

	document.getElementsByClassName('cool_active').innerHTML = document.getElementById('Blog/projects.html');
};