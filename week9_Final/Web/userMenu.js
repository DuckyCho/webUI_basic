//사용자메뉴 버튼 클릭 했을때, 이벤트리스너
function userMenuEventRegister(){
	var userMenuEle = document.querySelector(".user.menu");

	userMenuEle.addEventListener('click',function(ev){
		ev.stopPropagation();
		genreSetHide(document.querySelector("#genre_set"));
		userMenuLoader(true,userMenuShowHide);
	},false);

}

//사용자 메뉴 버튼 클릭 했을 때, json파일을 읽어서 메뉴를 구성하여 innerHtml로 삽입
function userMenuLoader(isAsync,callBackFunction){
	
	var url = "./json/userMenu.json";
	var userMenuRequest = new XMLHttpRequest();
	
	if(isAsync === true){
		userMenuRequest.open("GET",url,true);
		userMenuRequest.send(null);
		userMenuRequest.onreadystatechange = function(){

		if(userMenuRequest.readyState === 4 && userMenuRequest.status === 200){
			var userMenuSet = userMenuRequest.responseText;
			var userMenuSet = JSON.parse(userMenuSet);
			callBackFunction(userMenuSet);
		}
	}
}
	
	else{
		userMenuRequest.open("GET",url,false);
		userMenuRequest.send(null);
		var userMenuSet = userMenuRequest.responseText;
		var userMenuSet = JSON.parse(userMenuSet);
		return userMenuSet;
	}

}

//사용자의 클릭에 따라, 상황에 따라 사용자메뉴를 보여주고 가리는 함수
function userMenuShowHide(userMenuSet){
	var userMenuEle = document.querySelector("#userMenu_outer");

	document.addEventListener('click',function(ev){
		userMenuHide(document.querySelector("#userMenu_outer"));
	},false);

	if(userMenuEle === null){
		userMenuInnerHtmlSet(userMenuSet);
		var userMenuEle = document.querySelector("#userMenu_outer");
		userMenuAnimation(userMenuEle,0.0,0,-10,1.000,100, function(){});
		userMenuDragEventRegister(userMenuEle);
	}
	else if(userMenuEle.style.display === ""){
		userMenuHide(userMenuEle);
	}
	else{
		userMenuEle.style.display = "";
		userMenuAnimation(userMenuEle,0.0,0,-10,1.000,100, function(){});
	}
}

function userMenuHide(userMenuEle){
	if(userMenuEle === null){}
	else{
		userMenuAnimation(userMenuEle,1.0,-10,-10,-1.000,100, userMenuHide_endFunction);
	}
}

function userMenuHide_endFunction(){
	var userMenuEle = document.querySelector("#userMenu_outer");
	userMenuEle.removeAttribute('style');
	userMenuEle.style.display = "none";
}

function userMenuAnimation(userMenuEle, opacity_pram, right_pram , changeInValue_pos_pram, changeInValue_opa_pram, duration_pram, endFunction){
	userMenuEle.style.right = right_pram+"em";
	userMenuEle.style.opacity = opacity_pram;

	var currentTime = 0;
	var startValue_pos = right_pram;
	var startValue_opa = opacity_pram;
	var changeInValue_pos = changeInValue_pos_pram;
	var changeInValue_opa = changeInValue_opa_pram;
	var duration = duration_pram;

	var userMenuAppearInterval = setInterval(function(){
		userMenuEle.style.right = easeInOutQuint(currentTime,startValue_pos,changeInValue_pos,duration) + "em";
		userMenuEle.style.opacity = easeInOutQuint(currentTime,startValue_opa,changeInValue_opa,duration);
		currentTime++;
		if(userMenuEle.style.right === changeInValue_pos + startValue_pos + "em"){
			clearInterval(userMenuAppearInterval);
			endFunction();
		}
	},0.25)
}

//json파일을 읽어들여서 userMenu div에 html세팅
function userMenuInnerHtmlSet(userMenuSet){
	var ul_template = "<div id = \"userMenu_outer\"><div id = \"userMenu_inner\"><ul><%liTemplate%></ul></div></div>"
	var li_template = "<li><dt><img src = \"<%dt%>\"></dt><dd><%dd%></dd></li>"
	var tmp_li_template = "";
	
	var userMenuEle = document.querySelector(".user.menu");

	for(var i = 0 ; i < getObjLength(userMenuSet) ; i++){
		tmp_li_template += li_template.replace("<%dt%>",eval("userMenuSet["+i.toString()+"]").dt);
		tmp_li_template = tmp_li_template.replace("<%dd%>",eval("userMenuSet["+i.toString()+"]").dd);
	}

	ul_template = ul_template.replace("<%liTemplate%>", tmp_li_template);
	userMenuEle.innerHTML += ul_template;

}

//사용자 메뉴 드래그 엔 드롭 이벤트 핸들러
function userMenuDragEventRegister(userMenuEle){
	
	//드래그 시작시 선택된 메뉴의 id를 selected로 변경
	//드래그할때의 이미지 li element로 변경
	//드래그할때 이미지 투명도 설정하는 방법은 없나요?
	userMenuEle.addEventListener('dragstart',function(ev){
		var liEle = findLiele(ev.target);
		liEle.id = "selected";	
		ev.target.cursor = "move";
		event.dataTransfer.setDragImage(liEle, 50,50);
	},false);

	//다른 메뉴위에 드롭하려고 할때 (다른 메뉴위로 드래그 상태로 마우스가 침범할경우)
	//li순서를 innerHTML을 이용하여 바꾼다.
	userMenuEle.addEventListener('dragover',function(ev){
		event.preventDefault();
		var targetEle = findLiele(ev.target);
		if(targetEle != null && targetEle != document.querySelector("#selected")){
			var ulEle = targetEle.parentElement;
			rearrangeLiEle(ulEle,targetEle);
		}
	},false);

	//drop했을 때, 다시 li id삭제
	userMenuEle.addEventListener('drop',function(ev){
		document.querySelector("#selected").removeAttribute('id');
	},false);

}


//상황에 따라 li의 위치를 재배열하는 함수
function rearrangeLiEle(ulEle,targetEle){
	var ulEleInnerHtml = ulEle.innerHTML;
	var targetEleOuterHtml = targetEle.outerHTML;
	var selectedOuterHtml = document.querySelector("#selected").outerHTML;
	
	if(targetEle.previousElementSibling === document.querySelector("#selected")){
		ulEleInnerHtml = ulEleInnerHtml.replace(selectedOuterHtml+targetEleOuterHtml,targetEleOuterHtml+selectedOuterHtml);	
	}
	else{
		ulEleInnerHtml = ulEleInnerHtml.replace(selectedOuterHtml,"");
		ulEleInnerHtml = ulEleInnerHtml.replace(targetEleOuterHtml,selectedOuterHtml+targetEleOuterHtml);
	}
	ulEle.innerHTML = ulEleInnerHtml;

}

//드래그 된 오브젝트의 상위클래스에서 li element를 찾아내는 함수
function findLiele(ele){
	
	if(ele === null){
		return null;
	}

	if(ele.tagName === "LI")
		return ele;
	else
		return findLiele(ele.parentElement);
}