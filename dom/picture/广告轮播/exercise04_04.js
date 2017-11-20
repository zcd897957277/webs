//数组：存储图片路径
var imageArray=['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg'];
//即将显示的下一张图片在数组中的索引，因为页面初始化显示第一张图片，因此下一张图片为第二张图片
var imageIndex=1;
//定时器
var imageTimer;

//启动图片轮换
function startRotate(){
	//启动定时器，每3s修改一次，3s后修改时，直接显示为下一张图片
	imageTimer=window.setInterval(modifyImageAndSpan,3000);
}
/*
 * 改变图片以及对应序号的样式：
 * 		1.先根据当前应该显示的图片序号（imageIndex）更新图片和数字文本的样式
 * 		2.再更新图片序号（为下一次显示做准备）
 */
function modifyImageAndSpan(){
	//找到<img>元素，修改其图片为当前应该显示的图片（下一张图片）
	var image=document.getElementById('img1')
	image.src=imageArray[imageIndex];
	
	//修改<span>元素的样式：只有和图片一致的数字显示为current样式
	var div=document.getElementById('indexDiv');
	var spanNodes=div.getElementsByTagName('span');
	for(var i=0;i<spanNodes.length;i++){
		if(i==imageIndex){
			spanNodes[i].className="current";
		}else{
			spanNodes[i].removeAttribute('class');
		}
	}
	
	//更新图片索引，用于下一次的图片显示：如果已经是最后一张图片，则重新开始
	if(imageIndex==imageArray.length-1){
		imageIndex=0;
	}else{
		imageIndex++;
	}
}
//停止图片轮换
function stopRotate(){
	//先判断是否有参数：有参数则根据参数更新imageIndex，并立即切换到相应的图片
	if(arguments.length==1){
		imageIndex=arguments[0];
		modifyImageAndSpan();
	}
	//停止定时器
	window.clearInterval(imageTimer);
}
