//book.json파일을 불러오는 함수
function jsonRequest() {

    var url = "./json/book.json";
    var request = new XMLHttpRequest();
    var bookList;
    request.open("GET", url, true);
    request.send(null);


    loadingDivSet();
    request.onreadystatechange = function () {
        jsonParse(request);
    }
}


function jsonParse(request) {

    if (request.readyState === 4 && request.status === 200) {
        //로딩페이지 구현을 위해 일부러 setTimeout을 통해 로딩시간을 주었습니다.
        setTimeout(function () {
            var bookList = request.responseText;
            var bookList = JSON.parse(bookList);
            
            //로딩 페이지 제거
            removeLoadingDiv();
            //로딩 페이지 애니메이션 제거
            clearInterval(loadingInterval);
            initialize(bookList);
        }, 5000);
    }

}

jsonRequest();