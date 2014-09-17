//XMLhttpRequest에서 서버에서 응답 받기 전 로딩화면
//지금은 일부러 setTimeout을 설정해서 removeLoadingDiv가 늦게 실행됨

function loadingDivSet(){
	var circleCount = 15;
	var delegateCircleDegree = 0;
	var circleDivPosList;

	circleDivWrapperSet();
	circleDivInnerHtmlSet(circleCount);
	circleDivPosSet();
	loadingCommentDivPosSet();
	circleDivPosList = getCircleDivPos(circleCount,delegateCircleDegree);
	windowResizeEventRegister();
	loadingAnimation(circleCount,delegateCircleDegree,circleDivPosList);
	
}

function removeLoadingDiv(){
	document.querySelector("#loading").innerHTML = ""
	document.querySelector("#loading").removeAttribute("style");
}

function windowResizeEventRegister(){
	window.addEventListener('resize',function(ev){
		var loadingEle = document.querySelector("#loading");
		loadingEle.style.width = document.querySelector("body").clientWidth + "px";
		loadingEle.style.height = document.querySelector("body").clientHeight + "px";
	},false);
}

function windowResizeEventRemover(){
	window.removeEventListener('resize', function(){});
}


function loadingAnimation(circleCount,delegateCircleDegree,circleDivPosList){
	var startTime = 1;
	loadingInterval = setInterval(function(){
		var oscillateValue = getOscillateValue(startTime);
		var circles = document.querySelectorAll(".loadingCircle");
		
		circleDiffusing(oscillateValue,circleDivPosList,circles,startTime);
		circleSize(oscillateValue,circles);
		circleOpacity(oscillateValue,circles);
		commentOpacity(oscillateValue);

		startTime++;
		delegateCircleDegree += Math.PI /180 * -2;
		circleDivPosList = getCircleDivPos(circleCount, delegateCircleDegree);
	},0.5);
	
	
}

function getOscillateValue(startTime){
	var degreeRadian = startTime * Math.PI / 180;
	return Math.cos(degreeRadian);
}



function circleDiffusing(value,posList,circles,startTime){

	for(var i in posList){
		circles[i].style.left = (circles[i].offsetLeft + value * 5 * posList[i].x)   + "px";
		circles[i].style.top = (circles[i].offsetTop + value  * 5 * posList[i].y)  + "px";
	}
}

function circleSize(value,circles){
	for(var i = 0 ; i < circles.length ; i++){
		circles[i].style.width = (value*5 + 8)  + "px";
		circles[i].style.height = (value*5 + 8) + "px";
	}
}

function circleOpacity(value,circles){
	for(var i = 0 ; i < circles.length ; i++){
		circles[i].style.opacity = value;
	}
}

function commentOpacity(value){
	var comment = document.querySelector("#loadingComment");
	comment.style.opacity = Math.sqrt(1-Math.pow(value,2));
}



//검정 배경화면 만들기
function circleDivWrapperSet(){
	var loadingEle = document.querySelector("#loading");
	loadingEle.style.width = document.querySelector("body").clientWidth + "px";
	loadingEle.style.height = document.querySelector("body").clientHeight + "px";
	loadingEle.style.background ="rgba(0,0,0,0.9)";
}


//circleCount갯수만큼 동그라미 div를 집어 넣는다.
function circleDivInnerHtmlSet(circleCount){
	var loadingEle = document.querySelector("#loading");
	var loadingEleInnerHtml = loadingEle.innerHTML;
	var template = "<div class=\"loadingCircle\" id=\"circle<%number%>\"></div>"
	var loadingComment = "<div id=\"loadingComment\">NOWLOADING</div>";
	for(var i = 0 ; i < circleCount ; i++){
		loadingEleInnerHtml += template.replace( "<%number%>",i.toString() );
	}
	
	loadingEle.innerHTML = loadingEleInnerHtml;
	loadingEle.innerHTML += loadingComment
}

//circle div를 가운데에 위치시킨다.
function circleDivPosSet(){
	var circleDivEles = document.querySelectorAll(".loadingCircle");
	var left = window.innerWidth / 2;
	var top = window.innerHeight / 2;

	for(var i = 0 ; i < circleDivEles.length ; i ++){
		circleDivEles[i].style.left = left + "px";
		circleDivEles[i].style.top = top + "px";
	}
}

function loadingCommentDivPosSet(){
	var comment = document.querySelector("#loadingComment");
	comment.style.left = window.innerWidth / 2 - comment.offsetWidth / 2 + 18 + "px";
	comment.style.top = window.innerHeight / 2 - comment.offsetHeight / 2 + 10 + "px";
}

//각 circle들의 위치를 잡기위한 sin, cos값 return
function getCircleDivPos(circleCount, degreeInit_pram){
	var degreeRad = 360 / circleCount * Math.PI / 180;
	var circleDivPosList = [];

	var templateObj = {"x" : "" , "y" : ""};
	var tmp;
	var degreeInit= degreeInit_pram;
	for(var i = 0 ; i < circleCount ; i++){
		tmp = Object.create(templateObj);
		tmp.x = Math.cos(degreeInit);
		tmp.y = Math.sin(degreeInit);
		circleDivPosList[i] = tmp;
		degreeInit += degreeRad;
	}
	console.log(circleDivPosList)
	return circleDivPosList;
	
}