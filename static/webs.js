function onKeyPress(){
    document.getElementById("article").addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key == 13) {
      retrievePhilosophy()
    }
});
}



function clearAll(){
	var article_list = document.getElementById("article-list");
    if (article_list != null) {
        article_list.innerHTML = "";
    }
	var number = document.getElementById("number");
    if (number != null) {
        number.innerHTML = "";
    }

    var article = document.getElementById("article");
    if (article != null) {
        article.value = "";
    }

    if (document.getElementById("rowAlert")){
        var container = document.getElementById("container");
        container.removeChild(document.getElementById("rowAlert"));   
    }
    
    var result = document.getElementById("result");
    if (number != null) {
        result.removeChild(document.getElementById("number"));
    }
    

}


function createListItem(article){
    var newAItem = document.createElement("a");
    var link = "http://en.wikipedia.org/wiki/" + article;
    var articleItem = decodeURIComponent(article).replace(/[_#]/g," ");
    newAItem.href = link;
    newAItem.className = "list-group-item";
    newAItem.innerHTML = articleItem;

    return newAItem;
}


function handleReceivedMsg(received_msg){
    switch(received_msg){
        case "Detected a Loop":
            handleErrors(received_msg);
            break;
        case "Bad Article Error":
            handleErrors(received_msg);
            break;
        case "No article Error":
            handleErrors(received_msg);
            break;
        case "NotValidArticle":
            var errorMsg = "This is not a valid article. Please enter a valid one."
            handleErrors(errorMsg);
            break;
        default:
            var div = document.getElementById("article-list");        
            var newli = createListItem(received_msg);
            div.appendChild(newli);
    }
    
}


function retrievePhilosophy(random){

	var article = document.getElementById("article").value;
	var div = document.getElementById("article-list");
    clearAll();
	var i = 0;

	var ws = new WebSocket("ws://" + location.host + "/echo");
            ws.onmessage = function(evt){
                    loopNumber(i);
            		i++;
            		//document.getElementById("number").innerHTML = i; 
                    var received_msg = evt.data;
                    handleReceivedMsg(received_msg);
                    document.getElementById("article-list").lastChild.scrollIntoView();
                    /*if (received_msg == "Detected a Loop"){
                        handleErrors();
                    } else {
                        var newli = document.createElement("li");
                        newli.setAttribute("class","list-group-item");
                        ul.appendChild(newli);
                        newli.innerHTML = received_msg; 
                    }*/
                    
            };

            ws.onopen = function(){
            	if(random == true){
            		ws.send("Special:Random")
            	} else {
            		ws.send(article);
            	}
                
            };

}

function handleErrors(errorMsg){
    var rowAlert = document.createElement("div");
    rowAlert.className = "center-block row";
    rowAlert.id = "rowAlert";
    var divAlert = document.createElement("div");

    rowAlert.appendChild(divAlert);

    var node = document.createTextNode(errorMsg);
    divAlert.appendChild(node);
    divAlert.className = "alert alert-danger col-md-4";


    var element = document.getElementById("container");
    var child = document.getElementById("result");
    element.insertBefore(rowAlert,child);
}


function loopNumber(i){
    if (i == 0){
        var divNumber = document.createElement("div"); 
        divNumber.id = "number";
        var element = document.getElementById("result");
        element.appendChild(divNumber);
    } else {
        var divNumber = document.getElementById("number");
        var stringNumber;
        if (i == 1){
            stringNumber = " article to Philosophy";
        } else {
            stringNumber = " articles to Philosophy";
        }

        divNumber.innerHTML = i + stringNumber;
    }

}
