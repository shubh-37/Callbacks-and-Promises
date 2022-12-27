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
	var text, fn;
	fakeAjax(file, function(response){
		if (fn) fn(response); //if line 31 runs before line 26 hence call the callback with response;
		else text = response; //else 26 ran first and we'll return text in the thunk as an argument to callback
	});

	return function(cb){
		if (text) cb(text); //this is when line 26 executed first
		else fn = cb; // this is if we dont have a text response hence we're storing our cb in fn and calling it in the fakeAjax.
	}
}

// request all files at once in "parallel"
var th1 = getFile("file1"); // This getFile function returning a function or a thunk which is being stored inside th1
var th2 = getFile("file2"); 
var th3 = getFile("file3");

th1(getOutput); //th1 takes in a callback as an argument. This callback returns the text of the called file.
function getOutput(text1){ //This callback will only be called when there is a text present in the thunk returned.
	output(text1);
	th2(function(text2){ //Hence this will be called only if there is a returned value for thunk1.
		output(text2);
		 th3(function (text3){
			output(text3);
			output("completed!");
		})
	})
}
