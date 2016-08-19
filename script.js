$(document).ready(function(){
	function getQueryVariable() {
		var query = window.location.search.substring(1);
		$("#nameTag").html("Welcome, "+query.substr(10,query.length)); 
	}
getQueryVariable();
})
