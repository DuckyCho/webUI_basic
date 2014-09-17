jsonRequest();

function jsonRequest(){
	var url = "./json/book.json";
	var mobileRequest = new XMLHttpRequest();
	mobileRequest.open("GET",url,true);
	mobileRequest.send(null);

	mobileRequest.onreadystatechange = function(){
		if(mobileRequest.readyState === 4 && mobileRequest.status === 200){
			
			var bookList = mobileRequest.responseText;
			bookList = JSON.parse(bookList);
			htmlInnerSet(bookList);
			elementsSizeSet();
			moreButtonEventRegister();
			window.addEventListener('resize',windowSizeModifyEventRegister);
			swipingEventRegister();

		}
	}
}


function htmlInnerSet(bookList){
	

	var wrapperTemplate = "<section><div class = \"title_wrapper\"><div class =\"textWrapper\"><div class = \"title\"><%h1%></div><div class = \"description\"><%h3%></div></div><button class=\"moreButton\">더보기</button></div><div class = \"lineUp_wrapper\"><%ulTemplate%></div></section>";
	var ulTemplate = "<ul><%liTemplate%></ul>";
	var liTemplate = "<li><div class =\"book_wrapper\"><div class=\"book_cover_wrapper\"><div class=\"img-wrapper\"><div class=\"imgVertical\"><img src=\"<%imgsrc%>\"></div></div></div><div class=\"bookDescription_wrapper\"><dl><dt><%title%></dt><div class=\"shadow\"></div><dd><%author%></dd></dl><div class=\"price\"><%price%></div></div></div></li>";

	var tmp_wrapperTemplate = "";
	var tmp_ulTemplate = "";
	var tmp_liTemplate = "";

	var contentsEle = document.querySelector("contents");
	var bookListKey = Object.keys(bookList);

	bookList = eval("bookList."+bookListKey[0]);
	a = bookList[0].bookList[0];
	
	for(var i = 0 ; i < bookList.length ; i++ ){
		for(var j = 0 ; j < bookList[i].bookList.length ; j++){
			tmp_liTemplate += liTemplate.replace("<%imgsrc%>",bookList[i].bookList[j].imgsrc);
			tmp_liTemplate = tmp_liTemplate.replace("<%title%>",bookList[i].bookList[j].name);
			tmp_liTemplate = tmp_liTemplate.replace("<%price%>",bookList[i].bookList[j].price);
			tmp_liTemplate = tmp_liTemplate.replace("<%author%>",bookList[i].bookList[j].author);
		}

		tmp_ulTemplate = ulTemplate.replace("<%liTemplate%>",tmp_liTemplate);
	
		tmp_wrapperTemplate += wrapperTemplate.replace("<%h1%>",bookList[i].h1);
		tmp_wrapperTemplate = tmp_wrapperTemplate.replace("<%h3%>",bookList[i].h3);
		tmp_wrapperTemplate = tmp_wrapperTemplate.replace("<%ulTemplate%>",tmp_ulTemplate);

		contentsEle.innerHTML += tmp_wrapperTemplate
		
		tmp_wrapperTemplate = "";
		tmp_ulTemplate = "";
		tmp_liTemplate = "";
	}
	

	
	


}

