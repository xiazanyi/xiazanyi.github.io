var source ={};
source.$ =function(id){
	return document.getElementById(id);
}
source.Ajax =function(config,callback){
	var xmlhttp =null;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else if(window.ActiveXObject){
           try{
               xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
           }catch(e){
           	   try{
                   xmlhttp = new ActiveXObject("msxml2.XMLHTTP");
           	   }catch(x){
                   console.log(x.message);
           	   }
           }
	}
	if(xmlhttp){
        xmlhttp.onreadystatechange = function(){
        	 if(xmlhttp.readyState ==4 && xmlhttp.status==200){
        	 	if(callback instanceof function){
        	 		callback(xmlhttp.responseText);
        	 	}
        	 }else{
        	 	callback(false);
        	 }
        }
        xmlhttp.open(config.Type,config.url,true);
        xmlhttp.send(config.Data);
	}
}
(function(){
    var testDiv = source.$('testDiv');
    var btn = source.$('btn');
    btn.onclick =function(){
    	var obj ={
            Type : 'GET',
            url : '../JSONsource/test.json',
            Data : null
    	};
    	source.Ajax(obj,function(data){
            if(data==false){
            	testDiv.innerHTML = "loading...";
            }else{
            	testDiv.innerHTML =data;
            }
    	});
    } 

})();