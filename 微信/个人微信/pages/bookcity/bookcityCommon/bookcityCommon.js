// 导航条转换
function bookNavTrans(e, navList, id) {
  for (var i = 0, len = navList.length; i < len; ++i) {
    if (navList[i].id == id) {
      if (navList[i].isSelected == false) {
        navList[i].isSelected =true
        if(i==0){
          wx.switchTab({
            url: '../bookcityHomepage/bookcityHomepage'
          })
        }else if(i==1){
          wx.redirectTo({
            url: '../bookcityMember/bookcityMember'
          })
        }else if (i==2){
          wx.redirectTo({
            url: '../bookcityClassification/bookcityClassification'
          })
        } else if (i==3){
          wx.redirectTo({
            url: '../bookcityFree/bookcityFree'
          })
        }
      }
    } else {
      navList[i].isSelected = false
    }
  }
}

// 将方法抛出
module.exports.bookNavTrans = bookNavTrans;