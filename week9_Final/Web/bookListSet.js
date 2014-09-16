function bookListSet(bookList, genre, bookListNum){
	
	var contents = document.querySelectorAll(".contents");
	var genreSet = [];
	var i = 0;
	var bookListObjKeys = Object.keys(bookList);
	
	
	for( var bookGenre in bookListObjKeys){
		genreSet.push(eval("bookList."+bookListObjKeys[bookGenre]+"["+i.toString()+"].title"));
	}
	
	for(var count in genreSet){
		if(genre === genreSet[count]){
			var bookListKey = bookListObjKeys[count];
			bookListInnerHTMLset(bookList,bookListKey,bookListNum);
		}
	}

}


function bookListInnerHTMLset(bookList, bookListKey, bookListNum){
	
	var section_title_template = "<li><section><div class = \"section title\"><div class=\"section title description\"><h1><%h1%></h1><h3><%h3%></h3></div><div class = \"section title more_button\"><button>더보기</button></div></div><div class=\"section background_img\"></div><div class = \"contents\"><ul><%contentsTemplate%></ul></div></section></li>";
	var contents_template ="<li><div class = \"contents book_wrapper\"><div class=\"contents book_img\"><a href=\"<%src%>\"><div class=\"outer\"><div class=\"inner\"><img src=\"<%imgsrc%>\"></div></div></a></div><div class=\"contents book_description\"><div class = \"contents book_description title_author\"><div class = \"shadow\"></div><dl><dt><%name%></dt><dd><%author%></dd></dl></div><div class = \"contents book_description price\"><%price%></div></div></div></li>";

	var tmp_section_title_template ="";
	var tmp_contents_template ="";
	var innerHTMLresult ="";

	var bookListCommand = "bookList." + bookListKey;
	bookListCommand = eval(bookListCommand);
	
	var howManyBooks = 0;
	for(var i in bookListCommand){
		tmp_section_title_template += section_title_template;
		tmp_section_title_template = tmp_section_title_template.replace("<%h1%>",bookListCommand[i].h1);
		tmp_section_title_template = tmp_section_title_template.replace("<%h3%>",bookListCommand[i].h3);
		
		for(var j = 0 ;  j < (hawManyBooks = bookListNum < 0 ? bookListCommand[i].bookList.length : bookListNum) ; j++ ){
			tmp_contents_template += contents_template;
			tmp_contents_template = tmp_contents_template.replace("<%name%>",bookListCommand[i].bookList[j].name);
			tmp_contents_template = tmp_contents_template.replace("<%author%>",bookListCommand[i].bookList[j].author);
			tmp_contents_template = tmp_contents_template.replace("<%price%>",bookListCommand[i].bookList[j].price);
			tmp_contents_template = tmp_contents_template.replace("<%src%>",bookListCommand[i].bookList[j].src);
			tmp_contents_template = tmp_contents_template.replace("<%imgsrc%>",bookListCommand[i].bookList[j].imgsrc);
		}

		tmp_section_title_template = tmp_section_title_template.replace("<%contentsTemplate%>",tmp_contents_template);
		innerHTMLresult += tmp_section_title_template;
		tmp_section_title_template ="";
		tmp_contents_template ="";
	}

	document.querySelector(".contents_wrapper > ul").innerHTML = innerHTMLresult;

}


function bookListLoad(bookList, contentsEle){

	var genre = currentPageGenre();
	var genreSet = [];
	var i = 0;
	var bookListObjKeys = Object.keys(bookList);
	
	for( var bookGenre in bookListObjKeys){
		genreSet.push(eval("bookList."+bookListObjKeys[bookGenre]+"["+i.toString()+"].title"));
	}
	
	for(var count in genreSet){
		if(genre === genreSet[count]){
			var bookListKey = bookListObjKeys[count];
		}
	}

	var sectionTitleEle = contentsEle.parentElement.querySelector(".section.title.description h1");
	
	var ulEle = contentsEle.querySelector("ul");
	


	var contents_template ="<li><div class = \"contents book_wrapper\"><div class=\"contents book_img\"><a href=\"<%src%>\"><div class=\"outer\"><div class=\"inner\"><img src=\"<%imgsrc%>\"></div></div></a></div><div class=\"contents book_description\"><div class = \"contents book_description title_author\"><div class = \"shadow\"></div><dl><dt><%name%></dt><dd><%author%></dd></dl></div><div class = \"contents book_description price\"><%price%></div></div></div></li>";
	var tmp_contents_template = "";
	var innerHTMLresult = "";
	var bookListCommand = "bookList." + bookListKey;
	bookListCommand = eval(bookListCommand);

	for(var j = 0 ; j < bookListCommand.length ; j++){
		if(bookListCommand[j].h1.trim() === sectionTitleEle.innerText.trim() && ulEle.children.length != bookListCommand[j].bookList.length ){
			for(var q = 9 ; q < bookListCommand[j].bookList.length ; q++){
				tmp_contents_template += contents_template;
				tmp_contents_template = tmp_contents_template.replace("<%name%>" ,bookListCommand[j].bookList[q].name);
				tmp_contents_template = tmp_contents_template.replace("<%src%>" ,bookListCommand[j].bookList[q].src);
				tmp_contents_template = tmp_contents_template.replace("<%imgsrc%>" ,bookListCommand[j].bookList[q].imgsrc);
				tmp_contents_template = tmp_contents_template.replace("<%price%>" ,bookListCommand[j].bookList[q].price);
				tmp_contents_template = tmp_contents_template.replace("<%author%>" ,bookListCommand[j].bookList[q].author);	
				innerHTMLresult += tmp_contents_template;
				tmp_contents_template = "";
			}	
		}

	}
	
	ulEle.innerHTML += innerHTMLresult;

}

