function getLength(val) {  
    var str = new String(val);  
    var bytesCount = 0;  
    for (var i = 0 ,n = str.length; i < n; i++) {  
        var c = str.charCodeAt(i);  
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {  
            bytesCount += 1;  
        } else {  
            bytesCount += 2;  
        }  
    }  
    return bytesCount;  
}  