function easeInOutQuint (currentTime, startValue, changeInValue, duration){
	currentTime /= duration/2;

	
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