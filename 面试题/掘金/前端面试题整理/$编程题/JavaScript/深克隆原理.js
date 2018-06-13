// 方法一
Object.clone = function(obj) {
  //深克隆
  if (typeof obj == "object") {
    //如果obj是对象
    var o = //有必要区分数组和普通对象
      Object.prototype.toString.call(obj) == "[object Array]" ? [] : {};
    for (var key in obj) {
      //遍历obj的自有属性
      //如果key是obj的自有属性
      if (obj.hasOwnProperty(key)) {
        o[key] = arguments.callee(obj[key]); //arguments.callee调的是当前的Object.clone函数
      }
    }
    return o;
  } else {
    //如果obj是原始类型的值，就直接返回副本
    return obj;
  }
};

// 方法二
function isArray(arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}
// 深克隆基础
function deepClone(obj) {
  if (typeof obj !== "object" && typeof obj !== "function") {
    return obj; // 原始类型直接返回
  }
  let o = isArray(obj) ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}

// 判断对象类型
const isType = (obj, type) => {
  if (typeof obj !== "object") {
    return false;
  }
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case "Array":
      flag = typeString === "[object Array]";
      break;
    case "Date":
      flag = typeString === "[object Date]";
      break;
    case "RegExp":
      flag = typeString === "[object RegExp]";
      break;
    default:
      flag = false;
  }

  return flag;
};

// 提取正则属性
const getRegExp = re => {
  var flags = "";
  if (re.global) flags += "g";
  if (re.ignoreCase) flags += "i";
  if (re.multiline) flags += "m";

  return flags;
};

// 深克隆第二种方法的改进版
const clone = parent => {
  // 维护两个存储循环引用的数组
  const parents = [];
  const children = [];

  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== "object") return parent;

    let child, proto;

    if (isType(parent, "Array")) {
      // 对数组最特殊处理
      child = [];
    } else if (isType(parent, "RegExp")) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) {
        child.lastIndex = parent.lastIndex;
      }
    } else if (isType(parent, "Date")) {
      // 对Date进行特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);

    if (index != -1) {
      // 如果父数组存在本对象，说明之前已经被引用过，直接返回此对象
      return children[index];
    }

    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };
  return _clone(parent);
};
