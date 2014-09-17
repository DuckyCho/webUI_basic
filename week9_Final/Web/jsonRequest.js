
//book.json파일을 불러오는 함수
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
		loadingDivSet();
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
		setTimeout(function(){
			var bookList = request.responseText;
			var bookList = JSON.parse(bookList);
			clearInterval(loadingInterval);
			removeLoadingDiv();
			windowResizeEventRemover();
			execFunction(bookList);
		},8000);

	}

		
	

}

function jsonParseSync(request){
	if(request.readyState === 4 && request.status === 200){
			var bookList = request.responseText;
			var bookList = JSON.parse(bookList);
			return bookList;
	}
}



