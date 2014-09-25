//화면에 책들을 보여주는 함수들


//bookListSet : ajax통신으로 받은 json파일에 책들의 정보를 genre값에 따라 화면에 뿌려주는 함수
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


//section tag에 html을 템플릿에 따라 바꾸는 함수
//책 리스트들을 바꾼다.
//bookListNum인자를 받아서 json에서 몇개의 책을 불러올지를 결정한다.
//첫화면을 로드할때는 책을 9개만 받아서 화면에 띄움 
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
		var howManyBooks = bookListNum < 0 ? bookListCommand[i].bookList.length : bookListNum;
		for(var j = 0 ;  j < howManyBooks ; j++ ){
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

//더보기 버튼을 눌렀을 때, json파일을 추가로 읽어들여서 책목록을 완성
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
			var bookListCommandBookListLength = bookListCommand[j].bookList.length;
            for(var q = 9 ; q < bookListCommandBookListLength ; q++){
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

