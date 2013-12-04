
function loadTime()
{

var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    	console.log(xmlhttp.responseText)
    	if (xmlhttp.responseText != "Philosophy" && xmlhttp.responseText != "BadArticleError")
    	{
    		document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    		var ul = document.getElementById("article-list");
    		if(ul.lastChild.innerHTML != xmlhttp.responseText && xmlhttp.responseText != "") {
    			var newli = document.createElement("li");
    			newli.setAttribute("class","list-group-item")
    			ul.appendChild(newli);
    			newli.innerHTML = xmlhttp.responseText
    		}
    		
    		
    		setTimeout(loadTime,250);
    		
    	} else if (xmlhttp.responseText == "Philosophy") {
    		document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    		console.log("Deleting file")
    		var deletehttp = new XMLHttpRequest();
    		deletehttp.open("GET","/del_file/"+"static/articles/"+document.getElementById("divFilename").innerHTML)
    		deletehttp.setRequestHeader("pragma", "no-cache");
			deletehttp.send();
    	} else if (xmlhttp.responseText == "BadArticleError") {
    		document.getElementById("myDiv").innerHTML="BadArticleError: Disambiguation pages are not yet fully handled";
    		var deletehttp = new XMLHttpRequest();
    		deletehttp.open("GET","/del_file/"+"static/articles/"+document.getElementById("divFilename").innerHTML)
    		deletehttp.setRequestHeader("pragma", "no-cache");
			deletehttp.send();
    	}
    
    }
  }

var nocachevar = new Date().getTime();
console.log("/static/articles/"+document.getElementById("divFilename").innerHTML);
xmlhttp.open("GET","/static/articles/"+document.getElementById("divFilename").innerHTML+"?random="+nocachevar,true);
xmlhttp.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
xmlhttp.setRequestHeader("pragma", "no-cache");
xmlhttp.setRequestHeader("Expires", "-1");
xmlhttp.send();

}

function decode(text_to_decode) {
	return decodeURIComponent(text_to_decode.replace(/\+/g,  " "));
}


function get_random_article(){

	var xmlhttp
	if (window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){

			document.getElementById("field1").value=decode(xmlhttp.responseText);
			console.log(xmlhttp.responseText);
		}
	}

	xmlhttp.open("GET","/get_random_article/",true);
	xmlhttp.setRequestHeader("pragma", "no-cache");
	xmlhttp.send();
	console.log("Random article")
}





function retrieveData(){
  var ws = new WebSocket("ws://" + location.host + "/echo");
            ws.onmessage = function(evt){ 
                    var received_msg = evt.data;
                    document.getElementById("sse").innerHTML=received_msg;
            };

            


}
