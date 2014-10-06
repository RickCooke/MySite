//myJquery.js

$(document).ready(function(){

	var $li1 = $("nav ul li:nth-child(1)");
	var $li2 = $("nav ul li:nth-child(2)");
	var $li3 = $("nav ul li:nth-child(3)");
	var $li4 = $("nav ul li:nth-child(4)");



	$("header").mouseenter(function(){
		$li1.fadeIn();
		$li2.fadeIn();
		$li3.fadeIn();
		$li4.fadeIn();
	});
	$("header").mouseleave(function(){
		$li1.fadeOut();
		$li2.fadeOut();
		$li3.fadeOut();
		$li4.fadeOut();
	});
});