//模拟从服务器获取到的具有特定格式的JSON数据
var data=[{
	"bno":1001,
	"bname":'写给大忙人看的JAVA SE8',
	'img':'img/b1001.jpg',
	'author':'（美）霍斯曼  著',
	'pubDate':new Date(2017,7,2),
	'price':50.2
},{
	"bno":1002,
	"bname":'2014年《电脑爱好者》合订本（下）',
	'img':'img/b1002.jpg',
	'author':'电脑爱好者编辑部',
	'pubDate':new Date(2017,7,2),
	'price':29.9
},{
	"bno":1003,
	"bname":'量化投资：以MATLAB为工具',
	'img':'img/b1003.jpg',
	'author':'李洋，郑志勇    编著',
	'pubDate':new Date(2017,7,2),
	'price':58.7
},{
	"bno":1004,
	"bname":'新观点新学说学术沙龙文集',
	'img':'img/b1004.jpg',
	'author':'中国科协学会学术部',
	'pubDate':new Date(2017,7,2),
	'price':15.3
},{
	"bno":1005,
	"bname":'中文版AutoCAD 2015从入门到精通',
	'img':'img/b1005.jpg',
	'author':'田彬   编著',
	'pubDate':new Date(2017,7,2),
	'price':55.8
},{
	"bno":1006,
	"bname":'网络硬件设备完全技术宝典',
	'img':'img/b1006.jpg',
	'author':'刘晓峰，刘先锋，王格碧',
	'pubDate':new Date(2017,7,2),
	'price':70.4
},{
	"bno":1007,
	"bname":'网络管理工具完全技术宝典',
	'img':'img/b1007.jpg',
	'author':'周昌狄，周日天  编著',
	'pubDate':new Date(2017,7,2),
	'price':95.6
},{
	"bno":1008,
	"bname":'Python编程（第四版）',
	'img':'img/b1008.jpg',
	'author':'Mark Lutz',
	'pubDate':new Date(2017,7,2),
	'price':148.5
}];
//解析获得的JSON数据，每一个书籍对象转换为一个DIV
function load(data){
	//加载所有的书籍
	loadAllBookList(data);
	//加载已浏览的实际
	loadViewedBookList(data);
}
//加载所有的书籍：使用文档片段封装所有新建的div
function loadAllBookList(data){
	//新建的书籍放入一个文档码片段
	var fragment=docment.createDocumentFragment();
	for(var i=0;i<data.length;i++){
		var div=createBookView(data[i]);
		fragment.appendChild(div);
	}
	//加载所有的书籍，将文档片段对象添加到DOM树
	document.getElementById('books').appendChild(fragment);
}
//读取cookie数据，根据其中保存的书籍编号，加载所有已浏览过的书籍
function loadViewedBookList(data){
	var viewedBnos=getCookieValue('viewedBnos');
	if(viewedBnos){//存在浏览记录
		var bnoArr=viewedBnos.split(',');
		var fragment=document.createDocumentFragment();
		for(var i=0;i<bnoArr.length;i++){//遍历浏览过的所有书籍编号
			for(var j=0;j<data.length;j++){//对于每一个书籍编号到全部书籍列表中查找对应的书籍对象			
				if(data[j].bno==bnoArr[i]){
					var div=createBookView(data[i]);
					fragment.appendChild(div);
					break;
				}
			}
		}
		//将文档片段添加到DOM树
		document.getElementById('viewed').appendChild(fragment);
	}else{//浏览记录为空
		document.getElementById('viewed').innerHTML='无浏览记录';
	}
}
/*
 * 创建一个环境对象对应的HTML元素
 * <div class="book">
 * 		<img src='img'/>
 * 		<a href="exercise05_05_id.html">bname</a>
 * 		<span class="author">author</span>
 * 		<span class="price">price</span>
 * </div>
 */
function createBookView(book){
	//每一个书籍对象对应一个div
	var div=document.creatElement('div');
	div.className='book';
	//创建书籍图片
	var img=document.creatElement('img');
	img.src=book.img;
	//创建书籍名称超链接
	var a=document.createElement('a');
	a.href='books/'+book.bno+'.html';
	a.innerHTML=book.bname;
	//创建显示作者的span
	var spanAuthor=document.createElement('span');
	spanAuthor.className='author';
	spanAuthor.innerHTML=book.author;
	//创建显示price的span
	var spanPrice=document.createElement('span');
	spanPrice.className='price';
	spanPrice.innerHTML='$'+book.price;
	
	div.appendChild(img);
	div.appendChild(a);
	div.appendChild(spanAuthor);
	div.appendChild(spanPrice);
	return div;
}
/*
 * 为string类添加裁剪方法，cookie名中可能被浏览器添加空格
 */
String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g,'');
}
/*
 * 从所有cookie中查找具有指定cookieName的cookieValue
 */
function getCookieValue(cookieName){
	//读取所有Cookie
	var cookies=document.cookie;
	var cookieValue='';
	if(cookies){
		var arr=cookies.split(';');//用；拆分所有的cookie
		for(var i=0;i<arr.length;i++){
			var cookie=arr[i];//键值对用=分割
			var cookiePair=cookie.split('=');
			if(cookiePair[0].trim()==cookieName){
				cookieValue=cookiePair[1];
				break;
			}
		}
	}
	return decodeURIComponent(cookieValue);
}
/*
 * 将指定商品编号写入客户端cookie，形如：
 * viewedBnos=1003,1008,1005;expires=xxx;path=/
 */
function writeCookie(bno){
	var cookieName='viewedBnos';
	//从所有cookie中查找”浏览过的书籍编号“字符串，形如”viewedBnos=1008,1005,1001“
	var cookieValue=getCookieValue(cookieName);
	//添加新的bno到viewedBnos字符串
	//要求：1.将bno添加到viewedBnos最前面；诺后面有重复的值，则删除
	//	  2.viewedBnos中最多只能保存6条记录
	cookieValue=addNum(cookieValue,bno,6);
	//重新把viewedBnos添加到document.cookie
	var expires=new Date();
	expires.setTime(expires.getTime()+1000*3600*24*30);
	var path='/';
	//注意指定超时时间和访问路径--cookie默认只能在当前路径及子路径下访问
	document.cookie=cookieName+'='encodeURIComponent(cookieValue)+
	';expires='+expires.toGMTString()+';path='+path;
}
21./*
22. * 参数str： String,形如“num1,num2,num3"
23. * 参数num：Number类型
24. * 参数maxCount：Integer,在data中可以保存的num的最多的数量
25. * 将num添加到data的最前端，后面若有重复值则删除；且data中最多只保留maxCount个num,
26. * 例如“1,3,5,2”再添加一个3后，返回“3,1,5,2”
27. * */
function addNum(str,num,maxCount){
	var arr=str.split(',');
	//查找num是否已经存在，若存在则删除
	for(var i=0;i<arr.length&&i<maxCount-1;i++){
		if(arr[i]==num){
			arr.splice(i,1);
		}
	}
	//将待添加元素添加到数组头部
	arr.unshif(num);
	return arr.slice(0,maxCount).join(',');
}

