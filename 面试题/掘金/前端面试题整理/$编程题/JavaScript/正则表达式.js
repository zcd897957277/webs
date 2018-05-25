var str = "ryan is not a good man";
var n = 5;
str = str.replace(/\b[a-z]+\b/g, function(kw) {
  return kw + n++;
});

console.log(str); //ryan5 is6 not7 a8 good9 man10
