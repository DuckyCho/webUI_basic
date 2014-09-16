moreButtonEventRegister();


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
	lineUpWrapper.querySelector("ul").removeAttribute("style");

	if( lineUpWrapper.style.overflow === ""){
		lineUpWrapper.removeAttribute("style");
		lineUpWrapper.style.overflow = "visible";
		swipingEventRemover();
		removeBookListBlur(lineUpWrapper.firstElementChild);
		
	}
	else{
		lineUpWrapper.removeAttribute("style");
		lineUpWrapper.firstElementChild.style.paddingLeft = lineUpWrapper.firstElementChild.firstElementChild.style.marginRight;
		swipingEventRegister();
		bookListHeightSet();
	}
	
}
