//더보기 버튼을 눌렀을때, 더보기 버튼 이벤트리스너
function moreButtonEventListener(bookList){
	moreButtons = document.querySelectorAll(".section.title.more_button");

	for(var i = 0 ; i < moreButtons.length ; i++){
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

