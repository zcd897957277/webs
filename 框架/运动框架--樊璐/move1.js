var animated=true;
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];	
	}else{
		return getComputedStyle(obj,false)[name];	
	}	
}

function startMove(obj,json,endFn){
	animated=false;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var Stop=true;//假设所有的值都已经到了
		for(var attr in json){
			if(attr=="opacity"){
				var cur=Math.round(parseFloat(getStyle(obj,attr))*100);	
			}else{
				var cur=parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr]){
				Stop=false;
			}
			if(attr=='opacity'){
				obj.style.filter="alpha(opacity="+(cur+speed)+")";
				obj.style.opacity=(cur+speed)/100;
			}else{
				obj.style[attr]=cur+speed+'px';
			}
			
		}
		if(Stop){
			clearInterval(obj.timer);
			animated=true;
			if(endFn){
				endFn();	
			}
		}
	},100)	
}