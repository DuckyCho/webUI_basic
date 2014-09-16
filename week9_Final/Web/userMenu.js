function userMenuEventRegister(){
	var userMenuEle = document.querySelector(".user.menu");

	userMenuEle.addEventListener('click',function(ev){
		ev.stopPropagation();
		genreSetHide(document.querySelector("#genre_set"));
		userMenuLoader(true,userMenuShowHide);
	},false);

}

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


function userMenuAppearAnimation(userMenuEle){
	userMenuEle.style.opacity = 0.0;
	userMenuEle.style.right = 0+"em";

	var currentTime = 0;
	var startValue = 0;
	var changeInValue_pos = -10;
	var changeInValue_opa = 1.000;
	var duration = 100;

	var userMenuAppearInterval = setInterval(function(){
		userMenuEle.style.right = easeInOutQuint(currentTime,startValue,changeInValue_pos,duration) + "em";
		userMenuEle.style.opacity = easeInOutQuint(currentTime,startValue,changeInValue_opa,duration);
		currentTime++;
		if(userMenuEle.style.right === changeInValue_pos + startValue + "em"){
			clearInterval(userMenuAppearInterval);
		}
	},0.25)
}

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


function userMenuDragEventRegister(userMenuEle){
	

	userMenuEle.addEventListener('dragstart',function(ev){
		var liEle = findLiele(ev.target);
		liEle.id = "selected";	
		ev.target.cursor = "move";
		event.dataTransfer.setDragImage(liEle, 50,50);
	},false);

	userMenuEle.addEventListener('dragover',function(ev){
		event.preventDefault();
		var targetEle = findLiele(ev.target);
		if(targetEle != null && targetEle != document.querySelector("#selected")){
			var ulEle = targetEle.parentElement;
			rearrangeLiEle(ulEle,targetEle);
		}
	},false);

	userMenuEle.addEventListener('drop',function(ev){
		document.querySelector("#selected").removeAttribute('id');
	},false);

}


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


function findLiele(ele){
	
	if(ele === null){
		return null;
	}

	if(ele.tagName === "LI")
		return ele;
	else
		return findLiele(ele.parentElement);
}