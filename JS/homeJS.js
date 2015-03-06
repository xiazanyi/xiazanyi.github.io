var allSections =document.getElementsByClassName('sections');
var mainDiv =document.getElementById('main');
var menuContentHeight = 85;//子菜单栏高度
var time =[];//滚动标题栏的定时器数组
var rightDIVBeginLeft =196;
var rightDIVEndLeft =1049;
window.onload =function(){
	//子菜单的缩放
	 var menuDIV = document.getElementById('menuDIV');
	 var sonMenus =menuDIV.getElementsByTagName('li');
	 var menuContent = document.getElementsByClassName('menuContent')[0];
	// console.log(sonMenus.length);
     Tabs(document,'menubox','menuContent');
    //点击空白处收起目录 
  document.body.onclick = function(){//点击空白处子菜单收回
    	var event = event ? event : window.event; 
    	if(event.preventDefault){//取消默认行为
    		event.preventDefault();
    	}else{
    		event.returnValue = false;
    	}//取消冒泡
    	if(event.stopPropagation){
    		event.stopPropagation();
    	}else{
    		event.cancelBubble =true;
    	}
  	  openMenu(menuContent,1);
     }
     //点击目录中时不使目录收起
  menuContent.onclick =function(event){
     	var event =event || window.event;
     	if(event.stopPropagation){
     		event.stopPropagation();
     	}else{
     		event.cancelBubble =true;
     	}   	
     }
	//tabs 
  var containers =document.getElementsByClassName('container');
//console.log(containers.length);
  for(var i=0;i<containers.length;i++){
  	Tabs(containers[i],'title','content');
            }
     //menu的缩放 
     var menu = document.getElementById('menu'),
         leftDIV   = document.getElementById('menuDIV'),
         rightDIV  = document.getElementById('rightDIV');
         rightDIV.onclick = function(){
   var leftDIVLeft = getStyle(leftDIV,'left');
   var menuDIVWidth =  getStyle(menuDIV,'width');
   var rightDIVLeft =  getStyle(rightDIV,'left');
		    if(rightDIVLeft ==rightDIVBeginLeft){
		    	setTimeout(function(){
                    start(menuDIV,rightDIV,rightDIVEndLeft);
		    	},20);
		    	
		    }else if(rightDIVLeft==rightDIVEndLeft){
		    	setTimeout(function(){
		    	   start(menuDIV,rightDIV,rightDIVBeginLeft);
		    	},20);
		    }
	    } 
	  //菜单头的透明度变化  
	 rightDIV.onmouseover =function(){
	 	this.style.opacity =0.8;
	 }       
	 rightDIV.onmouseout =function(){
	 	this.style.opacity = 1;
	 } 
	 //点击子菜单小标题时,定位到其所在章节
	 var javascriptMenu  = document.getElementById('javascriptMenu');
	 var javascriptMenus =javascriptMenu.getElementsByTagName('button');
	// console.log(javascriptMenus.length);//12
	 var sections = document.getElementsByClassName('sections');
	// console.log(sections.length);//6
	 for(var i=0,len=sections.length;i<len;i++){
	 	javascriptMenus[i].onclick =function(event){
	 		var th =parseInt(this.getAttribute('data-number'));
	 	//	console.log(th);
            var event =event || window.event;
             if(event.stopPropagation){
             	event.stopPropagation();
             }else{
             	event.cancelBubble =true;
             }
             for(var j=0,l=sections.length;j<l;j++){
             	sections[j].style.border ='1px solid #d1c7b7';
             }
             setTimeout(function(){
                sections[th].style.border ='1px solid red';
             },200);
	 	}
	 }
	 //左右布局
	 var leftTitleRightContents =document.getElementsByClassName('leftTitleRightContent'),
         leftTitles =document.getElementsByClassName('leftTitle'),
         rightContents = document.getElementsByClassName('rightContent');
    // console.log(" "+leftTitleRightContents.length+leftTitles.length+rightContents.length); //   yes
         for(var i=0,len =leftTitleRightContents.length;i<len;i++){
               Tabs(leftTitleRightContents[i],'leftTitle','rightContent'); 
         	   leftTitleRightContents[i].onmousewheel =function(){
         	   	 var that = parseInt(this.getAttribute('data-number')); 
                 var locationHeight=getEndTop(this);
                  updownZoom(leftTitles[that],locationHeight);
              }
        }
}  
//菜单图标的左右移动	          
 function start(obj1,obj2,end){//parseInt(getComputedStyle(obj2,false).left)
              var speed  = (end -getStyle(obj2,'left'))/10;
              speed = speed >0 ? Math.ceil(speed) : Math.floor(speed);
              if(getStyle(obj2,'left') !=end){        	
              	 var original1 =getStyle(obj2,'left');//
                 var original2= original1 -397;              
                  obj1.style.width = original2 +speed +'px'; 
                  obj2.style.left = original1 +speed +'px';
                  setTimeout(function(){
                  	 start(obj1,obj2,end);
                  },20)
               }
        //      console.log("start的间歇调用定时器!");          
         }
  //子菜单的缩放函数
  function openMenu(obj,end){
     	 var gSpeed = (end-getStyle(obj,'height'))/10;
    // 	  console.log("height="+getComputedStyle(obj,false).height+ ",end="+end);
	     gSpeed =gSpeed >0 ? Math.ceil(gSpeed) : Math.floor(gSpeed);
	     if(getStyle(obj,'height')!=end){
	     	obj.style.height = getStyle(obj,'height') +gSpeed +'px';
	     	setTimeout(function(){
                openMenu(obj,end);
	     	},20);
	     } 
	   // console.log("openMenu的间歇调用定时器!");  
  } 
//
//得到滚动标题栏随页面滚动变化后的高度
  function getEndTop(element){ //element is leftTitleRightContents[i]
      var scrollTop = getScrollTop();
      var pageHeight =getPageHeight();
      var elementTop = getElementTop(element);
      var Height = getHeight(element.parentNode.parentNode);
      var endTop =0; 
      var flag =0;
      // console.log(scrollTop+','+pageHeight+','+elementTop+','+Height);//yes
      if(elementTop>scrollTop){
      	    flag= elementTop - scrollTop;
           if(flag < parseInt(pageHeight/3)){
           	   endTop = parseInt((pageHeight - flag)/3);
           }else{
           	  endTop = parseInt((pageHeight -flag)/5);
           }
      }else{
      	  flag = scrollTop - elementTop;
      	  if(Height - flag  < pageHeight && ((Height-flag) >parseInt(pageHeight/3))){
      	  	 endTop = flag + parseInt((pageHeight -flag)/3);
      	  }else if(Height - flag  < pageHeight && ((Height-flag) <parseInt(pageHeight/3))){
      	  	endTop = parseInt(Height*0.8);
      	  }else{
      	  	endTop =parseInt(pageHeight/2) + flag;
      	  }
      }
      return endTop;
  }
  //元素左侧标题框随滚动而变化
function updownZoom(obj,end){
	var th = parseInt(obj.parentNode.getAttribute('data-number'));
	clearInterval(time[th]);
	time[th] =setInterval(function(){
		var gSpeed =(end-getStyle(obj,'top'))/10;
		gSpeed =gSpeed >0 ?Math.ceil(gSpeed) : Math.floor(gSpeed);
	     if(getStyle(obj,'top')==end){
	     	clearInterval(time[th]);
	     }else{
	     	obj.style.top = getStyle(obj,'top') +gSpeed +'px';
	     }
	   //  console.log("updownZoom的间歇调用定时器!"); 
	},20);
}
    function Tabs(contain,obj1,obj2){
    	var titles = contain.getElementsByClassName(obj1)[0];
        var content = contain.getElementsByClassName(obj2)[0];
        var flag ;
        try{
            var lis  = titles.getElementsByClassName('titleLi');
            var divs2 = content.getElementsByClassName('contentDiv');
            var divs =[];
            for(var i=0,l=divs2.length;i<l;i++){
                if(divs2[i].parentNode ==content){
                	divs.push(divs2[i]);
                }
            }
         //   console.log(""+divs.length+","+ lis.length);
            if(lis.length ==divs.length){
                for(var j=0,len =lis.length;j<len;j++){
                	lis[j].onclick = function(){
                		var event = event ? event : window.event;   	
				    	//取消冒泡
				    	if(event.stopPropagation){
				    		event.stopPropagation();
				    	}else{
				    		 event.cancelBubble =true;
				    	}
                		if(obj2 == 'menuContent'){
                			setTimeout(function(){
                				openMenu(content,menuContentHeight);
                			},20);	
                		}
                		if(obj1 =='leftTitle'){
                			updownZoom(titles,22);
                		}
                		for(var k=0,lenLis=lis.length;k<lenLis;k++){
                			divs[k].style.display ='none';
                			lis[k].style.backgroundColor = '#d1c7b7';
                		}
                		var Num = parseInt(this.getAttribute('data-number'));
                		divs[Num].style.display ='block';
                		this.style.backgroundColor ='#FFFFFF';
                	}
                }
            }else{
            	throw new Error("tabs中内容与标题不对应..id为"+contain.id);
            }
        }catch(error){
        	console.error(error.message);
        }
    }      
 // 元素相对页面的偏移位置高度  
    function getElementTop(element){   //leftTitleRightContents[i]
    	var actualTop = element.offsetTop;
    	var current =element.offsetParent;
    	while(current!==null){
    		actualTop +=current.offsetTop;
    		 current =current.offsetParent;
    	}
    	return actualTop;
    }
    //页面的高度
    function getPageHeight(){
    	var pageHeight =window.innerHeight;
    	if(typeof pageHeight != "number"){
    		if(document.compatMode =="CSS1Compat"){
    			pageHeight =document.documentElement.clientHeight;
    		}else{
    			pageHeight =document.body.clientHeight;
    		}
    	}
    	return pageHeight;
    }
  //body元素的滚动高度(隐藏在页面上方的高度)
   function getScrollTop(){
       return document.body.scrollTop;
   }
   //元素的高度
  function getHeight(element){//element  leftTitleRightContents[i].parentNode.parentNode
  	 var H = getStyle(element,'height');
  	 return H;
  }
 //
 function getStyle(element,attr){
       var value;
       switch(attr){
        case 'left' : 
           value = (getComputedStyle(element,false).left) ? parseInt(getComputedStyle(element,false).left) : parseInt(element.currentStyle.left);
           break;
        case 'width' :
           value = (getComputedStyle(element,false).width) ? parseInt(getComputedStyle(element,false).width) : parseInt(element.currentStyle.width);   
           break;
        case 'height' : 
           value = (getComputedStyle(element,false).height) ? parseInt(getComputedStyle(element,false).height) : parseInt(element.currentStyle.height);   
           break;
        case 'top' : 
           value = (getComputedStyle(element,false).top) ? parseInt(getComputedStyle(element,false).top) : parseInt(element.currentStyle.top);   
           break;   
       }
       return value ;
   }      