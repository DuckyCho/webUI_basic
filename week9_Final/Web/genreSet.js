function bookGenreListSet(bookList){
	
	var bookObjKey = Object.keys(bookList);
	var eleGenreSet	= document.querySelector("#genre_set");
	var genreSetTemplate = "<li><%bookGenre%></li>";
	

	for(var i = 1; i < bookObjKey.length ; i++){
		var key = bookObjKey[i];
		var liTemplate = eval("bookList."+key+"[0].title");
		
		if(liTemplate)
			eleGenreSet.innerHTML += genreSetTemplate.replace("<%bookGenre%>",liTemplate);
	}
}



function bookGenreButtonEventListener(){
	var bookGenreButton = document.querySelector("#genre_button");
	bookGenreButton.addEventListener('click',function(ev){ genreSetShowHide(ev); },false);
}


function genreSetShowHide(ev){
	ev.stopPropagation();
	var eleGenreSet = document.querySelector("#genre_set");
	var eleGenreSetStyle_display = eleGenreSet.style.display;
	
	document.addEventListener('click',function(ev){
		genreSetHide(document.querySelector("#genre_set"));
	},false);

	//장르셋 보이기
	if(eleGenreSetStyle_display === "" || eleGenreSetStyle_display === "none"){
		genreSetShow(eleGenreSet);
	}
	
	//장르셋 숨기기
	else {
		genreSetHide(eleGenreSet);
	}

	userMenuHide(document.querySelector("#userMenu_outer"))

}

function genreSetShow(eleGenreSet){

	var currentTime = 1;
	var startValue;
	var changeInValue;
	var duration = 8;
	var animationFrequency = 22;

	eleGenreSet.setAttribute('style','display : block;');
	startValue = 0;
	changeInValue = eleGenreSet.clientHeight;
	eleGenreSet.style.height = "0px";

	var genreSetInterval = setInterval(function(){
			genreSetShowHide_Animation(eleGenreSet,currentTime,startValue,changeInValue,duration,genreSetInterval);
			currentTime++;
	},animationFrequency);
}


function genreSetHide(eleGenreSet){
	var currentTime = 1;
	var startValue;
	var changeInValue;
	var duration = 8;
	var animationFrequency = 22;

	startValue = eleGenreSet.clientHeight;
	changeInValue = -542;

	var genreSetInterval = setInterval(function(){
			genreSetShowHide_Animation(eleGenreSet,currentTime,startValue,changeInValue,duration,genreSetInterval);
			currentTime++;
	},animationFrequency);
}



function genreSetShowHide_Animation(eleGenreSet, currentTime, startValue, changeInValue, duration, genreSetInterval){
	
	var heightValue = easeOutQuad(currentTime, startValue, changeInValue, duration);	

	eleGenreSet.style.height = heightValue + "px";
	
	if(heightValue === startValue+changeInValue){
		
		if(changeInValue < 0)
			eleGenreSet.setAttribute('style','display : none;')
		
		clearInterval(genreSetInterval);
	}

}


function currentPageGenre(){
	return document.querySelector("#genre_button").innerText;
}


function bookGenreListEventListener(bookList){
	var genreSet = document.querySelector("#genre_set");
	genreSet.addEventListener('click',function(ev){
		newGenreLoad(ev,bookList);
	},false)

}

function newGenreLoad(ev, bookList){
	var genre = ev.target.innerText;
	bookListSet(bookList, genre.trim(), 9);
	genreButtonSet(genre);
	moreButtonEventListener(bookList);
}

function genreButtonSet(genre){
	var genreButton = document.querySelector("#genre_button");
	genreButton.innerText = genre;
	genreButton.setAttribute('style',"font : 1.3em bold 'SourceHanSansKR';width: 7em;left: 1em;");

}

