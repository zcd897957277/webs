// 随机数据
function randomData(smallNum, bigNum, length) {
    var len = 12,
        sn = 0,
        bn = 100;
    if (length) {
        len = length
    }

    if (smallNum) {
        sn = smallNum;
    }

    if (bigNum) {
        bn = bigNum;
    }
    var arr = [];
    for (var i = 0; i < len; i++) {
        var val = sn + Math.random() * bn;
        arr.push(val);
    }

    return arr;
}
