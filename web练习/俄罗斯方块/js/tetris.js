// JavaScript Document
var tetris={
	OFFSET:15,//盛放格子的区域距边框的边距，两个格子之间的距离
	CSIZE:26，//每个格子的大小
	shape:null,//保存正在下落的主角图形
	nexShape:null,//保存备胎图形
	pg:null,//保存游戏的容器元素  为了防止多次导入
	interval:500,//保存方块下落速度
	timer:null,//保存定时器
	RN:20,CN:10,//保存总行数和总列数
	wall:null,//保存停止下落的图形中方块的墙
	ln:0,//保存删除的总行数
	score:0,//保存得分
	SCORES:[0,10,30,50,100],//删除行数的得分情况0 1 2 3 4
	state:1,//保存游戏状态
	GAMEOVER:0,//结束游戏
	RUNNING:1,//游戏运行中
	PAUSE:2,//暂停游戏
	start:function(){//构造函数 开始游戏
		this.score=0;//得分清零
		this.ln=0;//游戏中满行删除的行数清零
		this.state=this.RUNNING;//游戏初始状态，运行中
		this.wall=[];//创建空数组
		for(var r=0;r<this.RN;r++){//遍历每一行
			this.wall[r]=new Array(this.CN);//每一行都创建一个有着CN个元素的空数组
		}
	    this.pg=document.querySelector(".playground");//将class为playground的元素保存在pg中
		this.shape=this.randomShape();//随机产生图形
		this.nextShape=this.randomShape();
		this.paint();//重绘一切
		this.timer=setInterval(this.moveDown.bind(this),this.interval);
		//为当前页面绑定按下事件
		document.onkeydown=function(e){
			//判断键盘号
			switch(e.keyCode){
				//如果是37，就调用moveLeft 运行是才可动
				case 37:this.state==this.RUNNING&&this.moveLeft();break;//左移
				case 39:this.state==this.RUNNING&&this.moveRight();break;//右移
				case 40:this.state==this.RUNNING&&this.moveDown();break;//下移
				case 38:this.state==this.RUNNING&&this.rotateR();break;//顺时转
				case 90:this.state==this.RUNNING&&this.rotateL();break;
				case 83:this.state==this.GAMEOVER&&this.start();break;//游戏结束 s 开始
				case 67:this.state==this.RUNNING&&this.pause();break;//p游戏暂停
				case 81:this.state==this.gameover();break;//q 游戏结束
				case 32:this.state==this.RUNNING&&this.hardDrop();//空格 快速下落
			}
		}.bind(this);//改变onkeydown中的this从window为tetris
	},
	hardDorp:function(){//快速下落
		while(this.canDown()){//可以下落就一直落
			this.moveDown();
		}
	},
	gameover:function(){
		this.state=this.GAMEOVER;//将状态改为游戏结束
		clearInterval(this.timer);//清空计时器，不让动了
		this.timer=null;//释放内存
		this.paint();//重绘一切
	},
	pause:function(){
		this.state=this.PAUSE;//游戏暂停
		clearInterval(this.timer);//清空计时器
		this.timer=null;//释放内存
		this.paint();//重绘一切
	},
	myContinue:function(){
		this.state=this.RUNNING;//游戏运行
		this.timer=setInterval(this.moveDown.bind(this),this.interval);
		this.paint();
	},
	canRotate:function(){
		for(var i=0;i<this.shape.cells.length;i++){//遍历主角图形中每一个小图
			var cell=this.shape.cells[i];
			//如果：cell的c<0或>=CN,或cell的r<0或>=RN,或wall中和cell相同位置有格
			if(cell.c>0||cell.c>=this.CN||cell.r<0||cell.r>=this.RN||
			this.wall[cell.r][cell.c]!==undefined){
				return false;//不让旋转，避免越界
			}
			return true；
		}
	},
	rotateR:function(){
		this.shape.rotateR();//右转
		if(!this.canRotate()){//不可以右转
			this.shape.rotateL();//左转
		}
		this.paint();
	},
	rotateL:function(){
		this.shape.rotateL();
		if(!this.canRotate()){
			this.shape.rotateR();
		}
		this.paint();
	},
	canLeft:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			//如果cell的c等于0或wall左侧有格 格子在0位时，和主角图形中有小图形在左侧，但其他格在右侧是不让左移
			if(cell.c==0||this.wall[cell.r][cell.c-1]!==undefined){
				return false;
			}
			return true;
		}
	},
	moveLeft:function(){
		if(this.canLeft()){//可以左移
			this.shape.moveLeft();//调用shape.js中方法左移
			this.paint();
		}
	},
	canRight:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c==this.CN-1||this.wall[cell.r][cell.c+1]){
				return false;
			}
		}
		return true;
	},
	moveRight:function(){
		if(this.canRight()){
			this.shape.moveRight();
			this.paint()
		}
	},
	randomShape:function(){
		var r=parseInt(Math.random()*7);//随机产生图形
		switch(r){
			case 0:return new O();
			case 1:return new I();
			case 2:return new J();
			case 3:return new L();
			case 4:return new Z();
			case 5:return new S();
			case 6:return new T();
		}
	},
	paintNext:function(){//绘制备胎图形
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.nextShape.cells.length;i++){
			//调用paintCell方法绘制一个格子，传入当前cell格子和frag作为参数
			this.paintCell(cell,frag);
		}
		//遍历frag中每一个img
		for(var j=0;j<frag.childNodes.length;j++){
			//修改img的left再加上11*CSIZE 使图片到右上角
			frag.childNodes[j].style.left=parseFloat(frag.childNodes[j].style.left)+11*this.CSIZE+"px";
			//修改img的top再加上CSIZE
			frag.childNodes[j].style.top=parseFloat(frag.childNodes[j].style.top)+this.CSIZE+"px";
		}
		this.pg.appendChild(frag);//将备胎放到墙上
	},
	moveDown:function(){
		if(this.canDown()){//可下
			this.shape.moveDown();
		}else{
			this.landIntoWall();//落入墙中
			var ln=this.deleteRow();//删除单行 满格行
			this.ln+=ln;//累加本次游戏删除的行数
			this.score+=this.SCORES[ln];//根据删除的行数累加得分
			if(!this.isGameOver()){//游戏没结束，就将备胎图形下落
				this.shape=this.nextShape();
				this,nextShape=this.randomShape();
			}else{
				this.state=this.GAMEOVE;
				clearInterval(this.timer);
				this.timer=null;
			}
		}
		this.paint();
	},
	isGameOver:function(){//由备胎图从公共下落点下落下方如果无空，则游戏结束
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			if(this.wall[cell.r][cell.c]!==undefined){
				return true;
			}
		}
		return false;
	},
	paintState:function(){//游戏结束或暂停时的图片
		if(this.state!=this.RUNNING){
			var img=new Image();
			img.src=this.state==this.GAMEOVE?"img/game-over.png":"img/pause.png";
			this.pg.appendChild(img);
		}
	},
	paintScore:function(){//在界面第一个p中span下更新得分，第二个p中span下更新删除行数
		var spans=document.querySelectorAll(".playground>p>span");
		spans[0].innerHTML=this.score;
		spans[1].innerHTML=this.ln;
	},
	deleteRows:function(){//删除多行
		//从底向上遍历wall中每一行，并在行数<4（4等级）,墙中每一行有东西的情况下判断是否是满行
		for(var r=this.RN-1,ln=0;r>=0&&this.wall[r].join("")!=""&&ln<4;r--){
			if(this.isFullRow(r)){
				this.deleteRow(r);
				ln++;
				r++;
			}
		}
		return ln;
	},
	isFullRow:function(r){
		//如果不满足正则/^\,|\,$|[,][,]/，表示满行，返回true
		return String(this.wall[r]).search(/^\,|\,$|[,][,]/)==-1;
	},
	deleteRow:function(r){//删除单行
	    //自底向上遍历
		for(;r>0;r--){
			//上行下移
			this.wall[r]=this.wall[r-1];
			//清空上行
			this.wall[r-1]=new Array(this.CN);
			//遍历每一行中每一列
			for(var c=0;c<this.CN;c++){
				//如果格子中有东西
				if(this.wall[r][c]!==undefined){
					//格子下移
					this.wall[r][c].r++;
				}
			}
			//行中无东西，可不用遍历了
			if(this.wall[r-2].join("")==""){
				break;
			}
		}
	},
	landIntoWall:function(){
		//将格子放到墙中相同位置中
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			this.wall[cell.r][cell.c]=cell;
		}
	},
	canDown:function(){
		//如果主角图形中的小图，不在最下行，或者它的下一行位置上有东西，就让它下去
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.r==this.RN-1||this.wall[cell.r+1][cell.c]){
				return false;
			}
		}
		return true;
	},
	paint:function(){
		//删掉pg内容中所有img元素
		this.pg.innerHTML=this.pg.innerHTML.replace(/<img[^>]*>/g,"");
		//重绘主角图形
		this.paintShape();
		this.paintWall();//绘制墙
		this.paintNext();//绘制备胎
		this.paintScore();//重绘分数
		this.paintState();//重绘游戏状态
	},
	paintCell:function(cell,frag){
		//画出每一个小格图形
		var img=document.createElement("img");//var img=new Image();
			//设置img的left为cell的c*CSIZE+OFFSET
			img.style.left=cell.c*this.CSIZE+this.OFFSET+"px";
			//设置img的top为cell的r*CSIZE+OFFSET
			img.style.top=cell.r*this.CSIZE+this.OFFSET+"px";
			//设置img的src为cell的src
			img.src=cell.src;
			//将img追加到frag下
			frag.appendChild(img);
	},
	paintWall:function(){//绘制墙
		//创建frag
		var frag=document.createDocumentFragment();
		//自底向上遍历wall中每一行，条件：r>=0且当前行不为空行无缝拼接得到"",为空数组，且wall中r行无缝拼接后不等于""
		for(var r=this.RN-1;r>=0,this.wall[r].join("")!="";r--){
			//遍历wall中当前行每个cell
			for(var c=0;c<this.CN;c++){
				//将当前cell临时存为cell
				var cell=this.wall[r][c];
				//如果cell中r行c列不是undefined
				if(cell){
					//调用paintCell，传入wall中当前格和frag
					this.paintCell(cell,frag);
				}
			}//遍历结束
			//将frag追加到pg中
			this.pg.appendChild(frag);
		}
	},
	paintShape:function(){
		//创建文档片段frag
		var frag=document.createDocumentFragment();
		//遍历主角图形的cells数组中每个cell
		for(var i=0;i<this.shape.cells.length;i++){
			//将当前格子临时保存在变量cell中
			var cell=this.shape.cells[i];
			this.paintCell(cell,frag);
		}//遍历结束
		//将frag追加到pg下
		this.pg.appendChild(frag);
	}
}
tetris.start();//调用函数