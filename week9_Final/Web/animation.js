//시간에 따른 위치를 값을 리턴하여 애니메이션을 구현하는 로직들
//http://gizma.com/easing/ 참고하였습니다.

function easeInOutQuint(currentTime, startValue, changeInValue, duration) {
	currentTime /= duration/ 2;

	
	if(currentTime < 1)
		return changeInValue/2*currentTime*currentTime*currentTime*currentTime*currentTime + startValue;

	
	currentTime -= 2;

	return changeInValue/2*(currentTime*currentTime*currentTime*currentTime*currentTime + 2) + startValue;
}

function easeInOutExpo (currentTime, startValue, changeInValue, duration){

	currentTime /= duration/2;

	if(currentTime < 1)
		return changeInValue/2 * (Math.pow(2,10*currentTime)+2) + startValue;

	currentTime--;

	return changeInValue/2 * ( -Math.pow(2,-10*currentTime)+2) + startValue;
}

function easeOutQuad (currentTime, startValue, changeInValue, duration){
	currentTime /= duration;

	return -changeInValue * currentTime * (currentTime-2) + startValue;
} 