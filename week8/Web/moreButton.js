
moreButtonEventRegister();

function moreButtonEventRegister(){
	var moreButton = document.querySelectorAll(".section.title.more_button >  button");

	for(var i = 0 ; i < moreButton.length ; i++){
		moreButton[i].addEventListener('click',moreButtonClicked,false);
	}
}


function moreButtonClicked(ev){
	
	var more = ev.target.parentElement.parentElement.parentElement.children[1].children[0];
	
	if(more.style.overflow === "" || more.style.overflow === "hidden"){
		more.style.overflow = "visible";
		slideShow(ev);
		ev.target.innerText = "접기";
	}
	else{
		more.style.overflow = "hidden";
		ev.target.innerText = "더보기";
		ev.target.parentElement.parentElement.nextElementSibling.removeAttribute("style");
	}
}


function slideShow(ev){
	bookListEle = ev.target.parentElement.parentElement.parentElement.children[1];
	fullheight = bookListEle.offsetHeight;
	bookListEle.style.height = "332px";
	addedSpeed = 2;
	slideInterval = setInterval(slideShowDown,0.25);
}

function slideShowDown() {
	
	var heightWithpx = "";
	var heightVar = bookListEle.offsetHeight;

	var speed = 2;
	
	if( heightVar >= fullheight){
		height = fullheight+'px';
		clearInterval(slideInterval);
	}

	heightVar += (speed+addedSpeed);
	addedSpeed += 2;
	
	heightWithpx = heightVar + 'px';
	bookListEle.style.height = heightWithpx;
	
}
