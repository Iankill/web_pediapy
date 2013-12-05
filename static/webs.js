function clearAll(){
	document.getElementById("article-list").innerHTML = '';
	document.getElementById("number").innerHTML = "0";  
    if (document.getElementById("rowAlert")){
        var container = document.getElementById("container");
        container.removeChild(document.getElementById("rowAlert"));   
    }
    var result = document.getElementById("result");
    result.removeChild(document.getElementById("number"));

}



function retrievePhilosophy(random){

	//clearAll();
	article = document.getElementById("article").value;
	var ul = document.getElementById("article-list");
    if (ul.hasChildNodes() == true){
        clearAll();
    }
    console.log(ul.hasChildNodes());
	var i = 0;

	var ws = new WebSocket("ws://" + location.host + "/echo");
            ws.onmessage = function(evt){
                    loopNumber(i);
            		i++;
            		//document.getElementById("number").innerHTML = i; 
                    var received_msg = evt.data;
                    if (received_msg == "Detected a Loop"){
                        handleErrors();
                    } else {
                       var newli = document.createElement("li");
                        newli.setAttribute("class","list-group-item");
                        ul.appendChild(newli);
                        newli.innerHTML = received_msg; 
                    }
                    
            };

            ws.onopen = function(){
            	if(random == true){
            		ws.send("Special:Random")
            	} else {
            		ws.send(article);
            	}
                
            };

}

function handleErrors(){
    var rowAlert = document.createElement("div");
    rowAlert.className = "center-block row";
    rowAlert.id = "rowAlert";
    var divAlert = document.createElement("div");

    rowAlert.appendChild(divAlert);

    var node = document.createTextNode("Detected a Loop");
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
