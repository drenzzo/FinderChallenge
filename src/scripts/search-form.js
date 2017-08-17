function searchForm(){
    // code here
    var list = [];
    var input = document.getElementById('search');
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "books-schema.json", true);
    ajax.onload = function() {
	       list = JSON.parse(ajax.responseText).data;
           list =  list.map(function(i) {
               return i.title;
           });
	new Awesomplete(input, {
        list: list,
        minChars: 3,
        maxItems: 7
     });
    };
    ajax.send();
}

function GetAllBooks(){
    var list = [];
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "books-schema.json", true);
    ajax.onload = function() {
	    list = JSON.parse(ajax.responseText).data;
        return list;
    };
    ajax.send();
}
function SearchItems(e, input){

    var query = document.getElementById('search').value;
    query = query.toLowerCase();

    var code = (e.keyCode ? e.keyCode : e.which);
    var results = [];
    var books  = [];
    var res = [];


    if(query.length > 1 ){
        document.getElementById('btn').disabled = false;

        if(code == 13) { //Enter keycode
            books = GetAllBooks();
            results = _.filter(books, function(book){
                console.log(book);
                var title = book.title;
                title = title.toLowerCase()
                return title.indexOf(query) >= 0;
            });
        }
    }
    else{
        document.getElementById('btn').disabled = true;

    }
}
