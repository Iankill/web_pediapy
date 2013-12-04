function clearAll(){
	document.getElementById("article-list").innerHTML = '';
	document.getElementById("number").innerHTML = "0";
}



function retrievePhilosophy(random){

	clearAll();
	article = document.getElementById("article").value;
	var ul = document.getElementById("article-list");
	var i = 0;

	var ws = new WebSocket("ws://" + location.host + "/echo");
            ws.onmessage = function(evt){
            		i++;
            		document.getElementById("number").innerHTML = i; 
                    var received_msg = evt.data;
                    var newli = document.createElement("li");
                    newli.setAttribute("class","list-group-item");
                    ul.appendChild(newli);
                    newli.innerHTML = received_msg;
            };

            ws.onopen = function(){
            	if(random == true){
            		ws.send("Special:Random")
            	} else {
            		ws.send(article);
            	}
                
            };

            ws.onclose = function(){
            	console.log("Salut");
            };


}

