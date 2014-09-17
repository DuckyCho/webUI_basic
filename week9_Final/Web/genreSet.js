//json파일을 읽어서 genre 리스트를 세팅한다.
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


//genre버튼을 눌럿을때 이벤트 리스너 등록
function bookGenreButtonEventListener(){
	var bookGenreButton = document.querySelector("#genre_button");
	bookGenreButton.addEventListener('click',function(ev){ genreSetShowHide(ev); },false);
}


//장르버튼을 눌렀을때 실행될 콜백펑션
//상태에따라 장르리스트를 보여주고 숨김
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

//장르 리스트를 보여주는 함수
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

//장르 리스트를 가리는 함수
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


//장르리스트 보여주는 애니메이션
function genreSetShowHide_Animation(eleGenreSet, currentTime, startValue, changeInValue, duration, genreSetInterval){
	
	var heightValue = easeOutQuad(currentTime, startValue, changeInValue, duration);	

	eleGenreSet.style.height = heightValue + "px";
	
	if(heightValue === startValue+changeInValue){
		
		if(changeInValue < 0)
			eleGenreSet.setAttribute('style','display : none;')
		
		clearInterval(genreSetInterval);
	}

}

//현재 페이지가 어떤 장르의 책들을 보여줘야하는지 알기위해
//현재 페이지가 어떤 장르인지를 리턴해주는 함수
function currentPageGenre(){
	return document.querySelector("#genre_button").innerText;
}

//장르 리스트들중 하나를 클릭했을때, 이벤트리스너
function bookGenreListEventListener(bookList){
	var genreSet = document.querySelector("#genre_set");
	genreSet.addEventListener('click',function(ev){
		newGenreLoad(ev,bookList);
	},false)

}

//새로운 장르를 선택했을때, json파일을 이용해서 책목록을 바꾸는 함수.
function newGenreLoad(ev, bookList){
	var genre = ev.target.innerText;
	bookListSet(bookList, genre.trim(), 9);
	genreButtonSet(genre);
	moreButtonEventListener(bookList);
}

//장르 리스트들중 하나의 장르를 선택했을때, 장르버튼에 뜨는 글자 변경
function genreButtonSet(genre){
	var genreButton = document.querySelector("#genre_button");
	genreButton.innerText = genre;
	genreButton.setAttribute('style',"font : 1.3em bold 'SourceHanSansKR';width: 7em;left: 1em;");

}

