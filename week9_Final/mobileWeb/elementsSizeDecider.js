
function elementsSizeSet(){
	
	var bookWidth = getBookWidth();
	var bookMargin = getBookMargin();
	var bookHeight = getBookHeight();
	
	bookListWidthSet(bookWidth);
	bookListMarginSet(bookMargin);
	bookListHeightSet(bookHeight);
}


function getBookWidth(){
	var bodyWidth = document.querySelector("body").clientWidth;
	return (bodyWidth * 0.8) / 2;
}

function getBookMargin(){
	var bodyWidth = document.querySelector("body").clientWidth;
 	return bodyWidth *0.17 / 3;
}

function getBookHeight(){
	return window.innerHeight * 0.5 ;
}


function bookListWidthSet(bookWidth){
	var ulEle = document.querySelectorAll(".lineUp_wrapper ul");

	for(var i = 0 ; i < ulEle.length ; i ++){
		for(var j = 0 ; j < ulEle[i].children.length ; j++){
			ulEle[i].children[j].style.width = bookWidth + "px";
		}
	}

}


function bookListMarginSet(bookMargin){
	var ulEle = document.querySelectorAll(".lineUp_wrapper ul");

	for(var i = 0 ; i < ulEle.length ; i ++){
		for(var j = 0 ; j < ulEle[i].children.length ; j++){
			ulEle[i].children[j].style.marginRight = bookMargin + "px";
		}
		ulEle[i].style.paddingLeft = bookMargin + "px";
		
	}
}


function bookListHeightSet(bookHeight){
	var lineUpWrapperEle = document.querySelectorAll(".lineUp_wrapper");
	var ulEle = document.querySelectorAll(".lineUp_wrapper ul");
	
	var imgHeight = bookHeight * 0.7;
	for(var i = 0 ; i < ulEle.length ; i ++){
		lineUpWrapperEle[i].style.height = bookHeight + "px";
		for(var j = 0 ; j < ulEle[i].children.length ; j++){
			ulEle[i].children[j].querySelector("img").style.height = imgHeight + "px";
			ulEle[i].children[j].querySelector(".bookDescription_wrapper").style.height = bookHeight - imgHeight + "px";
		}
	}
}