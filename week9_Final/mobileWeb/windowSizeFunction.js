function windowSizeModifyEventRegister(){
    
    //창의 크기가 변화되면 책div의 크기를 변경한다.
    //elementsSizeSet함수를 수행
    //elementsSizeDecider.js에 있음
	window.addEventListener('resize',elementsSizeSet);
}