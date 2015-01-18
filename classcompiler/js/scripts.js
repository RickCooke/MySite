var _global_UUID;
var _global_email;
var _global_name;

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		testAPI();
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		document.getElementById('status').innerHTML = 'Please log ' +
			'into this app.';
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		document.getElementById('status').innerHTML = 'Please log ' +
			'into Facebook.';
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.

window.fbAsyncInit = function() {
FB.init({
	appId      : '743159892428841',
	cookie     : true,  // enable cookies to allow the server to access 
											// the session
	xfbml      : true,  // parse social plugins on this page
	version    : 'v2.1' // use version 2.1
});

// Now that we've initialized the JavaScript SDK, we call 
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

FB.getLoginStatus(function(response) {
	statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
	console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function(response) {
		console.log('Successful login for: ' + response.name);
		document.getElementById('fb_name').innerHTML = response.name;
		var imgLink = "http://graph.facebook.com/" + response.id + "/picture?width=300&height=300";
		document.getElementById('fb_pic').src = imgLink;
		console.log("asdf", response.id);
		_global_UUID = response.id;
		_global_name = response.name;
		_global_email = response.email;
		
		console.log("is startPage defined?", startPage);
		(window.startPage || function(){ console.log("nothing happened.") })();
	});
}

Parse.initialize("3Ph8iDUWqeAveayG8i8s9uKqwnTJr5UUH2N8r0o5", "ZNFh3179ASnfXqIvxImjKdOGcgyoMskITrAvxwH1");

( function( $ ) {
$( document ).ready(function() {
$('#cssmenu li.has-sub>a').on('click', function(){
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown();
			element.siblings('li').children('ul').slideUp();
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp();
		}
	});

});
} )( jQuery );

//var gun = Gun("http://rickandmatt.herokuapp.com/gun");
var gun = Gun("http://localhost:8080/gun");

//var User = Parse.Object.extend("User");


function submitUserData(){
	gun.chain().load("fbUUID/" + _global_UUID).get(function(user){
		this.set({
			contact_email: document.getElementsByName("user_email")[0].value || user.contact_email,
			contact_phoneNumber: document.getElementsByName("user_phone")[0].value || user.contact_phoneNumber,
			studyLoc: document.getElementsByName("user_studyLoc")[0].value || user.studyLoc,
			studyTimes: document.getElementsByName("user_studyTime")[0].value || user.studyTimes
		});
	});
	alert("Information successfully saved!");
}
			
function loadUserData(){
		gun.chain().load("fbUUID/" + _global_UUID).get(function(user){
			document.getElementsByName("user_email")[0].value = user.contact_email;
			document.getElementsByName("user_phone")[0].value = user.contact_phoneNumber;
			document.getElementsByName("user_studyLoc")[0].value = user.studyLoc;
			document.getElementsByName("user_studyTime")[0].value = user.studyTimes;
		});
}

function createUser(){
	gun.chain().load("fbUUID/" + _global_UUID).blank(function(){
		gun.set({
			fbUUID:_global_UUID,
			contact_email:_global_email,
			name:_global_name,
			courseList: {},
			groupList: {}
		}).key("fbUUID/" + _global_UUID);
	});
}






function addClass(){
	var course = prompt("What class are you in? \n (please enter \"DEPARTMENT COURSENUMBER\" ie EECS 183");
	//add class to users list of classes
	gun.load("fbUUID/" + _global_UUID).path('courseList')
		.get(function(courseList){ // ['EECS 376', 'EECS 342']
			delete courseList._; console.log("addClass -> user's courseList", courseList);
			var save = {};
			save[course] = true;
			this.set(save); // courseList.push(course) // ['EECS 376', 'EECS 342', course]
			})
	
		//add user to list of students in class
			gun.load("master_course_list").path(course).get(addMeToCourse); // ['EECS 376', 'EECS 342']
			gun.load("master_course_list").path(course).blank(function(){
				console.log("here");
				var save = {};
				save[course] = {};
				gun.load("master_course_list").set(save);
				gun.load("master_course_list").path(course).get(addMeToCourse);
			});
			function addMeToCourse(courseList){
				console.log("add class to Master Class List ->", courseList);
				var save = {};
				save[_global_UUID] = true;
				this.set(save); // courseList.push(_global_UUID);
			}
}

function listClasses(){
	
}

gun.load("master_course_list").blank(function(){
	gun.load("master_course_list").set({}).key("master_course_list");
});
gun.load("master_group_list").blank(function(){
	gun.load("master_group_list").set({}).key("master_group_list");
});