var db = {};
var store = {};
/**
 * open数据库并建‘表’
 * 
 * open方法是一个异步的过程
 * onsuccess 打开成功的回调
 * onerror 打开失败的回调
 * onupgradeneeded 第一次打开数据库，或数据库版本发生变化回调
 * 还有一种是blocked事件，表示上一次的数据库连接还未关闭
 */
var request = window.indexedDB.open('myDB','1');//1指代的是数据库的版本号
request.onsuccess=function(openData){
	db=openData.target.result;
	triggerTransaction();
};
request.onupgradeneeded=function(upData){
	db=upData.target.result;
	if(!db.objectStoreNames.contains('dbtable')){
		//建表，并设置自动递增的整数作为键名
		db.createObjectStore('dbtable',{
			autoIncrement:true
		});
	}
}
request.onerror=function(e){
	console.log('open error',e);
}

/**
 * 创建事务并获取指定的‘表’
 * 
 * 使用transaction创建事务。
 * 创建事务也是一个异步过程，包含下面的回调
 * abort:事务中断
 * complete:事务完成
 * error:事务出错
 * 
 * 使用objectStore获取指定的；表；
 */

function triggerTransaction(){
	var t=db.transaction(['dbtable'],'readwrite');
	store=t.objectStore('dbtable');
	triggerAdd();
	t.oncomplete=function(e){
		console.log('transaction success.');
	}
	t.onabort=function(e){
		console.log('transaction abort.');
	}
	t.onerror=function(e){
		console.log('transaction error.');
	}
}

/**
 * 添加数据
 * 
 * 使用add方法，有两种状态回调
 * 这里添加了5条诗句
 * 
 * error 添加数据失败
 * succes 添加数据成功
 */

function triggerAdd(){
	var flag=0;
	for(var i=0;i<5;i++){
		var tmpData={
			name:'麻辣GIS'+i
		};
		var addRel = store.add(tmpData);
		addRel.onerror=function(e){
			console.log('add error.');
		}
		addRel.onsuccess=function(e){
			console.log('add successfully.');
			flag++;
			if(flag === 5){
				triggerPut();
			}
		}
	}
}

/**
 * 修改数据
 * 
 * 使用put方法，有两种状态回调
 * error 修改数据失败
 * success 修改数据成功
 */
function triggerPut(){
	var modifyRel = store.put({name:'地理信息系统'},2);
	modifyRel.onerror=function(e){
		console.log('modify error.');
	}
	modifyRel.onsuccess=function(e){
		console.log('modify successfully.');
		triggerDel();
	}
}

/**
 * 删除数据
 * 
 * 使用delete方法，有两种状态回调
 * error 删除数据失败
 * success 删除数据成功
 */

function triggerDel(){
	var delRel=store.delete(1);
	delRel.onerror =function(e){
		console.log('delete error.');
	}
	delRel.onsuccess=function(e){
		console.log('delete successfuly.');
		triggerGet();
	}
}

/**
 * 获取数据
 * 
 * 使用get方法，有两种状态回调
 * error 获取数据失败
 * success 获取数据成功
 */

function triggerGet(){
	var getRel=store.get(2);
	getRel.onerror=function(e){
		console.log('get error.');
	}
	getRel.onsuccess=function(e){
		console.log('get successfully.');
		console.log(e.target.result);
		triggerCur();
	}
}

/**
 * 遍历数据
 * 
 * 使用openCursor方法，有两种状态回调
 * error 遍历数据失败
 * success 遍历数据成功
 */

function triggerCur(){
	var curRel=store.openCursor();
	curRel.onsuccess=function(event){
		var cursor=event.target.result;
		if(cursor){
			console.log(cursor.value);
			cursor.continue();
		}
	};
	curRel.onerror=function(e){
		console.log('opencursor error');
	}
}