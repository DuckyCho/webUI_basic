

var genreBookSet = document.querySelector("#genre_set");

genreBookSet.addEventListener('click',bookListAppear,false);


function bookListAppear(ev){
	genreButtonPropertySet(ev);
	innerHtmlSet(ev);
	
}


function genreButtonPropertySet(ev){
	var genreButton = document.querySelector("#genre_button");
	genreButton.innerText=ev.target.innerText;
	genreButton.style.width = "150px";
	genreButton.style.font = "20px bold 'SourceHanSansKR'";
	genreButton.style.lineHeight = "2";
	genreButton.style.left = "18px";
}


function innerHtmlSet(ev){
	var eleContents = document.querySelector(".contents_wrapper");
	var script =""
	script = htmlScriptSet(ev);
	eleContents.innerHTML = script;
}


function htmlScriptSet(ev){

	var wrapper = "<ul>";
	var booklist_selector = Math.floor(Math.random()*10000%4)
	var bookList;
	var bookListCounter = 0;
	var section_title = [{h1:"새로나온 도서",h3:""},{h1:"베스트셀러",h3:""}]
	var sectionInProgress ="";
	
	if(booklist_selector === 0){
		bookList = aBookList;
	}
	else if(booklist_selector === 1){
		bookList = bBookList;
	}
	else if(booklist_selector === 2){
		bookList = cBookList;
	}
	else{
		bookList = dBookList;
	}

	
	for( var i = 0 ; i < 2  ;  i++){
		
		var section ="<li><section><div class = \"section title\"><div class=\"section title description\"><h1>"
		section +=section_title[i].h1;
		section +="</h1><h3>"
		section +=section_title[i].h3;
		section +="</h3></div><div class = \"section title more_button\"><button>더보기</button></div></div><div class = \"contents\"><ul> "

			for(var j = 0 ; j < 10 ; j++){
				
				section +="<li>	<div class = \"contents book_wrapper\">	<div class=\"contents book_img\"><a href=\""
				//src
				section += bookList[bookListCounter].src;
				section += "\">	<div class=\"outer\"><div class=\"inner\"><img src=\"";
				//imgsrc address
				section += bookList[bookListCounter].imgsrc;
				section +="\">	</div></div></a>	</div>	<div class=\"contents book_description\"><div class = \"contents book_description title_author\"><div class = \"shadow\"></div>	<dl><dt>";
				//name
				section += bookList[bookListCounter].name;
				section +="</dt><dd>";
				//author
				section +=bookList[bookListCounter].author;;
				section +="</dd></dl></div>	<div class = \"contents book_description price\">";
				//price
				section +=bookList[bookListCounter].price;
				section +="</div>	</div>	</div>	</li>";
				bookListCounter++;
			}

		section += "</section></li>";
		sectionInProgress += section;

	}
	

	wrapper += sectionInProgress;
	wrapper += "</ul>";

	return wrapper;
}


