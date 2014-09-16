function moreButtonEventListener(bookList){
	moreButtons = document.querySelectorAll(".section.title.more_button");

	for(var i = 0 ; i < moreButtons.length ; i++){
		moreButtons[i].addEventListener('click',function(ev){
			bookListShowHide(ev, bookList);
		},false);
	}
}



function bookListShowHide(ev, bookList){
	
	var currentPage = currentPageGenre();
	var contentsEle = ev.target.parentElement.parentElement.parentElement.querySelector(".contents");
	var ulEle = contentsEle.querySelector("ul");

	if(ulEle.style.overflow === "" || ulEle.style.overflow === "hidden"){
		bookListLoad(bookList,contentsEle);
		bookListShow(contentsEle,ulEle);
	}
	else
		bookListHide(contentsEle,ulEle);

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

