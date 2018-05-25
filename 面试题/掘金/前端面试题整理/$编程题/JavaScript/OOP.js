// 参考：https://www.cnblogs.com/JChen666/p/3365337.html
// 1 使用Object创建对象
var o = new Object();
o.sname = "asd";
o.showName = function(){
    return this.sname;
}

// 2.使用对象字面量创建对象
var o = {
    name:"asd",
    getName:function(){
        return this.name;
    }
}

// 3.工厂模式
function create(name){
    var o = new Object();
    o.name = name;
    o.sayName = function(){
        return this.name;
    }
    return o;
}

var p1 = create('asd');

// 4.构造函数模式
function create2(name){
    this.name = name;
    this.sayName = function(){
        return this.name;
    }
    // this.sayName = sayName;
}
// function sayName(){ return this.name }
var p2 = new create2('asd');

// 5. 原型模式 
// 5.1 普通方法
function create3(){}
create3.prototype.name = "asd";
create3.prototype.sayName = function(){
    return this.name;
}
var p3 = new create3();

// 5.2 原型字面量方法
function create4(){}
create4.prototype = {
    constructor:create4,
    name:"zcv",
    sayName:function(){
        return this.name;
    }
}

var p4 = new create4();

// 6. 构造+原型
function create5(name){
    this.name = name;
}
create5.prototype.sayName = function(){
    return this.name;
}

var p5 = new create5('asd');

//  7.动态原型模式
function create6(name){
    this.name = name;
    if(typeof this.sayName != 'function'){
        create6.prototype.sayName = function(){
            return this.name;
        }
    }
}

var p6 = new create6("asd");

// 8.寄生构造函数模式
function create7(name){
    var o = new Object();
    o.name = name;
    o.sayName = function(){
        return this.name;
    }
    return o;
}

var p7 = new create7("zxc");

// 9. 稳妥构造函数模式
function create10(name){
    var o = new Object();
    var age = 12;
    o.sayName = function(){
        return name + ' ' + age;
    }
    return o;
}