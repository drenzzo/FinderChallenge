function searchForm(){
    // code here
    var list = [];
    var input = document.getElementById('search');
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "books-schema.json", true);
    ajax.onload = function() {
	       list = JSON.parse(ajax.responseText).data;
           console.log(list);
           list.map(function(i) {
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

function EnabledBtn(){

    var contenido = document.getElementById('search').value;

    if(contenido.length > 1 ){
        document.getElementById('btn').disabled = false;
    }
    else{
        document.getElementById('btn').disabled=true;
    }
}
