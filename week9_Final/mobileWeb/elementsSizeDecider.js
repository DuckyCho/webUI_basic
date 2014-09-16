window.onload = elementsSizeSet;
function elementsSizeSet(){
	bookListWidthSet();
	bookListMarginSet();
	bookListHeightSet();
}

function bookListMarginSet(){
	var bodyWidth =  document.querySelector("body").clientWidth;
	
	var ImarginValue = Math.floor(bodyWidth*0.1/3);
	var SmarginValue = "";
	SmarginValue += ImarginValue-1;
	SmarginValue += "px";
	

	var lineUpUlEle = document.querySelectorAll(".lineUp_wrapper ul");
	
	for(var i = 0 ; i < lineUpUlEle.length ; i++){
		var tmpLineUp = lineUpUlEle[i]

		tmpLineUp.style.paddingLeft= SmarginValue;
		liEles = tmpLineUp.querySelectorAll("li");
		liMarginSet(liEles, SmarginValue);
	}
}


function liMarginSet(liEles, SmarginValue){
	
	for(var i = 0 ; i < liEles.length ; i++){
		liEles[i].style.marginRight = SmarginValue;
	}
}

function bookListHeightSet(){
	var lineUpUlEle = document.querySelectorAll(".lineUp_wrapper ul");
	for(var i = 0 ; i < lineUpUlEle.length; i++){
		lineUpUlEle[i].style.height = lineUpUlEle[i].querySelector("li").clientHeight+"px";
		lineUpUlEle[i].parentElement.style.height = lineUpUlEle[i].querySelector("li").clientHeight+"px";
	}
}

function bookListWidthSet(){
	console.log("hihiih!")
	var lineUpUlEle = document.querySelectorAll(".lineUp_wrapper ul");
	
	for(var i = 0 ; i < lineUpUlEle.length ; i++){
		var eleLi = lineUpUlEle[i].querySelectorAll("li");
		for(var j = 0 ; j < eleLi.length ; j++){
			var Iwidth = 0
			var Swidth =""
			Iwidth = Math.floor(document.querySelector("body").clientWidth*0.4);
			Swidth = Iwidth + "px";
			eleLi[j].style.width = Swidth;
		}
	}
}