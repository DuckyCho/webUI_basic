function initialize(bookList){
	//첫 페이지에 불러올 책들을 json파일에서 읽어서 innerHTML로 넣는 함수
    htmlInnerSet(bookList);
    
    //책div 사이즈를 윈도우 크기에 따라 결정하는 함수
	elementsSizeSet();
    
    //더보기를 눌렀을 때, 이벤트 리스너 등록
	moreButtonEventRegister();
    
    //창의 크기를 변화하면 책div의 사이즈도 변해야한다.
    //윈도우창 변화에따라 책div 사이즈를 변경해주는 함수
	windowSizeModifyEventRegister();
    
    //swipe 이벤트 리스너 등록. 책div들 swipe구현
	swipingEventRegister();
}