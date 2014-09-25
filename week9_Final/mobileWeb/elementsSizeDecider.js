
function elementsSizeSet(){
	//책div의 너비,높이,div사이의 간격을 받아서 변수에 저장
	var bookWidth = getBookWidth();
	var bookMargin = getBookMargin();
	var bookHeight = getBookHeight();
	
    //저장된 변수에 따라 책div의 사이즈 setting
	bookListWidthSet(bookWidth);
	bookListMarginSet(bookMargin);
	bookListHeightSet(bookHeight);
}


function getBookWidth(){
    //전체 창 너비의 0.8의 반으로 책div의 너비를 설정 (한 화면에 책은 2개씩 나옴)
	var bodyWidth = document.querySelector("body").clientWidth;
	return (bodyWidth * 0.8) / 2;
}

function getBookMargin(){
    //전체 창 너비의 0.17을 3으로 나눈 만큼을 책div 사이의 margin으로 지정
	var bodyWidth = document.querySelector("body").clientWidth;
 	return bodyWidth *0.17 / 3;
}

function getBookHeight(){
    //전체 창 높이의 반으로 책 div 높이를 정함
	return window.innerHeight * 0.5 ;
}


function bookListWidthSet(bookWidth){
    //책div를 감싸고 있는 ulElements를 찾는다.
    //ulElements의 li들의 너비값을 인자로 받은 값으로 setting한다.
	var ulEle = document.querySelectorAll(".lineUp_wrapper ul");
    var ulEleLength = ulEle.length;
	for(var i = 0 ; i < ulEleLength ; i ++){
        var ulEleChildrenLength = ulEle[i].children.length;
		for(var j = 0 ; j < ulEleChildrenLength ; j++){
			ulEle[i].children[j].style.width = bookWidth + "px";
		}
	}

}


function bookListMarginSet(bookMargin){
    //책div를 감싸고 있는 ulElements를 찾는다.
    //ulElements의 li들의 margin right 값을 인자로 받은 값으로 setting한다.
    //ulElement의 paddingLeft값 또한 인자로 받은 값으로 setting
	var ulEle = document.querySelectorAll(".lineUp_wrapper ul");
    var ulEleLength = ulEle.length;
	for(var i = 0 ; i < ulEle.length ; i ++){
        var ulEleChildrenLength = ulEle[i].children.length;
		for(var j = 0 ; j < ulEleChildrenLength ; j++){
			ulEle[i].children[j].style.marginRight = bookMargin + "px";
		}
		ulEle[i].style.paddingLeft = bookMargin + "px";
		
	}
}


function bookListHeightSet(bookHeight){
    //책div를 감싸고 있는 ulElements를 찾는다.
    //ulElements의 li들의 height값을 인자로 받은 값으로 setting한다.
    //ulElements의 li들 안의 img(책 이미지)는 전채 책div높이의 70%로 한다.
    
	var lineUpWrapperEle = document.querySelectorAll(".lineUp_wrapper");
	var ulEle = document.querySelectorAll(".lineUp_wrapper ul");
    var ulEleLength = ulEle.length;
	var imgHeight = bookHeight * 0.7;
    
	for(var i = 0 ; i < ulEleLength ; i ++){
		lineUpWrapperEle[i].style.height = bookHeight + "px";
        var ulEleChildrenLength = ulEle[i].children.length;
		for(var j = 0 ; j < ulEleChildrenLength ; j++){
			ulEle[i].children[j].querySelector("img").style.height = imgHeight + "px";
			ulEle[i].children[j].querySelector(".bookDescription_wrapper").style.height = bookHeight - imgHeight + "px";
		}
	}
}