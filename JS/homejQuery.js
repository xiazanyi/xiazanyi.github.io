$(document).ready(function(){
     main();
     section1();
});
//所有章节的缩放
function main(){
	var $sections = $('.section');
     var $beginStudy = $('.beginStudy');
    // console.log($beginStudy.length);//20 yes
     $.each($beginStudy,function(index,value){
          $($sections[index]).hide();
          $($beginStudy[index]).click(function(event){
              event.preventDefault();
              $($sections[index]).slideToggle('slow'); 
              var $link =$(this);
              if($link.text()=='开始学习'){
              	$link.text('结束学习');
              }else{
              	$link.text('开始学习');
              }
          });
     });
} 
//内容的显示与隐藏
function section1(){
	var $IntroBtn = $('.IntroBtn'),
        $Intro = $('.Intro');
    $.each($IntroBtn,function(index){
        $($Intro[index]).hide();
        $($IntroBtn[index]).click(function(event){
           event.preventDefault();
           $($Intro[index]).slideToggle('slow');
        });
    });  
}