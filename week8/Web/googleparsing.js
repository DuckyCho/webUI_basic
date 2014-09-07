
function spaceDel(str){
	var result ="";
	var i = 0;
	var j = 0;
	
	if(str[0] === " "){
		for(i = 0 ; i < str.length ; i++){
			if(str[i] != " "){
				
				break;
			}
		}
	}
	for(j = 0 ; j < str.length-i ; j++){
		result += str[i+j];
	}
	
	
	return result;

}


function newLineDel(str){
	var i = 0;
	var result = str;

	for( ; i < result.length ; i++){
		if(result[i+1] === "\n")
			result[i+1] =" ";
	}
	result
	return result;
}
var parsingResult = "var aBookList = [ ";
function parser(){
var cluster = document.querySelectorAll(".cluster-container");
var bookId = 0;

var bookLine;
var bookCount

if(cluster[0].className === "cluster-container cards-transition-enabled"){
	i= 0;
}
else
	i=1;

for( ;i < cluster.length ; i++){

	
	if(cluster[i].children[0].children[1].className === "card-list")
		bookLine = cluster[i].children[0].children[1];
	else
		bookLine = cluster[i].children[0].children[2];
	
	bookCount = bookLine.children.length;
	console.log("!!!!!!!!!",bookCount);
	for(var j = 1; j < bookCount ; j++){
		
		if(bookLine.children[j].classList[0] != "card")
			console.log(bookLine.children[j].classList[0]);
		
		parsingResult +="{";
		//bookId setting
		parsingResult += "id : \"";
		parsingResult += new Date().getTime()+bookId;
		parsingResult += "\","
		bookId++;

		//name, author, price setting
		
		
		parsingResult +="name : \"";
		parsingResult +=bookLine.children[j].querySelector("h2").innerText.trim();
		parsingResult +="\","

		if( bookLine.children[j].querySelector(".subtitle") != undefined){
			parsingResult +="author : \"";
			parsingResult +=bookLine.children[j].querySelector(".subtitle").innerText.trim();
			parsingResult +="\","
		}
		else{
			parsingResult +="author : \"";
			parsingResult +="\",";
		}
		parsingResult +="price : \"";
		parsingResult +=bookLine.children[j].querySelector(".price.buy > span").innerText.trim();
		parsingResult +="\","

		//imgsrc setting
		parsingResult += "imgsrc : \"";
		parsingResult +=bookLine.children[j].children[0].children[1].children[0].children[0].children[0].children[0].src.trim();
		parsingResult +="\",";

		//src setting
		parsingResult +="src : \"";
		parsingResult +=bookLine.children[j].children[0].children[0].href.trim();
		parsingResult +="\"},\n"	

	}
	

}
parsingResult+="]";


}

parser()