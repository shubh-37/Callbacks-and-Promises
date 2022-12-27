function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	return new Promise(
		function returnText(resolve){
			fakeAjax(file, resolve);
		});
}

// request all files at once in "parallel"
var p1 = getFile("file1");
var p2 = getFile("file2");
var p3 = getFile("file3");

//Chaining of promises
p1
.then(function outputText(text1){
	output(text1);
	return p2;
}).then(function outputText(text2){
	output(text2);
	return p3;
}).then(function outputText(text3){
	output(text3);
	output("Completed!")
});
