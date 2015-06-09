'use strict';

var App = function (options) {

	var templateId = 'Blog/main.html',
		template = document.getElementById(templateId);
    
	    options = options || {};
	    this.view = document.getElementById('view');

    this.view.innerHTML = template.innerHTML;

    App.bindEvents();
    App.onBlog();
};

App.bindEvents = function (){
	var projectsButton = document.getElementById('projects'),
		//blogButton = document.getElementById('blog'),
		aboutButton = document.getElementById('about'),
		contactsButton = document.getElementById('contacts'),
		socialButton = document.getElementById('social');

        projectsButton.addEventListener('click', this.onProjects.bind(this));
        //blogButton.addEventListener('click', this.onBlog.bind(this));
        aboutButton.addEventListener('click', this.onAbout.bind(this));
        contactsButton.addEventListener('click', this.onContacts.bind(this));


        $('#blog').click( function () {

        	var templateId = 'Blog/blog.html',

				template = document.getElementById(templateId);
		    
			    this.view = document.getElementById('cool');

				this.view.innerHTML = template.innerHTML;

        });
}

App.onProjects = function(event){
	new Projects();
}

App.onBlog = function(event){
	
        	var templateId = 'Blog/blog.html',

				template = document.getElementById(templateId);
		    
			    this.view = document.getElementById('cool');

				this.view.innerHTML = template.innerHTML;
}

App.onAbout = function (event){
	new About();
}

App.onContacts = function(events){
	new Contacts();
}

App.onSocial = function (event){
	
}