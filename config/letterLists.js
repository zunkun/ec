const trainLetterLists = {'A':[{'city':'安康'},{'city':'安顺'},{'city':'阿勒泰'},{'city':'鞍山'},{'city':'阿克苏'},{'city':'阿拉善'},{'city':'安庆'},{'city':'安阳'},{'city':'阿坝'}],'B':[{'city':'北京'},{'city':'滨州'},{'city':'巴音郭楞'},{'city':'巴中'},{'city':'巴彦淖尔'},{'city':'本溪'},{'city':'白山'},{'city':'百色'},{'city':'保定'},{'city':'北海'},{'city':'毕节'},{'city':'宝鸡'},{'city':'包头'},{'city':'北屯'},{'city':'白城'},{'city':'白银'},{'city':'蚌埠'},{'city':'亳州'},{'city':'博尔塔拉'}],'C':[{'city':'长沙'},{'city':'楚雄'},{'city':'成都'},{'city':'承德'},{'city':'澄迈'},{'city':'赤峰'},{'city':'潮州'},{'city':'昌吉'},{'city':'长春'},{'city':'郴州'},{'city':'常州'},{'city':'沧州'},{'city':'长治'},{'city':'常德'},{'city':'池州'},{'city':'崇左'},{'city':'滁州'}],'D':[{'city':'东莞'},{'city':'德州'},{'city':'大理'},{'city':'大庆'},{'city':'丹东'},{'city':'东营'},{'city':'大连'},{'city':'儋州'},{'city':'达州'},{'city':'东方'},{'city':'定西'},{'city':'大兴安岭'},{'city':'德阳'},{'city':'大同'}],'E':[{'city':'鄂尔多斯'},{'city':'鄂州'},{'city':'恩施'}],'F':[{'city':'阜新'},{'city':'福州'},{'city':'佛山'},{'city':'阜阳'},{'city':'抚顺'},{'city':'防城港'},{'city':'抚州'}],'G':[{'city':'广元'},{'city':'贵阳'},{'city':'桂林'},{'city':'广州'},{'city':'广安'},{'city':'赣州'},{'city':'固原'},{'city':'贵港'}],'H':[{'city':'汉中'},{'city':'衡水'},{'city':'淮北'},{'city':'海北'},{'city':'呼和浩特'},{'city':'哈尔滨'},{'city':'杭州'},{'city':'怀化'},{'city':'衡阳'},{'city':'黄山'},{'city':'合肥'},{'city':'黄冈'},{'city':'海口'},{'city':'惠州'},{'city':'海西'},{'city':'呼伦贝尔'},{'city':'贺州'},{'city':'红河'},{'city':'黄石'},{'city':'湖州'},{'city':'葫芦岛'},{'city':'淮安'},{'city':'淮南'},{'city':'海东'},{'city':'菏泽'},{'city':'河池'},{'city':'哈密'},{'city':'邯郸'},{'city':'和田'},{'city':'河源'},{'city':'鹤壁'},{'city':'鹤岗'},{'city':'黑河'}],'J':[{'city':'九江'},{'city':'景德镇'},{'city':'济南'},{'city':'江门'},{'city':'锦州'},{'city':'九龙'},{'city':'佳木斯'},{'city':'焦作'},{'city':'吉林'},{'city':'金华'},{'city':'鸡西'},{'city':'吉安'},{'city':'济宁'},{'city':'济源'},{'city':'嘉兴'},{'city':'嘉峪关'},{'city':'揭阳'},{'city':'金昌'},{'city':'晋城'},{'city':'晋中'},{'city':'荆门'},{'city':'荆州'},{'city':'酒泉'}],'K':[{'city':'昆玉'},{'city':'开封'},{'city':'昆明'},{'city':'喀什'},{'city':'克孜勒苏柯尔克孜'},{'city':'克拉玛依'}],'L':[{'city':'吕梁'},{'city':'乐山'},{'city':'临沂'},{'city':'连云港'},{'city':'龙岩'},{'city':'陇南'},{'city':'兰州'},{'city':'丽水'},{'city':'廊坊'},{'city':'乐东'},{'city':'临高'},{'city':'娄底'},{'city':'洛阳'},{'city':'六盘水'},{'city':'柳州'},{'city':'辽源'},{'city':'拉萨'},{'city':'来宾'},{'city':'莱芜'},{'city':'丽江'},{'city':'凉山'},{'city':'辽阳'},{'city':'聊城'},{'city':'临汾'},{'city':'陵水'},{'city':'六安'},{'city':'漯河'}],'M':[{'city':'绵阳'},{'city':'茂名'},{'city':'牡丹江'},{'city':'马鞍山'},{'city':'眉山'},{'city':'梅州'}],'N':[{'city':'南昌'},{'city':'南通'},{'city':'南平'},{'city':'宁德'},{'city':'南京'},{'city':'南宁'},{'city':'内江'},{'city':'南充'},{'city':'那曲'},{'city':'南阳'},{'city':'宁波'}],'P':[{'city':'平凉'},{'city':'攀枝花'},{'city':'盘锦'},{'city':'平顶山'},{'city':'萍乡'},{'city':'莆田'},{'city':'濮阳'}],'Q':[{'city':'衢州'},{'city':'青岛'},{'city':'庆阳'},{'city':'黔南'},{'city':'黔东南'},{'city':'齐齐哈尔'},{'city':'秦皇岛'},{'city':'七台河'},{'city':'黔西南'},{'city':'钦州'},{'city':'清远'},{'city':'琼海'},{'city':'曲靖'},{'city':'泉州'},{'city':'潜江'}],'R':[{'city':'日照'},{'city':'日喀则'}],'S':[{'city':'上饶'},{'city':'石家庄'},{'city':'三明'},{'city':'遂宁'},{'city':'邵阳'},{'city':'沈阳'},{'city':'厦门'},{'city':'三亚'},{'city':'深圳'},{'city':'石嘴山'},{'city':'韶关'},{'city':'三门峡'},{'city':'汕头'},{'city':'汕尾'},{'city':'商洛'},{'city':'商丘'},{'city':'上海'},{'city':'绍兴'},{'city':'宿州'},{'city':'松原'},{'city':'四平'},{'city':'朔州'},{'city':'宿迁'},{'city':'苏州'},{'city':'十堰'},{'city':'石河子'},{'city':'双鸭山'},{'city':'绥化'},{'city':'随州'},{'city':'尚志市'}],'T':[{'city':'天水'},{'city':'太原'},{'city':'铜仁'},{'city':'唐山'},{'city':'天津'},{'city':'塔城'},{'city':'铜陵'},{'city':'屯昌'},{'city':'吐鲁番'},{'city':'通辽'},{'city':'铁岭'},{'city':'台州'},{'city':'泰安'},{'city':'泰州'},{'city':'天门'},{'city':'通化'}],'W':[{'city':'文山'},{'city':'乌鲁木齐'},{'city':'潍坊'},{'city':'芜湖'},{'city':'渭南'},{'city':'武汉'},{'city':'乌兰察布'},{'city':'吴忠'},{'city':'万宁'},{'city':'威海'},{'city':'温州'},{'city':'文昌'},{'city':'乌海'},{'city':'无锡'},{'city':'武威'},{'city':'梧州'}],'X':[{'city':'忻州'},{'city':'信阳'},{'city':'宣城'},{'city':'锡林郭勒'},{'city':'西安'},{'city':'邢台'},{'city':'兴安'},{'city':'孝感'},{'city':'湘潭'},{'city':'襄阳'},{'city':'仙桃'},{'city':'西宁'},{'city':'咸宁'},{'city':'咸阳'},{'city':'湘西'},{'city':'新乡'},{'city':'新余'},{'city':'徐州'},{'city':'许昌'}],'Y':[{'city':'榆林'},{'city':'烟台'},{'city':'阳江'},{'city':'雅安'},{'city':'盐城'},{'city':'延边'},{'city':'延安'},{'city':'银川'},{'city':'玉林'},{'city':'玉溪'},{'city':'伊犁'},{'city':'永州'},{'city':'营口'},{'city':'运城'},{'city':'益阳'},{'city':'宜春'},{'city':'扬州'},{'city':'阳泉'},{'city':'伊春'},{'city':'宜宾'},{'city':'宜昌'},{'city':'鹰潭'},{'city':'岳阳'},{'city':'云浮'}],'Z':[{'city':'重庆'},{'city':'遵义'},{'city':'湛江'},{'city':'淄博'},{'city':'朝阳'},{'city':'自贡'},{'city':'郑州'},{'city':'资阳'},{'city':'肇庆'},{'city':'枣庄'},{'city':'株洲'},{'city':'张家口'},{'city':'张掖'},{'city':'镇江'},{'city':'周口'},{'city':'中卫'},{'city':'昭通'},{'city':'张家界'},{'city':'漳州'},{'city':'中山'},{'city':'珠海'},{'city':'驻马店'}]}
const flightLetterLists = {'A':[{'city':'阿尔山','abbr':'YIE'},{'city':'阿克苏','abbr':'AKU'},{'city':'阿拉善右旗','abbr':'RHT'},{'city':'阿拉善左旗','abbr':'AXF'},{'city':'阿勒泰','abbr':'AAT'},{'city':'阿里','abbr':'NGQ'},{'city':'安庆','abbr':'AQG'},{'city':'鞍山','abbr':'AOG'},{'city':'安顺','abbr':'AVA'}],'B':[{'city':'白城','abbr':'DBC'},{'city':'百色','abbr':'AEB'},{'city':'保山','abbr':'BSD'},{'city':'包头','abbr':'BAV'},{'city':'巴彦淖尔','abbr':'RLK'},{'city':'巴中','abbr':'BZX'},{'city':'北海','abbr':'BHY'},{'city':'北京','abbr':'BJS'},{'city':'毕节','abbr':'BFJ'},{'city':'博乐','abbr':'BPL'},{'city':'布尔津','abbr':'KJI'}],'C':[{'city':'沧源','abbr':'CWJ'},{'city':'长白山','abbr':'NBS'},{'city':'长春','abbr':'CGQ'},{'city':'常德','abbr':'CGD'},{'city':'昌都','abbr':'BPX'},{'city':'长沙','abbr':'CSX'},{'city':'长治','abbr':'CIH'},{'city':'常州','abbr':'CZX'},{'city':'承德','abbr':'CDE'},{'city':'成都','abbr':'CTU'},{'city':'赤峰','abbr':'CIF'},{'city':'池州','abbr':'JUH'}],'D':[{'city':'大连','abbr':'DLC'},{'city':'大理市','abbr':'DLU'},{'city':'丹东','abbr':'DDG'},{'city':'稻城','abbr':'DCY'},{'city':'大庆','abbr':'DQA'},{'city':'大同','abbr':'DAT'},{'city':'达州','abbr':'DAX'},{'city':'德令哈','abbr':'HXD'},{'city':'迪庆香格里拉','abbr':'DIG'},{'city':'东营','abbr':'DOY'},{'city':'敦煌','abbr':'DNH'}],'E':[{'city':'鄂尔多斯','abbr':'DSN'},{'city':'额济纳旗','abbr':'EJN'},{'city':'恩施','abbr':'ENH'},{'city':'二连浩特','abbr':'ERL'}],'F':[{'city':'佛山','abbr':'FUO'},{'city':'阜阳','abbr':'FUG'},{'city':'抚远','abbr':'FYJ'},{'city':'富蕴','abbr':'FYN'},{'city':'福州','abbr':'FOC'}],'G':[{'city':'赣州','abbr':'KOW'},{'city':'高雄','abbr':'KHH'},{'city':'格尔木','abbr':'GOQ'},{'city':'广元','abbr':'GYS'},{'city':'广州','abbr':'CAN'},{'city':'桂林','abbr':'KWL'},{'city':'贵阳','abbr':'KWE'},{'city':'果洛','abbr':'GMQ'},{'city':'固原','abbr':'GYU'}],'H':[{'city':'哈尔滨','abbr':'HRB'},{'city':'海口','abbr':'HAK'},{'city':'海拉尔','abbr':'HLD'},{'city':'哈密','abbr':'HMI'},{'city':'邯郸','abbr':'HDG'},{'city':'黄山','abbr':'TXN'},{'city':'杭州','abbr':'HGH'},{'city':'汉中','abbr':'HZG'},{'city':'河池','abbr':'HCJ'},{'city':'合肥','abbr':'HFE'},{'city':'黑河','abbr':'HEK'},{'city':'衡阳','abbr':'HNY'},{'city':'和田','abbr':'HTN'},{'city':'红原','abbr':'AHJ'},{'city':'淮安','abbr':'HIA'},{'city':'怀化','abbr':'HJJ'},{'city':'花莲','abbr':'HUN'},{'city':'黄平','abbr':'KJH'},{'city':'花土沟','abbr':'HTT'},{'city':'呼和浩特','abbr':'HET'},{'city':'惠州','abbr':'HUZ'},{'city':'霍林郭勒','abbr':'HUO'}],'J':[{'city':'加格达奇','abbr':'JGD'},{'city':'佳木斯','abbr':'JMU'},{'city':'建三江','abbr':'JSJ'},{'city':'嘉义','abbr':'CYI'},{'city':'嘉峪关','abbr':'JGN'},{'city':'揭阳','abbr':'SWA'},{'city':'济南','abbr':'TNA'},{'city':'金昌','abbr':'JIC'},{'city':'景德镇','abbr':'JDZ'},{'city':'井冈山','abbr':'JGS'},{'city':'济宁','abbr':'JNG'},{'city':'金门','abbr':'KNH'},{'city':'锦州','abbr':'JNZ'},{'city':'九寨沟','abbr':'JZH'},{'city':'鸡西','abbr':'JXA'}],'K':[{'city':'康定','abbr':'KGT'},{'city':'喀什','abbr':'KHG'},{'city':'库尔勒','abbr':'KRL'},{'city':'克拉玛依','abbr':'KRY'},{'city':'库车','abbr':'KCA'},{'city':'昆明','abbr':'KMG'}],'L':[{'city':'澜沧','abbr':'JMJ'},{'city':'兰州','abbr':'LHW'},{'city':'拉萨','abbr':'LXA'},{'city':'连云港','abbr':'LYG'},{'city':'荔波','abbr':'LLB'},{'city':'丽江','abbr':'LJG'},{'city':'临沧','abbr':'LNJ'},{'city':'临汾','abbr':'LFQ'},{'city':'临沂','abbr':'LYI'},{'city':'林芝','abbr':'LZY'},{'city':'黎平','abbr':'HZH'},{'city':'六盘水','abbr':'LPF'},{'city':'柳州','abbr':'LZH'},{'city':'陇南','abbr':'LNL'},{'city':'龙岩','abbr':'LCX'},{'city':'洛阳','abbr':'LYA'},{'city':'泸州','abbr':'LZO'},{'city':'吕梁','abbr':'LLV'}],'M':[{'city':'马公','abbr':'MZG'},{'city':'芒市','abbr':'LUM'},{'city':'满洲里','abbr':'NZH'},{'city':'马祖','abbr':'MFK'},{'city':'梅县','abbr':'MXZ'},{'city':'绵阳','abbr':'MIG'},{'city':'漠河','abbr':'OHE'},{'city':'牡丹江','abbr':'MDG'}],'N':[{'city':'南昌','abbr':'KHN'},{'city':'南充','abbr':'NAO'},{'city':'南竿','abbr':'LZN'},{'city':'南京','abbr':'NKG'},{'city':'南宁','abbr':'NNG'},{'city':'南通','abbr':'NTG'},{'city':'南阳','abbr':'NNY'},{'city':'宁波','abbr':'NGB'},{'city':'宁蒗','abbr':'NLH'}],'P':[{'city':'攀枝花','abbr':'PZI'}],'Q':[{'city':'黔江','abbr':'JIQ'},{'city':'祁连县','abbr':'HBQ'},{'city':'且末','abbr':'IQM'},{'city':'青岛','abbr':'TAO'},{'city':'庆阳','abbr':'IQN'},{'city':'秦皇岛','abbr':'BPE'},{'city':'琼海','abbr':'BAR'},{'city':'齐齐哈尔','abbr':'NDG'},{'city':'泉州','abbr':'JJN'},{'city':'衢州','abbr':'JUZ'}],'R':[{'city':'日喀则','abbr':'RKZ'},{'city':'日照','abbr':'RIZ'},{'city':'若羌','abbr':'RQA'}],'S':[{'city':'三明','abbr':'SQJ'},{'city':'三亚','abbr':'SYX'},{'city':'莎车','abbr':'QSZ'},{'city':'上海','abbr':'SHA'},{'city':'上饶','abbr':'SQD'},{'city':'邵阳','abbr':'WGN'},{'city':'神农架','abbr':'HPG'},{'city':'沈阳','abbr':'SHE'},{'city':'深圳','abbr':'SZX'},{'city':'石河子','abbr':'SHF'},{'city':'石家庄','abbr':'SJW'},{'city':'十堰','abbr':'WDS'},{'city':'思茅','abbr':'SYM'},{'city':'松原','abbr':'YSQ'},{'city':'厦门','abbr':'XMN'}],'T':[{'city':'塔城','abbr':'TCG'},{'city':'台北','abbr':'TPE'},{'city':'台东','abbr':'TTT'},{'city':'台南','abbr':'TNN'},{'city':'太原','abbr':'TYN'},{'city':'台中','abbr':'RMQ'},{'city':'台州','abbr':'HYN'},{'city':'唐山','abbr':'TVS'},{'city':'腾冲','abbr':'TCZ'},{'city':'天津','abbr':'TSN'},{'city':'天水','abbr':'THQ'},{'city':'通化','abbr':'TNH'},{'city':'通辽','abbr':'TGO'},{'city':'铜仁','abbr':'TEN'},{'city':'吐鲁番','abbr':'TLQ'},{'city':'图木舒克','abbr':'TWC'}],'W':[{'city':'万州','abbr':'WXN'},{'city':'潍坊','abbr':'WEF'},{'city':'威海','abbr':'WEH'},{'city':'文山','abbr':'WNH'},{'city':'温州','abbr':'WNZ'},{'city':'五大连池','abbr':'DTU'},{'city':'乌海','abbr':'WUA'},{'city':'武汉','abbr':'WUH'},{'city':'乌兰察布','abbr':'UCB'},{'city':'乌兰浩特','abbr':'HLH'},{'city':'乌拉特中旗','abbr':'WZQ'},{'city':'乌鲁木齐','abbr':'URC'},{'city':'无锡','abbr':'WUX'},{'city':'武夷山','abbr':'WUS'},{'city':'梧州','abbr':'WUZ'}],'X':[{'city':'夏河','abbr':'GXH'},{'city':'西安','abbr':'SIA'},{'city':'香港','abbr':'HKG'},{'city':'襄阳','abbr':'XFN'},{'city':'西昌','abbr':'XIC'},{'city':'锡林浩特','abbr':'XIL'},{'city':'信阳','abbr':'XAI'},{'city':'兴义','abbr':'ACX'},{'city':'西宁','abbr':'XNN'},{'city':'新源','abbr':'NLT'},{'city':'忻州','abbr':'WUT'},{'city':'西双版纳','abbr':'JHG'},{'city':'徐州','abbr':'XUZ'}],'Y':[{'city':'延安','abbr':'ENY'},{'city':'盐城','abbr':'YNZ'},{'city':'扬州','abbr':'YTY'},{'city':'延吉','abbr':'YNJ'},{'city':'烟台','abbr':'YNT'},{'city':'宜宾','abbr':'YBP'},{'city':'宜昌','abbr':'YIH'},{'city':'伊春','abbr':'LDS'},{'city':'宜春','abbr':'YIC'},{'city':'银川','abbr':'INC'},{'city':'营口','abbr':'YKH'},{'city':'伊宁','abbr':'YIN'},{'city':'义乌','abbr':'YIW'},{'city':'永州','abbr':'LLF'},{'city':'岳阳','abbr':'YYA'},{'city':'榆林','abbr':'UYN'},{'city':'运城','abbr':'YCU'},{'city':'玉树','abbr':'YUS'}],'Z':[{'city':'朝阳','abbr':'CHG'},{'city':'重庆','abbr':'CKG'},{'city':'扎兰屯','abbr':'NZL'},{'city':'张家界','abbr':'DYG'},{'city':'张家口','abbr':'ZQZ'},{'city':'张掖','abbr':'YZY'},{'city':'湛江','abbr':'ZHA'},{'city':'昭通','abbr':'ZAT'},{'city':'郑州','abbr':'CGO'},{'city':'中卫','abbr':'ZHY'},{'city':'舟山','abbr':'HSN'},{'city':'珠海','abbr':'ZUH'},{'city':'遵义','abbr':'ZYI'}]};

module.exports = { train: trainLetterLists, flight: flightLetterLists};