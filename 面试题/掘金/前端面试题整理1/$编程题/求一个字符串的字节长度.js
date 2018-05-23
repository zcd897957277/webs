// 假设：一个英文字符占用一个字节，一个中文字符占用两个字节
function GetBytes(str) {
  var len = str.length;
  var bytes = len;
  for (var i = 0; i < len; i++) {
    if (str.charCodeAt(i) > 255) {
      bytes++;
    }
  }

  return bytes;
}

console.log(GetBytes("你好,123,asd"));
