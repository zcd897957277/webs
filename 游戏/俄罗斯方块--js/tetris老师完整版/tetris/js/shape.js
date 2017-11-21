//定义一个Shape类型,要求如下:
//1.Shape对象由4个方块组成
//2.选取其中一个方块作为轴心,Shape对象围绕轴心旋转
//3.向右为x轴正方向,向下为y轴正方向
//3.设定轴心方块坐标为(0,0),即原点坐标,其他方块的坐标用来确定其相对于原点坐标的方位,比如,(-1,0),(0,-1),(1,0),(0,1)分别位于原点的左边,上边,右边和下边

function Shape(parent,type,state){
	this.parent=parent;//确定该对象所属的父节点
	this.left=4;//轴心方块相对于父节点的初始左边距
	this.top=-1;//轴心方块相对于父节点的初始上边距
	this.type=type!=undefined?type:parseInt(Math.random()*7);//通过参数指定或随机指定对象的初始形状
	var states=this.types[this.type].states;//获取当前形状的状态数组
	this.state=state!=undefined?state:parseInt(Math.random()*states.length);//通过参数指定或随机指定当前形状的初始状态
	this.imgs=[];//对象所属的4个方块节点组成的数组
	//根据当前的形状和状态创建4个img节点,并将其挂到DOM树上
	var frag=document.createDocumentFragment();
	for(var i=0;i<4;i++){
		var img=this.imgs[i]=new Image();
		img.src=this.types[this.type].src;
		img.style.left=this.SIZE*(states[this.state][i][0]+this.left)+"px";
		img.style.top=this.SIZE*(states[this.state][i][1]+this.top)+"px";
		frag.appendChild(img);
	}
	this.parent.appendChild(frag);
}
//定义所有的形状和状态
Shape.prototype.types=[
	{src:"img/O.png",states:[[[0,0],[1,0],[0,1],[1,1]],[[0,0],[0,1],[-1,0],[-1,1]],[[0,0],[-1,0],[0,-1],[-1,-1]],[[0,0],[0,-1],[1,0],[1,-1]]]},
	{src:"img/I.png",states:[[[-1,0],[0,0],[1,0],[2,0]],[[0,-1],[0,0],[0,1],[0,2]],[[1,0],[0,0],[-1,0],[-2,0]],[[0,1],[0,0],[0,-1],[0,-2]]]},
	{src:"img/S.png",states:[[[0,0],[1,0],[-1,1],[0,1]],[[0,0],[0,1],[-1,-1],[-1,0]],[[0,0],[-1,0],[1,-1],[0,-1]],[[0,0],[0,-1],[1,1],[1,0]]]},
	{src:"img/Z.png",states:[[[-1,-1],[0,-1],[0,0],[1,0]],[[1,-1],[1,0],[0,0],[0,1]],[[1,1],[0,1],[0,0],[-1,0]],[[-1,1],[-1,0],[0,0],[0,-1]]]},
	{src:"img/T.png",states:[[[-1,0],[0,0],[1,0],[0,1]],[[0,-1],[0,0],[0,1],[-1,0]],[[1,0],[0,0],[-1,0],[0,-1]],[[0,1],[0,0],[0,-1],[1,0]]]},
	{src:"img/J.png",states:[[[0,-1],[0,0],[0,1],[-1,1]],[[1,0],[0,0],[-1,0],[-1,-1]],[[0,1],[0,0],[0,-1],[1,-1]],[[-1,0],[0,0],[1,0],[1,1]]]},
	{src:"img/L.png",states:[[[0,-1],[0,0],[0,1],[1,1]],[[1,0],[0,0],[-1,0],[-1,1]],[[0,1],[0,0],[0,-1],[-1,-1]],[[-1,0],[0,0],[1,0],[1,-1]]]},
];
//定义每个方块的尺寸
Shape.prototype.SIZE=26;
//以方向作为参数,定义对象的移动方法
Shape.prototype.move=function(direction){
	var leftOrTop=direction=="d"?"top":"left";//根据参数确定待修改的css属性
	var plusOrMinus=direction=="l"?"-":"+";//根据参数确定用加号还是减号
	//以下将待执行的代码拼接为字符串,再放入eval执行
	for(var i=0;i<4;i++){
		eval("this.imgs[i].style."+leftOrTop+"=parseInt(this.imgs[i].style."+leftOrTop+")"+plusOrMinus+"this.SIZE+\"px\"");
	}
	eval("this."+leftOrTop+plusOrMinus+plusOrMinus);
}
//以方向作为参数,定义对象能否移动的方法
Shape.prototype.canMove=function(direction){
	for(var i=0,r,c;i<4;i++){
		r=parseFloat(this.imgs[i].style.top)/this.SIZE;
		c=parseFloat(this.imgs[i].style.left)/this.SIZE;
		if(direction=="d"&&r==19||direction=="r"&&c==9||direction=="l"&&!c){return false;}
		else{
			r=r+(direction=="d"?1:0);
			c=c+(direction=="l"?-1:direction=="r"?1:0);
			if(r>=0&&tetris.wall[r][c]){return false;}
		}
	}
	return true;
}
//以方向作为参数,定义对象旋转的方法
Shape.prototype.rotate=function(direction){
	var states=this.types[this.type].states;//获取状态数组
	var len=states.length;//计算数组长度
	//根据方向参数,确定旋转后的状态
	if(direction=="r"){
		this.state=(this.state+1)%len;
	}else{
		this.state=(this.state-1)%len;
		this.state<0&&(this.state+=len);
	}
	//根据确定后的状态修改对象的4个img节点的left和top属性
	for(var i=0,r,c;i<4;i++){
		r=states[this.state][i][1]+this.top;
		c=states[this.state][i][0]+this.left;
		this.imgs[i].style.left=this.SIZE*c+"px";
		this.imgs[i].style.top=this.SIZE*r+"px";
		//如果旋转后的对象越界或者与墙冲突,则再以相反的方向转回去
		if(r>19||c>9||c<0||r>=0&&tetris.wall[r][c]){this.rotate(direction=="r"?"l":"r");}
	}
}
//定义对象在所属的父容器中水平且垂直居中的方法,专用于nextShape
Shape.prototype.center=function(){
	var state=this.types[this.type].states[this.state];
	for(var i=0,minX=0,maxX=0,minY=0,maxY=0;i<4;i++){
		state[i][0]<minX&&(minX=state[i][0]);
		state[i][0]>maxX&&(maxX=state[i][0]);
		state[i][1]<minY&&(minY=state[i][1]);
		state[i][1]>maxY&&(maxY=state[i][1]);
	}
	var parentWidth=parseInt(getComputedStyle(this.parent).width);
	var parentHeight=parseInt(getComputedStyle(this.parent).height);
	var shapeWidth=(maxX-minX+1)*this.SIZE;
	var shapeHeight=(maxY-minY+1)*this.SIZE;
	for(var i=0;i<4;i++){
		this.imgs[i].style.left=this.SIZE*(state[i][0]-minX)+(parentWidth-shapeWidth)/2+"px";
		this.imgs[i].style.top=this.SIZE*(state[i][1]-minY)+(parentHeight-shapeHeight)/2+"px";
	}
}