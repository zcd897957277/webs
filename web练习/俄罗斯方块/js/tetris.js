// JavaScript Document
var tetris={
	OFFSET:15,//ʢ�Ÿ��ӵ������߿�ı߾࣬��������֮��ľ���
	CSIZE:26��//ÿ�����ӵĴ�С
	shape:null,//�����������������ͼ��
	nexShape:null,//���汸̥ͼ��
	pg:null,//������Ϸ������Ԫ��  Ϊ�˷�ֹ��ε���
	interval:500,//���淽�������ٶ�
	timer:null,//���涨ʱ��
	RN:20,CN:10,//������������������
	wall:null,//����ֹͣ�����ͼ���з����ǽ
	ln:0,//����ɾ����������
	score:0,//����÷�
	SCORES:[0,10,30,50,100],//ɾ�������ĵ÷����0 1 2 3 4
	state:1,//������Ϸ״̬
	GAMEOVER:0,//������Ϸ
	RUNNING:1,//��Ϸ������
	PAUSE:2,//��ͣ��Ϸ
	start:function(){//���캯�� ��ʼ��Ϸ
		this.score=0;//�÷�����
		this.ln=0;//��Ϸ������ɾ������������
		this.state=this.RUNNING;//��Ϸ��ʼ״̬��������
		this.wall=[];//����������
		for(var r=0;r<this.RN;r++){//����ÿһ��
			this.wall[r]=new Array(this.CN);//ÿһ�ж�����һ������CN��Ԫ�صĿ�����
		}
	    this.pg=document.querySelector(".playground");//��classΪplayground��Ԫ�ر�����pg��
		this.shape=this.randomShape();//�������ͼ��
		this.nextShape=this.randomShape();
		this.paint();//�ػ�һ��
		this.timer=setInterval(this.moveDown.bind(this),this.interval);
		//Ϊ��ǰҳ��󶨰����¼�
		document.onkeydown=function(e){
			//�жϼ��̺�
			switch(e.keyCode){
				//�����37���͵���moveLeft �����ǲſɶ�
				case 37:this.state==this.RUNNING&&this.moveLeft();break;//����
				case 39:this.state==this.RUNNING&&this.moveRight();break;//����
				case 40:this.state==this.RUNNING&&this.moveDown();break;//����
				case 38:this.state==this.RUNNING&&this.rotateR();break;//˳ʱת
				case 90:this.state==this.RUNNING&&this.rotateL();break;
				case 83:this.state==this.GAMEOVER&&this.start();break;//��Ϸ���� s ��ʼ
				case 67:this.state==this.RUNNING&&this.pause();break;//p��Ϸ��ͣ
				case 81:this.state==this.gameover();break;//q ��Ϸ����
				case 32:this.state==this.RUNNING&&this.hardDrop();//�ո� ��������
			}
		}.bind(this);//�ı�onkeydown�е�this��windowΪtetris
	},
	hardDorp:function(){//��������
		while(this.canDown()){//���������һֱ��
			this.moveDown();
		}
	},
	gameover:function(){
		this.state=this.GAMEOVER;//��״̬��Ϊ��Ϸ����
		clearInterval(this.timer);//��ռ�ʱ�������ö���
		this.timer=null;//�ͷ��ڴ�
		this.paint();//�ػ�һ��
	},
	pause:function(){
		this.state=this.PAUSE;//��Ϸ��ͣ
		clearInterval(this.timer);//��ռ�ʱ��
		this.timer=null;//�ͷ��ڴ�
		this.paint();//�ػ�һ��
	},
	myContinue:function(){
		this.state=this.RUNNING;//��Ϸ����
		this.timer=setInterval(this.moveDown.bind(this),this.interval);
		this.paint();
	},
	canRotate:function(){
		for(var i=0;i<this.shape.cells.length;i++){//��������ͼ����ÿһ��Сͼ
			var cell=this.shape.cells[i];
			//�����cell��c<0��>=CN,��cell��r<0��>=RN,��wall�к�cell��ͬλ���и�
			if(cell.c>0||cell.c>=this.CN||cell.r<0||cell.r>=this.RN||
			this.wall[cell.r][cell.c]!==undefined){
				return false;//������ת������Խ��
			}
			return true��
		}
	},
	rotateR:function(){
		this.shape.rotateR();//��ת
		if(!this.canRotate()){//��������ת
			this.shape.rotateL();//��ת
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
			//���cell��c����0��wall����и� ������0λʱ��������ͼ������Сͼ������࣬�����������Ҳ��ǲ�������
			if(cell.c==0||this.wall[cell.r][cell.c-1]!==undefined){
				return false;
			}
			return true;
		}
	},
	moveLeft:function(){
		if(this.canLeft()){//��������
			this.shape.moveLeft();//����shape.js�з�������
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
		var r=parseInt(Math.random()*7);//�������ͼ��
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
	paintNext:function(){//���Ʊ�̥ͼ��
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.nextShape.cells.length;i++){
			//����paintCell��������һ�����ӣ����뵱ǰcell���Ӻ�frag��Ϊ����
			this.paintCell(cell,frag);
		}
		//����frag��ÿһ��img
		for(var j=0;j<frag.childNodes.length;j++){
			//�޸�img��left�ټ���11*CSIZE ʹͼƬ�����Ͻ�
			frag.childNodes[j].style.left=parseFloat(frag.childNodes[j].style.left)+11*this.CSIZE+"px";
			//�޸�img��top�ټ���CSIZE
			frag.childNodes[j].style.top=parseFloat(frag.childNodes[j].style.top)+this.CSIZE+"px";
		}
		this.pg.appendChild(frag);//����̥�ŵ�ǽ��
	},
	moveDown:function(){
		if(this.canDown()){//����
			this.shape.moveDown();
		}else{
			this.landIntoWall();//����ǽ��
			var ln=this.deleteRow();//ɾ������ ������
			this.ln+=ln;//�ۼӱ�����Ϸɾ��������
			this.score+=this.SCORES[ln];//����ɾ���������ۼӵ÷�
			if(!this.isGameOver()){//��Ϸû�������ͽ���̥ͼ������
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
	isGameOver:function(){//�ɱ�̥ͼ�ӹ�������������·�����޿գ�����Ϸ����
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			if(this.wall[cell.r][cell.c]!==undefined){
				return true;
			}
		}
		return false;
	},
	paintState:function(){//��Ϸ��������ͣʱ��ͼƬ
		if(this.state!=this.RUNNING){
			var img=new Image();
			img.src=this.state==this.GAMEOVE?"img/game-over.png":"img/pause.png";
			this.pg.appendChild(img);
		}
	},
	paintScore:function(){//�ڽ����һ��p��span�¸��µ÷֣��ڶ���p��span�¸���ɾ������
		var spans=document.querySelectorAll(".playground>p>span");
		spans[0].innerHTML=this.score;
		spans[1].innerHTML=this.ln;
	},
	deleteRows:function(){//ɾ������
		//�ӵ����ϱ���wall��ÿһ�У���������<4��4�ȼ���,ǽ��ÿһ���ж�����������ж��Ƿ�������
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
		//�������������/^\,|\,$|[,][,]/����ʾ���У�����true
		return String(this.wall[r]).search(/^\,|\,$|[,][,]/)==-1;
	},
	deleteRow:function(r){//ɾ������
	    //�Ե����ϱ���
		for(;r>0;r--){
			//��������
			this.wall[r]=this.wall[r-1];
			//�������
			this.wall[r-1]=new Array(this.CN);
			//����ÿһ����ÿһ��
			for(var c=0;c<this.CN;c++){
				//����������ж���
				if(this.wall[r][c]!==undefined){
					//��������
					this.wall[r][c].r++;
				}
			}
			//�����޶������ɲ��ñ�����
			if(this.wall[r-2].join("")==""){
				break;
			}
		}
	},
	landIntoWall:function(){
		//�����ӷŵ�ǽ����ͬλ����
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			this.wall[cell.r][cell.c]=cell;
		}
	},
	canDown:function(){
		//�������ͼ���е�Сͼ�����������У�����������һ��λ�����ж�������������ȥ
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.r==this.RN-1||this.wall[cell.r+1][cell.c]){
				return false;
			}
		}
		return true;
	},
	paint:function(){
		//ɾ��pg����������imgԪ��
		this.pg.innerHTML=this.pg.innerHTML.replace(/<img[^>]*>/g,"");
		//�ػ�����ͼ��
		this.paintShape();
		this.paintWall();//����ǽ
		this.paintNext();//���Ʊ�̥
		this.paintScore();//�ػ����
		this.paintState();//�ػ���Ϸ״̬
	},
	paintCell:function(cell,frag){
		//����ÿһ��С��ͼ��
		var img=document.createElement("img");//var img=new Image();
			//����img��leftΪcell��c*CSIZE+OFFSET
			img.style.left=cell.c*this.CSIZE+this.OFFSET+"px";
			//����img��topΪcell��r*CSIZE+OFFSET
			img.style.top=cell.r*this.CSIZE+this.OFFSET+"px";
			//����img��srcΪcell��src
			img.src=cell.src;
			//��img׷�ӵ�frag��
			frag.appendChild(img);
	},
	paintWall:function(){//����ǽ
		//����frag
		var frag=document.createDocumentFragment();
		//�Ե����ϱ���wall��ÿһ�У�������r>=0�ҵ�ǰ�в�Ϊ�����޷�ƴ�ӵõ�"",Ϊ�����飬��wall��r���޷�ƴ�Ӻ󲻵���""
		for(var r=this.RN-1;r>=0,this.wall[r].join("")!="";r--){
			//����wall�е�ǰ��ÿ��cell
			for(var c=0;c<this.CN;c++){
				//����ǰcell��ʱ��Ϊcell
				var cell=this.wall[r][c];
				//���cell��r��c�в���undefined
				if(cell){
					//����paintCell������wall�е�ǰ���frag
					this.paintCell(cell,frag);
				}
			}//��������
			//��frag׷�ӵ�pg��
			this.pg.appendChild(frag);
		}
	},
	paintShape:function(){
		//�����ĵ�Ƭ��frag
		var frag=document.createDocumentFragment();
		//��������ͼ�ε�cells������ÿ��cell
		for(var i=0;i<this.shape.cells.length;i++){
			//����ǰ������ʱ�����ڱ���cell��
			var cell=this.shape.cells[i];
			this.paintCell(cell,frag);
		}//��������
		//��frag׷�ӵ�pg��
		this.pg.appendChild(frag);
	}
}
tetris.start();//���ú���