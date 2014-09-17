
function moreButtonEventRegister(){
	var eleMoreButtons = document.querySelectorAll(".moreButton");
	moreButtonEventImplement(eleMoreButtons)
}

function moreButtonEventImplement(eleMoreButtons){
	for ( var i = 0 ; i < eleMoreButtons.length ; i++){
		eleMoreButtons[i].addEventListener('click',bookListShowHide)
	}
}


function bookListShowHide(ev){
	var lineUpWrapper = ev.target.parentElement.parentElement.querySelector("ul").parentElement;
	var ulEle = lineUpWrapper.querySelector("ul");
	//접기 버튼을 눌렀을 때(책 목록 접을 때)
	if( lineUpWrapper.style.height === ""){
		ev.target.innerText = ("더보기");
		bookListHeightSet(getBookHeight())
		swipingEventRegister();
	}
	//더보기 버튼을 눌렀을 때(책 목록 더 볼때)
	else{
		ev.target.innerText = ("접 기");
		ulEle.removeAttribute('style');
		lineUpWrapper.removeAttribute('style');
		bookListMarginSet(getBookMargin());
		swipingEventRemover();
	}
	
}
