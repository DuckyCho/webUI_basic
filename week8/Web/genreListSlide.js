

var eleBody = document.querySelector("body");
var myInterval;
var heightVar =  510;
var speed = 10;
var addedSpeed = 2 ;

function slideDown(){
	var eleGenreSetSlideDown = document.querySelector("#genre_set");
	eleGenreSetSlideDown.style.display = 'block';

	if( parseInt(eleGenreSetSlideDown.style.height) >= 510){
		heightVar = 510;
		clearInterval(myInterval);
	}
	
	heightVar += speed+addedSpeed;
	addedSpeed += 1;
	eleGenreSetSlideDown.style.height = heightVar + 'px';
	
}


function slideUp(){
	var eleGenreSetSlideUp = document.querySelector("#genre_set");
	
	if( parseInt(eleGenreSetSlideUp.style.height) <= 8){
		clearInterval(myInterval);
		heightVar=0;
		eleGenreSetSlideUp.style.display = 'none';
	}
	
	heightVar -= speed;
	addedSpeed += 1;
	eleGenreSetSlideUp.style.height = heightVar+'px';
	
}


function genreSetAppearHandler(ev){
	var eleGenreSet = document.querySelector("#genre_set");
	var eleGenreSetStyle = document.defaultView.getComputedStyle(eleGenreSet).display;
	
	if(ev.target.id != 'genre_button'){
		myInterval = setInterval(slideUp,0.25);
		addedSpeed =2;
	}
		
	else{
		if(eleGenreSetStyle == 'none'){
			heightVar = 0;
			eleGenreSet.style.height = '0px;'
			myInterval = setInterval(slideDown,0.25);
			addedSpeed =2;
		}
		else{
			myInterval = setInterval(slideUp,0.25);
			addedSpeed =2;
		}
	}	
}

eleBody.addEventListener('click',genreSetAppearHandler,false)
