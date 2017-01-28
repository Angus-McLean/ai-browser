navigator.getUserMedia({
	audio:true
}, function(stream){
	window.userMedia = stream;
	console.log(stream);
}, function(error){
	console.error("Could not get User Media: ", error);
});
