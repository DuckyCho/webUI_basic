jsonRequest(initialize);

function initialize(bookList){
	
	bookGenreListSet(bookList);
	bookGenreButtonEventListener();
	bookListSet(bookList, "장르", 9);
	moreButtonEventListener(bookList);
	bookGenreListEventListener(bookList);
	userMenuEventRegister();
}