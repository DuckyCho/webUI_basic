//책div를 감싸고 있는 ul에 스와이핑 이벤트 리스너 등록
function swipingEventRegister(){
	var sections = document.querySelectorAll(".lineUp_wrapper");
	var sectionLength = sections.length;
	for(var i = 0 ; i < sectionLength ; i++){
			sections[i].addEventListener('touchstart',touchStartPosRegister);
			sections[i].addEventListener('touchend',touchEndPosRegister);
	}

}

//touchstart시 시작X좌표를 등록
function touchStartPosRegister(ev){
	touchStartPosX = ev.changedTouches[0].clientX;	
}

//touchend시 끝X좌표를 등록, touchstart X좌표와 비교하여 변위가 100이상인지 판단
//변위가 100이상일경우 스와이프 시작(스와이프를 애니메이션을 시작하면서 중복 스와이핑을 방지하기위해 스와이프 이벤트리스너를 제거한다.)
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
		
		swipingEventRemover();
		swipe(userTouchMove,ev);

		
	}
			
}


function swipe(userTouchMove, ev){
	
    var ulEle = findULele(ev.target);
	var currentTime = 1;
	var startValue = removePx(ulEle.style.left);
	
	var duration = 50;
	var firstEleInWindow = getFistLiEleOnWindow(ulEle.offsetLeft, ulEle)
	//스와이프로 ul의 left값을 변경. 얼마나 left값이 변해야 하는지를 정함
    var changeInValue = ulEle.children[2].offsetLeft - ulEle.children[0].offsetLeft;

    //만약 swipe left일 경우 변할 값이 음수가 되어야 하므로 *-1한다.
	if(userTouchMove > 0)
		changeInValue *= -1;

    //제일 첫번째 책 목록 혹은 제일 마지막 책 목록에서 스와이핑 할 경우 다시 원래 자리로 되돌아오는 애니메이션 구현
	if( (startValue >= 0 && userTouchMove < 0) ||
	 (ulEle.lastElementChild.previousElementSibling === firstEleInWindow && userTouchMove>0) ||
	 (ulEle.lastElementChild === firstEleInWindow && userTouchMove>0) ){
		
		var velocity = -12 * (userTouchMove / Math.abs(userTouchMove));
		var accelaration = 1 * (userTouchMove / Math.abs(userTouchMove));

		var swipeMove = setInterval(function(eve){
			ulEle.style.left = ulEle.offsetLeft + velocity + "px";
			if(removePx(ulEle.style.left) === startValue) {
				clearInterval(swipeMove);
				swipingEventRegister();
			}
			velocity += accelaration;
		},0.25);
	}
    //보통의 스와이프 애니메이션 구현
	else{
		var swipeMove = setInterval(function(eve){
			
			ulEle.style.left = Math.floor(easeOutQuad(currentTime,startValue,changeInValue,duration)) + "px";
			currentTime++;
			if(ulEle.offsetLeft === startValue+changeInValue){
				clearInterval(swipeMove);
				swipingEventRegister();
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

