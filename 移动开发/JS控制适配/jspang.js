// 得到手机屏幕的宽度
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
// 得到html的Dom元素
let htmlDom = document.getElementsByTagName('html')[0];
// 设置根元素字体大小
htmlDom.style.fontSize= htmlWidth/20 + 'px';
// 当页面宽度大于750px时，我们就把页面的宽度设置成750像素。
// 解决大页面出现字体过大问题
if (htmlWidth > 750) {
  htmlWidth = 750;
}
