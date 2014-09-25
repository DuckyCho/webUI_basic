//스크롤을 내렸을때, 상단 nav bar 위치 고정
function scroll(){
	var nav =  document.querySelector("nav");
	var aside =  document.querySelector("aside");
	var currentScroll = window.scrollY;

	if(currentScroll > 63){
		nav.style.position = "fixed";
		nav.style.top = "0";
		nav.style.zIndex = "999";
		nav.lastElementChild.querySelector("ul").style.marginLeft = "200px";
		aside.style.position = "fixed";
		aside.style.top = "0";
		aside.style.zIndex = "999";
	}
	else{
		nav.removeAttribute("style")
		aside.removeAttribute("style")
	}
}