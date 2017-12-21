var picture={
        //图片路径
        url:'../images/',
        //图片数组
        arr:['01.jpg','02.jpg','03.jpg','04.jpg',
           '05.jpg','06.jpg','07.jpg'],
        //初始方法
        init:function(){
            this.onPlay();
            this.leftPlay();
            this.rightPlay();
            this.handPlay();
        },
        //定时器时间
        timer:null,
        //前移方法
        leftPlay:function(){
            $("#moving1").on("click",function(){
                for(var i=0;i<$("#pic_collection>li").length;i++){
                    var j=parseInt($("#pic_collection>li>img").eq(i).attr("src").substr(11,1));
                    if(j==7){
                        $("#pic_collection>li").eq(i).html("<img src="+this.url+"01.jpg>");
                    }else {
                        $("#pic_collection>li").eq(i).html("<img src="+this.url+"0"+(j+1)+".jpg>");
                    }
                }
                console.log($(".pic_padding>img").attr("src"));
            }.bind(this));
        },
        //后移方法
        rightPlay:function(){
            $("#moving2").on("click",function(){
                for(var i=0;i<$("#pic_collection>li").length;i++){
                    var j=parseInt($("#pic_collection>li>img").eq(i).attr("src").substr(11,1));
                    if(j==1){
                        $("#pic_collection>li").eq(i).html("<img src="+this.url+"07.jpg>");
                    }else {
                        $("#pic_collection>li").eq(i).html("<img src="+this.url+"0"+(j-1)+".jpg>");
                    }
                }
            }.bind(this));
        },
        //自动轮播方法
        onPlay:function() {
            this.timer = setInterval(function () {
                for (var i = 0; i < $("#pic_collection>li").length; i++) {
                    //console.log($("#pic_collection>li>img").eq(i).attr("src"));
                    var j = parseInt($("#pic_collection>li>img").eq(i).attr("src").substr(11, 1));
                    if (j == 7) {
                        $("#pic_collection>li").eq(i).html("<img src=" + this.url + "01.jpg>");
                    } else {
                        $("#pic_collection>li").eq(i).html("<img src=" + this.url + "0" + (j + 1) + ".jpg>");
                    }
                }
            }.bind(this), 3000);
        },
        //手动点播
        handPlay:function(){
        	$(".number>li>a").on("click",function(e){
        		clearInterval(this.timer);
        		this.timer=null;
        		//console.log(e.target.name)
        		var num=e.target.name;
        		for (var i = 0,j = parseInt(num)-3; i < $("#pic_collection>li").length; i++,j++) {
                    //console.log($("#pic_collection>li>img").eq(i).attr("src"));
                    console.log(j)
                    if (j==7){
                        $("#pic_collection>li").eq(i).html("<img src=" + this.url + "01.jpg>");
                    }else if(j==8){
                        $("#pic_collection>li").eq(i).html("<img src=" + this.url + "02.jpg>");
                    }else if(j==9){
                        $("#pic_collection>li").eq(i).html("<img src=" + this.url + "03.jpg>");
                    }else if(j==-3){
                        $("#pic_collection>li").eq(i).html("<img src=" + this.url + "05.jpg>");
                    }else if(j==-2){
                        $("#pic_collection>li").eq(i).html("<img src=" + this.url + "06.jpg>");
                    }else if(j==-1){
                        $("#pic_collection>li").eq(i).html("<img src=" + this.url + "07.jpg>");
                    }else if(j==e.target.name){ 
                    	$(".pic_padding").html("<img src=" + this.url + "0"+(parseInt(num)+1)+".jpg>");
                    }else {
                        $("#pic_collection>li").eq(i).html("<img src=" + this.url + "0" + (j+1) + ".jpg>");
                    }
                }		
                this.onPlay();
        	}.bind(this));
        }
    }
    picture.init();   