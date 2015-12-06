var source ={};
source.$ =function(id){
	return document.getElementById(id);
}
source.ajax =function(config,callback){
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
        	 	
        	 		callback(xmlhttp.responseText);
        	 	
        	 }else{
        	 	callback(false);
        	 }
        }
        xmlhttp.open(config.Type,config.url,true);
        xmlhttp.send(config.Data);
	}
};
 prettyPrint();
(function(){
   
    var btn = source.$('btn');
    var mysql = source.$('mysql');
    btn.onclick =function(){
    	var obj ={
            Type : 'GET',
            url : '../JSONsource/mysql.json',
            Data : null
    	};
    source.ajax(obj,function(data){
        if(data==false){
        	mysql.innerHTML = "loading...";
        }else{
            var mysqlData=  JSON.parse(data).mysql;  
            var i;
           var fragment = document.createDocumentFragment();
           var ul = document.createElement('ol');
            fragment.appendChild(ul);
            for(var i=0,len=mysqlData.length;i<len;i++){
              if(mysqlData[i].name==""){
                   continue;
              }else if(mysqlData[i].name){
                  var li = document.createElement('li'); 
                  var p = document.createElement('p');
                  p.innerHTML  =mysqlData[i].name;
                  li.appendChild(p);
              }
              if(mysqlData[i].value){
                var b= document.createElement('b');
                b.innerHTML = mysqlData[i].value;
                li.appendChild(b);
              }     
             if(mysqlData[i].exapmle){
                  var eP = document.createElement('pre');
                   eP.className = 'prettyprint linenums';
                   var flag = mysqlData[i].exapmle;
                   var array = [];
                   if(flag.indexOf('~~')!=-1){
                       array=  flag.split('~~');
                       flag = array.join('<br>');
                   }
                   eP.innerHTML = flag;
                  li.appendChild(eP)  ;
              }
              ul.appendChild(li);
            }//for
            mysql.innerHTML ="";
           mysql.appendChild(ul);
       }  //else
     	 });
    // }
     } 
})();   
//

 // if(mysqlData[i].exapmle){
 //                var eP = document.createElement('pre');
 //                eP.className = 'prettyprint linenums';
 //                eP.innerHTML = mysqlData[i].exapmle;
 //                li.appendChild(eP)  
 //              }