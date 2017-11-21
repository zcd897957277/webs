// bookcityClassification.js
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
      isSelected: false,
      isRight: true
    }, {
      id: 'fenlei',
      name: '分类',
      isSelected: true,
      isRight: true
    }, {
      id: 'mianfei',
      name: '免费',
      isSelected: false,
      isRight: false
    }],
    // 男频新增小说数
    addBoyBooks_counts:'330',
    // 女频新增小说数
    addGirlBooks_counts:'112',
    // 小说分类信息
    // 男频
    novel_classifiedInfor_nan:[{
      id: 'blcs',
      classNovel_src: '../resources/bookcityClassification/blcs.png',
      classNovel_name: '百炼成神',
      classNovel_type: '玄幻奇幻',
      classNovel_count: '18042'
    }, {
      id: 'tzbzds',
      classNovel_src: '../resources/bookcityClassification/tzbzds.png',
      classNovel_name: '特种兵在都市',
      classNovel_type: '现代都市',
      classNovel_count: '13293'
    },{
      id: 'jsws',
      classNovel_src: '../resources/bookcityClassification/jsws.png',
      classNovel_name: '绝世武神',
      classNovel_type: '仙侠武侠',
      classNovel_count: '4548'
    }, {
        id: 'myssz',
        classNovel_src: '../resources/bookcityClassification/myssz.png',
        classNovel_name: '麻衣神算子',
        classNovel_type: '悬疑灵异',
        classNovel_count: '4357'
    }, {
      id: 'tlzwsrh',
      classNovel_src: '../resources/bookcityClassification/tlzwsrh.png',
      classNovel_name: '天龙之无上融合',
      classNovel_type: '妙趣奇文',
      classNovel_count: '1860'
    },{
        id: 'cszsg',
        classNovel_src: '../resources/bookcityClassification/cszsg.png',
        classNovel_name: '重生在三国',
        classNovel_type: '历史架空',
        classNovel_count: '1607'
    }, {
      id: 'wyzwzgl',
      classNovel_src: '../resources/bookcityClassification/wyzwzgl.png',
      classNovel_name: '网游之王者归来',
      classNovel_type: '游戏竞技',
      classNovel_count: '1372'
    },{
      id: 'wxjh',
      classNovel_src: '../resources/bookcityClassification/wxjh.png',
      classNovel_name: '无限进化',
      classNovel_type: '科幻末世',
      classNovel_count: '911'
    },{
      id: 'xjxj',
      classNovel_src: '../resources/bookcityClassification/xjxj.png',
      classNovel_name: '血继限界',
      classNovel_type: '动漫同人',
      classNovel_count: '852'
    },{
      id: 'yhhr',
      classNovel_src: '../resources/bookcityClassification/yhhr.png',
      classNovel_name: '一号红人',
      classNovel_type: '宦海商战',
      classNovel_count: '474'
    }, {
      id: 'hbtjd',
      classNovel_src: '../resources/bookcityClassification/hbtjd.png',
      classNovel_name: '花豹突击队',
      classNovel_type: '军事战争',
      classNovel_count: '442'
    }, {
      id: 'hdqs',
      classNovel_src: '../resources/bookcityClassification/hdqs.png',
      classNovel_name: '荒岛求生',
      classNovel_type: '励志成功',
      classNovel_count: '344'
    }, {
      id: 'shz',
      classNovel_src: '../resources/bookcityClassification/shz.png',
      classNovel_name: '水浒传',
      classNovel_type: '古典文学',
      classNovel_count: '245'
    }, {
      id: 'jdsbj',
      classNovel_src: '../resources/bookcityClassification/jdsbj.png',
      classNovel_name: '基督山伯爵',
      classNovel_type: '外国名著',
      classNovel_count: '240'
    }],
    // 女频
    novel_classifiedInfor_nv: [{
      id: 'ssnlpypl',
      classNovel_src: '../resources/bookcityClassification/ssnlpypl.png',
      classNovel_name: '少帅：你老婆又跑了',
      classNovel_type: '婚恋言情',
      classNovel_count: '18188'
    },{
      id: 'sydn',
      classNovel_src: '../resources/bookcityClassification/sydn.png',
      classNovel_name: '神医嫡女',
      classNovel_type: '穿越重生',
      classNovel_count: '15685'
    },{
      id: 'zcbaxlw',
      classNovel_src: '../resources/bookcityClassification/zcbaxlw.png',
      classNovel_name: '总裁霸爱小猎物',
      classNovel_type: '总裁豪门',
      classNovel_count: '8661'
    }, {
      id: 'wpxcbrw',
      classNovel_src: '../resources/bookcityClassification/wpxcbrw.png',
      classNovel_name: '王牌校草别惹我',
      classNovel_type: '青春校园',
      classNovel_count: '3016'
    },{
      id: 'xwcf',
      classNovel_src: '../resources/bookcityClassification/xwcf.png',
      classNovel_name: '邪王宠妃',
      classNovel_type: '古代言情',
      classNovel_count: '2276'
    },{
      id: 'yhbskdzzh',
      classNovel_src: '../resources/bookcityClassification/yhbskdzzh.png',
      classNovel_name: '于海边盛开的栀子花',
      classNovel_type: '动漫同人',
      classNovel_count: '1834'
    }, {
      id: 'wyya',
      classNovel_src: '../resources/bookcityClassification/wyya.png',
      classNovel_name: '我有药啊',
      classNovel_type: '耽美同人',
      classNovel_count: '1735'
    },{
      id: 'scgwf',
      classNovel_src: '../resources/bookcityClassification/scgwf.png',
      classNovel_name: '盛宠鬼王妃',
      classNovel_type: '玄幻奇幻',
      classNovel_count: '1778'
    },{
      id: 'gfdrmmd',
      classNovel_src: '../resources/bookcityClassification/gfdrmmd.png',
      classNovel_name: '鬼夫大人：么么哒',
      classNovel_type: '灵异推理',
      classNovel_count: '1053'
    },{
      id: 'cszgyst',
      classNovel_src: '../resources/bookcityClassification/cszgyst.png',
      classNovel_name: '重生之鬼眼神童',
      classNovel_type: '魔幻情缘',
      classNovel_count: '954'
    }, {
      id: 'zznnqqs',
      classNovel_src: '../resources/bookcityClassification/zznnqqs.png',
      classNovel_name: '至尊农女千千岁',
      classNovel_type: '妙趣奇文',
      classNovel_count: '213'
    }, {
      id: 'wwyxhqc',
      classNovel_src: '../resources/bookcityClassification/wwyxhqc.png',
      classNovel_name: '微微一笑很倾城',
      classNovel_type: '游戏竞技',
      classNovel_count: '148'
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