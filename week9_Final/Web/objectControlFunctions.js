function getObjLength(obj){
	var length = 0;
	
	for (var n in obj){
		length++;
	}

	return length;
}