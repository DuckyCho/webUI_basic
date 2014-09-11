swipingEventRegister();

var touchStartPosX;
var touchEndPosX;

function swipingEventRemover(){
	var sections = document.querySelectorAll(".lineUp_wrapper");
	
		for(var i = 0 ; i < sections.length ; i++){
				sections[i].removeEventListener('touchstart',touchStartPosRegister);
				sections[i].removeEventListener('touchend',touchEndPosRegister);
		}
}

function swipingEventRegister(){
	var sections = document.querySelectorAll(".lineUp_wrapper");
	
	for(var i = 0 ; i < sections.length ; i++){
			sections[i].addEventListener('touchstart',touchStartPosRegister);
			sections[i].addEventListener('touchend',touchEndPosRegister);
	}

}

function touchStartPosRegister(ev){
	touchStartPosX = ev.changedTouches[0].clientX;
	
}

function touchEndPosRegister(ev){
	touchEndPosX = ev.changedTouches[0].clientX;
	var userTouchMove = touchStartPosX - touchEndPosX;
	
	//사용자의 터치가 스와이프 인지 판단
	if(Math.abs(userTouchMove) > 100){
		var ulEle = findULele(ev.target);
		if(ulEle.style.left === ""){
			ulEle.style.width = ulEle.childElementCount * (ulEle.children[0].clientWidth+removePx(ulEle.children[0].style.marginRight)) + 5 + "px";
			ulEle.style.position = "absolute"; 
			ulEle.style.left = removePx(ulEle.firstElementChild.style.marginRight)+"px"; 
		}
		
		swipe(userTouchMove,ev);
		
	}
			
}


function swipe(userTouchMove, ev){
	
	
	var Ulele = findULele(ev.target);
	var currentOnWindowFirstLiEle =  getFistLiEleOnWindow( removePx(Ulele.style.left) , Ulele);

	//startPos는 현재 화면의 첫번재 li의 offsetLeft이다.
	var UleleStartPosX = getStartPosX(Ulele,currentOnWindowFirstLiEle);

	//endPos는 다음 넘어갈 화면의 맨 마지막 li의 전 li의 offsetLeft이다.
	var UleleEndPosX = getEndPosX(Ulele,currentOnWindowFirstLiEle);

	//direction이 양수이면 왼쪽으로 이동 (스와이프 left) = 속도 음수
	//direction이 음수이면 오른쪽으로 이동 (스와이프 right) = 속도 양수
	var direction = Math.abs(userTouchMove)/userTouchMove;
	

	
	velocity = -25 * direction;
	acceleration = 0.85 * direction;

	//userTouchMove 가 0보다 작으면 스와이프 롸이트, 오브젝트는 오른쪽으로 움직여야함
	//속도는 양수가 되어야 하고, 가속도는 음수가 되어야한다.
	//direction, userTouchMove, 가속도 음수 , 속도 양수
	

	//userTouchMove 가 0보다 크면 스와이프 레프트, 오브젝트는 왼쪽으로 움직여야함
	//속도는 음수가 되어야 하고, 가속도는 양수가 되어야 한다.
	//direction, userTouchMove, 가속도 양수 , 속도 음수
	
	
	swipeInterval = setInterval( function(){
		move(direction,Ulele,UleleStartPosX,UleleEndPosX);
	},1);
	
}


function move(direction, Ulele, UleleStartPosX, UleleEndPosX){
	//direction이 양수이면 왼쪽으로 이동 (스와이프 left) = 속도 음수
	//direction이 음수이면 오른쪽으로 이동 (스와이프 right) = 속도 양수

	if(direction > 0 && UleleEndPosX < Math.abs(removePx(Ulele.style.left)) ){
		tmpPosX = UleleEndPosX;
		Ulele.style.left = removePx(Ulele.style.left)+velocity+"px" ;
		
		if(tmpPosX > Math.abs(removePx(Ulele.style.left)) ){
			Ulele.style.left = -UleleEndPosX + "px";
			bookListBlur(Ulele);
			clearInterval(swipeInterval);
		}

	}

	else if(direction < 0 &&  UleleStartPosX > -removePx(Ulele.style.left) ){
		tmpPosX = UleleStartPosX;
		Ulele.style.left = removePx(Ulele.style.left)+velocity+"px" ;

		if( tmpPosX > Math.abs(removePx(Ulele.style.left)) ){
			Ulele.style.left = -UleleStartPosX + "px";
			bookListBlur(Ulele);
			clearInterval(swipeInterval);
		}

	}

	else{
		Ulele.style.left = removePx(Ulele.style.left)+velocity+"px" ;
		tmpPosX = removePx(Ulele.style.left);
	}
	velocity += acceleration;
}



function findULele(ele){
	var Ulele
	if(ele.tagName === "UL")
		return ele
	else
		return Ulele = findULele(ele.parentElement);
}


function removePx(ele){
	return ele.replace("px","") *1;
}



function getFistLiEleOnWindow(currentLeftPos, UlEle){
	for(var i = 0 ; i < UlEle.children.length ; i++){
		if( Math.abs(currentLeftPos) <= UlEle.children[i].offsetLeft){
			return UlEle.children[i];
		}
	}
}



function getStartPosX(Ulele,currentOnWindowFirstLiEle){
	 	if(currentOnWindowFirstLiEle === Ulele.firstElementChild){
	 		Ulele.style.left = removePx(Ulele.firstElementChild.style.marginRight) + "px";
	 		return removePx(Ulele.firstElementChild.style.marginRight);
	 	}
	 	else{
	 		return currentOnWindowFirstLiEle.previousElementSibling.previousElementSibling.offsetLeft;
	 	}
}

function getEndPosX(Ulele,currentOnWindowFirstLiEle){
	 	if(currentOnWindowFirstLiEle === Ulele.lastElementChild.previousElementSibling){
	 		return currentOnWindowFirstLiEle.offsetLeft;
	 	}
	 	else{
	 		return currentOnWindowFirstLiEle.nextElementSibling.nextElementSibling.offsetLeft;
	 	}
}



function bookListBlur(ulEle){
	var currentOnWindowFirstLiEle =  getFistLiEleOnWindow( removePx(ulEle.style.left) , ulEle);

	if(currentOnWindowFirstLiEle === ulEle.lastElementChild.previousElementSibling)
		removeBookListBlur(ulEle);
	else
		setBookListBlur(ulEle);
}

function setBookListBlur(ulEle){
	ulEle.nextElementSibling.setAttribute("style","float:right");
	ulEle.nextElementSibling.style.width = "20%";
	ulEle.nextElementSibling.style.height = "100%";
	ulEle.nextElementSibling.style.position = "absolute";
	ulEle.nextElementSibling.style.right = "0";
	
	ulEle.nextElementSibling.style.backgroundImage = "-webkit-linear-gradient(left,rgba(229,229,229,0),rgba(229,229,229,1))";
}

function removeBookListBlur(ulEle){
	ulEle.nextElementSibling.removeAttribute("style");
}


