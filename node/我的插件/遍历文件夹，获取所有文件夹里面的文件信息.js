const fs = require("fs");
const path = require("path");

/*
  遍历文件夹，获取所有文件夹里面的文件信息

  @param path路径
*/

function getFileList(path) {
  let filesList = [];
  // 读取文件
  readFile(path, filesList);
  return filesList;
}

// 遍历读取文件
function readFile(path, filesList) {
  files = fs.readdirSync(path); // 同步读取文件夹
  files.forEach(walk);

  function walk(file) {
    // 同步返回状态信息
    states = fs.statSync(path + "/" + file);
    if (states.isDirectory()) {
      readFile(path + "/" + file, filesList);
    } else {
      // 创建一个对象保存信息
      let obj = new Object();
      obj.size = states.size; // 文件大小，以字节为单位
      obj.name = file; //文件名
      obj.path = path + "/" + file; // 文件绝对路径
      filesList.push(obj);
    }
  }
}

let filesList = getFileList(path.join(__dirname + "/public/blogs"));
// 文件大小排序
filesList.sort(sortHandler);
function sortHandler(a, b) {
  if (a.size > b.size) {
    return -1;
  } else if (a.size < b.size) {
    return 1;
  } else {
    return 0;
  }
}

let str = "";
for (let i = 0; i < filesList.length; i++) {
  let item = filesList[i];
  let desc =
    "文件名：" +
    item.name +
    " " +
    "大小" +
    (item.size / 1024).toFixed(2) +
    "/kb" +
    " " +
    "路径" +
    item.path;
  str += desc + "\n";
}

// 写入文件utf-8格式
function writeFile(fileName, data) {
  fs.writeFile(fileName, data, "utf-8", complete);
  function complete() {
    console.log("文件生成成功！");
  }
}
// 将文件信息写入
writeFile(path.join(__dirname + "/public/blogs/blogs.txt"), str);