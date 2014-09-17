jsonRequest(initialize);
//초기화 함수
//jsonRequest함수를 통해 bookList.json파일을 읽어들이고, 이벤트 등록 및 책 세팅
function initialize(bookList){
	//스크롤 내릴때, 상단 navBar 위치 fix
	window.onscroll = scroll;
	//장르 리스트 세팅
	bookGenreListSet(bookList);
	//장르 버튼 클릭 이벤트 리스너
	bookGenreButtonEventListener();
	//책목록 세팅
	bookListSet(bookList, "장르", 9);
	//더보기 버튼 이벤트 리스너
	moreButtonEventListener(bookList);
	//장르 선택 이벤트 리스너
	bookGenreListEventListener(bookList);
	//사용자 메뉴 설정
	userMenuEventRegister();
}