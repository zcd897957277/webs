// bookcityMember.js
// 引入书架导航条公共方法
var bookcityCommon = require('../../bookcityCommon/bookcityCommon.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 书架中导航条数据
    navList: [{
      id: 'shouye',
      name: '首页',
      isSelected: false,
      isRight: true
    }, {
      id: 'huiyuan',
      name: '会员',
      isSelected: true,
      isRight: true
    }, {
      id: 'fenlei',
      name: '分类',
      isSelected: false,
      isRight: true
    }, {
      id: 'mianfei',
      name: '免费',
      isSelected: false,
      isRight: false
    }],
    // 头像
    userHeadSrc:'../resources/images/myHead_03.png',
    // 昵称
    userName:"GB's23Boy",
    // 特权
    userPrivilege:'开通会员立享特权',
    // 会员精选图片路径
    memberSrc:'../resources/images/hyjx.png',
    // 会员男频热文图片路径
    memberBoySrc:'../resources/images/hynanprw.png',
    // 会员女频人文图片路径
    memberGirlSrc:'../resources/images/hynvprw.png',
    // 会员人气榜图片路径
    menberPopularSrc:'../resources/images/hyrqb.png',
    //作者图标路径
    authorSrc:'../resources/images/author_03.png',
    //男频人气榜
    novel_data: [{
      id: 'az',
      detNovel_src: '../resources/images/az.png',
      detNovel_name: '暗战',
      detNovel_author: '丁丁猫',
      detNovel_content: '你的名字无人知晓,你的功绩永世留存！在国家和民族危难关头，有人挺身而出，找到了挽救危亡的道路。为了坚持信念，宁愿隐姓埋名为自己信仰的事业奉献一切牺牲一切，周旋于侵略者和敌人中间。谨以此文纪念这些无名英雄！',
      detNovel_counts: '31.64万',
      detNovel_category: '军事',
      detNovel_score: '8.7分'
    }, {
      id: 'cjdd',
      detNovel_src: '../resources/images/cjdd.png',
      detNovel_name: '超级蛋蛋',
      detNovel_author: '月魔小舞',
      detNovel_content: '12月25日。圣诞节。一名苏杭女子怀胎十月，生下一只圆滚滚的蛋。世界震惊！全人类震惊！至此，一位威震宇宙的暗黑破坏神降临人间。它就是——超级蛋蛋！',
      detNovel_counts: '23.04万',
      detNovel_category: '科幻',
      detNovel_score: '7.1分'
    }, {
      id: 'hdbd',
      detNovel_src: '../resources/images/hdbd.png',
      detNovel_name: '荒岛病毒',
      detNovel_author: '八九燕来',
      detNovel_content: '在遥远的宇宙俯瞰之下，地球还是那个地球，蔚蓝的海水，起伏的群山，广阔的草原。长城仍如一条丝巾装饰在这颗美丽的星球之上。如何也看不出，这里正经历着怎样的浩劫。公元20XX年，华人探险家云崖暖在太平洋中部遇海难，探险船倾覆，漂泊数日后误入一游弋悬浮的海岛。其上有着人类上一代文明的痕迹，重重艰险下，寻找出岛的办法，同时也打开了地狱的深渊，那是致使上一代文明灭绝的病毒。。。。。。',
      detNovel_counts: '49.91万',
      detNovel_category: '灵异',
      detNovel_score: '7.2分'
    }, {
      id: 'wszz',
      detNovel_src: '../resources/images/wszz.png',
      detNovel_name: '武神至尊',
      detNovel_author: '我吃面包',
      detNovel_content: '21世纪闷骚青年林飞一不小心从地球穿越到元武界，可悲的是穿越对象竟是一个傻子，唉，认命吧。可是傻子白痴又怎么样，一样练神功，升级，泡美妞，问鼎天下，混得可是风生水起啊。',
      detNovel_counts: '553万',
      detNovel_category: '玄幻奇幻',
      detNovel_score: '4.3分'
    }, {
      id: 'mnzcdtsbb',
      detNovel_src: '../resources/images/mnzcdtsbb.png',
      detNovel_name: '美女总裁的贴身保镖',
      detNovel_author: '猫叔',
      detNovel_content: '方巧巧看着唐健一脸疑问的表情，便解释道：“你知道，老爹不忍心看着这些孤儿流落街头，所以只要是看见在街上流浪的就抱回来领养，由于经济能力有限，老爹只能够让这些孤儿吃个温饱，读书识字的话，都要等到我放学回来再教他们。',
      detNovel_counts: '553万',
      detNovel_category: '现代都市',
      detNovel_score: '4.5分'
    }]
  },
  // 导航条转换
  bookNavTrans: function (e) {
    var navList = this.data.navList;
    var id = e.currentTarget.id;
    bookcityCommon.bookNavTrans(e, navList, id);
    this.setData({
      navList: navList
    })
  }
})