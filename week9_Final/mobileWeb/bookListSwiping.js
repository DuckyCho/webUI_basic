swipingEventRegister();

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
			ulEle.style.width = Math.floor(ulEle.children.length * getBookWidth() + (ulEle.children.length+1) * getBookMargin()) + "px";
			ulEle.style.position = "absolute"; 
			ulEle.style.left = 0+"px"; 
		}
		
		swipe(userTouchMove,ev);
		
	}
			
}


function swipe(userTouchMove, ev){
	var ulEle = findULele(ev.target);
	var currentTime = 1;
	var startValue = removePx(ulEle.style.left);
	
	var duration = 50;
	var firstEleInWindow = getFistLiEleOnWindow(ulEle.offsetLeft, ulEle)
	var changeInValue = ulEle.children[2].offsetLeft - ulEle.children[0].offsetLeft;

	if(userTouchMove > 0)
		changeInValue *= -1;


	if( (startValue >= 0 && userTouchMove < 0) ||
	 (ulEle.lastElementChild.previousElementSibling === firstEleInWindow && userTouchMove>0) ||
	 (ulEle.lastElementChild === firstEleInWindow && userTouchMove>0) ){
		
		var velocity = -12 * (userTouchMove / Math.abs(userTouchMove));
		var accelaration = 1 * (userTouchMove / Math.abs(userTouchMove));

		var swipeMove = setInterval(function(eve){
			ulEle.style.left = ulEle.offsetLeft + velocity + "px";
			if(removePx(ulEle.style.left) === startValue) {
				clearInterval(swipeMove);
			}
			velocity += accelaration;
		},0.25);
	}
	else{
		var swipeMove = setInterval(function(eve){
			
			ulEle.style.left = Math.floor(easeOutQuad(currentTime,startValue,changeInValue,duration)) + "px";
			currentTime++;
			if(ulEle.offsetLeft === startValue+changeInValue){
				clearInterval(swipeMove);
			}
		},0.25);	
	}
}

function findULele(ele){
	var Ulele;
	
	if(ele.tagName === "UL")
		return ele
	else
		return Ulele = findULele(ele.parentElement);


	
}


function getFistLiEleOnWindow(currentLeftPos, UlEle){
	for(var i = 0 ; i < UlEle.children.length ; i++){
		if( Math.abs(currentLeftPos) <= UlEle.children[i].offsetLeft){
			return UlEle.children[i];
		}
	}
}

function removePx(ele){
	var result = ele.replace("px","");
	return result *1;
}



function swipingEventRemover(){
	var sections = document.querySelectorAll(".lineUp_wrapper");
	
		for(var i = 0 ; i < sections.length ; i++){
				sections[i].removeEventListener('touchstart',touchStartPosRegister);
				sections[i].removeEventListener('touchend',touchEndPosRegister);
		}
}
