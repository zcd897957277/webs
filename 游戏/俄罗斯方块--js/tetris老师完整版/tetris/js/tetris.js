var tetris={
	SIZE:Shape.prototype.SIZE,
	currentShape:null,
	nextShape:null,
	timer:null,
	interval:null,
	wall:[],

	state:null,
	GAMEOVER:0,
	RUNNING:1,
	PAUSE:2,

	level:null,
	LN:50,//每50行升一级
	LINTERVAL:100,//每升一级,interval减100
	MIN:100,//最小interval限定为100
	lines:null,
	score:null,
	SCORES:[0,10,50,120,200],

	start:function(){
		if(playground.lastElementChild.nodeName=="IMG"){
			playground.removeChild(playground.lastElementChild);//清除gameover界面,如果有的话
		}
		this.state=this.RUNNING;
		this.interval=1000;
		this.level=1;
		this.lines=0;
		this.score=0;
		score.innerHTML=0;
		lines.innerHTML=0;
		level.innerHTML=1;
		displayArea.innerHTML="";
		nextArea.innerHTML="";
		for(var r=0;r<20;r++){
			this.wall[r]=new Array(10);
		}
		this.currentShape=new Shape(displayArea);
		this.nextShape=new Shape(nextArea);
		this.nextShape.center();
		this.timerFun();//调用teris定时器回调函数
		var me=this;
		window.onkeydown=function(e){
			switch(e.keyCode){
				case 37:me.state==me.RUNNING&&me.currentShape.canMove("l")&&me.currentShape.move("l");break;
				case 39:me.state==me.RUNNING&&me.currentShape.canMove("r")&&me.currentShape.move("r");break;
				case 40:me.state==me.RUNNING&&me.currentShape.canMove("d")&&me.currentShape.move("d");break;
				case 38:me.state==me.RUNNING&&me.currentShape.rotate("r");break;
				case 90:me.state==me.RUNNING&&me.currentShape.rotate("l");break;
				case 32:if(me.state==me.RUNNING){while(me.currentShape.canMove("d")){me.currentShape.move("d")}};break;
				case 80:me.state==me.RUNNING&&me.pause();break;
				case 67:me.state==me.PAUSE&&me.myContinue();break;
				case 81:me.state==me.RUNNING&&me.quit();break;
				case 83:me.state==me.GAMEOVER&&me.start();break;
			}
		}
	},
	//定义Tetris定时器回调函数,可实现shape下落动画
	timerFun:function(){
		if(this.state==this.RUNNING){
			if(this.currentShape.canMove("d")){
				this.currentShape.move("d");
				this.timer=setTimeout(this.timerFun.bind(this),this.interval);
				console.log("启动teris定时器"+this.timer);
			}else{
				this.landIntoWall();
				if(this.isGameOver()){
					this.quit();
				}else{
					//用nextShape的type和state来创建新的currentShape
					this.currentShape=new Shape(displayArea,this.nextShape.type,this.nextShape.state);
					nextArea.innerHTML="";
					this.nextShape=new Shape(nextArea);
					this.nextShape.center();
					this.deleteRows();
				}
			}
		}
	},
	//将非流动人口登记入户
	landIntoWall:function(){
		for(var i=0,img,r,c;i<4;i++){
			img=this.currentShape.imgs[i];
			r=parseFloat(img.style.top)/this.SIZE;//行下标
			c=parseFloat(img.style.left)/this.SIZE;//列下标
			r>=0&&(this.wall[r][c]=img);
		}
	},
	//在shape对象入户后,判断游戏是否结束的方法
	isGameOver:function(){
		var state=this.nextShape.types[this.nextShape.type].states[this.nextShape.state];
		for(var i=0,r,c,R;i<4;i++){
			R=parseFloat(this.currentShape.imgs[i].style.top)/this.SIZE;
			if(R<0){return true;}//currentShape对象中的任意一个方块的行越界,则游戏结束
			r=state[i][1]+this.nextShape.top;
			c=state[i][0]+this.nextShape.left;
			if(r>=0&&this.wall[r][c]){return true;}//居中前的nextShape对象中任意一个方块在墙中的位置不为空,则游戏结束
		}
		return false;
	},
	//从上向下,获取墙中的最后一个空白行,如没有,则返回-1
	getLastEmptyRow:function(){
		for(var r=19;r>=0;r--){
			for(var c=0;!this.wall[r][c]&&c<10;c++);
			if(c==10){return r;}
		}
		return -1;
	},
	//删除一行满行
	deleteRow:function(row){
		for(var c=0;c<10;c++){
			displayArea.removeChild(this.wall[row][c]);//处理人满为患地区的人口
		}
		//将该地区以北的所有人口向南迁徙,同时变更户口登记
		for(var r=row,endR=this.getLastEmptyRow();r>endR;r--){
			for(var c=0;c<10;c++){
				this.wall[r][c]=this.wall[r-1][c];
				if(this.wall[r][c]){
					var top=parseFloat(this.wall[r][c].style.top)+this.SIZE+'px';
					this.wall[r][c].style.top=top;
				}
			}
		}
	},
	deleteRows:function(){
		var r=19,i=0,endR=this.getLastEmptyRow();
		//定义deleteRows定时器回调函数,可实现逐一消行的动画
		function timerFun(){
			while(r>endR){
				for(var c=0;this.wall[r][c]&&c<10;c++);
				if(c==10){
					this.deleteRow(r);
					i++;//i用来统计本次下落消灭的行数
					this.lines++;
					lines.innerHTML=this.lines;//记录消灭的总行数
					if(this.lines%this.LN==0){
						this.level++;
						level.innerHTML=this.level;//记录游戏级别
						this.interval-=this.LINTERVAL;
						this.interval<this.MIN&&(this.interval=this.MIN);//限定teris定时器最小间隔
					}
					break;
				}
				r--;
			}
			if(r==endR){
				this.score+=this.SCORES[i];
				score.innerHTML=this.score;//记录分数
				this.timerFun();
			}else{
				this.timer=setTimeout(timerFun.bind(this),500);
				console.log("启动deleteRows定时器"+this.timer);
			}
		}
		timerFun.call(this);//调用deleteRows定时器回调函数
	},
	pause:function(){
		this.state=this.PAUSE;
		var img=new Image();
		img.src='img/pause.png';
		playground.appendChild(img);
	},
	myContinue:function(){
		this.state=this.RUNNING;
		playground.removeChild(playground.lastElementChild);
		this.timerFun();//启动teris定时器回调函数
	},
	quit:function(){
		this.timer=null;
		this.state=this.GAMEOVER;
		var img=new Image();
		img.src='img/game-over.png';
		playground.appendChild(img);
	}
};
window.onload=function(){
	tetris.start();
}