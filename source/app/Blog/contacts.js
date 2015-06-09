'use strict';

var Contacts = function (options) {
	var templateId = 'Blog/social.html',
		timeoutID,
		template = document.getElementById(templateId);
    
	    options = options || {};
	    this.view = document.getElementById('cool');

	this.view.innerHTML = template.innerHTML;

	timeoutID = window.setTimeout( function () {
		document.getElementById('cool').className = "cool_active"; 
		document.getElementById('log').className = "log_inactive";
		document.getElementById('topBackGround').className = "topBackGround_active";
		document.getElementById('projectsPage').className = "projects_inactive"
		document.getElementById('aboutPage').className = "about_inactive";}, 10);

	Contacts.bindEvents();
};

Contacts.bindEvents = function (){
	var mailButton = document.getElementById('mail'),
		facebookButton = document.getElementById('facebook'),
		twitterButton = document.getElementById('twitter'),
		githubButton = document.getElementById('github'),
		youtubeButton = document.getElementById('youtube'),
		linkedinButton = document.getElementById('linkedin');

        mailButton.addEventListener('click', this.onMail.bind(this));
		facebookButton.addEventListener('click', this.onFacebook.bind(this));
		twitterButton.addEventListener('click', this.onTwitter.bind(this));
		githubButton.addEventListener('click', this.onGithub.bind(this));
		youtubeButton.addEventListener('click', this.onYoutube.bind(this));
		linkedinButton.addEventListener('click', this.onLinkedin.bind(this));	
};

Contacts.onMail = function (event){
	console.log("mail");
};

Contacts.onFacebook = function(event){
};

Contacts.onTwitter = function(event){
};

Contacts.onGithub = function(events){
};

Contacts.onYoutube = function(events){
};

Contacts.onLinkedin = function(events){
};