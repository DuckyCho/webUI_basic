//object타입의 변수의 길이를 리턴하는 함수

function getObjLength(obj){
	var length = 0;
	
	for (var n in obj){
		length++;
	}

	return length;
}