document.querySelector('#app>div.content>div.con_content>ul').style.height='876px';
//蓝按钮
var but_one=$('div.con_nav>ul>li>input');
var but_two=$('div.con_content>ul>li>input');
for(var i=0;i<but_one.length;i++){
	but_one[i].onmouseenter=function(){
		$(but_one).removeClass("alive");
		if($(this).hasClass("alive")){
			$(this).removeClass("alive");
		}else{
			$(this).addClass("alive");
		}
	}
}
for(var j=0;j<but_two.length;j++){
	but_two[j].onmouseenter=function(){
		$(but_two).removeClass("alive");
		if($(this).hasClass("alive")){
			$(this).removeClass("alive");
		}else{
			$(this).addClass("alive");
		}
	}
}
//资源
var strblueBtn=$('input.input_btn_blue');
for(var i=0;i<strblueBtn.length;i++){
	$(strblueBtn[i]).on('mouseenter',function(){
		
	})
}
//编辑
var blueBtn=$('input.input_btn_deepblue');
for(var i=0;i<blueBtn.length;i++){
	$(blueBtn[i]).on('mouseenter',function(){
		if($(this).hasClass("input_btn_gray")){
			$(this).addClass("input_btn_deepblue").removeClass("input_btn_gray");
		}else if($(this).hasClass("input_btn_deepblue")){
			$(this).removeClass("input_btn_deepblue").addClass("input_btn_gray");
		}
	})
}
//删除
var redBtn=$('input.input_btn_red');
for(var i=0;i<redBtn.length;i++){
	$(redBtn[i]).on('mouseenter',function(){
		if($(this).hasClass("input_btn_gray")){
			$(this).addClass("input_btn_red").removeClass("input_btn_gray");
		}else if($(this).hasClass("input_btn_red")){
			$(this).removeClass("input_btn_red").addClass("input_btn_gray");
		}
	})
}
