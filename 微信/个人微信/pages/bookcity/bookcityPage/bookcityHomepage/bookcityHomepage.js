// bookcityHomepage.js
// 引入书架导航条公共方法
var bookcityCommon=require('../../bookcityCommon/bookcityCommon.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
  'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
  'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    // 女
    nvpinSrc: '../resources/images/nv_03.png',
    // 作者头
    authorSrc:'../resources/images/author_03.png',
    // 是否显示面板指示点
    indicatorDots: true,
    // 指示点颜色
    indicatorColor:'#a7a8a2',
    // 当前选中的指示点颜色
    indicatorActiveColor:'#50a4fc',
    autoplay: true,
    // 自动切换时间间隔
    interval: 2000,
    // 滑动动画时长
    duration: 1000,
    // 是否采用衔接滑动
    circular:true,
    // 书架中导航条数据
    navList: [{
      id: 'shouye',
      name: '首页',
      isSelected: true,
      isRight: true
    }, {
      id: 'huiyuan',
      name: '会员',
      isSelected: false,
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
    // 猜你喜欢图
    cnlikeitSrc:'../resources/images/Guessyoulikeit_03.png',
    // detail novel
    novel_cainixihuan:[{
      id:'ssnlpypl',
      detNovel_src: '../resources/images/ssnlpypl_03.png',
      detNovel_name: '少帅你老婆又跑了',
      detNovel_author: '名药',
      detNovel_content: '少帅说：“我家夫人是乡下女子，不懂时髦，你们不要欺负她！”'
    },{
        id: 'csrsssn',
        detNovel_src: '../resources/images/ssnlpypl_03.png',
        detNovel_name: '重塑人生三十年',
        detNovel_author: '皇家雇佣猫',
        detNovel_content: '这是一个普通的男人回到1996年重新开始的故事。他叫陈子迩。他有点小自信；正常，男人有了钱都自信。'
    },{
        id: 'ndwss',
        detNovel_src: '../resources/images/ssnlpypl_03.png',
        detNovel_name: '难道我是神',
        detNovel_author: '熊狼狗',
        detNovel_content: '一颗流星划过天际，催眠、时停、瞬间移动、山呼海啸，无数的超能力出现在这个世界上。'
    },{
        id: 'jsgds',
        detNovel_src: '../resources/images/ssnlpypl_03.png',
        detNovel_name: '就是个道士',
        detNovel_author: '泛舟子',
        detNovel_content: '一瓢天河水，数不尽的聊斋相思泪。剑臣心念倩女香，王生露水惧画皮。尔旦无有功名心，却蒙红尘利禄网。总有狐妖迷书生，却道书生迷狐妖。'
    },{
        id: 'hx',
        detNovel_src: '../resources/images/ssnlpypl_03.png',
        detNovel_name: '汉乡',
        detNovel_author: '孑与2',
        detNovel_content: '我们接受了祖先的遗产，这让中华辉煌了数千年，我们是如此的心安理得，从未想过要回归那个在刀耕火种中苦苦寻找出路的时代。反哺我们苦难的祖先，并从中找到故乡的真正意义，将是本书要讲的故事。'
    }],
    // 热销爽文
    rxswSrc: '../resources/images/sellcool_03.png',
    novel_rexiaoshuangwen: [{
      id: 'zcbaxlw',
      detNovel_src: '../resources/images/zcbaxlw.png',
      detNovel_name: '总裁霸爱小猎物',
      detNovel_author: '思月',
      detNovel_content: '他说：“女人，记着谁是你的男人！”他时而冷漠，时而温柔，她以为，高高在上的亿万总裁爱上了她这个小小女佣。她珠胎暗结之时，他却一声令下：孩子打掉！这个女人，让她给我消失…… 本文非独家授权。'
    },{
        id: 'xqthl',
        detNovel_src: '../resources/images/xqthl.png',
        detNovel_name: '小妻太火辣',
        detNovel_author: '北瑾',
        detNovel_content: '二十岁的音乐晚会上，她满心喜悦的准备向未婚夫告白，却走进了一个圈套！ 炽热的男人将穿着白色纱裙的她牢牢握在掌中！'
    },{
      id: 'tcxdf',
      detNovel_src: '../resources/images/tcxdf.png',
      detNovel_name: '天才小毒妃',
      detNovel_author: '芥沫',
      detNovel_content: '她是医学世家最卑微的废材丑女，人人可欺；他却是天宁国最尊贵的王，万众拥戴，权倾天下！大婚之日，花轿临门，秦王府大门紧闭，丢出一句“明日再来”。她孤身一人，踩着自尊一步一步踏入王府大门'
    }, {
      id: 'mrwljt',
      detNovel_src: '../resources/images/tcxdf.png',
      detNovel_name: '末日亡灵军团',
      detNovel_author: '北重楼',
      detNovel_content: '末日降临，丧尸肆虐，法律、秩序被摧毁，文明社会彻底崩塌，人类进入黑暗末世。'
    }, {
      id: 'cycszks',
      detNovel_src: '../resources/images/tcxdf.png',
      detNovel_name: '穿越从山贼开始',
      detNovel_author: '怒笑',
      detNovel_content: '当陆海空知道自己穿越到了一个游戏世界的时候他是懵掰的。当然自己所在的这一个国家居然是东汉，而且还是末年的时候，他觉得自己是可以牛掰的。但当他知道官兵马上就要剿了他们这一个山寨的时候，这家伙就煞笔了。'
    }, {
      id: 'cycszks',
      detNovel_src: '../resources/images/tcxdf.png',
      detNovel_name: '无疆',
      detNovel_author: '小刀锋利',
      detNovel_content: '鹰击长空，鱼跃龙门，熊咆虎啸，万物皆有灵。末法之极，磁极轮转，世界变迁。曾经那个熟悉的世界，已经变得面目全非。当神话变成现实，当传说不再神秘，世界无疆，热血永恒。'
    }],
    // 热销佳作
    rxjzSrc: '../resources/images/bestseller_03.png',
    novel_rexiaojiazuo:[{
      id: 'xhhczcdrxjq',
      detNovel_src: '../resources/images/xhhczcdrxjq_03.png',
      detNovel_name: '先婚后宠：总裁大人小娇妻',
      detNovel_author: '美椒',
      detNovel_content: '他是一手掌控着整个SH经济，政治命脉的墓家嫡长孙。'
    }, {
      id: 'zhygws',
      detNovel_src: '../resources/images/xhhczcdrxjq_03.png',
      detNovel_name: '最后一个巫师',
      detNovel_author: '庚新',
      detNovel_content: '巫，不立文字，口耳相传。巫，难以两全，唯胜者长存。当一个巫崛起之时，便是另一个巫陨落之日。那一年，杨沐从非洲大陆走来，他生平所愿，只是实现师父的遗愿：成为真正的灵巫，去看那神秘世界的风情。 '
    }, {
        id: 'cs2001n',
        detNovel_src: '../resources/images/xhhczcdrxjq_03.png',
        detNovel_name: '重生2001年',
        detNovel_author: '古代人',
        detNovel_content: '小说的主角重生时总是又激动又高兴，可张嘉重生时却无比焦急懊恼，既担心经常迷路的健忘母亲，又担心刚刚怀孕的未婚妻子，但看到犹自健在的父亲时，张嘉一切埋怨都消失了！'
    }, {
      id: 'xtzxzll',
      detNovel_src: '../resources/images/xhhczcdrxjq_03.png',
      detNovel_name: '系统之校长来了',
      detNovel_author: '修身',
      detNovel_content: '【修身同一风格新书《直播之我们要逆袭》已经发布，希望大家能支持下，谢谢。】刘猛在外面混不下去，考了个证回乡当老师。半年后学校只剩两个学生，老校长拍着刘猛肩膀道：“小伙子，校长的位置就让给你了，我很看好你哦！”'
    }, {
        id: 'yszj',
        detNovel_src: '../resources/images/xhhczcdrxjq_03.png',
        detNovel_name: '原始战记',
        detNovel_author: '陈词懒调',
        detNovel_content: '这坑爹的原始部落！“终有一天，我们将重返故地。荣耀依旧在，炎角之火永远不灭。”'
    }],
    // 女生好文
    nvhwSrc: '../resources/images/goodgirls_03.png',
    novel_nvshenhaowen:[{
      id: 'lsdtsq',
      detNovel_src: '../resources/images/lsdtsq.png',
      detNovel_name: '冷少的替身妻',
      detNovel_author: '汐汐晚晴',
      detNovel_content: '“从今天起，你就是我冷某人的妻子，怎么？不想履行妻子的义务？”冷眸盯着面前缩在床边的新婚妻子。'
    }, {
      id: 'njxnydx',
      detNovel_src: '../resources/images/njxnydx.png',
      detNovel_name: '农家小女有点闲',
      detNovel_author: '甜甜',
      detNovel_content: '[擦.这是哪里?难道穿越了?"一不小心来到农家了.当了媳妇有了孩儿.还好家有几亩薄田.这该怎样发家致富呢 ?[古代的男人怎么就这么不好看呢 ? 还是觉得这个金元宝好看些"'
    }, {
        id: 'tcnx',
        detNovel_src: '../resources/images/tcnx.png',
        detNovel_name: '天才女相',
        detNovel_author: '火狐狸',
        detNovel_content: '她身为前朝将军之女，后家族被奸臣陷害全族流放，她为救洗脱冤屈，怀着一腔热血和才华女扮男装进京赶考，更成为当朝状元。'
    }, {
      id: 'bcws',
      detNovel_src: '../resources/images/lsdtsq.png',
      detNovel_name: '本座武神',
      detNovel_author: '乐乐山人',
      detNovel_content: '这是一个强者为尊的高武世界，杀手之王龙天携异宝穿越而来，强势崛起，修无上功法，习阵道传承，以武入道，步步封神……'
    }, {
        id: 'qzcm',
        detNovel_src: '../resources/images/lsdtsq.png',
        detNovel_name: '全职村民',
        detNovel_author: '百晓点灯',
        detNovel_content: '人类=弱者，村民=最弱职业？工薪族到末世英雄，末世英雄到异界村民，这是一个带有严重虐人倾向的村民敲打异界的故事。转生史上最弱职业——村民，从哥布林殴打到巨龙'
    }],
     // 主编力荐
    zbljSrc: '../resources/images/zblj.png',
    novel_zhubianlijian:[{
      id: 'dfzsyqf',
      detNovel_src: '../resources/images/dfzsyqf.png',
      detNovel_name: '帝凰之神医弃妃',
      detNovel_author: '阿彩',
      detNovel_content: '她是无父无母任人欺凌的孤女，他是一人之下、万人之上的铁血王爷。她满身是伤，狼狈不堪；他遗世独立，风华无双。她卑微伏跪，他傲视天下。'
    }, {
      id: 'njxnydx',
      detNovel_src: '../resources/images/njxnydx.png',
      detNovel_name: '农家小女有点闲',
      detNovel_author: '甜甜',
      detNovel_content: '她是无父无母任人欺凌的孤女，他是一人之下、万人之上的铁血王爷。她满身是伤，狼狈不堪；他遗世独立，风华无双。她卑微伏跪，他傲视天下。'
    }, {
        id: 'zqtfjx',
        detNovel_src: '../resources/images/njxnydx.png',
        detNovel_name: '最强天赋觉醒',
        detNovel_author: '我有一宝贝',
        detNovel_content: '李明穿越了，却发现这是一个大星际时代。人类已经征服了数十个星系，更重要的是，这里征服星系靠的不是科技，而是个人武力。在这里，个人的力量达到了巅峰，天赋者尊贵无比，百万无一，在天赋者之上，则是掌握了法则力量的觉醒者。'
    }, {
      id: 'zzqh',
      detNovel_src: '../resources/images/njxnydx.png',
      detNovel_name: '最终强化',
      detNovel_author: '柴郡虎',
      detNovel_content: '陆宇得到了可以盗取、强化、融合别人特技的不良系统，从此走上了一条装逼打脸的不归之路。某原版丹师：“我能让吃我丹药的人，连升三个大境界。”陆宇微微一笑“我能……先别忙着飞升，快说说感想！”'
    }, {
        id: 'gxsz',
        detNovel_src: '../resources/images/njxnydx.png',
        detNovel_name: '共享神尊',
        detNovel_author: '俊柯',
        detNovel_content: '共享就能修炼！穿越异界的武岩，得到宇宙之心，一眼顿悟世间万法，通过共享让他人受益，还能从宇宙之心中得到共享之力的加持，迅速提升修为，这更是让一心修真封神的武岩欣喜若狂。'
    }],
    //男频热销榜
    novel_nanpinrexiaobang: [{
      id: 'cfxnm',
      detNovel_src: '../resources/images/cfxnm.png',
      detNovel_name: '超凡小农民',
      detNovel_author: '肥尾蝎',
      detNovel_content: '见义勇为，却含冤入狱两年，归来之后，携带神农传承，将白水村发展的繁华无比，各路美女开始云集白水村！'
    },{
      id: 'smzz',
      detNovel_src: '../resources/images/smzz.png',
      detNovel_name: '神脉至尊',
      detNovel_author: '花落唯窈',
      detNovel_content: '落魄少爷南风，获得开天之神传承，觉醒惊世灵脉，习得无上铸器之术。从此，他走上修炼大道，脚踏绝世天才，身坐无敌神兽。各族老怪物，为求他铸一器，甘愿做他小弟。'
    },{
        id: 'tzbzds',
        detNovel_src: '../resources/images/tzbzds.png',
        detNovel_name: '特种兵在都市',
        detNovel_author: '夜十三',
        detNovel_content: '杨洛曾经是一名让所有国家军人闻名丧胆的兵王，他是地下世界大名鼎鼎的杀手法官，他是世界医学界里天才医生，他掌握着神秘组织高买。他性格嚣张狂妄，为达目的不折手段。他痞气十足，各种美女为他痴狂。在这繁华的都市，杨洛上演了一场激情四射的热血人生。'
    },{
      id: 'wszz',
      detNovel_src: '../resources/images/wszz.png',
      detNovel_name: '武神至尊',
      detNovel_author: '我吃面包',
      detNovel_content: '21世纪闷骚青年林飞一不小心从地球穿越到元武界，可悲的是穿越对象竟是一个傻子，唉，认命吧。可是傻子白痴又怎么样，一样练神功，升级，泡美妞，问鼎天下，混得可是风生水起啊。',
      detNovel_counts:'553万',
      detNovel_category:'玄幻奇幻',
      detNovel_score:'4.3分'
    },{
        id: 'mnzcdtsbb',
        detNovel_src: '../resources/images/mnzcdtsbb.png',
        detNovel_name: '美女总裁的贴身保镖',
        detNovel_author: '猫叔',
        detNovel_content: '方巧巧看着唐健一脸疑问的表情，便解释道：“你知道，老爹不忍心看着这些孤儿流落街头，所以只要是看见在街上流浪的就抱回来领养，由于经济能力有限，老爹只能够让这些孤儿吃个温饱，读书识字的话，都要等到我放学回来再教他们。',
        detNovel_counts: '553万',
        detNovel_category: '现代都市',
        detNovel_score: '4.5分'
    }],
    //男频人气榜
    novel_nanpinrenqibang: [{
      id: 'az',
      detNovel_src: '../resources/images/az.png',
      detNovel_name: '暗战',
      detNovel_author: '丁丁猫',
      detNovel_content: '你的名字无人知晓,你的功绩永世留存！在国家和民族危难关头，有人挺身而出，找到了挽救危亡的道路。为了坚持信念，宁愿隐姓埋名为自己信仰的事业奉献一切牺牲一切，周旋于侵略者和敌人中间。谨以此文纪念这些无名英雄！',
      detNovel_counts: '31.64万',
      detNovel_category: '军事',
      detNovel_score: '8.7分'
    },{
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
    }]
  },
  // 导航条转换
  bookNavTrans:function(e){
    var navList = this.data.navList;
    var id = e.currentTarget.id;
    bookcityCommon.bookNavTrans(e, navList, id);
    this.setData({
      navList: navList
    })
  }
})