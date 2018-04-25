// 获取当前年月日是该年的第几天
Date.prototype.hmd = function days(year, mouth, day) {
    var nums = 0;
    for (var i = 0; i < mouth; i++) {
        nums += new Date(year, i, 0).getDate();
    }

    return (nums + day);
}