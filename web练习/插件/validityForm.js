/*1. 定义插件
	*$.extend(object)方法 -- 全局函数
		*$.each(arr,function(index,domEle){});
	*$.fn.extend(object)方法 -- 对象方法 
		*$().each(function(index,domEle){})
*/
$.fn.extend({
	validityForm:function(){
		//得到id为username的元素
		//this - 调用该方法的jQuery对象
		//1. 获取被验证的元素id属性值
		console.log(this)
		var elemid=this.attr("id");
		//2. 获取对应的提示信息
		var msg=$("#"+elemid+"Tip").text();
		//3. 获取被验证的文本内容
		var elemtext=$("[for="+elemid+"]").text();
		//完成表单元素的验证
		this.focus(function(){
			$("#"+elemid+"Tip").text(msg);
			console.log(this)
		}).blur(function(){
			if(this.validity.valid){
				$("#"+elemid+"Tip").text(elemtext+"输入正确。");
			}
			if(this.required){
				if(this.validity.valueMissing){
					$("#"+elemid+"Tip").text(elemtext+"不能为空。");
				}
			}
			if(this.pattern){
				if(this.validity.patternMismatch){
					$("#"+elemid+"Tip").text(elemtext+"格式不正确。");
				}
			}
		});
	}
});