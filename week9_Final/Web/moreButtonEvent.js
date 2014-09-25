//더보기 버튼을 눌렀을때, 더보기 버튼 이벤트리스너
function moreButtonEventListener(bookList){
	var moreButtons = document.querySelectorAll(".section.title.more_button");
    var moreButtonsLength = moreButtons.length;
	for(var i = 0 ; i < moreButtonsLength ; i++){
		moreButtons[i].addEventListener('click',function(ev){
			bookListShowHide(ev, bookList);
		},false);
	}
}


//상황에 따라서 책목록을 더 보여주거나 숨기거나 하는 함수
function bookListShowHide(ev, bookList){
	
	var currentPage = currentPageGenre();
	var contentsEle = ev.target.parentElement.parentElement.parentElement.querySelector(".contents");
	var ulEle = contentsEle.querySelector("ul");

	if(ulEle.style.overflow === "" || ulEle.style.overflow === "hidden"){
		bookListLoad(bookList,contentsEle);
		bookListShow(contentsEle,ulEle);
		ev.target.innerText = "접 기";
	}
	else{
		bookListHide(contentsEle,ulEle);
		ev.target.innerText = "더보기";
	}

}

//책 목록을 보여주는 함수
//더보기를 누르면 책div를 감싸고 있는 ul의 overflow속성을 visible로 바꾸고
//ul의 상위 div인 contents div의 height값을 조절하여 애니메이션 구현
function bookListShow(contentsEle, ulEle){
	ulEle.style.overflow = "visible";
	var currentTime = 0;
	var startValue = ulEle.children[0].clientHeight;
	var changeInValue = contentsEle.clientHeight - startValue;
	var duration = 80;
	contentsEle.style.height = startValue + "px";
	
	var bookListShowInterval = setInterval(function(){
		bookListShowHideAnmation(contentsEle,currentTime,startValue,changeInValue,duration,bookListShowInterval) + "px"; 
		currentTime++;
	},0.1);
}

//접기를 누르면 책div를 덮고있는 ul의 overflow속성을 hidden으로 바꾼다.
function bookListHide(contentsEle, ulEle){
	ulEle.style.overflow = "hidden";
	contentsEle.removeAttribute('style');
}

function bookListShowHideAnmation(contentsEle,currentTime,startValue,changeInValue,duration,bookListInterval){
	var resultValue =  easeInOutQuint(currentTime,startValue,changeInValue,duration)
	
	contentsEle.style.height = resultValue + "px";

	if(resultValue === changeInValue+startValue){
		clearInterval(bookListInterval)
	}

	
}

