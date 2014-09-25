//XMLhttpRequest에서 서버에서 응답 받기 전 로딩화면
//지금은 일부러 setTimeout을 설정해서 removeLoadingDiv가 늦게 실행됨

function loadingDivSet() {

    var circleCount = 15;
    var delegateCircleDegree = 0;
    var circleDivPosList;

    circleDivWrapperSet();
    circleDivInnerHtmlSet(circleCount);
    circleDivPosSet();
    loadingCommentDivPosSet();
    circleDivPosList = getCircleDivPos(circleCount, delegateCircleDegree);
    loadingAnimation(circleCount, delegateCircleDegree, circleDivPosList);

}

//로딩div를 html에서 제거하는 함수
function removeLoadingDiv() {
    document.querySelector("#loading").innerHTML = "";
    document.querySelector("#loading").removeAttribute("style");
}


//로딩 애니메이션을 구현하는 함수
function loadingAnimation(circleCount, delegateCircleDegree, circleDivPosList) {
    var startTime = 1;
    loadingInterval = setInterval(function () {
        //로딩 애니메이션은 계속 반복 되어야 하므로 값이 주기를 가지고 변해야 한다.
        var oscillateValue = getOscillateValue(startTime);
        var circles = document.querySelectorAll(".loadingCircle");

        //작은 동그라미들이 바깥으로 뿌려지는 애니메이션
        circleDiffusing(oscillateValue, circleDivPosList, circles, startTime);
        //작은 동그라미들의 크기가 점점 커지는 애니메이션
        circleSize(oscillateValue, circles);
        //작은 동그라미들의 opacity는 퍼질수록 감소한다.
        circleOpacity(oscillateValue, circles);
        //가운데 뜨는 nowloading글씨가 깜빡깜빡 거리도록 opacity를 조정
        commentOpacity(oscillateValue);

        startTime++;
        
        //원들이 주변으로 뿌려지면서 회전해야한다.
        //회전하는 각도를 지정해줌
        delegateCircleDegree += Math.PI / 180 * -2;
        circleDivPosList = getCircleDivPos(circleCount, delegateCircleDegree);
    }, 1);


}

function getOscillateValue(startTime) {
    var degreeRadian = startTime * Math.PI / 180;
    return Math.cos(degreeRadian);
}



function circleDiffusing(value, posList, circles, startTime) {

    for (var i in posList) {
        circles[i].style.left = (circles[i].offsetLeft + value * 5 * posList[i].x) + "px";
        circles[i].style.top = (circles[i].offsetTop + value * 5 * posList[i].y) + "px";
    }
}

function circleSize(value, circles) {
    var circlesLength = circles.length;
    for (var i = 0; i < circlesLength ; i++) {
        circles[i].style.width = (value * 5 + 8) + "px";
        circles[i].style.height = (value * 5 + 8) + "px";
    }
}

function circleOpacity(value, circles) {
     var circlesLength = circles.length;
    for (var i = 0; i < circlesLength ; i++) {
        circles[i].style.opacity = value;
    }
}

function commentOpacity(value) {
    var comment = document.querySelector("#loadingComment");
    comment.style.opacity = Math.sqrt(1 - Math.pow(value, 2));
}



//검정 배경화면 만들기
function circleDivWrapperSet() {
    var loadingEle = document.querySelector("#loading");
    loadingEle.style.width = document.querySelector("body").clientWidth + "px";
    loadingEle.style.height = document.querySelector("body").clientHeight + "px";
    loadingEle.style.background = "rgba(0,0,0,0.9)";
}


//circleCount갯수만큼 동그라미 div를 집어 넣는다.
function circleDivInnerHtmlSet(circleCount) {
    var loadingEle = document.querySelector("#loading");
    var loadingEleInnerHtml = loadingEle.innerHTML;
    var template = "<div class=\"loadingCircle\" id=\"circle<%number%>\"></div>"
    var loadingComment = "<div id=\"loadingComment\">NOWLOADING</div>";
    for (var i = 0; i < circleCount; i++) {
        loadingEleInnerHtml += template.replace("<%number%>", i.toString());
    }

    loadingEle.innerHTML = loadingEleInnerHtml;
    loadingEle.innerHTML += loadingComment
}

//circle div를 가운데에 위치시킨다.
function circleDivPosSet() {
    var circleDivEles = document.querySelectorAll(".loadingCircle");
    var left = window.innerWidth / 2;
    var top = window.innerHeight / 2;
    var circleDivElesLength = circleDivEles.length;
    for (var i = 0; i < circleDivElesLength ; i++) {
        circleDivEles[i].style.left = left + "px";
        circleDivEles[i].style.top = top + "px";
    }
}

//nowloading글자의 위치를 지정
function loadingCommentDivPosSet() {
    var comment = document.querySelector("#loadingComment");
    comment.style.left = window.innerWidth / 2 - comment.offsetWidth / 2 + 18 + "px";
    comment.style.top = window.innerHeight / 2 - comment.offsetHeight / 2 + 10 + "px";
}

//각 circle들의 위치를 잡기위한 sin, cos값 return
function getCircleDivPos(circleCount, degreeInit_pram) {
    var degreeRad = 360 / circleCount * Math.PI / 180;
    var circleDivPosList = [];

    var templateObj = {
        "x": "",
        "y": ""
    };
    var tmp;
    var degreeInit = degreeInit_pram;
    for (var i = 0; i < circleCount; i++) {
        tmp = Object.create(templateObj);
        tmp.x = Math.floor(Math.cos(degreeInit) * 100) / 100;
        tmp.y = Math.floor(Math.sin(degreeInit) * 100) / 100;
        circleDivPosList[i] = tmp;
        degreeInit += degreeRad;
    }

    return circleDivPosList;

}

