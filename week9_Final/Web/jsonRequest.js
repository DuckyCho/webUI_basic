function jsonRequest(execFunction){

	var url = "./json/book.json"
	var request = new XMLHttpRequest();
	
	if(execFunction != undefined){
		request.open("GET",url,true);
	}
	else{
		request.open("GET",url,false);
	}
	
	request.send(null);

	if(execFunction != undefined){
		request.onreadystatechange = function() {
			jsonParse(request,execFunction);
		}
	}
	else{
		return jsonParseSync(request);
	}
	

	

}


function jsonParse(request,execFunction){

	if(request.readyState === 4 && request.status === 200){
			var bookList = request.responseText;
			var bookList = JSON.parse(bookList);
			execFunction(bookList);
	}

}

function jsonParseSync(request){
	if(request.readyState === 4 && request.status === 200){
			var bookList = request.responseText;
			var bookList = JSON.parse(bookList);
			return bookList;
	}
}



