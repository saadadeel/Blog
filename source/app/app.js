'use strict';

var App = function (options) {

	var templateId = 'Blog/main.html',
		template = document.getElementById(templateId);
    
	    options = options || {};
	    this.view = document.getElementById('view');

    this.view.innerHTML = template.innerHTML;

    App.bindEvents();
};

App.bindEvents = function (){

	var timeoutID;

    $('.topMenuBar').click( function () {

    	var pageName = $(this).attr('id'),
			templateId = 'Blog/' + pageName + ".html",
			template = document.getElementById(templateId);
		    this.view = document.getElementById('cool');
			this.view.innerHTML = template.innerHTML;

			timeoutID = window.setTimeout( function () {
			document.getElementById(pageName + "Page" ).className = pageName + "_active";
		}, 10);

			
			if(pageName == "blog"){
				new Blog();	
			}

			if(pageName == "home"){
				 $('.topBackGround_sideways').removeClass('topBackGround_sideways').addClass('topBackGround_homePage');
			}

			else{
				$('.topBackGround_homePage').removeClass('topBackGround_homePage').addClass('topBackGround_sideways');
			}
    });
}