// JavaScript Document
function Cell(r,c,src){//构造函数
	this.r=r;this.c=c;this.src=src;
}
function Shape(cells,src,states,orgi){//公共父类型 orgi参照格是第几个
	this.cells=cells;//this->window
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].src=src;
	}
	this.orgCell=this.cells[orgi];//获得参照格对象
	this.states=states;
	this.statei=0;//所有图形的初始状态都为0
}
function State(){//一个状态
	for(var i=0;i<4;i++){
		this["r"+i]=arguments[i*2];
		this["c"+i]=arguments[i*2+1];	
	}
}
Shape.prototype={
	IMGS:{T:"img/T.png",I:"img/I.png",J:"img/J.png",L:"img/L.png",S:"img/S.png",Z:"img/Z.png",O:"img/O.png",},
	moveDown:function(){//this->当前图性
		//遍历当前图形的每个cell
		for(var i=0;i<this.cells.length;i++){
			//将当前cell的r+1
			this.cells[i].r++;
		}
	},
	moveLeft:function(){
		//遍历当前图形的每个cell
		for(var i=0;i<this.cells.length;i++){
			//将当前cell的c-1
			this.cells[i].c--;
		}
	},
	moveRight:function(){
		//遍历当前图形的每个cell
		for(var i=0;i<this.cells.length;i++){
			//将当前cell的c+1
				this.cells[i].c++;
		}
	},
	rotateL:function(){
		this.statei--;//将statei-1
		//如果statei<0，就改回states的个数-1
		this.statei<0
		  &&(this.statei=this.states.length-1);
		this.rotate();//调用旋转方法
    },
	rotate:function(){
		//获得states中statei位置的状态，保存在state
		var state=this.states[this.statei];
		//遍历当前推行的cells中每个cell
		for(var i=0;i<this.cells.length;i++){
			//当前cell的r=orgCell的r+state["r"+i]
			this.cells[i].r=this.orgCell.r+state["r"+i];
			//当前cell的c=orgCell的c+state["c"+i]
			this.cells[i].c=this.orgCell.c+state["c"+i];
		}
	},
	rotateR:function(){
		this.statei++;//将statei+1
		//如果statei等于states的个数，就改回0
		this.statei==this.states.length
		  &&(this.statei=0);
		this.rotate();//调用旋转方法
    }
}
function T(){
	Shape.call(this,[new Cell(0,3),new Cell(0,4),new Cell(0,5),new Cell(1,4)],this.IMGS.T,[new State(0,-1,0,0,0,1,1,0),new State(1,0,0,0,-1,0,0,1),new State(0,1,0,0,0,-1,-1,0),new State(-1,0,0,0,1,0,0,-1)],1);	
}
Object.setPrototypeOf(T.prototype,Shape.prototype)
function O(){
	Shape.call(this,[new Cell(0,4),new Cell(0,5),new Cell(1,4),new Cell(1,5)],this.IMGS.O,[new State(0,-1,0,0,1,-1,1,0)],1);	
}
Object.setPrototypeOf(O.prototype,Shape.prototype)
function I(){
	Shape.call(this,[new Cell(0,3),new Cell(0,4),new Cell(0,5),new Cell(0,6)],this.IMGS.I,[new State(0,-1,0,0,0,1,0,2),new State(-1,0,0,0,1,0,2,0)],1);	
}
Object.setPrototypeOf(I.prototype,Shape.prototype)
function J(){
	Shape.call(this,[new Cell(0,5),new Cell(1,5),new Cell(2,5),new Cell(2,4)],this.IMGS.J,[new State(-1,0,0,0,1,0,1,-1),new State(0,-1,0,0,0,1,1,1),new State(1,0,0,0,-1,0,-1,1),new State(0,1,0,0,0,-1,-1,-1)],1);	
}
Object.setPrototypeOf(J.prototype,Shape.prototype)
function L(){
	Shape.call(this,[new Cell(0,4),new Cell(1,4),new Cell(2,4),new Cell(2,5)],this.IMGS.L,[new State(-1,0,0,0,1,0,1,1),new State(0,-1,0,0,0,1,-1,1),new State(1,0,0,0,-1,0,-1,-1),new State(0,1,0,0,0,-1,1,-1)],1);	
}
Object.setPrototypeOf(L.prototype,Shape.prototype)
function S(){
	Shape.call(this,[new Cell(0,4),new Cell(0,5),new Cell(1,4),new Cell(1,3)],this.IMGS.S,[new State(0,-1,0,0,-1,0,-1,1),new State(1,0,0,0,0,-1,-1,-1)],1);	
}
Object.setPrototypeOf(S.prototype,Shape.prototype)
function Z(){
	Shape.call(this,[new Cell(0,4),new Cell(0,5),new Cell(1,5),new Cell(1,6)],this.IMGS.Z,[new State(0,-1,0,0,1,0,1,1),new State(-1,0,0,0,0,-1,1,-1)],1);	
}
Object.setPrototypeOf(Z.prototype,Shape.prototype)
