// 自定义管理
// 获取元素
function fGetElement() {
    var c = new Array();
    for (var b = 0; b < arguments.length; b++) {
        var a = arguments[b];
        // 判断是否是字符串类型
        if (typeof a == "string") {
            // 获取a
            a = document.getElementById(a)
        }
        if (arguments.length == 1) {
            return a;
        }
        c.push(a);
    }
    return c;
} 

var userDefined={
	aDomAry: [],
    customManagement:function(){//自定义管理
     	// 获取元素
        if (this.aDomAry.length < 2) {
            this.aDomAry = fGetElement("search");
        }
        var marea=$(this.aDomAry).children('div.statistics').children('ul.statistics_items').find('li.stat_item>div>div.custom');
    	for(var i=0;i<marea.length;i++){
    		!(function(i){
    			$($(marea)[i]).on('click',function(){
    				if($(this).hasClass('area_part')){

    				}
    				if($(this).hasClass('unitPrice_part')){

    				}
    				if($(this).hasClass('totalPrice_part')){

    				}
    				if($(this).hasClass('floor_part')){

    				}
    			});
    		}(i))
    	}
    },
}
userDefined.customManagement();