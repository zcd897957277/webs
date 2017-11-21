// 条件项中条件的选择
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

var SearchItem = {
    aDomAry: [],lis:null,inputUserDefined:null,dataAll:[],
    searchLiClick:function(){//搜索条件中li的选择
    	this.btnsClick();
     	// 获取元素
        if (this.aDomAry.length < 2) {
            this.aDomAry = fGetElement("search");
        }
        this.lis=$(this.aDomAry).children('div.condition_item').children('div.searchbox_condition').find('li.condition>ul.alllines>li');
    	var Thislis=this.lis;
    	for(var i=0;i<(Thislis).length;i++){
    		!(function(i){
    			$($(Thislis)[i]).on('click',function(){
	    			if(($($(Thislis)[i]).hasClass('small_line') || $($(Thislis)[i]).hasClass('normal_line') || $($(Thislis)[i]).hasClass('sbig_line') || $($(Thislis)[i]).hasClass('big_line'))&&!$($(Thislis)[i]).hasClass('line_selected')){
		    			$($(Thislis)[i]).addClass('line_selected');
		    			// console.log($($(Thislis)[i]).attr('data'));
		    		}else if(($($(Thislis)[i]).hasClass('small_line') || $($(Thislis)[i]).hasClass('normal_line') || $($(Thislis)[i]).hasClass('sbig_line') || $($(Thislis)[i]).hasClass('big_line'))&&$($(Thislis)[i]).hasClass('line_selected')){
		    			$($(Thislis)[i]).removeClass('line_selected');
		    		}
	    		});
    		}(i))
    	}
    },
    btnsClick:function(){//按钮组设置
    	// 获取元素
        if (this.aDomAry.length < 2) {
            this.aDomAry = fGetElement("search");
        }
        this.inputUserDefined=$(this.aDomAry).children('div.condition_item').children('div.searchbox_condition').find('li.condition>div.input_user_defined>input');
        var clearBtn=$(this.aDomAry).children('div.condition_item').children('div.btns').children('div.clear_btn');
        var sureBtn=$(this.aDomAry).children('div.condition_item').children('div.btns').children('div.sure_btn');
        var Thislis=$(this.aDomAry).children('div.condition_item').children('div.searchbox_condition').find('li.condition>ul.alllines>li');
        var Thisinput=this.inputUserDefined;
        
        $(sureBtn).on('click',function(){
        	if(Thislis){
        		for(var i=0;i<(Thislis).length;i++){
	        		if($($(Thislis)[i]).hasClass('line_selected')){
	        			this.dataAll.push($($(Thislis)[i]).attr('data'));
	        		}
	        	}
        	}
        	if(Thisinput){
        		for(var j=0;j<(Thisinput).length;j++){
	        		if($($(Thisinput)[j]).val()){
	        			this.dataAll.push($($(Thisinput)[j]).attr('data')+':'+$($(Thisinput)[j]).val());
	        		}
	        	}
        	}

        	var span=$(this.aDomAry).children('div.searchbox_nav').children('span');
        	var div=$(this.aDomAry).children('div.condition_item');
        	var rst=$(this.aDomAry).children('div.result');
        	$(span).removeClass('searchbox_nav_off').addClass('searchbox_nav_show');
        	$(div).attr('style','display:none');
        	$(rst).attr('style','');
        	console.log(this.dataAll)
        }.bind(this))

        $(clearBtn).on('click',function(){
        	if(Thislis){
        		for(var i=0;i<(Thislis).length;i++){
	        		if($($(Thislis)[i]).hasClass('line_selected')){
	        			$($(Thislis)[i]).removeClass('line_selected')
	        		}
	        	}
        	}
        	if(Thisinput){
        		for(var j=0;j<(Thisinput).length;j++){
	        		if($($(Thisinput)[j]).val()){
	        			$($(Thisinput)[j]).val('');
	        		}
	        	}
        	}
        });
    }
}

SearchItem.searchLiClick();

//nav的切换
$('#search>div.searchbox_nav').on('click',function(){
	var span=$(this).children('span');
	var div=$(this).parent('#search').children('div.condition_item');
	var rst=$(this).parent('#search').children('div.result');
	if($(span).hasClass('searchbox_nav_off')){
		$(span).removeClass('searchbox_nav_off').addClass('searchbox_nav_show');
		$(div).attr('style','display:none');
	}else if($(span).hasClass('searchbox_nav_show')){
		$(span).removeClass('searchbox_nav_show').addClass('searchbox_nav_off');
		$(div).attr('style','');
		if(!$(rst).attr('style')){
			$(rst).attr('style','display:none');
		}
	}
});

// 结果显示
