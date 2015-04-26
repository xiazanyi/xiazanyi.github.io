 var time =[];//滚动标题栏的定时器数组
 var allSections =document.getElementsByClassName('sections');
var mainDiv =document.getElementById('main');
var menuDIV = document.getElementById('menuDIV');
var sonMenus =menuDIV.getElementsByTagName('li');
var menuContent = document.getElementsByClassName('menuContent')[0];
//子菜单栏高度
//
var objectImg = getImgHeightWidth();
//
var menuContentHeight = ContentHeight().Height;
var rightDIVBeginLeft = ContentHeight().rightDIVBeginLeft;
var rightDIVEndLeft = ContentHeight().rightDIVEndLeft;
window.onload =function(){
      
      changeSubMenu();

      //
      window.onresize = function(){
         menuContentHeight = ContentHeight().Height;
         rightDIVBeginLeft = ContentHeight().rightDIVBeginLeft;
         rightDIVEndLeft = ContentHeight().rightDIVEndLeft;
         changeSubMenu();
         //
          openMenu(menuContent,1);
         //
         doMenu();
        //tabs 
        doTabs();
        //菜单游标的左右移动
        doLeftMoveRight();
         //点击子菜单小标题时,定位到其所在章节
         doLocation();
        
         //左右布局
         doLayout();
         //调整全文图片大小
         adjustImg();
      }
  //代码高亮
  prettyPrint();
  //

	//子菜单的缩放
	// console.log(sonMenus.length);
  // 对子菜单的点击显示与隐藏
  doMenu();
	//tabs 
  doTabs();
  //菜单游标的左右移动
  doLeftMoveRight();
	 //点击子菜单小标题时,定位到其所在章节
   doLocation();
  
	 //左右布局
   doLayout();
   //调整全文图片大小
   adjustImg();
      //给全文字的P元素开头时添加空格
      addBlankFour('p');
      //给全文含有publicLiStyle类的ul元素中的li元素添加一个图标
     addIcon('publicLiStyle');
     //
     //菜单图标的左右移动    start(menuDIV,rightDIV,rightDIVBeginLeft);        
   //设置标题栏的子标题栏的高度
   
//对菜单的操作
function doMenu(){
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
  }
  //操作Tabs元素
   function doTabs(){
     var containers =document.getElementsByClassName('container');
//console.log(containers.length);
     for(var i=0;i<containers.length;i++){
       Tabs(containers[i],'title','content');
     }
  }
  // 菜单游标的左右移动
  function doLeftMoveRight(){
     //menu的缩放
     if(pageBoM()){ //if pageBoM()
         var menu = document.getElementById('menu'),
             leftDIV   = document.getElementById('leftDIV'),
             rightDIV  = document.getElementById('rightDIV');
            
            leftDIV.style.left  =  getOffsetLeft(allSections[0]) -50 + 'px';
            rightDIV.style.left =  getOffsetLeft(allSections[0]) -50 +'px'; 
            menuDIV.style.width =  0+'px';
            menuDIV.style.left  =  getOffsetLeft(allSections[0]) +'px';
             rightDIV.onclick = function(){
                 var leftDIVLeft = getStyle(leftDIV,'left');
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
            } //onclick 
              //菜单头的透明度变化  
             rightDIV.onmouseover =function(){
              this.style.opacity =0.8;
             }       
             rightDIV.onmouseout =function(){
              this.style.opacity = 1;
             } 
     }else{
        menuDIV.style.width = getPageWidth() +'px';
        menuDIV.style.left  =  0+'px';
        menuContent.style.width = getPageWidth()+'px';
        menuContent.style.left  = 0+'px';
     } 

  }  //doLeftMoveRight
  ////点击子菜单小标题时,定位到其所在章节
  function doLocation(){
       var javascriptMenu  = document.getElementById('javascriptMenu');
       var javascriptMenus =javascriptMenu.getElementsByTagName('button');
      // console.log(javascriptMenus.length);//12
       var sections = document.getElementsByClassName('sections');
      // console.log(sections.length);//6
       for(var i=0,len=sections.length;i<len;i++){
        javascriptMenus[i].onclick =function(event){
          var th =parseInt(this.getAttribute('data-number'));
        //  console.log(th);
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
       }  //for
  }
  //左右布局
  function  doLayout(){
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
  //改变子菜单的位置
  function changeSubMenu(){
  if(pageBoM()){
    menuContent.style.left = rightDIVBeginLeft +50+'px';
  }else{
    menuContent.style.left =0 +'px';
  }
}
//处理图片随窗口的变化而改变大小
function adjustImg(){
   var imgs = document.getElementsByTagName('img');
   var mW =  objectImg.w,
       mH = objectImg.h;
   for(var i=0,l=imgs.length;i<l;i++){
       if(pageBoM()){
           imgs[i].style.width =mW[i] +'px';
         imgs[i].style.height =mH[i] +'px';
       }else{
         imgs[i].style.width = 2*mW[i]/3 +'px';
         imgs[i].style.height =2*mH[i]/3 + 'px';
       }
   }
}
//
} //onload 
//
function ContentHeight(){
   var obj  ={
      Height : null,
      rightDIVBeginLeft : null,
      rightDIVEndLeft :null
   }
   if(pageBoM()){//大屏幕
    with(obj){
       Height = 85;
       rightDIVBeginLeft = getOffsetLeft(allSections[0]) - 50;
       rightDIVEndLeft = getPageWidth() - rightDIVBeginLeft - 80;
    }
   }else{ //小屏幕
      with(obj){
         Height = 180;
         rightDIVBeginLeft = 0;
         rightDIVEndLeft = 0;
       }
   }
   return obj;
} 
function getImgHeightWidth(){
    var imgs = document.getElementsByTagName('img');
   var height =[],width =[];
   var obj  ={
      h : height,
      w : width
   }
   for(var i=0,l=imgs.length;i<l;i++){
       obj.h.push(imgs[i].height);
       obj.w.push(imgs[i].width);
   }
   return obj;
}
function start(obj1,obj2,end){//parseInt(getComputedStyle(obj2,false).left)
              var speed  = (end -getStyle(obj2,'left'))/10;
              speed = speed >0 ? Math.ceil(speed) : Math.floor(speed);
              if(getStyle(obj2,'left') !=end){          
                 var original1 =getStyle(obj2,'left');//rightDIV的x 坐标
                 var original2= original1 -rightDIVBeginLeft; //             
                  obj1.style.width = original2 +speed +'px'; //Menu的宽度
                  obj2.style.left = original1 +speed +'px';//rightDIV的x坐标
                  setTimeout(function(){
                     start(obj1,obj2,end);
                  },20)
               }
        //      console.log("start的间歇调用定时器!");          
         }
  //子菜单的缩放函数
  function openMenu(obj,end){
       var gSpeed = (end-getStyle(obj,'height'))/10;
    //    console.log("height="+getComputedStyle(obj,false).height+ ",end="+end);
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
   //给给定元素开头添加空格
   function addBlankFour(element){
       var elements = document.getElementsByTagName(element);
     //  console.log(elements.length);
       for(var i=0,len=elements.length;i<len;i++){
          var span = document.createElement('span');
          span.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
          elements[i].insertBefore(span,elements[i].firstChild);
       }

   }
   //
   function addIcon(ul){
     var uls = document.getElementsByClassName(ul);
     for(var i=0,len=uls.length;i<len;i++){
        var lis = uls[i].getElementsByTagName('li');
        for(var j=0,l=lis.length;j<l;j++){
          if(lis[j].parentNode ==uls[i]){   
              var span = document.createElement('span');
              span.className = 'glyphicon glyphicon-paperclip';
              span.style.cssText = 'color:green';
              span.innerHTML = '&nbsp;'
              lis[j].insertBefore(span,lis[j].firstChild);
          }
        }
     }
   }
   //获取视口大小
   function getPageWidth(){
      var pageWidth = window.innerWidth;
    if(typeof pageWidth != "number"){
       if(document.compatMode =="CSS1Compat"){
           pageWidth =document.documentElement.clientWidth;
       }else{
           pageWidth =document.body.clientWidth;
       }
    }
    return pageWidth;
   }
   //小屏幕与大屏幕的检测函数,小屏幕false 大屏幕true
   function pageBoM(){
       if(getPageWidth()>900) return true;
       else return false;
   }
   //获取元素相对于视口的偏移量
   function getOffsetLeft(element){
      var offsetLeft = element.offsetLeft;
      var current =element.offsetParent;
      while(current!==null){
         offsetLeft+=current.offsetLeft;
         current =current.offsetParent;
      }
      return offsetLeft;
   }
