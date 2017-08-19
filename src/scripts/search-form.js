function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

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

function SearchItems(e, input){

    var query = document.getElementById('search').value;
    //query = query.toLowerCase();

    var code = (e.keyCode ? e.keyCode : e.which);
    
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "books-schema.json", true);
    ajax.onload = function() {
        items = JSON.parse(ajax.responseText);
        items = items.data;
        //return books;
    };
    ajax.send();

    if(query.length > 1){
        document.getElementById('btn').disabled = false;
        if(code == 13) { //Enter keycode

            books = _.filter(items, function(item){
                return (item.title.toLowerCase()).indexOf(query.toLowerCase()) > -1
            });
            InsertResults(books);
        }
    }
    else{
        document.getElementById('btn').disabled = true;

    }
}

function InsertResults(books){
    var results = '';
    var i = 0;
    var BreakException = {};

    try{
        books.forEach(function(book){
            results += '<div class="pure-u-1-3"><img src="'+book.image+'" alt="'+book.title+'" /><h3>'+book.title+'</h3><p>'+book.teaser+'</p></div>';
            i++;
            if(i == 9) throw BreakException;
        });
    }catch (e){
        if (e !== BreakException) throw e;
    }

    document.getElementById('results').innerHTML = results;
    /*results = _.each(books, function(book){
        return '<div class="pure-u-1-3"><img src="'+book.image+'" /><div>'+book.title+'</div><div>'+book.teaser+'</div></div>';
    });
    */
}