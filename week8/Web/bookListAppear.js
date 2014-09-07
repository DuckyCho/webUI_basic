innerHtmlSet();
var genreBookSet = document.querySelector("#genre_set");
genreBookSet.addEventListener('click',bookListAppear,false);


function bookListAppear(ev){
	genreButtonPropertySet(ev);
	innerHtmlSet(ev);
	moreButtonEventRegister();
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
	var bookListCounter = 0;
	var sectionInProgress ="";
	
	if(ev){
		var booklist_selector = getLiNumber(ev);
		var Ssection_title = section_title;
	}
	else{
		booklist_selector = 0;
		var Ssection_title = section_title_main;
	}

	var bookList = wholeBookListSet[booklist_selector].listName;
	
	
	var wrapper = "<ul>";
	for( var i = 0 ; i < Ssection_title.length ;  i++){
		var sectionTemplate = "<li><section><div class = \"section title\"><div class=\"section title description\"><h1> <%=section_title_h1%> </h1><h3> <%=section_title_h3%> </h3></div><div class = \"section title more_button\"><button>더보기</button></div></div><div class = \"contents\"><ul> ";
		
		sectionTemplate = sectionTemplate.replace("<%=section_title_h1%>",Ssection_title[i].h1);
		sectionTemplate = sectionTemplate.replace("<%=section_title_h3%>",Ssection_title[i].h3);

			for(var j = 0 ; j < wholeBookListSet[booklist_selector].listName.length / Ssection_title.length -1 ; j++){
				var sectionInnerTemplate = "<li>	<div class = \"contents book_wrapper\">	<div class=\"contents book_img\"><a href=\" <%=bookListSrc%> \">	<div class=\"outer\"><div class=\"inner\"><img src=\" <%=bookListImgsrc%> \">	</div></div></a>	</div>	<div class=\"contents book_description\"><div class = \"contents book_description title_author\"><div class = \"shadow\"></div>	<dl><dt> <%=bookListName%> </dt><dd> <%=bookListAuthor%> </dd></dl></div>	<div class = \"contents book_description price\"> <%=bookListPrice%> </div>	</div>	</div>	</li>"
				sectionInnerTemplate = sectionInnerTemplate.replace("<%=bookListSrc%>",bookList[bookListCounter].src);
				sectionInnerTemplate =sectionInnerTemplate.replace("<%=bookListName%>",bookList[bookListCounter].name);
				sectionInnerTemplate =sectionInnerTemplate.replace("<%=bookListImgsrc%>",bookList[bookListCounter].imgsrc);
				sectionInnerTemplate =sectionInnerTemplate.replace("<%=bookListAuthor%>",bookList[bookListCounter].author);
				sectionInnerTemplate = sectionInnerTemplate.replace("<%=bookListPrice%>",bookList[bookListCounter].price);
				sectionTemplate+=sectionInnerTemplate;
				bookListCounter++;
			}

		sectionTemplate += "</section></li>";
		sectionInProgress += sectionTemplate;
	}
	

	wrapper += sectionInProgress;
	wrapper += "</ul>";
	booklist_selector = (booklist_selector+1)%4;
	return wrapper;
}



function getLiNumber(ev){
	var liNumber;
	var parent = ev.target.parentElement
	for(var i = 0 ; i < parent.children.length ; i ++){
		if(parent.children[i].innerText === ev.target.innerText){
			if(i >= 14)
				liNumber = Math.floor(Math.random()*10);
			else
				liNumber = i;

			break;
		}
	}

	return liNumber;
}