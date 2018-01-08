//闪烁的标题栏
function flashTitle(){
	//每隔500毫秒修改一次标题栏
	setInterval('setTitle()',500);
}
//设置全局函数，用于记录闪烁的次数
var count=0;

//修改文档显示的标题
function setTitle(){
	if(count==0){
		count=1;
		document.title='☆☆☆标题☆☆☆';
	}else{
		count=0;
		document.title = '★★★标题★★★';
	}
}
