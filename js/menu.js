$(document).ready(function() {
	$(".click_drop").click(function() {
		$(this).parent().siblings().find(".dropdown").stop(true, false, true).slideUp(300);
		$(this).parent().children(".dropdown").stop(true, false, true).slideToggle(300);
	});

	$("#checkbox").click(function(){
	$("nav").toggleClass("active");
	});

	$("#search").click(function(){
	$("#search_section").toggleClass("visible");
	});

var window_size = window.matchMedia('(max-width: 768px)');
if(window.matchMedia('(max-width: 768px)').matches) {
	$(".hover_drop a").click(function() {
		$(this).parent().siblings().find(".dropdown").stop(true, false, true).slideUp(300);
		$(this).parent().children(".dropdown").stop(true, false, true).slideToggle(300);
	}) }
	else {
		$(".hover_drop").hover(function() {
		$(this).children('ul').stop(true, false, true).fadeToggle(100);
	}); }


}

	);
