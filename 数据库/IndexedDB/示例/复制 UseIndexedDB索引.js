var db={};
var store={};
/**
 * open 数据库并建‘表’
 * 
 * open方法是一个异步的过程
 * onsuccess 打开成功的回调
 * onerror 打开失败的回调
 * onupgradeneeded 第一次打开数据库，或数据库版本发生变化回调
 * 还有一种是blocked事件，表示上一次的数据库连接还未关闭
 */
var request =window.indexedDB.open('myDB2','1');
request.onsuccess=function(openData){
	db=openData.target.result;
	triggerTransaction();
};
request.onupgradeneeded=function(upData){
	db=upData.target.result;
	if(!db.objectStoreNames.contains('dbtable')){
		//建表，并设置自动递增的整数为键名
		var objStore=db.createObjectStore('dbtable',{
			autoIncrement:true
		});
		/**
		 * 创建索引
		 * 
		 * 使用createIndex方法，有三个参数
		 * 第一个参数是索引名称
		 * 第二个参数是建立索引的属性名
		 * 第三个是参数对象，用来设置索引特性
		 */
		objStore.createIndex('dataid','dataid',{unique:true});//unique表示索引所在的属性是否有唯一值
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
 * absort:事务中断
 * complete:事务完成
 * error:事务出错
 * 
 * 使用objectStore获取指定的‘表’
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
	t.error=function(e){
		console.log('transaction error.');
	}
}
/**
 * 添加数据
 * 
 * 使用add方法，有两种状态回调
 * 
 * error 添加数据失败
 * success 添加数据成功
 */
function triggerAdd(){
	var flag=0;
	for(var i=0;i<100;i++){
		var tmpData={
			dataid:i+1,
			name:'麻辣GIS'+i
		};
		var addRel=store.add(tmpData);
		addRel.onerror=function(e){
			console.log('add error.');
		}
		addRel.onsuccess=function(e){
			console.log('add successfully.');
			flag++;
			if(flag===100){
				triggerGetIndex();
			}
		}
	}
}

/**
 * 通过索引获取数据
 * 
 * 还是使用get方法
 */
function triggerGetIndex(){
	var index=store.index('dataid');
	var inxRel=index.get(55);
	inxRel.onsuccess=function(e){
		console.log('Get index successfully.');
		console.log(e.target.result);
		triggerUseIndex();
	}
	inxRel.onerror=function(){
		console.log('Get index error.');
	}
}

/**
 * 指定数据范围遍历数据（索引的重要作用
 * 
 * 使用IDBKeyRange对象生成Range
 * IDBKeyRange 有四个方法
 * lowerBound方法： 指定范围的下限
 * upperBound方法：指定范围的上限
 * bound方法：指定范围的上下限
 * only方法：指定范围中只有一个值
 * 
 * lowerBound,upperBound,bound默认包括端点
 * 通过最后的一个bool参数控制
 * 如：lowerBound(1) 大于等于1
 * 		lowerBound(1,true) 大于1
 * 		bound(1,100,true,false)大于1小于等于100
 */
function triggerUseIndex(){
	var range =IDBKeyRange.bound(10,20,true,true);
	triggerCur(range);
}

/**
 * 遍历数据
 * 
 * 使用openCursor方法，有两种状态回调
 * error 遍历数据失败
 * success 遍历数据成功
 */
function triggerCur(range){
	var curRel=store.openCursor(range);
	curRel.onsuccess=function(event){
		var cursor=event.target.result;
		if(cursor){
			console.log(cursor.value);
			cursor.continue();
		}
	}
	curRel.onerror=function(e){
		console.log('opencursor error');
	}
}
