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
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file,function(text){
		// what do we do here?
		handleResponse(file, text);
	});
}

function handleResponse(filename, contents){
	var textResponse = ["file1", "file2", "file3"];
	if(!(filename in responses)){
		responses[filename] = contents;
	}
	for(let i = 0; i < textResponse.length;i++){
		if(textResponse[i] in responses){
			if(typeof responses[textResponse[i]] == "string"){
				output(responses[textResponse[i]]);
				responses[textResponse[i]] = false;
			}
		}else{
			return;
		}	
	}
	output("Completed");
}

var responses = {};

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
