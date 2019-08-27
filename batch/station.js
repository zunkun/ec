const Stations = require('../models/Stations');
const pinyin = require('pinyin')
const flights = [{
    'city': '阿尔山',
    'abbr': 'YIE'
  },
  {
    'city': '阿克苏',
    'abbr': 'AKU'
  },
  {
    'city': '阿拉善右旗',
    'abbr': 'RHT'
  },
  {
    'city': '阿拉善左旗',
    'abbr': 'AXF'
  },
  {
    'city': '阿勒泰',
    'abbr': 'AAT'
  },
  {
    'city': '阿里',
    'abbr': 'NGQ'
  },
  {
    'city': '安庆',
    'abbr': 'AQG'
  },
  {
    'city': '鞍山',
    'abbr': 'AOG'
  },
  {
    'city': '安顺',
    'abbr': 'AVA'
  },
  {
    'city': '白城',
    'abbr': 'DBC'
  },
  {
    'city': '百色',
    'abbr': 'AEB'
  },
  {
    'city': '保山',
    'abbr': 'BSD'
  },
  {
    'city': '包头',
    'abbr': 'BAV'
  },
  {
    'city': '巴彦淖尔',
    'abbr': 'RLK'
  },
  {
    'city': '巴中',
    'abbr': 'BZX'
  },
  {
    'city': '北海',
    'abbr': 'BHY'
  },
  {
    'city': '北京',
    'abbr': 'BJS'
  },
  {
    'city': '毕节',
    'abbr': 'BFJ'
  },
  {
    'city': '博乐',
    'abbr': 'BPL'
  },
  {
    'city': '布尔津',
    'abbr': 'KJI'
  },
  {
    'city': '沧源',
    'abbr': 'CWJ'
  },
  {
    'city': '长白山',
    'abbr': 'NBS'
  },
  {
    'city': '长春',
    'abbr': 'CGQ'
  },
  {
    'city': '常德',
    'abbr': 'CGD'
  },
  {
    'city': '昌都',
    'abbr': 'BPX'
  },
  {
    'city': '长沙',
    'abbr': 'CSX'
  },
  {
    'city': '长治',
    'abbr': 'CIH'
  },
  {
    'city': '常州',
    'abbr': 'CZX'
  },
  {
    'city': '朝阳',
    'abbr': 'CHG'
  },
  {
    'city': '承德',
    'abbr': 'CDE'
  },
  {
    'city': '成都',
    'abbr': 'CTU'
  },
  {
    'city': '赤峰',
    'abbr': 'CIF'
  },
  {
    'city': '池州',
    'abbr': 'JUH'
  },
  {
    'city': '重庆',
    'abbr': 'CKG'
  },
  {
    'city': '大连',
    'abbr': 'DLC'
  },
  {
    'city': '大理市',
    'abbr': 'DLU'
  },
  {
    'city': '丹东',
    'abbr': 'DDG'
  },
  {
    'city': '稻城',
    'abbr': 'DCY'
  },
  {
    'city': '大庆',
    'abbr': 'DQA'
  },
  {
    'city': '大同',
    'abbr': 'DAT'
  },
  {
    'city': '达州',
    'abbr': 'DAX'
  },
  {
    'city': '德令哈',
    'abbr': 'HXD'
  },
  {
    'city': '迪庆香格里拉',
    'abbr': 'DIG'
  },
  {
    'city': '东营',
    'abbr': 'DOY'
  },
  {
    'city': '敦煌',
    'abbr': 'DNH'
  },
  {
    'city': '鄂尔多斯',
    'abbr': 'DSN'
  },
  {
    'city': '额济纳旗',
    'abbr': 'EJN'
  },
  {
    'city': '恩施',
    'abbr': 'ENH'
  },
  {
    'city': '二连浩特',
    'abbr': 'ERL'
  },
  {
    'city': '佛山',
    'abbr': 'FUO'
  },
  {
    'city': '阜阳',
    'abbr': 'FUG'
  },
  {
    'city': '抚远',
    'abbr': 'FYJ'
  },
  {
    'city': '富蕴',
    'abbr': 'FYN'
  },
  {
    'city': '福州',
    'abbr': 'FOC'
  },
  {
    'city': '赣州',
    'abbr': 'KOW'
  },
  {
    'city': '高雄',
    'abbr': 'KHH'
  },
  {
    'city': '格尔木',
    'abbr': 'GOQ'
  },
  {
    'city': '广元',
    'abbr': 'GYS'
  },
  {
    'city': '广州',
    'abbr': 'CAN'
  },
  {
    'city': '桂林',
    'abbr': 'KWL'
  },
  {
    'city': '贵阳',
    'abbr': 'KWE'
  },
  {
    'city': '果洛',
    'abbr': 'GMQ'
  },
  {
    'city': '固原',
    'abbr': 'GYU'
  },
  {
    'city': '哈尔滨',
    'abbr': 'HRB'
  },
  {
    'city': '海口',
    'abbr': 'HAK'
  },
  {
    'city': '海拉尔',
    'abbr': 'HLD'
  },
  {
    'city': '哈密',
    'abbr': 'HMI'
  },
  {
    'city': '邯郸',
    'abbr': 'HDG'
  },
  {
    'city': '黄山',
    'abbr': 'TXN'
  },
  {
    'city': '杭州',
    'abbr': 'HGH'
  },
  {
    'city': '汉中',
    'abbr': 'HZG'
  },
  {
    'city': '河池',
    'abbr': 'HCJ'
  },
  {
    'city': '合肥',
    'abbr': 'HFE'
  },
  {
    'city': '黑河',
    'abbr': 'HEK'
  },
  {
    'city': '衡阳',
    'abbr': 'HNY'
  },
  {
    'city': '和田',
    'abbr': 'HTN'
  },
  {
    'city': '红原',
    'abbr': 'AHJ'
  },
  {
    'city': '淮安',
    'abbr': 'HIA'
  },
  {
    'city': '怀化',
    'abbr': 'HJJ'
  },
  {
    'city': '花莲',
    'abbr': 'HUN'
  },
  {
    'city': '黄平',
    'abbr': 'KJH'
  },
  {
    'city': '花土沟',
    'abbr': 'HTT'
  },
  {
    'city': '呼和浩特',
    'abbr': 'HET'
  },
  {
    'city': '惠州',
    'abbr': 'HUZ'
  },
  {
    'city': '霍林郭勒',
    'abbr': 'HUO'
  },
  {
    'city': '加格达奇',
    'abbr': 'JGD'
  },
  {
    'city': '佳木斯',
    'abbr': 'JMU'
  },
  {
    'city': '建三江',
    'abbr': 'JSJ'
  },
  {
    'city': '嘉义',
    'abbr': 'CYI'
  },
  {
    'city': '嘉峪关',
    'abbr': 'JGN'
  },
  {
    'city': '揭阳',
    'abbr': 'SWA'
  },
  {
    'city': '济南',
    'abbr': 'TNA'
  },
  {
    'city': '金昌',
    'abbr': 'JIC'
  },
  {
    'city': '景德镇',
    'abbr': 'JDZ'
  },
  {
    'city': '井冈山',
    'abbr': 'JGS'
  },
  {
    'city': '济宁',
    'abbr': 'JNG'
  },
  {
    'city': '金门',
    'abbr': 'KNH'
  },
  {
    'city': '锦州',
    'abbr': 'JNZ'
  },
  {
    'city': '九寨沟',
    'abbr': 'JZH'
  },
  {
    'city': '鸡西',
    'abbr': 'JXA'
  },
  {
    'city': '康定',
    'abbr': 'KGT'
  },
  {
    'city': '喀什',
    'abbr': 'KHG'
  },
  {
    'city': '库尔勒',
    'abbr': 'KRL'
  },
  {
    'city': '克拉玛依',
    'abbr': 'KRY'
  },
  {
    'city': '库车',
    'abbr': 'KCA'
  },
  {
    'city': '昆明',
    'abbr': 'KMG'
  },
  {
    'city': '澜沧',
    'abbr': 'JMJ'
  },
  {
    'city': '兰州',
    'abbr': 'LHW'
  },
  {
    'city': '拉萨',
    'abbr': 'LXA'
  },
  {
    'city': '连云港',
    'abbr': 'LYG'
  },
  {
    'city': '荔波',
    'abbr': 'LLB'
  },
  {
    'city': '丽江',
    'abbr': 'LJG'
  },
  {
    'city': '临沧',
    'abbr': 'LNJ'
  },
  {
    'city': '临汾',
    'abbr': 'LFQ'
  },
  {
    'city': '临沂',
    'abbr': 'LYI'
  },
  {
    'city': '林芝',
    'abbr': 'LZY'
  },
  {
    'city': '黎平',
    'abbr': 'HZH'
  },
  {
    'city': '六盘水',
    'abbr': 'LPF'
  },
  {
    'city': '柳州',
    'abbr': 'LZH'
  },
  {
    'city': '陇南',
    'abbr': 'LNL'
  },
  {
    'city': '龙岩',
    'abbr': 'LCX'
  },
  {
    'city': '洛阳',
    'abbr': 'LYA'
  },
  {
    'city': '泸州',
    'abbr': 'LZO'
  },
  {
    'city': '吕梁',
    'abbr': 'LLV'
  },
  {
    'city': '马公',
    'abbr': 'MZG'
  },
  {
    'city': '芒市',
    'abbr': 'LUM'
  },
  {
    'city': '满洲里',
    'abbr': 'NZH'
  },
  {
    'city': '马祖',
    'abbr': 'MFK'
  },
  {
    'city': '梅县',
    'abbr': 'MXZ'
  },
  {
    'city': '绵阳',
    'abbr': 'MIG'
  },
  {
    'city': '漠河',
    'abbr': 'OHE'
  },
  {
    'city': '牡丹江',
    'abbr': 'MDG'
  },
  {
    'city': '南昌',
    'abbr': 'KHN'
  },
  {
    'city': '南充',
    'abbr': 'NAO'
  },
  {
    'city': '南竿',
    'abbr': 'LZN'
  },
  {
    'city': '南京',
    'abbr': 'NKG'
  },
  {
    'city': '南宁',
    'abbr': 'NNG'
  },
  {
    'city': '南通',
    'abbr': 'NTG'
  },
  {
    'city': '南阳',
    'abbr': 'NNY'
  },
  {
    'city': '宁波',
    'abbr': 'NGB'
  },
  {
    'city': '宁蒗',
    'abbr': 'NLH'
  },
  {
    'city': '攀枝花',
    'abbr': 'PZI'
  },
  {
    'city': '黔江',
    'abbr': 'JIQ'
  },
  {
    'city': '祁连县',
    'abbr': 'HBQ'
  },
  {
    'city': '且末',
    'abbr': 'IQM'
  },
  {
    'city': '青岛',
    'abbr': 'TAO'
  },
  {
    'city': '庆阳',
    'abbr': 'IQN'
  },
  {
    'city': '秦皇岛',
    'abbr': 'BPE'
  },
  {
    'city': '琼海',
    'abbr': 'BAR'
  },
  {
    'city': '齐齐哈尔',
    'abbr': 'NDG'
  },
  {
    'city': '泉州',
    'abbr': 'JJN'
  },
  {
    'city': '衢州',
    'abbr': 'JUZ'
  },
  {
    'city': '日喀则',
    'abbr': 'RKZ'
  },
  {
    'city': '日照',
    'abbr': 'RIZ'
  },
  {
    'city': '若羌',
    'abbr': 'RQA'
  },
  {
    'city': '三明',
    'abbr': 'SQJ'
  },
  {
    'city': '三亚',
    'abbr': 'SYX'
  },
  {
    'city': '莎车',
    'abbr': 'QSZ'
  },
  {
    'city': '上海',
    'abbr': 'SHA'
  },
  {
    'city': '上饶',
    'abbr': 'SQD'
  },
  {
    'city': '邵阳',
    'abbr': 'WGN'
  },
  {
    'city': '神农架',
    'abbr': 'HPG'
  },
  {
    'city': '沈阳',
    'abbr': 'SHE'
  },
  {
    'city': '深圳',
    'abbr': 'SZX'
  },
  {
    'city': '石河子',
    'abbr': 'SHF'
  },
  {
    'city': '石家庄',
    'abbr': 'SJW'
  },
  {
    'city': '十堰',
    'abbr': 'WDS'
  },
  {
    'city': '思茅',
    'abbr': 'SYM'
  },
  {
    'city': '松原',
    'abbr': 'YSQ'
  },
  {
    'city': '塔城',
    'abbr': 'TCG'
  },
  {
    'city': '台北',
    'abbr': 'TPE'
  },
  {
    'city': '台东',
    'abbr': 'TTT'
  },
  {
    'city': '台南',
    'abbr': 'TNN'
  },
  {
    'city': '太原',
    'abbr': 'TYN'
  },
  {
    'city': '台中',
    'abbr': 'RMQ'
  },
  {
    'city': '台州',
    'abbr': 'HYN'
  },
  {
    'city': '唐山',
    'abbr': 'TVS'
  },
  {
    'city': '腾冲',
    'abbr': 'TCZ'
  },
  {
    'city': '天津',
    'abbr': 'TSN'
  },
  {
    'city': '天水',
    'abbr': 'THQ'
  },
  {
    'city': '通化',
    'abbr': 'TNH'
  },
  {
    'city': '通辽',
    'abbr': 'TGO'
  },
  {
    'city': '铜仁',
    'abbr': 'TEN'
  },
  {
    'city': '吐鲁番',
    'abbr': 'TLQ'
  },
  {
    'city': '图木舒克',
    'abbr': 'TWC'
  },
  {
    'city': '万州',
    'abbr': 'WXN'
  },
  {
    'city': '潍坊',
    'abbr': 'WEF'
  },
  {
    'city': '威海',
    'abbr': 'WEH'
  },
  {
    'city': '文山',
    'abbr': 'WNH'
  },
  {
    'city': '温州',
    'abbr': 'WNZ'
  },
  {
    'city': '五大连池',
    'abbr': 'DTU'
  },
  {
    'city': '乌海',
    'abbr': 'WUA'
  },
  {
    'city': '武汉',
    'abbr': 'WUH'
  },
  {
    'city': '乌兰察布',
    'abbr': 'UCB'
  },
  {
    'city': '乌兰浩特',
    'abbr': 'HLH'
  },
  {
    'city': '乌拉特中旗',
    'abbr': 'WZQ'
  },
  {
    'city': '乌鲁木齐',
    'abbr': 'URC'
  },
  {
    'city': '无锡',
    'abbr': 'WUX'
  },
  {
    'city': '武夷山',
    'abbr': 'WUS'
  },
  {
    'city': '梧州',
    'abbr': 'WUZ'
  },
  {
    'city': '夏河',
    'abbr': 'GXH'
  },
  {
    'city': '厦门',
    'abbr': 'XMN'
  },
  {
    'city': '西安',
    'abbr': 'SIA'
  },
  {
    'city': '香港',
    'abbr': 'HKG'
  },
  {
    'city': '襄阳',
    'abbr': 'XFN'
  },
  {
    'city': '西昌',
    'abbr': 'XIC'
  },
  {
    'city': '锡林浩特',
    'abbr': 'XIL'
  },
  {
    'city': '信阳',
    'abbr': 'XAI'
  },
  {
    'city': '兴义',
    'abbr': 'ACX'
  },
  {
    'city': '西宁',
    'abbr': 'XNN'
  },
  {
    'city': '新源',
    'abbr': 'NLT'
  },
  {
    'city': '忻州',
    'abbr': 'WUT'
  },
  {
    'city': '西双版纳',
    'abbr': 'JHG'
  },
  {
    'city': '徐州',
    'abbr': 'XUZ'
  },
  {
    'city': '延安',
    'abbr': 'ENY'
  },
  {
    'city': '盐城',
    'abbr': 'YNZ'
  },
  {
    'city': '扬州',
    'abbr': 'YTY'
  },
  {
    'city': '延吉',
    'abbr': 'YNJ'
  },
  {
    'city': '烟台',
    'abbr': 'YNT'
  },
  {
    'city': '宜宾',
    'abbr': 'YBP'
  },
  {
    'city': '宜昌',
    'abbr': 'YIH'
  },
  {
    'city': '伊春',
    'abbr': 'LDS'
  },
  {
    'city': '宜春',
    'abbr': 'YIC'
  },
  {
    'city': '银川',
    'abbr': 'INC'
  },
  {
    'city': '营口',
    'abbr': 'YKH'
  },
  {
    'city': '伊宁',
    'abbr': 'YIN'
  },
  {
    'city': '义乌',
    'abbr': 'YIW'
  },
  {
    'city': '永州',
    'abbr': 'LLF'
  },
  {
    'city': '岳阳',
    'abbr': 'YYA'
  },
  {
    'city': '榆林',
    'abbr': 'UYN'
  },
  {
    'city': '运城',
    'abbr': 'YCU'
  },
  {
    'city': '玉树',
    'abbr': 'YUS'
  },
  {
    'city': '扎兰屯',
    'abbr': 'NZL'
  },
  {
    'city': '张家界',
    'abbr': 'DYG'
  },
  {
    'city': '张家口',
    'abbr': 'ZQZ'
  },
  {
    'city': '张掖',
    'abbr': 'YZY'
  },
  {
    'city': '湛江',
    'abbr': 'ZHA'
  },
  {
    'city': '昭通',
    'abbr': 'ZAT'
  },
  {
    'city': '郑州',
    'abbr': 'CGO'
  },
  {
    'city': '中卫',
    'abbr': 'ZHY'
  },
  {
    'city': '舟山',
    'abbr': 'HSN'
  },
  {
    'city': '珠海',
    'abbr': 'ZUH'
  },
  {
    'city': '遵义',
    'abbr': 'ZYI'
  }
];

const trains = [{
    "station": "江油北",
    "province": "四川",
    "city": "绵阳"
  },
  {
    "station": "宁强南",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "青川",
    "province": "四川",
    "city": "广元"
  },
  {
    "station": "洋县西",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "八方山",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "长沙西",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "谷山",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "观沙岭",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "尖山",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "开福寺",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "麓谷",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "常平南",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "东城南",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "道滘",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "大朗镇",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "寮步",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "松山湖北",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "西平西",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "常山",
    "province": "浙江",
    "city": "衢州"
  },
  {
    "station": "都昌",
    "province": "江西",
    "city": "九江"
  },
  {
    "station": "德兴东",
    "province": "江西",
    "city": "上饶"
  },
  {
    "station": "藁城南",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "衡水北",
    "province": "河北",
    "city": "衡水"
  },
  {
    "station": "景德镇北",
    "province": "江西",
    "city": "景德镇"
  },
  {
    "station": "景州",
    "province": "河北",
    "city": "衡水"
  },
  {
    "station": "开化",
    "province": "浙江",
    "city": "衢州"
  },
  {
    "station": "鄱阳",
    "province": "江西",
    "city": "上饶"
  },
  {
    "station": "平原东",
    "province": "山东",
    "city": "德州"
  },
  {
    "station": "石家庄东",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "辛集南",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "禹城东",
    "province": "山东",
    "city": "德州"
  },
  {
    "station": "淮北北",
    "province": "安徽",
    "city": "淮北"
  },
  {
    "station": "黄土店",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "通州",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "准格尔",
    "province": "内蒙古",
    "city": "鄂尔多斯"
  },
  {
    "station": "清水县",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "张家川",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "锦界",
    "province": "陕西",
    "city": "榆林"
  },
  {
    "station": "重庆西",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "沙坪坝",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "赶水东",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "珞璜南",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "龙口市",
    "province": "山东",
    "city": "烟台"
  },
  {
    "station": "娄山关南",
    "province": "贵州",
    "city": "遵义"
  },
  {
    "station": "蓬莱市",
    "province": "山东",
    "city": "烟台"
  },
  {
    "station": "綦江东",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "桐梓北",
    "province": "贵州",
    "city": "遵义"
  },
  {
    "station": "桐梓东",
    "province": "贵州",
    "city": "遵义"
  },
  {
    "station": "修文县",
    "province": "贵州",
    "city": "贵阳"
  },
  {
    "station": "烟台西",
    "province": "山东",
    "city": "烟台"
  },
  {
    "station": "遵义南",
    "province": "贵州",
    "city": "遵义"
  },
  {
    "station": "蜀河",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "五通",
    "province": "广西",
    "city": "桂林"
  },
  {
    "station": "朝天南",
    "province": "四川",
    "city": "广元"
  },
  {
    "station": "东胜东",
    "province": "内蒙古",
    "city": "鄂尔多斯"
  },
  {
    "station": "祥云西",
    "province": "云南",
    "city": "大理"
  },
  {
    "station": "神木南",
    "province": "陕西",
    "city": "榆林"
  },
  {
    "station": "杜尔伯特",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "大明湖",
    "province": "山东",
    "city": "济南"
  },
  {
    "station": "白文东",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "蔡家崖",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "娄烦",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "岚县",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "电白",
    "province": "广东",
    "city": "茂名"
  },
  {
    "station": "恩平",
    "province": "广东",
    "city": "江门"
  },
  {
    "station": "开平南",
    "province": "广东",
    "city": "江门"
  },
  {
    "station": "马踏",
    "province": "四川",
    "city": "乐山"
  },
  {
    "station": "双水镇",
    "province": "广东",
    "city": "江门"
  },
  {
    "station": "台山",
    "province": "广东",
    "city": "江门"
  },
  {
    "station": "阳东",
    "province": "广东",
    "city": "阳江"
  },
  {
    "station": "阳江",
    "province": "广东",
    "city": "阳江"
  },
  {
    "station": "阳西",
    "province": "广东",
    "city": "阳江"
  },
  {
    "station": "楚雄",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "南华",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "吴川",
    "province": "广东",
    "city": "湛江"
  },
  {
    "station": "祥云",
    "province": "云南",
    "city": "大理"
  },
  {
    "station": "云南驿",
    "province": "云南",
    "city": "大理"
  },
  {
    "station": "珠琳",
    "province": "云南",
    "city": "文山"
  },
  {
    "station": "三元区",
    "province": "福建",
    "city": "三明"
  },
  {
    "station": "海晏",
    "province": "青海",
    "city": "海北"
  },
  {
    "station": "南 昌",
    "province": "江西",
    "city": "南昌"
  },
  {
    "station": "义县西",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "海安",
    "province": "江苏",
    "city": "南通"
  },
  {
    "station": "香港西九龙",
    "province": "香港",
    "city": "九龙"
  },
  {
    "station": "托克托东",
    "province": "内蒙古",
    "city": "呼和浩特"
  },
  {
    "station": "宾西北",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "宾州",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "达连河",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "得莫利",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "方正",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "高楞",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "宏克力",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "佳木斯西",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "双龙湖",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "胜利镇",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "忻州西",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "依兰",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "原平西",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "阳曲西",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "蓬溪",
    "province": "四川",
    "city": "遂宁"
  },
  {
    "station": "达坂城",
    "province": "新疆",
    "city": "乌鲁木齐"
  },
  {
    "station": "临沂东",
    "province": "山东",
    "city": "临沂"
  },
  {
    "station": "阿城北",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "海林北",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "尚志南",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "新香坊北",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "亚布力西",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "富阳",
    "province": "浙江",
    "city": "杭州"
  },
  {
    "station": "建德",
    "province": "浙江",
    "city": "杭州"
  },
  {
    "station": "千岛湖",
    "province": "浙江",
    "city": "杭州"
  },
  {
    "station": "桐庐",
    "province": "浙江",
    "city": "杭州"
  },
  {
    "station": "朱砂古镇",
    "province": "贵州",
    "city": "铜仁"
  },
  {
    "station": "安江东",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "成都西",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "朝阳湖",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "崇州",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "洞口",
    "province": "湖南",
    "city": "邵阳"
  },
  {
    "station": "大邑",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "隆回",
    "province": "湖南",
    "city": "邵阳"
  },
  {
    "station": "名山",
    "province": "四川",
    "city": "雅安"
  },
  {
    "station": "蒲江",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "邛崃",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "邵阳西",
    "province": "湖南",
    "city": "邵阳"
  },
  {
    "station": "温江",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "西渡",
    "province": "湖南",
    "city": "衡阳"
  },
  {
    "station": "雅安",
    "province": "四川",
    "city": "雅安"
  },
  {
    "station": "羊马",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "滨海港",
    "province": "江苏",
    "city": "盐城"
  },
  {
    "station": "阜宁东",
    "province": "江苏",
    "city": "盐城"
  },
  {
    "station": "赣榆",
    "province": "江苏",
    "city": "连云港"
  },
  {
    "station": "海门",
    "province": "江苏",
    "city": "南通"
  },
  {
    "station": "启东",
    "province": "江苏",
    "city": "南通"
  },
  {
    "station": "射阳",
    "province": "江苏",
    "city": "盐城"
  },
  {
    "station": "响水县",
    "province": "江苏",
    "city": "盐城"
  },
  {
    "station": "盐城北",
    "province": "江苏",
    "city": "盐城"
  },
  {
    "station": "董家口",
    "province": "山东",
    "city": "青岛"
  },
  {
    "station": "高密北",
    "province": "山东",
    "city": "潍坊"
  },
  {
    "station": "济南东",
    "province": "山东",
    "city": "济南"
  },
  {
    "station": "岚山西",
    "province": "山东",
    "city": "日照"
  },
  {
    "station": "临淄北",
    "province": "山东",
    "city": "淄博"
  },
  {
    "station": "青岛西",
    "province": "山东",
    "city": "青岛"
  },
  {
    "station": "齐河",
    "province": "山东",
    "city": "德州"
  },
  {
    "station": "日照西",
    "province": "山东",
    "city": "日照"
  },
  {
    "station": "潍坊北",
    "province": "山东",
    "city": "潍坊"
  },
  {
    "station": "淄博北",
    "province": "山东",
    "city": "淄博"
  },
  {
    "station": "邹平",
    "province": "山东",
    "city": "滨州"
  },
  {
    "station": "章丘北",
    "province": "山东",
    "city": "济南"
  },
  {
    "station": "青州市北",
    "province": "山东",
    "city": "潍坊"
  },
  {
    "station": "北票",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "承德县北",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "承德南",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "曹妃甸东",
    "province": "河北",
    "city": "唐山"
  },
  {
    "station": "曹妃甸港",
    "province": "河北",
    "city": "唐山"
  },
  {
    "station": "朝阳",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "阜新",
    "province": "辽宁",
    "city": "阜新"
  },
  {
    "station": "黑山北",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "喀左",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "牛河梁",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "奈林皋",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "南堡北",
    "province": "河北",
    "city": "唐山"
  },
  {
    "station": "平泉北",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "沈阳西",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "唐海南",
    "province": "河北",
    "city": "唐山"
  },
  {
    "station": "新民北",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "福州 南",
    "province": "福建",
    "city": "福州"
  },
  {
    "station": "三明",
    "province": "福建",
    "city": "三明"
  },
  {
    "station": "厦 门",
    "province": "福建",
    "city": "厦门"
  },
  {
    "station": "永安南",
    "province": "福建",
    "city": "三明"
  },
  {
    "station": "延平西",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "漳平西",
    "province": "福建",
    "city": "龙岩"
  },
  {
    "station": "雁石南",
    "province": "福建",
    "city": "龙岩"
  },
  {
    "station": "清河门北",
    "province": "辽宁",
    "city": "阜新"
  },
  {
    "station": "蓟州",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "横道河子东",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "帽儿山西",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "双洋",
    "province": "福建",
    "city": "龙岩"
  },
  {
    "station": "三阳",
    "province": "安徽",
    "city": "黄山"
  },
  {
    "station": "苇河西",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "乌兰木图",
    "province": "辽宁",
    "city": "阜新"
  },
  {
    "station": "西来",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "一面坡北",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "杨桥",
    "province": "湖南",
    "city": "邵阳"
  },
  {
    "station": "乌苏",
    "province": "新疆",
    "city": "塔城"
  },
  {
    "station": "龙桥",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "无为南",
    "province": "安徽",
    "city": "芜湖"
  },
  {
    "station": "昆玉",
    "province": "新疆",
    "city": "昆玉"
  },
  {
    "station": "步行街",
    "province": "广东",
    "city": "广州"
  },
  {
    "station": "彭州南",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "简阳",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "南博山",
    "province": "山东",
    "city": "淄博"
  },
  {
    "station": "南仇",
    "province": "山东",
    "city": "淄博"
  },
  {
    "station": "黑旺",
    "province": "山东",
    "city": "淄博"
  },
  {
    "station": "桓台",
    "province": "山东",
    "city": "淄博"
  },
  {
    "station": "源迁",
    "province": "山东",
    "city": "淄博"
  },
  {
    "station": "淄博",
    "province": "山东",
    "city": "淄博"
  },
  {
    "station": "自贡",
    "province": "四川",
    "city": "自贡"
  },
  {
    "station": "遵义",
    "province": "贵州",
    "city": "遵义"
  },
  {
    "station": "桐梓",
    "province": "贵州",
    "city": "遵义"
  },
  {
    "station": "顺德",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "容桂",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "北滘",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "顺德学院",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "碧江",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "昌乐",
    "province": "山东",
    "city": "潍坊"
  },
  {
    "station": "两当",
    "province": "甘肃",
    "city": "陇南"
  },
  {
    "station": "息县",
    "province": "河南",
    "city": "信阳"
  },
  {
    "station": "长庆桥",
    "province": "甘肃",
    "city": "庆阳"
  },
  {
    "station": "泾川",
    "province": "甘肃",
    "city": "平凉"
  },
  {
    "station": "开阳",
    "province": "贵州",
    "city": "贵阳"
  },
  {
    "station": "马兰",
    "province": "新疆",
    "city": "巴音郭楞"
  },
  {
    "station": "南江",
    "province": "四川",
    "city": "巴中"
  },
  {
    "station": "贵定北",
    "province": "贵州",
    "city": "黔南"
  },
  {
    "station": "凯里南",
    "province": "贵州",
    "city": "黔东南"
  },
  {
    "station": "三穗",
    "province": "贵州",
    "city": "黔东南"
  },
  {
    "station": "铜仁南",
    "province": "贵州",
    "city": "铜仁"
  },
  {
    "station": "广元南",
    "province": "四川",
    "city": "广元"
  },
  {
    "station": "昭化",
    "province": "四川",
    "city": "广元"
  },
  {
    "station": "武夷山北",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "武夷山东",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "德兴",
    "province": "江西",
    "city": "上饶"
  },
  {
    "station": "五府山",
    "province": "江西",
    "city": "上饶"
  },
  {
    "station": "婺源",
    "province": "江西",
    "city": "上饶"
  },
  {
    "station": "建瓯西",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "古田北",
    "province": "福建",
    "city": "宁德"
  },
  {
    "station": "南平北",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "闽清北",
    "province": "福建",
    "city": "福州"
  },
  {
    "station": "正定",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "黄河景区",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "武陟",
    "province": "河南",
    "city": "焦作"
  },
  {
    "station": "修武西",
    "province": "河南",
    "city": "焦作"
  },
  {
    "station": "南阳寨",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "泾县",
    "province": "安徽",
    "city": "宣城"
  },
  {
    "station": "无为",
    "province": "安徽",
    "city": "芜湖"
  },
  {
    "station": "长临河",
    "province": "安徽",
    "city": "合肥"
  },
  {
    "station": "歙县北",
    "province": "安徽",
    "city": "黄山"
  },
  {
    "station": "铜陵北",
    "province": "安徽",
    "city": "铜陵"
  },
  {
    "station": "合肥西",
    "province": "安徽",
    "city": "合肥"
  },
  {
    "station": "南陵",
    "province": "安徽",
    "city": "芜湖"
  },
  {
    "station": "黄山北",
    "province": "安徽",
    "city": "黄山"
  },
  {
    "station": "巢湖东",
    "province": "安徽",
    "city": "合肥"
  },
  {
    "station": "旌德",
    "province": "安徽",
    "city": "宣城"
  },
  {
    "station": "绩溪北",
    "province": "安徽",
    "city": "宣城"
  },
  {
    "station": "平度",
    "province": "山东",
    "city": "青岛"
  },
  {
    "station": "普定",
    "province": "贵州",
    "city": "安顺"
  },
  {
    "station": "鄂尔多斯",
    "province": "内蒙古",
    "city": "鄂尔多斯"
  },
  {
    "station": "杭锦后旗",
    "province": "内蒙古",
    "city": "巴彦淖尔"
  },
  {
    "station": "哈尔滨北",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "蔡山",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "齐齐哈尔南",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "坪上",
    "province": "山东",
    "city": "临沂"
  },
  {
    "station": "大禾塘",
    "province": "湖南",
    "city": "邵阳"
  },
  {
    "station": "五龙背东",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "凤城东",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "通远堡西",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "本溪新城",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "沈阳南",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "南芬北",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "龙洞堡",
    "province": "贵州",
    "city": "贵阳"
  },
  {
    "station": "图们北",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "蛟河西",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "延吉西",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "珲春",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "威虎岭北",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "安图西",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "大石头南",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "滨海",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "陵城",
    "province": "山东",
    "city": "德州"
  },
  {
    "station": "阳信",
    "province": "山东",
    "city": "滨州"
  },
  {
    "station": "商河",
    "province": "山东",
    "city": "济南"
  },
  {
    "station": "临邑",
    "province": "山东",
    "city": "德州"
  },
  {
    "station": "东营南",
    "province": "山东",
    "city": "东营"
  },
  {
    "station": "滨州",
    "province": "山东",
    "city": "滨州"
  },
  {
    "station": "利津南",
    "province": "山东",
    "city": "东营"
  },
  {
    "station": "西固",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "福利区",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "兰州新区",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "中川机场",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "青龙",
    "province": "河北",
    "city": "秦皇岛"
  },
  {
    "station": "汾河",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "广宁寺南",
    "province": "大连",
    "city": "大连"
  },
  {
    "station": "皮口南",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "当涂东",
    "province": "安徽",
    "city": "马鞍山"
  },
  {
    "station": "繁昌西",
    "province": "安徽",
    "city": "芜湖"
  },
  {
    "station": "江宁西",
    "province": "江苏",
    "city": "南京"
  },
  {
    "station": "马鞍山东",
    "province": "安徽",
    "city": "马鞍山"
  },
  {
    "station": "弋江",
    "province": "安徽",
    "city": "芜湖"
  },
  {
    "station": "白音华南",
    "province": "内蒙古",
    "city": "锡林郭勒"
  },
  {
    "station": "西乌旗",
    "province": "内蒙古",
    "city": "锡林郭勒"
  },
  {
    "station": "抚松",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "靖宇",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "隆安东",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "南宁西",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "三道湖",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "田东北",
    "province": "广西",
    "city": "百色"
  },
  {
    "station": "郑州西",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "北井子",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "城子坦",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "丹东西",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "东港北",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "大孤山",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "花园口",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "青堆",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "庄河北",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "璧山",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "大足南",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "简阳南",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "隆昌北",
    "province": "四川",
    "city": "内江"
  },
  {
    "station": "内江北",
    "province": "四川",
    "city": "内江"
  },
  {
    "station": "荣昌北",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "永川东",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "资阳北",
    "province": "四川",
    "city": "资阳"
  },
  {
    "station": "资中北",
    "province": "四川",
    "city": "内江"
  },
  {
    "station": "缙云西",
    "province": "浙江",
    "city": "丽水"
  },
  {
    "station": "武义北",
    "province": "浙江",
    "city": "金华"
  },
  {
    "station": "永康南",
    "province": "浙江",
    "city": "金华"
  },
  {
    "station": "苍溪",
    "province": "四川",
    "city": "广元"
  },
  {
    "station": "阆中",
    "province": "四川",
    "city": "南充"
  },
  {
    "station": "南部",
    "province": "四川",
    "city": "南充"
  },
  {
    "station": "南充北",
    "province": "四川",
    "city": "南充"
  },
  {
    "station": "武胜",
    "province": "四川",
    "city": "广安"
  },
  {
    "station": "会昌北",
    "province": "江西",
    "city": "赣州"
  },
  {
    "station": "长汀南",
    "province": "福建",
    "city": "龙岩"
  },
  {
    "station": "古田会址",
    "province": "福建",
    "city": "龙岩"
  },
  {
    "station": "桂林西",
    "province": "广西",
    "city": "桂林"
  },
  {
    "station": "白沟",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "白洋淀",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "霸州西",
    "province": "河北",
    "city": "廊坊"
  },
  {
    "station": "孟庄",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "南曹",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "胜芳",
    "province": "河北",
    "city": "廊坊"
  },
  {
    "station": "新郑机场",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "白马井",
    "province": "海南",
    "city": "儋州"
  },
  {
    "station": "凤凰机场",
    "province": "海南",
    "city": "三亚"
  },
  {
    "station": "福山镇",
    "province": "海南",
    "city": "海口"
  },
  {
    "station": "福田",
    "province": "广东",
    "city": "深圳"
  },
  {
    "station": "尖峰",
    "province": "海南",
    "city": "乐东"
  },
  {
    "station": "老城镇",
    "province": "海南",
    "city": "澄迈"
  },
  {
    "station": "乐东",
    "province": "海南",
    "city": "澄迈"
  },
  {
    "station": "临高南",
    "province": "海南",
    "city": "临高"
  },
  {
    "station": "棋子湾",
    "province": "海南",
    "city": "屯昌"
  },
  {
    "station": "银滩",
    "province": "广西",
    "city": "北海"
  },
  {
    "station": "崖州",
    "province": "海南",
    "city": "三亚"
  },
  {
    "station": "双峰北",
    "province": "湖南",
    "city": "娄底"
  },
  {
    "station": "白水县",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "澄城",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "合阳北",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "日照",
    "province": "山东",
    "city": "日照"
  },
  {
    "station": "巴中东",
    "province": "四川",
    "city": "巴中"
  },
  {
    "station": "纳雍",
    "province": "贵州",
    "city": "毕节"
  },
  {
    "station": "平昌",
    "province": "四川",
    "city": "巴中"
  },
  {
    "station": "石桥",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "石梯",
    "province": "四川",
    "city": "达州"
  },
  {
    "station": "织金北",
    "province": "贵州",
    "city": "毕节"
  },
  {
    "station": "曾口",
    "province": "四川",
    "city": "巴中"
  },
  {
    "station": "百宜",
    "province": "贵州",
    "city": "贵阳"
  },
  {
    "station": "洛湾三江",
    "province": "贵州",
    "city": "贵阳"
  },
  {
    "station": "德保",
    "province": "广西",
    "city": "百色"
  },
  {
    "station": "靖西",
    "province": "广西",
    "city": "百色"
  },
  {
    "station": "阳朔",
    "province": "广西",
    "city": "桂林"
  },
  {
    "station": "黄陵南",
    "province": "陕西",
    "city": "延安"
  },
  {
    "station": "海  口东",
    "province": "海南",
    "city": "海口"
  },
  {
    "station": "三  亚",
    "province": "海南",
    "city": "三亚"
  },
  {
    "station": "邵东",
    "province": "湖南",
    "city": "邵阳"
  },
  {
    "station": "皮口",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "广宁寺",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "福安",
    "province": "福建",
    "city": "宁德"
  },
  {
    "station": "古田",
    "province": "福建",
    "city": "宁德"
  },
  {
    "station": "花棚子",
    "province": "四川",
    "city": "攀枝花"
  },
  {
    "station": "拉鲊",
    "province": "四川",
    "city": "攀枝花"
  },
  {
    "station": "米易",
    "province": "四川",
    "city": "攀枝花"
  },
  {
    "station": "攀枝花",
    "province": "四川",
    "city": "攀枝花"
  },
  {
    "station": "迤资",
    "province": "四川",
    "city": "攀枝花"
  },
  {
    "station": "桐子林",
    "province": "四川",
    "city": "攀枝花"
  },
  {
    "station": "新江",
    "province": "四川",
    "city": "攀枝花"
  },
  {
    "station": "盘锦",
    "province": "辽宁",
    "city": "盘锦"
  },
  {
    "station": "盘锦北",
    "province": "辽宁",
    "city": "盘锦"
  },
  {
    "station": "鲁山",
    "province": "河南",
    "city": "平顶山"
  },
  {
    "station": "平顶山西",
    "province": "河南",
    "city": "平顶山"
  },
  {
    "station": "平顶山",
    "province": "河南",
    "city": "平顶山"
  },
  {
    "station": "汝州",
    "province": "河南",
    "city": "平顶山"
  },
  {
    "station": "运粮河",
    "province": "河南",
    "city": "开封"
  },
  {
    "station": "平凉南",
    "province": "甘肃",
    "city": "平凉"
  },
  {
    "station": "平凉",
    "province": "甘肃",
    "city": "平凉"
  },
  {
    "station": "安口窑",
    "province": "甘肃",
    "city": "平凉"
  },
  {
    "station": "庙庄",
    "province": "甘肃",
    "city": "平凉"
  },
  {
    "station": "新李",
    "province": "甘肃",
    "city": "平凉"
  },
  {
    "station": "石嘴山",
    "province": "宁夏",
    "city": "石嘴山"
  },
  {
    "station": "萍乡",
    "province": "江西",
    "city": "萍乡"
  },
  {
    "station": "萍乡北",
    "province": "江西",
    "city": "萍乡"
  },
  {
    "station": "芦溪",
    "province": "江西",
    "city": "萍乡"
  },
  {
    "station": "仙游",
    "province": "福建",
    "city": "莆田"
  },
  {
    "station": "涵江",
    "province": "福建",
    "city": "莆田"
  },
  {
    "station": "莆田",
    "province": "福建",
    "city": "莆田"
  },
  {
    "station": "台前",
    "province": "河南",
    "city": "濮阳"
  },
  {
    "station": "杏树",
    "province": "黑龙江",
    "city": "七台河"
  },
  {
    "station": "倭肯",
    "province": "黑龙江",
    "city": "七台河"
  },
  {
    "station": "七台河",
    "province": "黑龙江",
    "city": "七台河"
  },
  {
    "station": "勃利",
    "province": "黑龙江",
    "city": "七台河"
  },
  {
    "station": "二龙",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "冯屯",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "富海",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "昂昂溪",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "富裕",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "二道湾",
    "province": "新疆",
    "city": "乌鲁木齐"
  },
  {
    "station": "大兴",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "团结",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "汤池",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "塔哈",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "依安",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "中和",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "榆树屯",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "克山",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "平洋",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "江桥",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "克东",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "老莱",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "六合镇",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "龙江",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "拉哈",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "碾子山",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "富拉尔基",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "泰来",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "齐齐哈尔",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "三间房",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "讷河",
    "province": "黑龙江",
    "city": "齐齐哈尔"
  },
  {
    "station": "凯里",
    "province": "贵州",
    "city": "黔东南"
  },
  {
    "station": "镇远",
    "province": "贵州",
    "city": "黔东南"
  },
  {
    "station": "施秉",
    "province": "贵州",
    "city": "黔东南"
  },
  {
    "station": "榕江",
    "province": "贵州",
    "city": "黔东南"
  },
  {
    "station": "从江",
    "province": "贵州",
    "city": "黔东南"
  },
  {
    "station": "三都县",
    "province": "贵州",
    "city": "黔南"
  },
  {
    "station": "贵定县",
    "province": "贵州",
    "city": "黔南"
  },
  {
    "station": "龙里",
    "province": "贵州",
    "city": "黔南"
  },
  {
    "station": "龙里北",
    "province": "贵州",
    "city": "黔南"
  },
  {
    "station": "独山",
    "province": "贵州",
    "city": "黔南"
  },
  {
    "station": "福泉",
    "province": "贵州",
    "city": "黔南"
  },
  {
    "station": "贵定",
    "province": "贵州",
    "city": "黔南"
  },
  {
    "station": "贵定南",
    "province": "贵州",
    "city": "黔南"
  },
  {
    "station": "麻尾",
    "province": "贵州",
    "city": "黔南"
  },
  {
    "station": "都匀",
    "province": "贵州",
    "city": "黔南"
  },
  {
    "station": "都匀东",
    "province": "贵州",
    "city": "黔南"
  },
  {
    "station": "册亨",
    "province": "贵州",
    "city": "黔西南"
  },
  {
    "station": "安龙",
    "province": "贵州",
    "city": "黔西南"
  },
  {
    "station": "革居",
    "province": "云南",
    "city": "大理"
  },
  {
    "station": "威舍",
    "province": "贵州",
    "city": "黔西南"
  },
  {
    "station": "兴义",
    "province": "贵州",
    "city": "黔西南"
  },
  {
    "station": "大拟",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "小董",
    "province": "广西",
    "city": "钦州"
  },
  {
    "station": "马皇",
    "province": "广西",
    "city": "钦州"
  },
  {
    "station": "康熙岭",
    "province": "广西",
    "city": "钦州"
  },
  {
    "station": "钦州",
    "province": "广西",
    "city": "钦州"
  },
  {
    "station": "钦州东",
    "province": "广西",
    "city": "钦州"
  },
  {
    "station": "卢龙",
    "province": "河北",
    "city": "秦皇岛"
  },
  {
    "station": "秦皇岛",
    "province": "河北",
    "city": "秦皇岛"
  },
  {
    "station": "山海关",
    "province": "河北",
    "city": "秦皇岛"
  },
  {
    "station": "昌黎",
    "province": "河北",
    "city": "秦皇岛"
  },
  {
    "station": "北戴河",
    "province": "河北",
    "city": "秦皇岛"
  },
  {
    "station": "抚宁",
    "province": "河北",
    "city": "秦皇岛"
  },
  {
    "station": "城阳",
    "province": "山东",
    "city": "青岛"
  },
  {
    "station": "青岛",
    "province": "山东",
    "city": "青岛"
  },
  {
    "station": "青岛北",
    "province": "山东",
    "city": "青岛"
  },
  {
    "station": "胶州",
    "province": "山东",
    "city": "青岛"
  },
  {
    "station": "胶州北",
    "province": "山东",
    "city": "青岛"
  },
  {
    "station": "蓝村",
    "province": "山东",
    "city": "青岛"
  },
  {
    "station": "莱西",
    "province": "山东",
    "city": "青岛"
  },
  {
    "station": "莱西北",
    "province": "山东",
    "city": "青岛"
  },
  {
    "station": "即墨北",
    "province": "山东",
    "city": "青岛"
  },
  {
    "station": "源潭",
    "province": "广东",
    "city": "清远"
  },
  {
    "station": "清远",
    "province": "广东",
    "city": "清远"
  },
  {
    "station": "英德西",
    "province": "广东",
    "city": "清远"
  },
  {
    "station": "英德",
    "province": "广东",
    "city": "清远"
  },
  {
    "station": "琼海",
    "province": "海南",
    "city": "琼海"
  },
  {
    "station": "博鳌",
    "province": "海南",
    "city": "琼海"
  },
  {
    "station": "车转湾",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "大田边",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "白水镇",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "白沙坡",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "富源",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "岔江",
    "province": "贵州",
    "city": "黔西南"
  },
  {
    "station": "长坡岭",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "芦沟",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "江所田",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "平河口",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "陆良",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "罗平",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "马龙",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "曲靖",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "宣威",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "中寨",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "羊尾哨",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "羊者窝",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "照福铺",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "秧草地",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "新安",
    "province": "河南",
    "city": "洛阳"
  },
  {
    "station": "师宗",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "小得江",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "吴官田",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "衢州",
    "province": "浙江",
    "city": "衢州"
  },
  {
    "station": "江山",
    "province": "浙江",
    "city": "衢州"
  },
  {
    "station": "龙游",
    "province": "浙江",
    "city": "衢州"
  },
  {
    "station": "晋江",
    "province": "福建",
    "city": "泉州"
  },
  {
    "station": "泉州东",
    "province": "福建",
    "city": "泉州"
  },
  {
    "station": "泉州",
    "province": "福建",
    "city": "泉州"
  },
  {
    "station": "安溪",
    "province": "福建",
    "city": "泉州"
  },
  {
    "station": "惠安",
    "province": "福建",
    "city": "泉州"
  },
  {
    "station": "热水",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "仁布",
    "province": "西藏",
    "city": "日喀则"
  },
  {
    "station": "丹霞山",
    "province": "广东",
    "city": "韶关"
  },
  {
    "station": "日喀则",
    "province": "西藏",
    "city": "日喀则"
  },
  {
    "station": "三门峡西",
    "province": "河南",
    "city": "三门峡"
  },
  {
    "station": "三门峡南",
    "province": "河南",
    "city": "三门峡"
  },
  {
    "station": "三门峡",
    "province": "河南",
    "city": "三门峡"
  },
  {
    "station": "灵宝",
    "province": "河南",
    "city": "三门峡"
  },
  {
    "station": "灵宝西",
    "province": "河南",
    "city": "三门峡"
  },
  {
    "station": "渑池南",
    "province": "河南",
    "city": "三门峡"
  },
  {
    "station": "渑池",
    "province": "河南",
    "city": "三门峡"
  },
  {
    "station": "义马",
    "province": "河南",
    "city": "三门峡"
  },
  {
    "station": "尤溪",
    "province": "福建",
    "city": "三明"
  },
  {
    "station": "将乐",
    "province": "福建",
    "city": "三明"
  },
  {
    "station": "建宁县北",
    "province": "福建",
    "city": "三明"
  },
  {
    "station": "泰宁",
    "province": "福建",
    "city": "三明"
  },
  {
    "station": "沙县",
    "province": "福建",
    "city": "三明"
  },
  {
    "station": "永安",
    "province": "福建",
    "city": "三明"
  },
  {
    "station": "三亚",
    "province": "海南",
    "city": "三亚"
  },
  {
    "station": "亚龙湾",
    "province": "海南",
    "city": "三亚"
  },
  {
    "station": "潮阳",
    "province": "广东",
    "city": "汕头"
  },
  {
    "station": "汕头",
    "province": "广东",
    "city": "汕头"
  },
  {
    "station": "鲘门",
    "province": "广东",
    "city": "汕尾"
  },
  {
    "station": "陆丰",
    "province": "广东",
    "city": "汕尾"
  },
  {
    "station": "汕尾",
    "province": "广东",
    "city": "汕尾"
  },
  {
    "station": "吐哈",
    "province": "新疆",
    "city": "吐鲁番"
  },
  {
    "station": "鄯善北",
    "province": "新疆",
    "city": "吐鲁番"
  },
  {
    "station": "鄯善",
    "province": "新疆",
    "city": "吐鲁番"
  },
  {
    "station": "柞水",
    "province": "陕西",
    "city": "商洛"
  },
  {
    "station": "镇安",
    "province": "陕西",
    "city": "商洛"
  },
  {
    "station": "商南",
    "province": "陕西",
    "city": "商洛"
  },
  {
    "station": "商洛",
    "province": "陕西",
    "city": "商洛"
  },
  {
    "station": "小河镇",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "砚川",
    "province": "陕西",
    "city": "商洛"
  },
  {
    "station": "丹凤",
    "province": "陕西",
    "city": "商洛"
  },
  {
    "station": "商丘",
    "province": "河南",
    "city": "商丘"
  },
  {
    "station": "商丘南",
    "province": "河南",
    "city": "商丘"
  },
  {
    "station": "宁陵县",
    "province": "河南",
    "city": "商丘"
  },
  {
    "station": "民权",
    "province": "河南",
    "city": "商丘"
  },
  {
    "station": "夏邑县",
    "province": "河南",
    "city": "商丘"
  },
  {
    "station": "虞城县",
    "province": "河南",
    "city": "商丘"
  },
  {
    "station": "松江",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "松江南",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "芦潮港",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "上海西",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "上海虹桥",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "上海南",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "上海",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "金山北",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "南翔北",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "万年",
    "province": "江西",
    "city": "上饶"
  },
  {
    "station": "上饶",
    "province": "江西",
    "city": "上饶"
  },
  {
    "station": "横峰",
    "province": "江西",
    "city": "上饶"
  },
  {
    "station": "弋阳",
    "province": "江西",
    "city": "上饶"
  },
  {
    "station": "玉山南",
    "province": "江西",
    "city": "上饶"
  },
  {
    "station": "玉山",
    "province": "江西",
    "city": "上饶"
  },
  {
    "station": "上虞",
    "province": "浙江",
    "city": "绍兴"
  },
  {
    "station": "樟木头东",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "仲恺",
    "province": "广东",
    "city": "惠州"
  },
  {
    "station": "云山",
    "province": "江西",
    "city": "九江"
  },
  {
    "station": "银瓶",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "云东海",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "小金口",
    "province": "广东",
    "city": "惠州"
  },
  {
    "station": "西湖东",
    "province": "广东",
    "city": "惠州"
  },
  {
    "station": "狮山",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "四会",
    "province": "广东",
    "city": "肇庆"
  },
  {
    "station": "三水北",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "沥林北",
    "province": "广东",
    "city": "惠州"
  },
  {
    "station": "宁东南",
    "province": "宁夏",
    "city": "银川"
  },
  {
    "station": "宁东",
    "province": "宁夏",
    "city": "银川"
  },
  {
    "station": "龙丰",
    "province": "广东",
    "city": "惠州"
  },
  {
    "station": "惠环",
    "province": "广东",
    "city": "惠州"
  },
  {
    "station": "黄流",
    "province": "海南",
    "city": "澄迈"
  },
  {
    "station": "大旺",
    "province": "广东",
    "city": "肇庆"
  },
  {
    "station": "鼎湖山",
    "province": "广东",
    "city": "肇庆"
  },
  {
    "station": "端州",
    "province": "广东",
    "city": "肇庆"
  },
  {
    "station": "博白",
    "province": "广西",
    "city": "玉林"
  },
  {
    "station": "常平东",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "鼎湖东",
    "province": "广东",
    "city": "肇庆"
  },
  {
    "station": "虢镇",
    "province": "陕西",
    "city": "宝鸡"
  },
  {
    "station": "濮阳",
    "province": "河南",
    "city": "濮阳"
  },
  {
    "station": "兰陵北",
    "province": "山东",
    "city": "临沂"
  },
  {
    "station": "沙桥",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "光山",
    "province": "河南",
    "city": "信阳"
  },
  {
    "station": "曲江",
    "province": "陕西",
    "city": "西安"
  },
  {
    "station": "狮山北",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "枣庄东",
    "province": "山东",
    "city": "枣庄"
  },
  {
    "station": "茶卡",
    "province": "青海",
    "city": "海西"
  },
  {
    "station": "黄瓜园",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "玉舍",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "乌鲁木齐",
    "province": "新疆",
    "city": "乌鲁木齐"
  },
  {
    "station": "临城",
    "province": "河北",
    "city": "邢台"
  },
  {
    "station": "阿尔山北",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "伊敏",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "宋城路",
    "province": "河南",
    "city": "开封"
  },
  {
    "station": "安顺西",
    "province": "贵州",
    "city": "安顺"
  },
  {
    "station": "长寿湖",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "垫江",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "砀山南",
    "province": "安徽",
    "city": "宿州"
  },
  {
    "station": "贵安",
    "province": "福建",
    "city": "福州"
  },
  {
    "station": "关岭",
    "province": "贵州",
    "city": "安顺"
  },
  {
    "station": "开封北",
    "province": "河南",
    "city": "开封"
  },
  {
    "station": "兰考南",
    "province": "河南",
    "city": "开封"
  },
  {
    "station": "梁平南",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "民权北",
    "province": "河南",
    "city": "商丘"
  },
  {
    "station": "普安县",
    "province": "贵州",
    "city": "黔西南"
  },
  {
    "station": "平坝南",
    "province": "贵州",
    "city": "安顺"
  },
  {
    "station": "盘州",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "同江",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "万州北",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "萧县北",
    "province": "安徽",
    "city": "宿州"
  },
  {
    "station": "永城北",
    "province": "河南",
    "city": "商丘"
  },
  {
    "station": "茂名西",
    "province": "广东",
    "city": "茂名"
  },
  {
    "station": "八步",
    "province": "广西",
    "city": "贺州"
  },
  {
    "station": "大方南",
    "province": "贵州",
    "city": "毕节"
  },
  {
    "station": "法启",
    "province": "贵州",
    "city": "毕节"
  },
  {
    "station": "金月湾",
    "province": "海南",
    "city": "东方"
  },
  {
    "station": "平湖",
    "province": "广东",
    "city": "深圳"
  },
  {
    "station": "潮汕",
    "province": "广东",
    "city": "潮州"
  },
  {
    "station": "双吉",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "阿巴嘎旗",
    "province": "内蒙古",
    "city": "锡林郭勒"
  },
  {
    "station": "苏尼特左旗",
    "province": "内蒙古",
    "city": "锡林郭勒"
  },
  {
    "station": "包头 东",
    "province": "内蒙古",
    "city": "包头"
  },
  {
    "station": "后湖",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "槐荫",
    "province": "湖北",
    "city": "孝感"
  },
  {
    "station": "金银潭",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "毛陈",
    "province": "湖北",
    "city": "孝感"
  },
  {
    "station": "闵集",
    "province": "湖北",
    "city": "孝感"
  },
  {
    "station": "盘龙城",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "天河机场",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "天河街",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "孝感东",
    "province": "湖北",
    "city": "孝感"
  },
  {
    "station": "阜新南",
    "province": "辽宁",
    "city": "阜新"
  },
  {
    "station": "玉溪西",
    "province": "云南",
    "city": "玉溪"
  },
  {
    "station": "绍兴东",
    "province": "浙江",
    "city": "绍兴"
  },
  {
    "station": "复盛",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "板塘",
    "province": "湖南",
    "city": "湘潭"
  },
  {
    "station": "大丰",
    "province": "新疆",
    "city": "昌吉"
  },
  {
    "station": "洞井",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "富宁",
    "province": "云南",
    "city": "文山"
  },
  {
    "station": "芙蓉南",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "富源北",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "广南县",
    "province": "云南",
    "city": "文山"
  },
  {
    "station": "哈达铺",
    "province": "甘肃",
    "city": "陇南"
  },
  {
    "station": "荷塘",
    "province": "湖南",
    "city": "湘潭"
  },
  {
    "station": "九郎山",
    "province": "湖南",
    "city": "株洲"
  },
  {
    "station": "昆明南",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "陇南",
    "province": "甘肃",
    "city": "陇南"
  },
  {
    "station": "弥勒",
    "province": "云南",
    "city": "红河"
  },
  {
    "station": "岷县",
    "province": "甘肃",
    "city": "定西"
  },
  {
    "station": "暮云",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "普者黑",
    "province": "云南",
    "city": "文山"
  },
  {
    "station": "曲靖北",
    "province": "云南",
    "city": "曲靖"
  },
  {
    "station": "石林西",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "嵩明",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "树木岭",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "田心东",
    "province": "湖南",
    "city": "株洲"
  },
  {
    "station": "渭源",
    "province": "甘肃",
    "city": "定西"
  },
  {
    "station": "先锋",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "湘府路",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "香樟路",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "姚渡",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "昭山",
    "province": "湖南",
    "city": "湘潭"
  },
  {
    "station": "漳县",
    "province": "甘肃",
    "city": "定西"
  },
  {
    "station": "株洲南",
    "province": "湖南",
    "city": "株洲"
  },
  {
    "station": "柳江",
    "province": "广西",
    "city": "柳州"
  },
  {
    "station": "蓟州北",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "江门东",
    "province": "广东",
    "city": "江门"
  },
  {
    "station": "乐昌东",
    "province": "广东",
    "city": "韶关"
  },
  {
    "station": "河口北",
    "province": "云南",
    "city": "红河"
  },
  {
    "station": "昆都仑召",
    "province": "内蒙古",
    "city": "包头"
  },
  {
    "station": "阿勒泰",
    "province": "新疆",
    "city": "阿勒泰"
  },
  {
    "station": "霍城",
    "province": "新疆",
    "city": "伊犁"
  },
  {
    "station": "颍上",
    "province": "安徽",
    "city": "阜阳"
  },
  {
    "station": "白沙铺",
    "province": "湖北",
    "city": "黄石"
  },
  {
    "station": "安靖",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "楚雄南",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "遵义西",
    "province": "贵州",
    "city": "遵义"
  },
  {
    "station": "敖汉",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "大连西",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "南华北",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "东岔",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "定西北",
    "province": "甘肃",
    "city": "定西"
  },
  {
    "station": "秦安",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "天水南",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "通渭",
    "province": "甘肃",
    "city": "定西"
  },
  {
    "station": "榆中",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "珠斯花",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "湖州",
    "province": "浙江",
    "city": "湖州"
  },
  {
    "station": "安多",
    "province": "西藏",
    "city": "那曲"
  },
  {
    "station": "旗下营南",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "乌兰察布",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "查干湖",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "佛山西",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "广州西",
    "province": "广东",
    "city": "广州"
  },
  {
    "station": "枫林",
    "province": "湖北",
    "city": "黄石"
  },
  {
    "station": "高花",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "建安",
    "province": "吉林",
    "city": "辽源"
  },
  {
    "station": "近海",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "盘山",
    "province": "辽宁",
    "city": "盘锦"
  },
  {
    "station": "瑞昌西",
    "province": "江西",
    "city": "九江"
  },
  {
    "station": "双阳",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "台安南",
    "province": "辽宁",
    "city": "鞍山"
  },
  {
    "station": "伊通",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "贵阳东",
    "province": "贵州",
    "city": "贵阳"
  },
  {
    "station": "张家口南",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "太和北",
    "province": "安徽",
    "city": "阜阳"
  },
  {
    "station": "朝阳南",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "城固北",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "朝天",
    "province": "四川",
    "city": "广元"
  },
  {
    "station": "阿房宫",
    "province": "陕西",
    "city": "西安"
  },
  {
    "station": "佛坪",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "鄠邑",
    "province": "陕西",
    "city": "西安"
  },
  {
    "station": "剑门关",
    "province": "四川",
    "city": "广元"
  },
  {
    "station": "呼和浩特东",
    "province": "内蒙古",
    "city": "呼和浩特"
  },
  {
    "station": "察素齐",
    "province": "内蒙古",
    "city": "呼和浩特"
  },
  {
    "station": "根河",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "甘河",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "扎兰屯",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "阿龙山",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "得耳布尔",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "哈拉苏",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "嵯岗",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "大雁",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "伊图里河",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "大其拉哈",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "成吉思汗",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "扎赉诺尔西",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "喀喇其",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "吉文",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "金河",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "库都尔",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "南木",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "克一河",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "红彦",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "小扬气",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "图里河",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "新绰源",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "新帐房",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "乌尔旗汗",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "索图罕",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "乌奴耳",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "海拉尔",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "免渡河",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "加格达奇",
    "province": "黑龙江",
    "city": "大兴安岭"
  },
  {
    "station": "满归",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "博克图",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "阿里河",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "莫尔道嘎",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "牙克石",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "满洲里",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "大杨树",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "塔尔气",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "德清西",
    "province": "浙江",
    "city": "湖州"
  },
  {
    "station": "德清",
    "province": "浙江",
    "city": "湖州"
  },
  {
    "station": "长兴南",
    "province": "浙江",
    "city": "湖州"
  },
  {
    "station": "长兴",
    "province": "浙江",
    "city": "湖州"
  },
  {
    "station": "东辛庄",
    "province": "辽宁",
    "city": "葫芦岛"
  },
  {
    "station": "高桥镇",
    "province": "辽宁",
    "city": "葫芦岛"
  },
  {
    "station": "前卫",
    "province": "辽宁",
    "city": "葫芦岛"
  },
  {
    "station": "建昌",
    "province": "辽宁",
    "city": "葫芦岛"
  },
  {
    "station": "南桥",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "柳树屯",
    "province": "辽宁",
    "city": "葫芦岛"
  },
  {
    "station": "葫芦岛北",
    "province": "辽宁",
    "city": "葫芦岛"
  },
  {
    "station": "葫芦岛",
    "province": "辽宁",
    "city": "葫芦岛"
  },
  {
    "station": "兴城",
    "province": "辽宁",
    "city": "葫芦岛"
  },
  {
    "station": "沙后所",
    "province": "辽宁",
    "city": "葫芦岛"
  },
  {
    "station": "桦南",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "塘豹",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "怀化",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "怀化南",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "会同",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "麻阳",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "靖州",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "新晃西",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "新晃",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "芷江",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "牙屯堡",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "低庄",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "辰溪",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "溆浦南",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "溆浦",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "通道",
    "province": "湖南",
    "city": "怀化"
  },
  {
    "station": "怀仁",
    "province": "山西",
    "city": "朔州"
  },
  {
    "station": "怀仁东",
    "province": "山西",
    "city": "朔州"
  },
  {
    "station": "泗阳",
    "province": "江苏",
    "city": "宿迁"
  },
  {
    "station": "淮安",
    "province": "江苏",
    "city": "淮安"
  },
  {
    "station": "淮安南",
    "province": "江苏",
    "city": "淮安"
  },
  {
    "station": "青龙山",
    "province": "安徽",
    "city": "淮北"
  },
  {
    "station": "淮北",
    "province": "安徽",
    "city": "淮北"
  },
  {
    "station": "淮南",
    "province": "安徽",
    "city": "淮南"
  },
  {
    "station": "淮南东",
    "province": "安徽",
    "city": "淮南"
  },
  {
    "station": "黄冈",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "黄冈东",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "黄冈西",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "黄州",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "蕲春",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "麻城",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "麻城北",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "武穴",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "浠水",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "红安",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "红安西",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "黄梅",
    "province": "湖北",
    "city": "黄冈"
  },
  {
    "station": "祁门",
    "province": "安徽",
    "city": "黄山"
  },
  {
    "station": "歙县",
    "province": "安徽",
    "city": "黄山"
  },
  {
    "station": "黄山",
    "province": "安徽",
    "city": "黄山"
  },
  {
    "station": "黄石",
    "province": "湖北",
    "city": "黄石"
  },
  {
    "station": "黄石东",
    "province": "湖北",
    "city": "黄石"
  },
  {
    "station": "大冶北",
    "province": "湖北",
    "city": "黄石"
  },
  {
    "station": "黄石北",
    "province": "湖北",
    "city": "黄石"
  },
  {
    "station": "花湖",
    "province": "湖北",
    "city": "鄂州"
  },
  {
    "station": "阳新",
    "province": "湖北",
    "city": "黄石"
  },
  {
    "station": "惠州",
    "province": "广东",
    "city": "惠州"
  },
  {
    "station": "惠州西",
    "province": "广东",
    "city": "惠州"
  },
  {
    "station": "惠东",
    "province": "广东",
    "city": "惠州"
  },
  {
    "station": "惠州南",
    "province": "广东",
    "city": "惠州"
  },
  {
    "station": "密山",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "鸡西",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "东方红",
    "province": "湖南",
    "city": "郴州"
  },
  {
    "station": "西麻山",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "迎春",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "杨岗",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "卫星",
    "province": "广东",
    "city": "广州"
  },
  {
    "station": "石磷",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "兴凯",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "滴道",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "虎林",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "东海",
    "province": "江苏",
    "city": "连云港"
  },
  {
    "station": "黑台",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "麻山",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "裴德",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "梨树镇",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "鸡东",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "峡江",
    "province": "江西",
    "city": "吉安"
  },
  {
    "station": "吉安",
    "province": "江西",
    "city": "吉安"
  },
  {
    "station": "新干",
    "province": "江西",
    "city": "吉安"
  },
  {
    "station": "泰和",
    "province": "江西",
    "city": "吉安"
  },
  {
    "station": "井冈山",
    "province": "江西",
    "city": "吉安"
  },
  {
    "station": "吉林",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "舒兰",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "天岗",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "双河镇",
    "province": "四川",
    "city": "绵阳"
  },
  {
    "station": "烟筒山",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "黄松甸",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "明城",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "磐石",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "吉舒",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "平安",
    "province": "青海",
    "city": "海东"
  },
  {
    "station": "口前",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "白石山",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "章丘",
    "province": "山东",
    "city": "济南"
  },
  {
    "station": "济南",
    "province": "山东",
    "city": "济南"
  },
  {
    "station": "济南西",
    "province": "山东",
    "city": "济南"
  },
  {
    "station": "郓城",
    "province": "山东",
    "city": "菏泽"
  },
  {
    "station": "泗水",
    "province": "山东",
    "city": "济宁"
  },
  {
    "station": "济宁",
    "province": "山东",
    "city": "济宁"
  },
  {
    "station": "兖州",
    "province": "山东",
    "city": "济宁"
  },
  {
    "station": "邹城",
    "province": "山东",
    "city": "济宁"
  },
  {
    "station": "嘉祥",
    "province": "山东",
    "city": "济宁"
  },
  {
    "station": "梁山",
    "province": "山东",
    "city": "济宁"
  },
  {
    "station": "曲阜",
    "province": "山东",
    "city": "济宁"
  },
  {
    "station": "曲阜东",
    "province": "山东",
    "city": "济宁"
  },
  {
    "station": "济源",
    "province": "河南",
    "city": "济源"
  },
  {
    "station": "莲江口",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "换新天",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "建三江",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "孟家岗",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "佳木斯",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "前进镇",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "富锦",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "鹤立",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "汤原",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "永安乡",
    "province": "黑龙江",
    "city": "鸡西"
  },
  {
    "station": "香兰",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "前锋",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "洪河",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "抚远",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "寒葱沟",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "嘉兴南",
    "province": "浙江",
    "city": "嘉兴"
  },
  {
    "station": "嘉兴",
    "province": "浙江",
    "city": "嘉兴"
  },
  {
    "station": "嘉善南",
    "province": "浙江",
    "city": "嘉兴"
  },
  {
    "station": "嘉善",
    "province": "浙江",
    "city": "嘉兴"
  },
  {
    "station": "桐乡",
    "province": "浙江",
    "city": "嘉兴"
  },
  {
    "station": "嘉峪关",
    "province": "甘肃",
    "city": "嘉峪关"
  },
  {
    "station": "嘉峪关南",
    "province": "甘肃",
    "city": "嘉峪关"
  },
  {
    "station": "绿化",
    "province": "甘肃",
    "city": "嘉峪关"
  },
  {
    "station": "桥西",
    "province": "甘肃",
    "city": "嘉峪关"
  },
  {
    "station": "建水",
    "province": "云南",
    "city": "红河"
  },
  {
    "station": "新会",
    "province": "广东",
    "city": "江门"
  },
  {
    "station": "交城",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "沁阳",
    "province": "河南",
    "city": "焦作"
  },
  {
    "station": "焦作",
    "province": "河南",
    "city": "焦作"
  },
  {
    "station": "焦作东",
    "province": "河南",
    "city": "焦作"
  },
  {
    "station": "月山",
    "province": "河南",
    "city": "焦作"
  },
  {
    "station": "罗城",
    "province": "广西",
    "city": "河池"
  },
  {
    "station": "修武",
    "province": "河南",
    "city": "焦作"
  },
  {
    "station": "蛟河",
    "province": "吉林",
    "city": "吉林"
  },
  {
    "station": "葵潭",
    "province": "广东",
    "city": "揭阳"
  },
  {
    "station": "普宁",
    "province": "广东",
    "city": "揭阳"
  },
  {
    "station": "揭阳",
    "province": "广东",
    "city": "揭阳"
  },
  {
    "station": "界首市",
    "province": "安徽",
    "city": "阜阳"
  },
  {
    "station": "玉石",
    "province": "甘肃",
    "city": "金昌"
  },
  {
    "station": "芨岭",
    "province": "甘肃",
    "city": "金昌"
  },
  {
    "station": "金昌",
    "province": "甘肃",
    "city": "金昌"
  },
  {
    "station": "永康",
    "province": "浙江",
    "city": "金华"
  },
  {
    "station": "义乌",
    "province": "浙江",
    "city": "金华"
  },
  {
    "station": "金华南",
    "province": "浙江",
    "city": "金华"
  },
  {
    "station": "金华",
    "province": "浙江",
    "city": "金华"
  },
  {
    "station": "兰溪",
    "province": "浙江",
    "city": "金华"
  },
  {
    "station": "武义",
    "province": "浙江",
    "city": "金华"
  },
  {
    "station": "新立屯",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "绕阳河",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "石山",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "小东",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "沟帮子",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "义县",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "高山子",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "八角台",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "大红旗",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "七里河",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "泥河子",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "锦州",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "锦州南",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "凌海",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "周家屯",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "大虎山",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "嘉峰",
    "province": "山西",
    "city": "晋城"
  },
  {
    "station": "晋城",
    "province": "山西",
    "city": "晋城"
  },
  {
    "station": "晋城北",
    "province": "山西",
    "city": "晋城"
  },
  {
    "station": "阳城",
    "province": "山西",
    "city": "晋城"
  },
  {
    "station": "高平",
    "province": "山西",
    "city": "晋城"
  },
  {
    "station": "西阳村",
    "province": "山西",
    "city": "晋城"
  },
  {
    "station": "灵石",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "灵石东",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "张兰",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "祁县东",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "介休",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "介休东",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "晋中",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "榆社",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "寿阳",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "太谷西",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "太谷",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "榆次",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "祁县",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "平遥",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "平遥古城",
    "province": "山西",
    "city": "晋中"
  },
  {
    "station": "京山",
    "province": "湖北",
    "city": "荆门"
  },
  {
    "station": "荆门",
    "province": "湖北",
    "city": "荆门"
  },
  {
    "station": "钟祥",
    "province": "湖北",
    "city": "荆门"
  },
  {
    "station": "荆州",
    "province": "湖北",
    "city": "荆州"
  },
  {
    "station": "松滋",
    "province": "湖北",
    "city": "荆州"
  },
  {
    "station": "乐平市",
    "province": "江西",
    "city": "景德镇"
  },
  {
    "station": "景德镇",
    "province": "江西",
    "city": "景德镇"
  },
  {
    "station": "九江",
    "province": "江西",
    "city": "九江"
  },
  {
    "station": "瑞昌",
    "province": "江西",
    "city": "九江"
  },
  {
    "station": "庐山",
    "province": "江西",
    "city": "九江"
  },
  {
    "station": "彭泽",
    "province": "江西",
    "city": "九江"
  },
  {
    "station": "永修",
    "province": "江西",
    "city": "九江"
  },
  {
    "station": "湖口",
    "province": "江西",
    "city": "九江"
  },
  {
    "station": "德安",
    "province": "江西",
    "city": "九江"
  },
  {
    "station": "共青城",
    "province": "江西",
    "city": "九江"
  },
  {
    "station": "九台",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "九台南",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "玉门",
    "province": "甘肃",
    "city": "酒泉"
  },
  {
    "station": "清水北",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "清水",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "疏勒河",
    "province": "甘肃",
    "city": "酒泉"
  },
  {
    "station": "柳园",
    "province": "甘肃",
    "city": "酒泉"
  },
  {
    "station": "柳园南",
    "province": "甘肃",
    "city": "酒泉"
  },
  {
    "station": "敦煌",
    "province": "甘肃",
    "city": "酒泉"
  },
  {
    "station": "瓜州",
    "province": "甘肃",
    "city": "酒泉"
  },
  {
    "station": "酒泉",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "酒泉南",
    "province": "甘肃",
    "city": "酒泉"
  },
  {
    "station": "低窝铺",
    "province": "甘肃",
    "city": "酒泉"
  },
  {
    "station": "句容西",
    "province": "江苏",
    "city": "镇江"
  },
  {
    "station": "巨野",
    "province": "山东",
    "city": "菏泽"
  },
  {
    "station": "泽普",
    "province": "新疆",
    "city": "喀什"
  },
  {
    "station": "叶城",
    "province": "新疆",
    "city": "喀什"
  },
  {
    "station": "疏勒",
    "province": "新疆",
    "city": "喀什"
  },
  {
    "station": "莎车",
    "province": "新疆",
    "city": "喀什"
  },
  {
    "station": "英吉沙",
    "province": "新疆",
    "city": "喀什"
  },
  {
    "station": "阿克陶",
    "province": "新疆",
    "city": "克孜勒苏柯尔克孜"
  },
  {
    "station": "喀什",
    "province": "新疆",
    "city": "喀什"
  },
  {
    "station": "开封",
    "province": "河南",
    "city": "开封"
  },
  {
    "station": "兰考",
    "province": "河南",
    "city": "开封"
  },
  {
    "station": "开原",
    "province": "辽宁",
    "city": "铁岭"
  },
  {
    "station": "开原西",
    "province": "辽宁",
    "city": "铁岭"
  },
  {
    "station": "克拉玛依",
    "province": "新疆",
    "city": "克拉玛依"
  },
  {
    "station": "五五",
    "province": "新疆",
    "city": "克拉玛依"
  },
  {
    "station": "阿图什",
    "province": "新疆",
    "city": "克孜勒苏柯尔克孜"
  },
  {
    "station": "库车",
    "province": "新疆",
    "city": "阿克苏"
  },
  {
    "station": "库伦",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "杨林",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "大苴",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "宜耐",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "宜良北",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "羊堡",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "七甸",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "茂舍祖",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "金马村",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "乐善村",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "王家营西",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "昆明西",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "昆明",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "读书铺",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "碧鸡关",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "班猫箐",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "广南卫",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "永丰营",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "石林南",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "石林",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "西街口",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "施家嘴",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "小哨",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "小新街",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "昆山",
    "province": "江苏",
    "city": "苏州"
  },
  {
    "station": "阳澄湖",
    "province": "江苏",
    "city": "苏州"
  },
  {
    "station": "昆山南",
    "province": "江苏",
    "city": "苏州"
  },
  {
    "station": "花桥",
    "province": "江苏",
    "city": "苏州"
  },
  {
    "station": "拉萨",
    "province": "西藏",
    "city": "拉萨"
  },
  {
    "station": "来宾北",
    "province": "广西",
    "city": "来宾"
  },
  {
    "station": "来宾",
    "province": "广西",
    "city": "来宾"
  },
  {
    "station": "蔺家楼",
    "province": "山东",
    "city": "莱芜"
  },
  {
    "station": "莱芜东",
    "province": "山东",
    "city": "莱芜"
  },
  {
    "station": "莱芜西",
    "province": "山东",
    "city": "莱芜"
  },
  {
    "station": "司家岭",
    "province": "山东",
    "city": "莱芜"
  },
  {
    "station": "常庄",
    "province": "山东",
    "city": "莱芜"
  },
  {
    "station": "丰水村",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "甘草店",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "河口南",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "皋兰",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "陈官营",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "骆驼巷",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "海石湾",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "龙泉寺",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "坡底下",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "兰州东",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "兰州西",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "兰州",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "朱家窑",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "邵家堂",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "西固城",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "许家台",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "永登",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "桑园子",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "夏官营",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "水源",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "三河县",
    "province": "河北",
    "city": "廊坊"
  },
  {
    "station": "文安",
    "province": "河北",
    "city": "廊坊"
  },
  {
    "station": "燕郊",
    "province": "河北",
    "city": "廊坊"
  },
  {
    "station": "固安",
    "province": "河北",
    "city": "廊坊"
  },
  {
    "station": "豆张庄",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "白壁关",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "落垡",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "廊坊北",
    "province": "河北",
    "city": "廊坊"
  },
  {
    "station": "廊坊",
    "province": "河北",
    "city": "廊坊"
  },
  {
    "station": "柏果",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "峨眉",
    "province": "四川",
    "city": "乐山"
  },
  {
    "station": "峨边",
    "province": "四川",
    "city": "乐山"
  },
  {
    "station": "燕岗",
    "province": "四川",
    "city": "乐山"
  },
  {
    "station": "乐山",
    "province": "四川",
    "city": "乐山"
  },
  {
    "station": "乐山北",
    "province": "四川",
    "city": "乐山"
  },
  {
    "station": "丽江",
    "province": "云南",
    "city": "丽江"
  },
  {
    "station": "丽水",
    "province": "浙江",
    "city": "丽水"
  },
  {
    "station": "青田",
    "province": "浙江",
    "city": "丽水"
  },
  {
    "station": "缙云",
    "province": "浙江",
    "city": "丽水"
  },
  {
    "station": "利川",
    "province": "湖北",
    "city": "恩施"
  },
  {
    "station": "溧阳",
    "province": "江苏",
    "city": "常州"
  },
  {
    "station": "连云港",
    "province": "江苏",
    "city": "连云港"
  },
  {
    "station": "连云港东",
    "province": "江苏",
    "city": "连云港"
  },
  {
    "station": "东海县",
    "province": "江苏",
    "city": "连云港"
  },
  {
    "station": "普雄",
    "province": "四川",
    "city": "凉山"
  },
  {
    "station": "冕宁",
    "province": "四川",
    "city": "凉山"
  },
  {
    "station": "漫水湾",
    "province": "四川",
    "city": "凉山"
  },
  {
    "station": "越西",
    "province": "四川",
    "city": "凉山"
  },
  {
    "station": "永郎",
    "province": "四川",
    "city": "凉山"
  },
  {
    "station": "喜德",
    "province": "四川",
    "city": "凉山"
  },
  {
    "station": "甘洛",
    "province": "四川",
    "city": "凉山"
  },
  {
    "station": "德昌",
    "province": "四川",
    "city": "凉山"
  },
  {
    "station": "灯塔",
    "province": "辽宁",
    "city": "辽阳"
  },
  {
    "station": "寒岭",
    "province": "辽宁",
    "city": "辽阳"
  },
  {
    "station": "辽阳",
    "province": "辽宁",
    "city": "辽阳"
  },
  {
    "station": "首山",
    "province": "辽宁",
    "city": "辽阳"
  },
  {
    "station": "渭津",
    "province": "吉林",
    "city": "辽源"
  },
  {
    "station": "白泉",
    "province": "吉林",
    "city": "辽源"
  },
  {
    "station": "东丰",
    "province": "吉林",
    "city": "辽源"
  },
  {
    "station": "辽源",
    "province": "吉林",
    "city": "辽源"
  },
  {
    "station": "平岗",
    "province": "吉林",
    "city": "辽源"
  },
  {
    "station": "临清",
    "province": "山东",
    "city": "聊城"
  },
  {
    "station": "聊城",
    "province": "山东",
    "city": "聊城"
  },
  {
    "station": "阳谷",
    "province": "山东",
    "city": "聊城"
  },
  {
    "station": "襄汾",
    "province": "山西",
    "city": "临汾"
  },
  {
    "station": "襄汾西",
    "province": "山西",
    "city": "临汾"
  },
  {
    "station": "霍州",
    "province": "山西",
    "city": "临汾"
  },
  {
    "station": "霍州东",
    "province": "山西",
    "city": "临汾"
  },
  {
    "station": "赵城",
    "province": "山西",
    "city": "临汾"
  },
  {
    "station": "洪洞",
    "province": "山西",
    "city": "临汾"
  },
  {
    "station": "洪洞西",
    "province": "山西",
    "city": "临汾"
  },
  {
    "station": "临汾",
    "province": "山西",
    "city": "临汾"
  },
  {
    "station": "临汾西",
    "province": "山西",
    "city": "临汾"
  },
  {
    "station": "费县",
    "province": "山东",
    "city": "临沂"
  },
  {
    "station": "始兴",
    "province": "广东",
    "city": "韶关"
  },
  {
    "station": "乐昌",
    "province": "广东",
    "city": "韶关"
  },
  {
    "station": "韶关",
    "province": "广东",
    "city": "韶关"
  },
  {
    "station": "韶关东",
    "province": "广东",
    "city": "韶关"
  },
  {
    "station": "坪石",
    "province": "广东",
    "city": "韶关"
  },
  {
    "station": "韶山",
    "province": "湖南",
    "city": "湘潭"
  },
  {
    "station": "韶山南",
    "province": "湖南",
    "city": "湘潭"
  },
  {
    "station": "邵阳北",
    "province": "湖南",
    "city": "邵阳"
  },
  {
    "station": "邵阳",
    "province": "湖南",
    "city": "邵阳"
  },
  {
    "station": "双牌",
    "province": "湖南",
    "city": "永州"
  },
  {
    "station": "绍兴",
    "province": "浙江",
    "city": "绍兴"
  },
  {
    "station": "绍兴北",
    "province": "浙江",
    "city": "绍兴"
  },
  {
    "station": "诸暨",
    "province": "浙江",
    "city": "绍兴"
  },
  {
    "station": "民乐",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "光明城",
    "province": "广东",
    "city": "深圳"
  },
  {
    "station": "坂田",
    "province": "广东",
    "city": "深圳"
  },
  {
    "station": "深圳",
    "province": "广东",
    "city": "深圳"
  },
  {
    "station": "深圳东",
    "province": "广东",
    "city": "深圳"
  },
  {
    "station": "深圳坪山",
    "province": "广东",
    "city": "深圳"
  },
  {
    "station": "深圳北",
    "province": "广东",
    "city": "深圳"
  },
  {
    "station": "深圳西",
    "province": "广东",
    "city": "深圳"
  },
  {
    "station": "沈丘",
    "province": "河南",
    "city": "周口"
  },
  {
    "station": "姚千户屯",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "榆树台",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "马三家",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "皇姑屯",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "沈阳",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "沈阳东",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "沈阳北",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "陈相屯",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "苏家屯",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "吴家屯",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "辽中",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "大成",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "兴隆店",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "新城子",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "深井子",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "世博园",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "新民",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "林盛堡",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "虎石台",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "李石寨",
    "province": "辽宁",
    "city": "抚顺"
  },
  {
    "station": "大官屯",
    "province": "辽宁",
    "city": "抚顺"
  },
  {
    "station": "孤家子",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "浑河",
    "province": "辽宁",
    "city": "沈阳"
  },
  {
    "station": "武当山",
    "province": "湖北",
    "city": "十堰"
  },
  {
    "station": "十堰",
    "province": "湖北",
    "city": "十堰"
  },
  {
    "station": "石河子",
    "province": "新疆",
    "city": "石河子"
  },
  {
    "station": "辛集",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "新乐",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "石家庄",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "石家庄北",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "高邑",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "高邑西",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "元氏",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "正定机场",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "藁城",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "井陉",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "井南",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "晋州",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "南峪",
    "province": "河北",
    "city": "石家庄"
  },
  {
    "station": "榆树沟",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "汝箕沟",
    "province": "宁夏",
    "city": "石嘴山"
  },
  {
    "station": "大磴沟",
    "province": "宁夏",
    "city": "石嘴山"
  },
  {
    "station": "大武口",
    "province": "宁夏",
    "city": "石嘴山"
  },
  {
    "station": "惠农",
    "province": "宁夏",
    "city": "石嘴山"
  },
  {
    "station": "白芨沟",
    "province": "宁夏",
    "city": "石嘴山"
  },
  {
    "station": "双城北",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "新友谊",
    "province": "黑龙江",
    "city": "双鸭山"
  },
  {
    "station": "太平镇",
    "province": "黑龙江",
    "city": "双鸭山"
  },
  {
    "station": "福利屯",
    "province": "黑龙江",
    "city": "双鸭山"
  },
  {
    "station": "丰乐镇",
    "province": "黑龙江",
    "city": "双鸭山"
  },
  {
    "station": "宝清",
    "province": "黑龙江",
    "city": "双鸭山"
  },
  {
    "station": "红兴隆",
    "province": "黑龙江",
    "city": "双鸭山"
  },
  {
    "station": "双鸭山",
    "province": "黑龙江",
    "city": "双鸭山"
  },
  {
    "station": "神头",
    "province": "山西",
    "city": "朔州"
  },
  {
    "station": "朔州",
    "province": "山西",
    "city": "朔州"
  },
  {
    "station": "山阴",
    "province": "山西",
    "city": "朔州"
  },
  {
    "station": "应县",
    "province": "山西",
    "city": "朔州"
  },
  {
    "station": "岱岳",
    "province": "山西",
    "city": "朔州"
  },
  {
    "station": "茂林",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "双辽",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "石岭",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "四平",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "四平东",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "陶家屯",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "郭家店",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "范家屯",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "长山屯",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "工农湖",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "蔡家沟",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "官字井",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "太平川",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "通途",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "王府",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "庆丰",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "乾安",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "巨宝",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "松原",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "松原北",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "三井子",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "陶赖昭",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "苏州",
    "province": "江苏",
    "city": "苏州"
  },
  {
    "station": "苏州北",
    "province": "江苏",
    "city": "苏州"
  },
  {
    "station": "苏州新区",
    "province": "江苏",
    "city": "苏州"
  },
  {
    "station": "苏州园区",
    "province": "江苏",
    "city": "苏州"
  },
  {
    "station": "沭阳",
    "province": "江苏",
    "city": "宿迁"
  },
  {
    "station": "洋河",
    "province": "江苏",
    "city": "宿迁"
  },
  {
    "station": "泗洪",
    "province": "江苏",
    "city": "宿迁"
  },
  {
    "station": "泗县",
    "province": "安徽",
    "city": "宿州"
  },
  {
    "station": "灵璧",
    "province": "安徽",
    "city": "宿州"
  },
  {
    "station": "砀山",
    "province": "安徽",
    "city": "宿州"
  },
  {
    "station": "黄口",
    "province": "安徽",
    "city": "宿州"
  },
  {
    "station": "宿州",
    "province": "安徽",
    "city": "宿州"
  },
  {
    "station": "宿州东",
    "province": "安徽",
    "city": "宿州"
  },
  {
    "station": "尚家",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "羊草",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "绥棱",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "兴隆镇",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "宋",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "四方台",
    "province": "辽宁",
    "city": "鞍山"
  },
  {
    "station": "安达",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "东津",
    "province": "湖北",
    "city": "襄阳"
  },
  {
    "station": "东边井",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "姜家",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "庆安",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "秦家",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "里木店",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "张维屯",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "海伦",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "绥化",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "绥中",
    "province": "辽宁",
    "city": "葫芦岛"
  },
  {
    "station": "绥中北",
    "province": "辽宁",
    "city": "葫芦岛"
  },
  {
    "station": "东戴河",
    "province": "辽宁",
    "city": "葫芦岛"
  },
  {
    "station": "随州",
    "province": "湖北",
    "city": "随州"
  },
  {
    "station": "遂宁",
    "province": "四川",
    "city": "遂宁"
  },
  {
    "station": "大英东",
    "province": "四川",
    "city": "遂宁"
  },
  {
    "station": "奎屯",
    "province": "新疆",
    "city": "伊犁"
  },
  {
    "station": "塔石嘴",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "台安",
    "province": "辽宁",
    "city": "鞍山"
  },
  {
    "station": "昆阳",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "台州",
    "province": "浙江",
    "city": "台州"
  },
  {
    "station": "温岭",
    "province": "浙江",
    "city": "台州"
  },
  {
    "station": "三门县",
    "province": "浙江",
    "city": "台州"
  },
  {
    "station": "阳曲",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "清徐",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "高村",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "镇城底",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "古东",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "北营",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "古交",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "太原",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "太原东",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "太原南",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "太原北",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "泰安",
    "province": "山东",
    "city": "泰安"
  },
  {
    "station": "泰山",
    "province": "山东",
    "city": "泰安"
  },
  {
    "station": "上高镇",
    "province": "山东",
    "city": "泰安"
  },
  {
    "station": "燕家庄",
    "province": "山东",
    "city": "泰安"
  },
  {
    "station": "范镇",
    "province": "山东",
    "city": "泰安"
  },
  {
    "station": "磁窑",
    "province": "山东",
    "city": "泰安"
  },
  {
    "station": "泰州",
    "province": "江苏",
    "city": "泰州"
  },
  {
    "station": "姜堰",
    "province": "江苏",
    "city": "泰州"
  },
  {
    "station": "滦县",
    "province": "河北",
    "city": "唐山"
  },
  {
    "station": "迁安",
    "province": "河北",
    "city": "唐山"
  },
  {
    "station": "唐山北",
    "province": "河北",
    "city": "唐山"
  },
  {
    "station": "唐山",
    "province": "河北",
    "city": "唐山"
  },
  {
    "station": "玉田县",
    "province": "河北",
    "city": "唐山"
  },
  {
    "station": "滦河",
    "province": "河北",
    "city": "唐山"
  },
  {
    "station": "滨海西",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "军粮城北",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "滨海北",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "崔黄口",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "大口屯",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "曹子里",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "汉沽",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "宝坻",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "芦台",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "静海",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "塘沽",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "天津",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "天津南",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "天津北",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "天津西",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "杨柳青",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "杨村",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "武清",
    "province": "天津",
    "city": "天津"
  },
  {
    "station": "天门",
    "province": "湖北",
    "city": "天门"
  },
  {
    "station": "天门南",
    "province": "湖北",
    "city": "天门"
  },
  {
    "station": "三阳川",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "武山",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "新阳镇",
    "province": "福建",
    "city": "三明"
  },
  {
    "station": "渭南镇",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "南河川",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "阿克苏",
    "province": "新疆",
    "city": "阿克苏"
  },
  {
    "station": "新和",
    "province": "新疆",
    "city": "阿克苏"
  },
  {
    "station": "呼鲁斯太",
    "province": "内蒙古",
    "city": "阿拉善"
  },
  {
    "station": "额济纳",
    "province": "内蒙古",
    "city": "阿拉善"
  },
  {
    "station": "庆阳山",
    "province": "内蒙古",
    "city": "阿拉善"
  },
  {
    "station": "和什托洛盖",
    "province": "新疆",
    "city": "塔城"
  },
  {
    "station": "福海",
    "province": "新疆",
    "city": "阿勒泰"
  },
  {
    "station": "北屯市",
    "province": "新疆",
    "city": "北屯"
  },
  {
    "station": "安康",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "毛坝关",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "汉阴",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "旬阳北",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "旬阳",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "石泉县",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "紫阳",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "棕溪",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "大竹园",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "高滩",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "安庆西",
    "province": "安徽",
    "city": "安庆"
  },
  {
    "station": "安庆",
    "province": "安徽",
    "city": "安庆"
  },
  {
    "station": "桐城",
    "province": "安徽",
    "city": "安庆"
  },
  {
    "station": "天柱山",
    "province": "安徽",
    "city": "安庆"
  },
  {
    "station": "太湖",
    "province": "安徽",
    "city": "安庆"
  },
  {
    "station": "宿松",
    "province": "安徽",
    "city": "安庆"
  },
  {
    "station": "安仁",
    "province": "湖南",
    "city": "郴州"
  },
  {
    "station": "安顺",
    "province": "贵州",
    "city": "安顺"
  },
  {
    "station": "安亭北",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "安阳",
    "province": "河南",
    "city": "安阳"
  },
  {
    "station": "安阳东",
    "province": "河南",
    "city": "安阳"
  },
  {
    "station": "西柳",
    "province": "辽宁",
    "city": "鞍山"
  },
  {
    "station": "南台",
    "province": "辽宁",
    "city": "鞍山"
  },
  {
    "station": "鞍山",
    "province": "辽宁",
    "city": "鞍山"
  },
  {
    "station": "鞍山西",
    "province": "辽宁",
    "city": "鞍山"
  },
  {
    "station": "巴楚",
    "province": "新疆",
    "city": "喀什"
  },
  {
    "station": "巴林",
    "province": "内蒙古",
    "city": "呼伦贝尔"
  },
  {
    "station": "巴彦高勒",
    "province": "内蒙古",
    "city": "巴彦淖尔"
  },
  {
    "station": "公庙子",
    "province": "内蒙古",
    "city": "巴彦淖尔"
  },
  {
    "station": "临河",
    "province": "内蒙古",
    "city": "巴彦淖尔"
  },
  {
    "station": "乌拉山",
    "province": "内蒙古",
    "city": "巴彦淖尔"
  },
  {
    "station": "乌拉特前旗",
    "province": "内蒙古",
    "city": "巴彦淖尔"
  },
  {
    "station": "西小召",
    "province": "内蒙古",
    "city": "巴彦淖尔"
  },
  {
    "station": "库尔勒",
    "province": "新疆",
    "city": "巴音郭楞"
  },
  {
    "station": "焉耆",
    "province": "新疆",
    "city": "巴音郭楞"
  },
  {
    "station": "和静",
    "province": "新疆",
    "city": "巴音郭楞"
  },
  {
    "station": "轮台",
    "province": "新疆",
    "city": "巴音郭楞"
  },
  {
    "station": "巴中",
    "province": "四川",
    "city": "巴中"
  },
  {
    "station": "鲅鱼圈",
    "province": "辽宁",
    "city": "营口"
  },
  {
    "station": "霸州",
    "province": "河北",
    "city": "廊坊"
  },
  {
    "station": "到保",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "大安",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "大安北",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "安广",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "镇西",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "镇赉",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "洮南",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "白城",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "平台",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "海坨子",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "黑水",
    "province": "四川",
    "city": "阿坝"
  },
  {
    "station": "建设",
    "province": "山西",
    "city": "太原"
  },
  {
    "station": "两家",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "通榆",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "平安镇",
    "province": "吉林",
    "city": "白城"
  },
  {
    "station": "白河",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "白河县",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "白河东",
    "province": "陕西",
    "city": "安康"
  },
  {
    "station": "道清",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "临江",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "白山市",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "松树镇",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "仙人桥",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "松江河",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "湾沟",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "石人",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "咋子",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "江源",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "露水河",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "老营",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "泉阳",
    "province": "吉林",
    "city": "白山"
  },
  {
    "station": "景泰",
    "province": "甘肃",
    "city": "白银"
  },
  {
    "station": "红岘台",
    "province": "甘肃",
    "city": "白银"
  },
  {
    "station": "靖远西",
    "province": "甘肃",
    "city": "白银"
  },
  {
    "station": "红砂岘",
    "province": "甘肃",
    "city": "白银"
  },
  {
    "station": "靖远",
    "province": "甘肃",
    "city": "白银"
  },
  {
    "station": "吴家川",
    "province": "甘肃",
    "city": "白银"
  },
  {
    "station": "兴泉堡",
    "province": "甘肃",
    "city": "白银"
  },
  {
    "station": "长城",
    "province": "甘肃",
    "city": "白银"
  },
  {
    "station": "东湾",
    "province": "甘肃",
    "city": "白银"
  },
  {
    "station": "白银西",
    "province": "甘肃",
    "city": "白银"
  },
  {
    "station": "长征",
    "province": "甘肃",
    "city": "白银"
  },
  {
    "station": "白银市",
    "province": "甘肃",
    "city": "白银"
  },
  {
    "station": "百色",
    "province": "广西",
    "city": "百色"
  },
  {
    "station": "平果",
    "province": "广西",
    "city": "百色"
  },
  {
    "station": "田林",
    "province": "广西",
    "city": "百色"
  },
  {
    "station": "田阳",
    "province": "广西",
    "city": "百色"
  },
  {
    "station": "田东",
    "province": "广西",
    "city": "百色"
  },
  {
    "station": "蚌埠南",
    "province": "安徽",
    "city": "蚌埠"
  },
  {
    "station": "蚌埠",
    "province": "安徽",
    "city": "蚌埠"
  },
  {
    "station": "固镇",
    "province": "安徽",
    "city": "蚌埠"
  },
  {
    "station": "包头东",
    "province": "内蒙古",
    "city": "包头"
  },
  {
    "station": "包头",
    "province": "内蒙古",
    "city": "包头"
  },
  {
    "station": "白云鄂博",
    "province": "内蒙古",
    "city": "包头"
  },
  {
    "station": "萨拉齐",
    "province": "内蒙古",
    "city": "包头"
  },
  {
    "station": "宝鸡",
    "province": "陕西",
    "city": "宝鸡"
  },
  {
    "station": "宝鸡南",
    "province": "陕西",
    "city": "宝鸡"
  },
  {
    "station": "千河",
    "province": "陕西",
    "city": "宝鸡"
  },
  {
    "station": "秦岭",
    "province": "陕西",
    "city": "宝鸡"
  },
  {
    "station": "陇县",
    "province": "陕西",
    "city": "宝鸡"
  },
  {
    "station": "千阳",
    "province": "陕西",
    "city": "宝鸡"
  },
  {
    "station": "凤县",
    "province": "陕西",
    "city": "宝鸡"
  },
  {
    "station": "岐山",
    "province": "陕西",
    "city": "宝鸡"
  },
  {
    "station": "蔡家坡",
    "province": "陕西",
    "city": "宝鸡"
  },
  {
    "station": "凤州",
    "province": "陕西",
    "city": "宝鸡"
  },
  {
    "station": "野三坡",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "保定",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "保定东",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "紫荆关",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "百里峡",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "定州",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "定州东",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "涿州",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "涿州东",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "涞源",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "奇峰塔",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "南城司",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "徐水",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "望都",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "王安镇",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "塔崖驿",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "小西庄",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "白涧",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "艾河",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "浮图峪",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "福山口",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "板城",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "高碑店",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "高碑店东",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "大盘石",
    "province": "河北",
    "city": "保定"
  },
  {
    "station": "北屯",
    "province": "新疆",
    "city": "北屯"
  },
  {
    "station": "合浦",
    "province": "广西",
    "city": "北海"
  },
  {
    "station": "北海",
    "province": "广西",
    "city": "北海"
  },
  {
    "station": "良各庄",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "延庆",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "怀柔",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "怀柔北",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "昌平",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "北京东",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "北京南",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "北京西",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "北京北",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "北京",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "黄村",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "北宅",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "昌平北",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "官高",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "大灰厂",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "燕山",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "八达岭",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "高各庄",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "安定",
    "province": "甘肃",
    "city": "定西"
  },
  {
    "station": "孤山口",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "三家店",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "沙河",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "沿河城",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "魏善庄",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "云居寺",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "斜河涧",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "三合庄",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "雁翅",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "上万",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "统军庄",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "顺义",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "石景山南",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "十渡",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "密云北",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "南口",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "清华园",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "清河",
    "province": "河南",
    "city": "南阳"
  },
  {
    "station": "庙城",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "康庄",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "林海",
    "province": "山东",
    "city": "烟台"
  },
  {
    "station": "平峪",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "落坡岭",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "南观村",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "张辛",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "东二道河",
    "province": "黑龙江",
    "city": "佳木斯"
  },
  {
    "station": "珠窝",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "五女山",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "下马塘",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "石桥子",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "南芬",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "小市",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "田师府",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "北台",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "歪头山",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "本溪",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "磐安镇",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "洛门",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "鸳鸯镇",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "贺家店",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "甘谷",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "天水",
    "province": "甘肃",
    "city": "天水"
  },
  {
    "station": "铁岭",
    "province": "辽宁",
    "city": "铁岭"
  },
  {
    "station": "铁岭西",
    "province": "辽宁",
    "city": "铁岭"
  },
  {
    "station": "西丰",
    "province": "辽宁",
    "city": "铁岭"
  },
  {
    "station": "三江口",
    "province": "辽宁",
    "city": "铁岭"
  },
  {
    "station": "昌图",
    "province": "辽宁",
    "city": "铁岭"
  },
  {
    "station": "昌图西",
    "province": "辽宁",
    "city": "铁岭"
  },
  {
    "station": "八面城",
    "province": "辽宁",
    "city": "铁岭"
  },
  {
    "station": "通海",
    "province": "云南",
    "city": "玉溪"
  },
  {
    "station": "通化县",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "鸭园",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "干沟",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "海龙",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "黄柏",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "朝阳镇",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "果松",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "菇园",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "东通化",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "二密河",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "集安",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "通化",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "梅河口",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "柳河",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "阳岔",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "水洞",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "山城镇",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "五道沟",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "通沟",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "铁厂",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "驼腰岭",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "三源浦",
    "province": "吉林",
    "city": "通化"
  },
  {
    "station": "舍力虎",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "霍林郭勒",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "通辽",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "哲里木",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "余粮堡",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "治安",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "扎鲁特",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "东来",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "八仙筒",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "敖力布告",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "东明村",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "宝龙山",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "白音他拉",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "嘎什甸子",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "黄花筒",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "保康",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "甘旗卡",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "大林",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "金宝屯",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "木里图",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "开鲁",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "奈曼",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "通州西",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "同心",
    "province": "宁夏",
    "city": "吴忠"
  },
  {
    "station": "铜陵",
    "province": "安徽",
    "city": "铜陵"
  },
  {
    "station": "松桃",
    "province": "贵州",
    "city": "铜仁"
  },
  {
    "station": "铜仁",
    "province": "贵州",
    "city": "铜仁"
  },
  {
    "station": "玉屏",
    "province": "贵州",
    "city": "铜仁"
  },
  {
    "station": "潼南",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "曲水县",
    "province": "西藏",
    "city": "拉萨"
  },
  {
    "station": "吐鲁番",
    "province": "新疆",
    "city": "吐鲁番"
  },
  {
    "station": "吐鲁番北",
    "province": "新疆",
    "city": "吐鲁番"
  },
  {
    "station": "万宁",
    "province": "海南",
    "city": "万宁"
  },
  {
    "station": "神州",
    "province": "海南",
    "city": "万宁"
  },
  {
    "station": "威海",
    "province": "山东",
    "city": "威海"
  },
  {
    "station": "威海北",
    "province": "山东",
    "city": "威海"
  },
  {
    "station": "荣成",
    "province": "山东",
    "city": "威海"
  },
  {
    "station": "文登",
    "province": "山东",
    "city": "威海"
  },
  {
    "station": "文登东",
    "province": "山东",
    "city": "威海"
  },
  {
    "station": "乳山",
    "province": "山东",
    "city": "威海"
  },
  {
    "station": "潍坊",
    "province": "山东",
    "city": "潍坊"
  },
  {
    "station": "高密",
    "province": "山东",
    "city": "潍坊"
  },
  {
    "station": "青州市",
    "province": "山东",
    "city": "潍坊"
  },
  {
    "station": "诸城",
    "province": "山东",
    "city": "潍坊"
  },
  {
    "station": "五莲",
    "province": "山东",
    "city": "日照"
  },
  {
    "station": "莒县",
    "province": "山东",
    "city": "日照"
  },
  {
    "station": "钟家村",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "张桥",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "合阳",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "蒲城",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "蒲城东",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "韩城",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "潼关",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "华山",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "华山北",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "孙镇",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "韦庄",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "渭南",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "渭南南",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "渭南北",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "雁荡山",
    "province": "浙江",
    "city": "温州"
  },
  {
    "station": "永嘉",
    "province": "浙江",
    "city": "温州"
  },
  {
    "station": "绅坊",
    "province": "浙江",
    "city": "温州"
  },
  {
    "station": "苍南",
    "province": "浙江",
    "city": "温州"
  },
  {
    "station": "温州南",
    "province": "浙江",
    "city": "温州"
  },
  {
    "station": "温州",
    "province": "浙江",
    "city": "温州"
  },
  {
    "station": "乐清",
    "province": "浙江",
    "city": "温州"
  },
  {
    "station": "瑞安",
    "province": "浙江",
    "city": "温州"
  },
  {
    "station": "鳌江",
    "province": "浙江",
    "city": "温州"
  },
  {
    "station": "文昌",
    "province": "海南",
    "city": "文昌"
  },
  {
    "station": "闻喜",
    "province": "山西",
    "city": "运城"
  },
  {
    "station": "闻喜西",
    "province": "山西",
    "city": "运城"
  },
  {
    "station": "乌海",
    "province": "内蒙古",
    "city": "乌海"
  },
  {
    "station": "乌海西",
    "province": "内蒙古",
    "city": "乌海"
  },
  {
    "station": "集宁南",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "兴和西",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "土贵乌拉",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "商都",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "乌兰哈达",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "土牧尔台",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "宝拉格",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "贲红",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "白音察干",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "化德",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "大陆号",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "丰镇",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "卓资东",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "卓资山",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "旗下营",
    "province": "内蒙古",
    "city": "乌兰察布"
  },
  {
    "station": "乌鲁木齐南",
    "province": "新疆",
    "city": "乌鲁木齐"
  },
  {
    "station": "乌西",
    "province": "新疆",
    "city": "乌鲁木齐"
  },
  {
    "station": "无锡",
    "province": "江苏",
    "city": "无锡"
  },
  {
    "station": "惠山",
    "province": "江苏",
    "city": "无锡"
  },
  {
    "station": "无锡东",
    "province": "江苏",
    "city": "无锡"
  },
  {
    "station": "无锡新区",
    "province": "江苏",
    "city": "无锡"
  },
  {
    "station": "宣和",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "沙坡头",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "岳家井",
    "province": "内蒙古",
    "city": "阿拉善"
  },
  {
    "station": "王团庄",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "石坝",
    "province": "广东",
    "city": "惠州"
  },
  {
    "station": "太阳山",
    "province": "宁夏",
    "city": "吴忠"
  },
  {
    "station": "红寺堡",
    "province": "宁夏",
    "city": "吴忠"
  },
  {
    "station": "青铜峡",
    "province": "宁夏",
    "city": "吴忠"
  },
  {
    "station": "大战场",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "长农",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "大坝",
    "province": "宁夏",
    "city": "吴忠"
  },
  {
    "station": "艾家村",
    "province": "宁夏",
    "city": "吴忠"
  },
  {
    "station": "干塘",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "营盘水",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "芜湖",
    "province": "安徽",
    "city": "芜湖"
  },
  {
    "station": "梧州",
    "province": "广西",
    "city": "梧州"
  },
  {
    "station": "梧州南",
    "province": "广西",
    "city": "梧州"
  },
  {
    "station": "岑溪",
    "province": "广西",
    "city": "梧州"
  },
  {
    "station": "藤县",
    "province": "广西",
    "city": "梧州"
  },
  {
    "station": "纸坊东",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "乌龙泉南",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "左岭",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "山坡东",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "花山南",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "土地堂东",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "汤逊湖",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "南湖东",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "普安",
    "province": "贵州",
    "city": "黔西南"
  },
  {
    "station": "武昌",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "汉口",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "武汉",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "仙桃西",
    "province": "湖北",
    "city": "仙桃"
  },
  {
    "station": "潜江",
    "province": "湖北",
    "city": "潜江"
  },
  {
    "station": "龙沟",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "黄羊镇",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "土门子",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "石峡子",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "谭家井",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "园墩",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "上腰墩",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "天祝",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "武威",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "武威南",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "古浪",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "黑冲滩",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "打柴沟",
    "province": "甘肃",
    "city": "武威"
  },
  {
    "station": "阎良",
    "province": "陕西",
    "city": "西安"
  },
  {
    "station": "西安",
    "province": "陕西",
    "city": "西安"
  },
  {
    "station": "西安南",
    "province": "陕西",
    "city": "西安"
  },
  {
    "station": "西安北",
    "province": "陕西",
    "city": "西安"
  },
  {
    "station": "西昌南",
    "province": "四川",
    "city": "凉山"
  },
  {
    "station": "西昌",
    "province": "四川",
    "city": "凉山"
  },
  {
    "station": "西宁",
    "province": "青海",
    "city": "西宁"
  },
  {
    "station": "大通西",
    "province": "青海",
    "city": "西宁"
  },
  {
    "station": "湟源",
    "province": "青海",
    "city": "西宁"
  },
  {
    "station": "二连",
    "province": "内蒙古",
    "city": "锡林郭勒"
  },
  {
    "station": "锡林浩特",
    "province": "内蒙古",
    "city": "锡林郭勒"
  },
  {
    "station": "桑根达来",
    "province": "内蒙古",
    "city": "锡林郭勒"
  },
  {
    "station": "赛汗塔拉",
    "province": "内蒙古",
    "city": "锡林郭勒"
  },
  {
    "station": "正镶白旗",
    "province": "内蒙古",
    "city": "锡林郭勒"
  },
  {
    "station": "朱日和",
    "province": "内蒙古",
    "city": "锡林郭勒"
  },
  {
    "station": "白旗",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "厦门北",
    "province": "福建",
    "city": "厦门"
  },
  {
    "station": "厦门",
    "province": "福建",
    "city": "厦门"
  },
  {
    "station": "郯城",
    "province": "山东",
    "city": "临沂"
  },
  {
    "station": "临沂",
    "province": "山东",
    "city": "临沂"
  },
  {
    "station": "平邑",
    "province": "山东",
    "city": "临沂"
  },
  {
    "station": "莒南",
    "province": "山东",
    "city": "临沂"
  },
  {
    "station": "沂南",
    "province": "山东",
    "city": "临沂"
  },
  {
    "station": "庙山",
    "province": "湖北",
    "city": "武汉"
  },
  {
    "station": "沂水",
    "province": "山东",
    "city": "临沂"
  },
  {
    "station": "陵水",
    "province": "海南",
    "city": "陵水"
  },
  {
    "station": "鹿寨",
    "province": "广西",
    "city": "柳州"
  },
  {
    "station": "鹿寨北",
    "province": "广西",
    "city": "柳州"
  },
  {
    "station": "融水",
    "province": "广西",
    "city": "柳州"
  },
  {
    "station": "三江县",
    "province": "广西",
    "city": "柳州"
  },
  {
    "station": "融安",
    "province": "广西",
    "city": "柳州"
  },
  {
    "station": "柳州",
    "province": "广西",
    "city": "柳州"
  },
  {
    "station": "三江南",
    "province": "广西",
    "city": "柳州"
  },
  {
    "station": "霍邱",
    "province": "安徽",
    "city": "六安"
  },
  {
    "station": "舒城",
    "province": "安徽",
    "city": "六安"
  },
  {
    "station": "金寨",
    "province": "安徽",
    "city": "六安"
  },
  {
    "station": "六安",
    "province": "安徽",
    "city": "六安"
  },
  {
    "station": "红果",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "六盘水",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "瓦窑田",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "沙沱",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "上西铺",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "威箐",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "小雨谷",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "营街",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "松河",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "三家寨",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "新坪田",
    "province": "贵州",
    "city": "黔西南"
  },
  {
    "station": "月亮田",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "雨格",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "发耳",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "白鸡坡",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "花家庄",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "都格",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "六枝",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "茅草坪",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "葡萄菁",
    "province": "贵州",
    "city": "毕节"
  },
  {
    "station": "平关",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "平田",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "盘关",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "鲁番",
    "province": "贵州",
    "city": "六盘水"
  },
  {
    "station": "麦园",
    "province": "福建",
    "city": "龙岩"
  },
  {
    "station": "三明北",
    "province": "福建",
    "city": "三明"
  },
  {
    "station": "漳平",
    "province": "福建",
    "city": "龙岩"
  },
  {
    "station": "龙岩",
    "province": "福建",
    "city": "龙岩"
  },
  {
    "station": "冠豸山",
    "province": "福建",
    "city": "龙岩"
  },
  {
    "station": "永定",
    "province": "福建",
    "city": "龙岩"
  },
  {
    "station": "上杭",
    "province": "福建",
    "city": "龙岩"
  },
  {
    "station": "长汀",
    "province": "福建",
    "city": "龙岩"
  },
  {
    "station": "宏庆",
    "province": "甘肃",
    "city": "陇南"
  },
  {
    "station": "徽县",
    "province": "甘肃",
    "city": "陇南"
  },
  {
    "station": "涟源",
    "province": "湖南",
    "city": "娄底"
  },
  {
    "station": "安化",
    "province": "湖南",
    "city": "益阳"
  },
  {
    "station": "娄底",
    "province": "湖南",
    "city": "娄底"
  },
  {
    "station": "娄底南",
    "province": "湖南",
    "city": "娄底"
  },
  {
    "station": "冷水江东",
    "province": "湖南",
    "city": "娄底"
  },
  {
    "station": "新化南",
    "province": "湖南",
    "city": "娄底"
  },
  {
    "station": "新化",
    "province": "湖南",
    "city": "娄底"
  },
  {
    "station": "广通北",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "阳泉曲",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "柳林南",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "吕梁",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "兑镇",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "孝西",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "孝南",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "文水",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "新安县",
    "province": "河南",
    "city": "洛阳"
  },
  {
    "station": "汝阳",
    "province": "河南",
    "city": "洛阳"
  },
  {
    "station": "洛阳东",
    "province": "河南",
    "city": "洛阳"
  },
  {
    "station": "洛阳龙门",
    "province": "河南",
    "city": "洛阳"
  },
  {
    "station": "洛阳",
    "province": "河南",
    "city": "洛阳"
  },
  {
    "station": "关林",
    "province": "河南",
    "city": "洛阳"
  },
  {
    "station": "偃师",
    "province": "河南",
    "city": "洛阳"
  },
  {
    "station": "漯河",
    "province": "河南",
    "city": "漯河"
  },
  {
    "station": "临颍",
    "province": "河南",
    "city": "漯河"
  },
  {
    "station": "漯河西",
    "province": "河南",
    "city": "漯河"
  },
  {
    "station": "马鞍山",
    "province": "安徽",
    "city": "马鞍山"
  },
  {
    "station": "化州",
    "province": "广东",
    "city": "茂名"
  },
  {
    "station": "茂名",
    "province": "广东",
    "city": "茂名"
  },
  {
    "station": "高州",
    "province": "广东",
    "city": "茂名"
  },
  {
    "station": "信宜",
    "province": "广东",
    "city": "茂名"
  },
  {
    "station": "眉山",
    "province": "四川",
    "city": "眉山"
  },
  {
    "station": "眉山东",
    "province": "四川",
    "city": "眉山"
  },
  {
    "station": "瓦屋山",
    "province": "江苏",
    "city": "常州"
  },
  {
    "station": "彭山",
    "province": "四川",
    "city": "眉山"
  },
  {
    "station": "彭山北",
    "province": "四川",
    "city": "眉山"
  },
  {
    "station": "青神",
    "province": "四川",
    "city": "眉山"
  },
  {
    "station": "兴宁",
    "province": "广东",
    "city": "梅州"
  },
  {
    "station": "梅州",
    "province": "广东",
    "city": "梅州"
  },
  {
    "station": "大埔",
    "province": "广东",
    "city": "梅州"
  },
  {
    "station": "丰顺",
    "province": "广东",
    "city": "梅州"
  },
  {
    "station": "华城",
    "province": "广东",
    "city": "梅州"
  },
  {
    "station": "蒙自北",
    "province": "云南",
    "city": "红河"
  },
  {
    "station": "青莲",
    "province": "四川",
    "city": "绵阳"
  },
  {
    "station": "江油",
    "province": "四川",
    "city": "绵阳"
  },
  {
    "station": "绵阳",
    "province": "四川",
    "city": "绵阳"
  },
  {
    "station": "东京城",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "绥芬河",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "横道河子",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "牡丹江",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "长汀镇",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "鹿道",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "朱家沟",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "伊林",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "柴河",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "古城镇",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "宝林",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "楚山",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "八面通",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "桦林",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "海林",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "石头",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "温春",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "绥阳",
    "province": "贵州",
    "city": "遵义"
  },
  {
    "station": "向阳",
    "province": "北京",
    "city": "北京"
  },
  {
    "station": "下城子",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "山市",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "拉古",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "宁安",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "马桥河",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "兰岗",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "林口",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "奎山",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "青山",
    "province": "江苏",
    "city": "无锡"
  },
  {
    "station": "穆棱",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "磨刀石",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "马莲河",
    "province": "黑龙江",
    "city": "牡丹江"
  },
  {
    "station": "资中",
    "province": "四川",
    "city": "内江"
  },
  {
    "station": "隆昌",
    "province": "四川",
    "city": "内江"
  },
  {
    "station": "内江",
    "province": "四川",
    "city": "内江"
  },
  {
    "station": "那曲",
    "province": "西藏",
    "city": "那曲"
  },
  {
    "station": "进贤",
    "province": "江西",
    "city": "南昌"
  },
  {
    "station": "进贤南",
    "province": "江西",
    "city": "南昌"
  },
  {
    "station": "向塘",
    "province": "江西",
    "city": "南昌"
  },
  {
    "station": "南昌",
    "province": "江西",
    "city": "南昌"
  },
  {
    "station": "南昌西",
    "province": "江西",
    "city": "南昌"
  },
  {
    "station": "南充",
    "province": "四川",
    "city": "南充"
  },
  {
    "station": "营山",
    "province": "四川",
    "city": "南充"
  },
  {
    "station": "蓬安",
    "province": "四川",
    "city": "南充"
  },
  {
    "station": "六合",
    "province": "江苏",
    "city": "南京"
  },
  {
    "station": "溧水",
    "province": "江苏",
    "city": "南京"
  },
  {
    "station": "江宁",
    "province": "江苏",
    "city": "南京"
  },
  {
    "station": "中华门",
    "province": "江苏",
    "city": "南京"
  },
  {
    "station": "南京",
    "province": "江苏",
    "city": "南京"
  },
  {
    "station": "南京南",
    "province": "江苏",
    "city": "南京"
  },
  {
    "station": "仙林",
    "province": "江苏",
    "city": "南京"
  },
  {
    "station": "吴圩",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "大王滩",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "大元",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "南宁",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "南宁东",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "百浪",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "那铺",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "宁村",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "黎塘",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "宾阳",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "那罗",
    "province": "广西",
    "city": "南宁"
  },
  {
    "station": "邵武",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "南平",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "南平南",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "武夷山",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "光泽",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "顺昌",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "建阳",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "建瓯",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "来舟",
    "province": "福建",
    "city": "南平"
  },
  {
    "station": "如皋",
    "province": "江苏",
    "city": "南通"
  },
  {
    "station": "南通",
    "province": "江苏",
    "city": "南通"
  },
  {
    "station": "栟茶",
    "province": "江苏",
    "city": "南通"
  },
  {
    "station": "如东",
    "province": "江苏",
    "city": "南通"
  },
  {
    "station": "南雄",
    "province": "广东",
    "city": "韶关"
  },
  {
    "station": "镇平",
    "province": "河南",
    "city": "南阳"
  },
  {
    "station": "内乡",
    "province": "河南",
    "city": "南阳"
  },
  {
    "station": "南召",
    "province": "河南",
    "city": "南阳"
  },
  {
    "station": "南阳",
    "province": "河南",
    "city": "南阳"
  },
  {
    "station": "邓州",
    "province": "河南",
    "city": "南阳"
  },
  {
    "station": "唐河",
    "province": "河南",
    "city": "南阳"
  },
  {
    "station": "桐柏",
    "province": "河南",
    "city": "南阳"
  },
  {
    "station": "西峡",
    "province": "河南",
    "city": "南阳"
  },
  {
    "station": "尼木",
    "province": "西藏",
    "city": "拉萨"
  },
  {
    "station": "宁波",
    "province": "浙江",
    "city": "宁波"
  },
  {
    "station": "庄桥",
    "province": "浙江",
    "city": "宁波"
  },
  {
    "station": "宁波东",
    "province": "浙江",
    "city": "宁波"
  },
  {
    "station": "宁海",
    "province": "浙江",
    "city": "宁波"
  },
  {
    "station": "临海",
    "province": "浙江",
    "city": "台州"
  },
  {
    "station": "奉化",
    "province": "浙江",
    "city": "宁波"
  },
  {
    "station": "福鼎",
    "province": "福建",
    "city": "宁德"
  },
  {
    "station": "宁德",
    "province": "福建",
    "city": "宁德"
  },
  {
    "station": "霞浦",
    "province": "福建",
    "city": "宁德"
  },
  {
    "station": "太姥山",
    "province": "福建",
    "city": "宁德"
  },
  {
    "station": "六盘山",
    "province": "宁夏",
    "city": "固原"
  },
  {
    "station": "李旺",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "七营",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "彭阳",
    "province": "宁夏",
    "city": "固原"
  },
  {
    "station": "土桥子",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "三关口",
    "province": "宁夏",
    "city": "固原"
  },
  {
    "station": "三营",
    "province": "宁夏",
    "city": "固原"
  },
  {
    "station": "沈家河",
    "province": "宁夏",
    "city": "固原"
  },
  {
    "station": "广安",
    "province": "四川",
    "city": "广安"
  },
  {
    "station": "广安南",
    "province": "四川",
    "city": "广安"
  },
  {
    "station": "岳池",
    "province": "四川",
    "city": "广安"
  },
  {
    "station": "华蓥",
    "province": "四川",
    "city": "广安"
  },
  {
    "station": "广汉北",
    "province": "四川",
    "city": "德阳"
  },
  {
    "station": "广汉",
    "province": "四川",
    "city": "德阳"
  },
  {
    "station": "竹园坝",
    "province": "四川",
    "city": "广元"
  },
  {
    "station": "旺苍",
    "province": "四川",
    "city": "广元"
  },
  {
    "station": "广元",
    "province": "四川",
    "city": "广元"
  },
  {
    "station": "广州",
    "province": "广东",
    "city": "广州"
  },
  {
    "station": "广州北",
    "province": "广东",
    "city": "广州"
  },
  {
    "station": "广州南",
    "province": "广东",
    "city": "广州"
  },
  {
    "station": "广州东",
    "province": "广东",
    "city": "广州"
  },
  {
    "station": "庆盛",
    "province": "广东",
    "city": "广州"
  },
  {
    "station": "平南南",
    "province": "广西",
    "city": "贵港"
  },
  {
    "station": "贵港",
    "province": "广西",
    "city": "贵港"
  },
  {
    "station": "贵阳北",
    "province": "贵州",
    "city": "贵阳"
  },
  {
    "station": "贵阳",
    "province": "贵州",
    "city": "贵阳"
  },
  {
    "station": "息烽",
    "province": "贵州",
    "city": "贵阳"
  },
  {
    "station": "桂林",
    "province": "广西",
    "city": "桂林"
  },
  {
    "station": "桂林北",
    "province": "广西",
    "city": "桂林"
  },
  {
    "station": "永福南",
    "province": "广西",
    "city": "桂林"
  },
  {
    "station": "全州南",
    "province": "广西",
    "city": "桂林"
  },
  {
    "station": "兴安北",
    "province": "广西",
    "city": "桂林"
  },
  {
    "station": "恭城",
    "province": "广西",
    "city": "桂林"
  },
  {
    "station": "桂平",
    "province": "广西",
    "city": "贵港"
  },
  {
    "station": "周家",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "五常",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "玉泉",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "香坊",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "滨江",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "呼兰",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "哈尔滨东",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "哈尔滨",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "哈尔滨西",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "双城堡",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "亚布力",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "亚布力南",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "一面坡",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "杜家",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "背荫河",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "对青山",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "阿城",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "安家",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "白奎堡",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "成高子",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "小岭",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "尚志",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "万乐",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "徐家",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "王岗",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "五家",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "新松浦",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "苇河",
    "province": "黑龙江",
    "city": "尚志市"
  },
  {
    "station": "石人城",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "王兆屯",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "万发屯",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "山河屯",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "沈家",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "孙家",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "牛家",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "平房",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "兰棱",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "康金井",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "拉林",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "帽儿山",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "平山",
    "province": "黑龙江",
    "city": "哈尔滨"
  },
  {
    "station": "哈密",
    "province": "新疆",
    "city": "哈密"
  },
  {
    "station": "海北",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "门源",
    "province": "青海",
    "city": "海北"
  },
  {
    "station": "海城西",
    "province": "辽宁",
    "city": "鞍山"
  },
  {
    "station": "海城",
    "province": "辽宁",
    "city": "鞍山"
  },
  {
    "station": "民和南",
    "province": "青海",
    "city": "海东"
  },
  {
    "station": "乐都",
    "province": "青海",
    "city": "海东"
  },
  {
    "station": "乐都南",
    "province": "青海",
    "city": "海东"
  },
  {
    "station": "海东西",
    "province": "青海",
    "city": "海东"
  },
  {
    "station": "平安驿",
    "province": "青海",
    "city": "海东"
  },
  {
    "station": "美兰",
    "province": "海南",
    "city": "海口"
  },
  {
    "station": "海口东",
    "province": "海南",
    "city": "海口"
  },
  {
    "station": "海口",
    "province": "海南",
    "city": "海口"
  },
  {
    "station": "海宁",
    "province": "浙江",
    "city": "嘉兴"
  },
  {
    "station": "海宁西",
    "province": "浙江",
    "city": "嘉兴"
  },
  {
    "station": "格尔木",
    "province": "青海",
    "city": "海西"
  },
  {
    "station": "德令哈",
    "province": "青海",
    "city": "海西"
  },
  {
    "station": "磁山",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "磁西",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "东戌",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "磁县",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "豆庄",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "涉县",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "邯郸",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "邯郸东",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "午汲",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "阳邑",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "偏店",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "徘徊北",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "井店",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "康城",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "悬钟",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "什里店",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "武安",
    "province": "河北",
    "city": "邯郸"
  },
  {
    "station": "西乡",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "燕子砭",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "巴山",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "白水江",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "城固",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "汉中",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "阳平关",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "勉县",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "略阳",
    "province": "陕西",
    "city": "汉中"
  },
  {
    "station": "杭州南",
    "province": "浙江",
    "city": "杭州"
  },
  {
    "station": "杭州",
    "province": "浙江",
    "city": "杭州"
  },
  {
    "station": "余杭",
    "province": "浙江",
    "city": "杭州"
  },
  {
    "station": "杭州东",
    "province": "浙江",
    "city": "杭州"
  },
  {
    "station": "涡阳",
    "province": "安徽",
    "city": "亳州"
  },
  {
    "station": "巢湖",
    "province": "安徽",
    "city": "合肥"
  },
  {
    "station": "水家湖",
    "province": "安徽",
    "city": "合肥"
  },
  {
    "station": "庐江",
    "province": "安徽",
    "city": "合肥"
  },
  {
    "station": "肥东",
    "province": "安徽",
    "city": "合肥"
  },
  {
    "station": "合肥",
    "province": "安徽",
    "city": "合肥"
  },
  {
    "station": "合肥南",
    "province": "安徽",
    "city": "合肥"
  },
  {
    "station": "合肥北城",
    "province": "安徽",
    "city": "合肥"
  },
  {
    "station": "和田",
    "province": "新疆",
    "city": "和田"
  },
  {
    "station": "墨玉",
    "province": "新疆",
    "city": "昆玉"
  },
  {
    "station": "皮山",
    "province": "新疆",
    "city": "和田"
  },
  {
    "station": "金城江",
    "province": "广西",
    "city": "河池"
  },
  {
    "station": "南丹",
    "province": "广西",
    "city": "河池"
  },
  {
    "station": "宜州",
    "province": "广西",
    "city": "河池"
  },
  {
    "station": "龙川",
    "province": "广东",
    "city": "河源"
  },
  {
    "station": "河源",
    "province": "广东",
    "city": "河源"
  },
  {
    "station": "和平",
    "province": "广东",
    "city": "河源"
  },
  {
    "station": "定陶",
    "province": "山东",
    "city": "菏泽"
  },
  {
    "station": "东明县",
    "province": "山东",
    "city": "菏泽"
  },
  {
    "station": "鄄城",
    "province": "山东",
    "city": "菏泽"
  },
  {
    "station": "曹县",
    "province": "山东",
    "city": "菏泽"
  },
  {
    "station": "菏泽",
    "province": "山东",
    "city": "菏泽"
  },
  {
    "station": "贺州",
    "province": "广西",
    "city": "贺州"
  },
  {
    "station": "富川",
    "province": "广西",
    "city": "贺州"
  },
  {
    "station": "钟山西",
    "province": "广西",
    "city": "贺州"
  },
  {
    "station": "鹤壁东",
    "province": "河南",
    "city": "鹤壁"
  },
  {
    "station": "鹤壁",
    "province": "河南",
    "city": "鹤壁"
  },
  {
    "station": "汤阴",
    "province": "河南",
    "city": "安阳"
  },
  {
    "station": "新华",
    "province": "黑龙江",
    "city": "鹤岗"
  },
  {
    "station": "宝泉岭",
    "province": "黑龙江",
    "city": "鹤岗"
  },
  {
    "station": "鹤北",
    "province": "黑龙江",
    "city": "鹤岗"
  },
  {
    "station": "鹤岗",
    "province": "黑龙江",
    "city": "鹤岗"
  },
  {
    "station": "峻德",
    "province": "黑龙江",
    "city": "鹤岗"
  },
  {
    "station": "龙镇",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "九三",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "锦河",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "李家",
    "province": "陕西",
    "city": "西安"
  },
  {
    "station": "辰清",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "二龙山屯",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "襄河",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "西岗子",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "通北",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "五大连池",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "孙吴",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "伊拉哈",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "赵光",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "嫩江",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "北安",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "黑河",
    "province": "黑龙江",
    "city": "黑河"
  },
  {
    "station": "安平",
    "province": "辽宁",
    "city": "辽阳"
  },
  {
    "station": "衡水",
    "province": "河北",
    "city": "衡水"
  },
  {
    "station": "王瞳",
    "province": "河北",
    "city": "衡水"
  },
  {
    "station": "饶阳",
    "province": "河北",
    "city": "衡水"
  },
  {
    "station": "深州",
    "province": "河北",
    "city": "衡水"
  },
  {
    "station": "南宫东",
    "province": "河北",
    "city": "邢台"
  },
  {
    "station": "前磨头",
    "province": "河北",
    "city": "衡水"
  },
  {
    "station": "龙华",
    "province": "河北",
    "city": "衡水"
  },
  {
    "station": "大营镇",
    "province": "河北",
    "city": "衡水"
  },
  {
    "station": "枣强",
    "province": "河北",
    "city": "衡水"
  },
  {
    "station": "祁东",
    "province": "湖南",
    "city": "衡阳"
  },
  {
    "station": "祁东北",
    "province": "湖南",
    "city": "衡阳"
  },
  {
    "station": "衡南",
    "province": "湖南",
    "city": "衡阳"
  },
  {
    "station": "衡阳东",
    "province": "湖南",
    "city": "衡阳"
  },
  {
    "station": "衡阳",
    "province": "湖南",
    "city": "衡阳"
  },
  {
    "station": "衡山",
    "province": "湖南",
    "city": "衡阳"
  },
  {
    "station": "衡山西",
    "province": "湖南",
    "city": "衡阳"
  },
  {
    "station": "耒阳",
    "province": "湖南",
    "city": "衡阳"
  },
  {
    "station": "耒阳西",
    "province": "湖南",
    "city": "衡阳"
  },
  {
    "station": "蒙自",
    "province": "云南",
    "city": "红河"
  },
  {
    "station": "屏边",
    "province": "云南",
    "city": "红河"
  },
  {
    "station": "侯马西",
    "province": "山西",
    "city": "临汾"
  },
  {
    "station": "侯马",
    "province": "山西",
    "city": "临汾"
  },
  {
    "station": "呼和浩特",
    "province": "内蒙古",
    "city": "呼和浩特"
  },
  {
    "station": "草河口",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "本溪湖",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "笔架山",
    "province": "黑龙江",
    "city": "双鸭山"
  },
  {
    "station": "火连寨",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "牛心台",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "桥头",
    "province": "广东",
    "city": "深圳"
  },
  {
    "station": "连山关",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "偏岭",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "金坑",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "祁家堡",
    "province": "辽宁",
    "city": "本溪"
  },
  {
    "station": "织金",
    "province": "贵州",
    "city": "毕节"
  },
  {
    "station": "草海",
    "province": "贵州",
    "city": "毕节"
  },
  {
    "station": "博兴",
    "province": "山东",
    "city": "滨州"
  },
  {
    "station": "亳州",
    "province": "安徽",
    "city": "亳州"
  },
  {
    "station": "阿拉山口",
    "province": "新疆",
    "city": "博尔塔拉"
  },
  {
    "station": "博乐",
    "province": "新疆",
    "city": "博尔塔拉"
  },
  {
    "station": "精河",
    "province": "新疆",
    "city": "博尔塔拉"
  },
  {
    "station": "精河南",
    "province": "新疆",
    "city": "博尔塔拉"
  },
  {
    "station": "任丘",
    "province": "河北",
    "city": "沧州"
  },
  {
    "station": "青县",
    "province": "河北",
    "city": "沧州"
  },
  {
    "station": "东光",
    "province": "河北",
    "city": "沧州"
  },
  {
    "station": "泊头",
    "province": "河北",
    "city": "沧州"
  },
  {
    "station": "河间西",
    "province": "河北",
    "city": "沧州"
  },
  {
    "station": "沧州西",
    "province": "河北",
    "city": "沧州"
  },
  {
    "station": "沧州",
    "province": "河北",
    "city": "沧州"
  },
  {
    "station": "吴桥",
    "province": "河北",
    "city": "沧州"
  },
  {
    "station": "肃宁",
    "province": "河北",
    "city": "沧州"
  },
  {
    "station": "沙湾县",
    "province": "新疆",
    "city": "塔城"
  },
  {
    "station": "玛纳斯湖",
    "province": "新疆",
    "city": "塔城"
  },
  {
    "station": "玛纳斯",
    "province": "新疆",
    "city": "昌吉"
  },
  {
    "station": "谢家镇",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "新立镇",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "姚家",
    "province": "辽宁",
    "city": "锦州"
  },
  {
    "station": "沃皮",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "一间堡",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "五棵树",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "长春",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "长春西",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "长春南",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "德惠",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "德惠西",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "大屯",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "布海",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "榆树",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "柴岗",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "达家沟",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "华家",
    "province": "江苏",
    "city": "常州"
  },
  {
    "station": "哈拉海",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "米沙子",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "开安",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "龙嘉",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "农安",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "刘家店",
    "province": "吉林",
    "city": "长春"
  },
  {
    "station": "宁乡",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "长沙",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "长沙南",
    "province": "湖南",
    "city": "长沙"
  },
  {
    "station": "长治",
    "province": "山西",
    "city": "长治"
  },
  {
    "station": "长治北",
    "province": "山西",
    "city": "长治"
  },
  {
    "station": "潞城",
    "province": "山西",
    "city": "长治"
  },
  {
    "station": "黎城",
    "province": "山西",
    "city": "长治"
  },
  {
    "station": "沁县",
    "province": "山西",
    "city": "长治"
  },
  {
    "station": "襄垣",
    "province": "山西",
    "city": "长治"
  },
  {
    "station": "武乡",
    "province": "山西",
    "city": "长治"
  },
  {
    "station": "微子镇",
    "province": "山西",
    "city": "长治"
  },
  {
    "station": "水洋",
    "province": "福建",
    "city": "宁德"
  },
  {
    "station": "石门县北",
    "province": "湖南",
    "city": "常德"
  },
  {
    "station": "石门县",
    "province": "湖南",
    "city": "常德"
  },
  {
    "station": "常德",
    "province": "湖南",
    "city": "常德"
  },
  {
    "station": "澧县",
    "province": "湖南",
    "city": "常德"
  },
  {
    "station": "汉寿",
    "province": "湖南",
    "city": "常德"
  },
  {
    "station": "临澧",
    "province": "湖南",
    "city": "常德"
  },
  {
    "station": "戚墅堰",
    "province": "江苏",
    "city": "常州"
  },
  {
    "station": "常州",
    "province": "江苏",
    "city": "常州"
  },
  {
    "station": "常州北",
    "province": "江苏",
    "city": "常州"
  },
  {
    "station": "刀尔登",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "大营子",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "大平房",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "公营子",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "能家",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "金杖子",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "凌源东",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "杨杖子",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "上园",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "水泉",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "三十家",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "沙海",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "魏杖子",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "凌源",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "叶柏寿",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "潮州",
    "province": "广东",
    "city": "潮州"
  },
  {
    "station": "郴州西",
    "province": "湖南",
    "city": "郴州"
  },
  {
    "station": "郴州",
    "province": "湖南",
    "city": "郴州"
  },
  {
    "station": "青城山",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "成都",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "成都南",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "成都东",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "都江堰",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "郫县西",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "红光镇",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "郫县",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "安德",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "青白江东",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "新都东",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "双流西",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "彭州",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "双流机场",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "新津南",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "新津",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "犀浦",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "犀浦东",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "下台子",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "下板城",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "小寺沟",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "西大庙",
    "province": "辽宁",
    "city": "营口"
  },
  {
    "station": "新杖子",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "五道河",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "四合永",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "超梁沟",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "洞庙河",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "北马圈子",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "北票南",
    "province": "辽宁",
    "city": "朝阳"
  },
  {
    "station": "二道沟门",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "朝阳地",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "大杖子",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "韩麻营",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "承德东",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "承德",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "上板城",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "上板城南",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "平泉",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "滦平",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "隆化",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "兴隆县",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "南大庙",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "滦河沿",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "前苇塘",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "流水沟",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "虎什哈",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "甲山",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "六道河子",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "潘家店",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "南湾子",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "金沟屯",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "梁底下",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "纪家沟",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "杨树岭",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "张百湾",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "鹰手营子",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "窑上",
    "province": "河北",
    "city": "承德"
  },
  {
    "station": "池州",
    "province": "安徽",
    "city": "池州"
  },
  {
    "station": "东至",
    "province": "安徽",
    "city": "池州"
  },
  {
    "station": "大板",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "红花沟",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "查布嘎",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "赤峰西",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "赤峰",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "平庄",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "平庄南",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "三义井",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "新窝铺",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "元宝山",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "汐子",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "小河沿",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "天义",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "四道湾",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "和硕",
    "province": "新疆",
    "city": "巴音郭楞"
  },
  {
    "station": "林东",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "林西",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "马林",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "经棚",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "乃林",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "老府",
    "province": "内蒙古",
    "city": "赤峰"
  },
  {
    "station": "渠旧",
    "province": "广西",
    "city": "崇左"
  },
  {
    "station": "濑湍",
    "province": "广西",
    "city": "崇左"
  },
  {
    "station": "宁明",
    "province": "广西",
    "city": "崇左"
  },
  {
    "station": "渠黎",
    "province": "广西",
    "city": "崇左"
  },
  {
    "station": "夏石",
    "province": "广西",
    "city": "崇左"
  },
  {
    "station": "亭亮",
    "province": "广西",
    "city": "崇左"
  },
  {
    "station": "扶绥",
    "province": "广西",
    "city": "崇左"
  },
  {
    "station": "崇左",
    "province": "广西",
    "city": "崇左"
  },
  {
    "station": "凭祥",
    "province": "广西",
    "city": "崇左"
  },
  {
    "station": "明光",
    "province": "安徽",
    "city": "滁州"
  },
  {
    "station": "定远",
    "province": "安徽",
    "city": "滁州"
  },
  {
    "station": "滁州北",
    "province": "安徽",
    "city": "滁州"
  },
  {
    "station": "滁州",
    "province": "安徽",
    "city": "滁州"
  },
  {
    "station": "凤阳",
    "province": "安徽",
    "city": "滁州"
  },
  {
    "station": "全椒",
    "province": "安徽",
    "city": "滁州"
  },
  {
    "station": "龙塘坝",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "龙骨甸",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "甸心",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "高楼房",
    "province": "云南",
    "city": "昆明"
  },
  {
    "station": "长冲",
    "province": "云南",
    "city": "大理"
  },
  {
    "station": "阿南庄",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "黑井",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "大湾子",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "红江",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "小月旧",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "小村",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "师庄",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "尹地",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "姚安",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "棠海",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "羊臼河",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "泽润里",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "元谋",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "禄丰南",
    "province": "云南",
    "city": "楚雄"
  },
  {
    "station": "达州",
    "province": "四川",
    "city": "达州"
  },
  {
    "station": "宣汉",
    "province": "四川",
    "city": "达州"
  },
  {
    "station": "万源",
    "province": "四川",
    "city": "达州"
  },
  {
    "station": "渠县",
    "province": "四川",
    "city": "达州"
  },
  {
    "station": "毛坝",
    "province": "四川",
    "city": "达州"
  },
  {
    "station": "开江",
    "province": "四川",
    "city": "达州"
  },
  {
    "station": "三汇镇",
    "province": "四川",
    "city": "达州"
  },
  {
    "station": "土溪",
    "province": "四川",
    "city": "达州"
  },
  {
    "station": "大关",
    "province": "云南",
    "city": "昭通"
  },
  {
    "station": "大理",
    "province": "云南",
    "city": "大理"
  },
  {
    "station": "弥渡",
    "province": "云南",
    "city": "大理"
  },
  {
    "station": "鹤庆",
    "province": "云南",
    "city": "大理"
  },
  {
    "station": "沐滂",
    "province": "云南",
    "city": "大理"
  },
  {
    "station": "大荔",
    "province": "陕西",
    "city": "渭南"
  },
  {
    "station": "普兰店",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "普湾",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "南关岭",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "亮甲店",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "夹心子",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "杏树屯",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "营城子",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "三十里堡",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "沙河口",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "许家屯",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "松树",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "登沙河",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "长岭子",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "周水子",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "瓦房店西",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "瓦房店",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "金州",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "旅顺",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "大连北",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "大连",
    "province": "辽宁",
    "city": "大连"
  },
  {
    "station": "大青沟",
    "province": "内蒙古",
    "city": "通辽"
  },
  {
    "station": "大庆西",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "大庆东",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "大庆",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "烟筒屯",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "壮志",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "银浪",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "立志",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "太阳升",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "新华屯",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "新肇",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "卧里屯",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "林源",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "喇嘛甸",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "创业村",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "独立屯",
    "province": "黑龙江",
    "city": "大庆"
  },
  {
    "station": "云彩岭",
    "province": "山西",
    "city": "大同"
  },
  {
    "station": "阳高",
    "province": "山西",
    "city": "大同"
  },
  {
    "station": "天镇",
    "province": "山西",
    "city": "大同"
  },
  {
    "station": "招柏",
    "province": "山西",
    "city": "大同"
  },
  {
    "station": "大同",
    "province": "山西",
    "city": "大同"
  },
  {
    "station": "大涧",
    "province": "山西",
    "city": "大同"
  },
  {
    "station": "灵丘",
    "province": "山西",
    "city": "大同"
  },
  {
    "station": "平型关",
    "province": "山西",
    "city": "大同"
  },
  {
    "station": "平旺",
    "province": "山西",
    "city": "大同"
  },
  {
    "station": "新林",
    "province": "黑龙江",
    "city": "大兴安岭"
  },
  {
    "station": "瓦拉干",
    "province": "黑龙江",
    "city": "大兴安岭"
  },
  {
    "station": "图强",
    "province": "黑龙江",
    "city": "大兴安岭"
  },
  {
    "station": "阿木尔",
    "province": "黑龙江",
    "city": "大兴安岭"
  },
  {
    "station": "塔河",
    "province": "黑龙江",
    "city": "大兴安岭"
  },
  {
    "station": "古莲",
    "province": "黑龙江",
    "city": "大兴安岭"
  },
  {
    "station": "漠河",
    "province": "黑龙江",
    "city": "大兴安岭"
  },
  {
    "station": "长甸",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "丹东",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "通远堡",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "石城",
    "province": "江西",
    "city": "上饶"
  },
  {
    "station": "五龙背",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "汤山城",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "宽甸",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "龙爪沟",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "刘家河",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "鸡冠山",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "一面山",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "大堡",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "凤凰城",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "灌水",
    "province": "辽宁",
    "city": "丹东"
  },
  {
    "station": "德阳",
    "province": "四川",
    "city": "德阳"
  },
  {
    "station": "罗江",
    "province": "四川",
    "city": "德阳"
  },
  {
    "station": "罗江东",
    "province": "四川",
    "city": "德阳"
  },
  {
    "station": "晏城",
    "province": "山东",
    "city": "德州"
  },
  {
    "station": "平原",
    "province": "山东",
    "city": "德州"
  },
  {
    "station": "德州东",
    "province": "山东",
    "city": "德州"
  },
  {
    "station": "德州",
    "province": "山东",
    "city": "德州"
  },
  {
    "station": "禹城",
    "province": "山东",
    "city": "德州"
  },
  {
    "station": "陇西",
    "province": "甘肃",
    "city": "定西"
  },
  {
    "station": "定西",
    "province": "甘肃",
    "city": "定西"
  },
  {
    "station": "通安驿",
    "province": "甘肃",
    "city": "定西"
  },
  {
    "station": "李家坪",
    "province": "甘肃",
    "city": "定西"
  },
  {
    "station": "东方",
    "province": "海南",
    "city": "东方"
  },
  {
    "station": "石龙",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "虎门",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "樟木头",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "东莞",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "东莞东",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "常平",
    "province": "广东",
    "city": "东莞"
  },
  {
    "station": "东营",
    "province": "山东",
    "city": "东营"
  },
  {
    "station": "离堆公园",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "迎宾路",
    "province": "四川",
    "city": "成都"
  },
  {
    "station": "峨眉山",
    "province": "四川",
    "city": "乐山"
  },
  {
    "station": "东胜西",
    "province": "内蒙古",
    "city": "鄂尔多斯"
  },
  {
    "station": "东胜",
    "province": "内蒙古",
    "city": "鄂尔多斯"
  },
  {
    "station": "达拉特旗",
    "province": "内蒙古",
    "city": "鄂尔多斯"
  },
  {
    "station": "达拉特西",
    "province": "内蒙古",
    "city": "鄂尔多斯"
  },
  {
    "station": "华容南",
    "province": "湖北",
    "city": "鄂州"
  },
  {
    "station": "华容东",
    "province": "湖北",
    "city": "鄂州"
  },
  {
    "station": "华容",
    "province": "湖北",
    "city": "鄂州"
  },
  {
    "station": "葛店南",
    "province": "湖北",
    "city": "鄂州"
  },
  {
    "station": "鄂州东",
    "province": "湖北",
    "city": "鄂州"
  },
  {
    "station": "鄂州",
    "province": "湖北",
    "city": "鄂州"
  },
  {
    "station": "巴东",
    "province": "湖北",
    "city": "恩施"
  },
  {
    "station": "恩施",
    "province": "湖北",
    "city": "恩施"
  },
  {
    "station": "建始",
    "province": "湖北",
    "city": "恩施"
  },
  {
    "station": "茅岭",
    "province": "广西",
    "city": "防城港"
  },
  {
    "station": "防城港北",
    "province": "广西",
    "city": "防城港"
  },
  {
    "station": "汾阳",
    "province": "山西",
    "city": "吕梁"
  },
  {
    "station": "海湾",
    "province": "上海",
    "city": "上海"
  },
  {
    "station": "三水南",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "三水",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "佛山",
    "province": "广东",
    "city": "佛山"
  },
  {
    "station": "弓棚子",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "扶余北",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "扶余",
    "province": "吉林",
    "city": "松原"
  },
  {
    "station": "福清",
    "province": "福建",
    "city": "福州"
  },
  {
    "station": "永泰",
    "province": "福建",
    "city": "福州"
  },
  {
    "station": "罗源",
    "province": "福建",
    "city": "福州"
  },
  {
    "station": "闽清",
    "province": "福建",
    "city": "福州"
  },
  {
    "station": "连江",
    "province": "福建",
    "city": "福州"
  },
  {
    "station": "福州",
    "province": "福建",
    "city": "福州"
  },
  {
    "station": "福州南",
    "province": "福建",
    "city": "福州"
  },
  {
    "station": "清原",
    "province": "辽宁",
    "city": "抚顺"
  },
  {
    "station": "瓢儿屯",
    "province": "辽宁",
    "city": "抚顺"
  },
  {
    "station": "南杂木",
    "province": "辽宁",
    "city": "抚顺"
  },
  {
    "station": "南口前",
    "province": "辽宁",
    "city": "抚顺"
  },
  {
    "station": "草市",
    "province": "辽宁",
    "city": "抚顺"
  },
  {
    "station": "苍石",
    "province": "辽宁",
    "city": "抚顺"
  },
  {
    "station": "抚顺",
    "province": "辽宁",
    "city": "抚顺"
  },
  {
    "station": "抚顺北",
    "province": "辽宁",
    "city": "抚顺"
  },
  {
    "station": "章党",
    "province": "辽宁",
    "city": "抚顺"
  },
  {
    "station": "南城",
    "province": "江西",
    "city": "抚州"
  },
  {
    "station": "抚州",
    "province": "江西",
    "city": "抚州"
  },
  {
    "station": "抚州北",
    "province": "江西",
    "city": "抚州"
  },
  {
    "station": "抚州东",
    "province": "江西",
    "city": "抚州"
  },
  {
    "station": "资溪",
    "province": "江西",
    "city": "抚州"
  },
  {
    "station": "南丰",
    "province": "江西",
    "city": "抚州"
  },
  {
    "station": "江边村",
    "province": "江西",
    "city": "抚州"
  },
  {
    "station": "临川",
    "province": "江西",
    "city": "抚州"
  },
  {
    "station": "崇仁",
    "province": "江西",
    "city": "抚州"
  },
  {
    "station": "阿金",
    "province": "辽宁",
    "city": "阜新"
  },
  {
    "station": "大巴",
    "province": "辽宁",
    "city": "阜新"
  },
  {
    "station": "彰武",
    "province": "辽宁",
    "city": "阜新"
  },
  {
    "station": "章古台",
    "province": "辽宁",
    "city": "阜新"
  },
  {
    "station": "泡子",
    "province": "辽宁",
    "city": "阜新"
  },
  {
    "station": "清河门",
    "province": "辽宁",
    "city": "阜新"
  },
  {
    "station": "十家子",
    "province": "辽宁",
    "city": "阜新"
  },
  {
    "station": "新邱",
    "province": "辽宁",
    "city": "阜新"
  },
  {
    "station": "三堂集",
    "province": "安徽",
    "city": "阜阳"
  },
  {
    "station": "阜阳",
    "province": "安徽",
    "city": "阜阳"
  },
  {
    "station": "阜南",
    "province": "安徽",
    "city": "阜阳"
  },
  {
    "station": "盖州",
    "province": "辽宁",
    "city": "营口"
  },
  {
    "station": "盖州西",
    "province": "辽宁",
    "city": "营口"
  },
  {
    "station": "定南",
    "province": "江西",
    "city": "赣州"
  },
  {
    "station": "兴国",
    "province": "江西",
    "city": "赣州"
  },
  {
    "station": "瑞金",
    "province": "江西",
    "city": "赣州"
  },
  {
    "station": "大余",
    "province": "江西",
    "city": "赣州"
  },
  {
    "station": "赣州",
    "province": "江西",
    "city": "赣州"
  },
  {
    "station": "于都",
    "province": "江西",
    "city": "赣州"
  },
  {
    "station": "信丰",
    "province": "江西",
    "city": "赣州"
  },
  {
    "station": "龙南",
    "province": "江西",
    "city": "赣州"
  },
  {
    "station": "高安",
    "province": "江西",
    "city": "宜春"
  },
  {
    "station": "公主岭南",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "公主岭",
    "province": "吉林",
    "city": "四平"
  },
  {
    "station": "二营",
    "province": "宁夏",
    "city": "固原"
  },
  {
    "station": "韩府湾",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "固原",
    "province": "宁夏",
    "city": "固原"
  },
  {
    "station": "厦门高崎",
    "province": "福建",
    "city": "厦门"
  },
  {
    "station": "赤壁",
    "province": "湖北",
    "city": "咸宁"
  },
  {
    "station": "赤壁北",
    "province": "湖北",
    "city": "咸宁"
  },
  {
    "station": "咸宁",
    "province": "湖北",
    "city": "咸宁"
  },
  {
    "station": "咸宁北",
    "province": "湖北",
    "city": "咸宁"
  },
  {
    "station": "贺胜桥东",
    "province": "湖北",
    "city": "咸宁"
  },
  {
    "station": "横沟桥东",
    "province": "湖北",
    "city": "咸宁"
  },
  {
    "station": "咸宁东",
    "province": "湖北",
    "city": "咸宁"
  },
  {
    "station": "咸宁南",
    "province": "湖北",
    "city": "咸宁"
  },
  {
    "station": "乾县",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "礼泉",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "彬州",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "长武",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "杨陵",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "杨陵南",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "永寿",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "咸阳",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "咸阳秦都",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "永乐店",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "三原",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "武功",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "兴平",
    "province": "陕西",
    "city": "咸阳"
  },
  {
    "station": "湘潭",
    "province": "湖南",
    "city": "湘潭"
  },
  {
    "station": "湘潭北",
    "province": "湖南",
    "city": "湘潭"
  },
  {
    "station": "湘乡",
    "province": "湖南",
    "city": "湘潭"
  },
  {
    "station": "攸县",
    "province": "湖南",
    "city": "株洲"
  },
  {
    "station": "茶陵南",
    "province": "湖南",
    "city": "株洲"
  },
  {
    "station": "茶陵",
    "province": "湖南",
    "city": "株洲"
  },
  {
    "station": "醴陵",
    "province": "湖南",
    "city": "株洲"
  },
  {
    "station": "醴陵东",
    "province": "湖南",
    "city": "株洲"
  },
  {
    "station": "吉首",
    "province": "湖南",
    "city": "湘西"
  },
  {
    "station": "猛洞河",
    "province": "湖南",
    "city": "湘西"
  },
  {
    "station": "襄阳",
    "province": "湖北",
    "city": "襄阳"
  },
  {
    "station": "襄阳东",
    "province": "湖北",
    "city": "襄阳"
  },
  {
    "station": "宜城",
    "province": "湖北",
    "city": "襄阳"
  },
  {
    "station": "谷城",
    "province": "湖北",
    "city": "襄阳"
  },
  {
    "station": "枣阳",
    "province": "湖北",
    "city": "襄阳"
  },
  {
    "station": "项城",
    "province": "河南",
    "city": "周口"
  },
  {
    "station": "孝感",
    "province": "湖北",
    "city": "孝感"
  },
  {
    "station": "孝感北",
    "province": "湖北",
    "city": "孝感"
  },
  {
    "station": "云梦",
    "province": "湖北",
    "city": "孝感"
  },
  {
    "station": "应城",
    "province": "湖北",
    "city": "孝感"
  },
  {
    "station": "花园",
    "province": "湖北",
    "city": "孝感"
  },
  {
    "station": "广水",
    "province": "湖北",
    "city": "随州"
  },
  {
    "station": "汉川",
    "province": "湖北",
    "city": "孝感"
  },
  {
    "station": "安陆",
    "province": "湖北",
    "city": "孝感"
  },
  {
    "station": "东庄",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "代县",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "安塘",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "定襄",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "繁峙",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "豆罗",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "大营",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "东淤地",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "平社",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "秦家庄",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "宁武",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "神池",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "下社",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "忻州",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "五寨",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "五原",
    "province": "内蒙古",
    "city": "巴彦淖尔"
  },
  {
    "station": "五台山",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "河边",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "岢岚",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "获嘉",
    "province": "河南",
    "city": "新乡"
  },
  {
    "station": "长垣",
    "province": "河南",
    "city": "新乡"
  },
  {
    "station": "新乡",
    "province": "河南",
    "city": "新乡"
  },
  {
    "station": "新乡东",
    "province": "河南",
    "city": "新乡"
  },
  {
    "station": "卫辉",
    "province": "河南",
    "city": "新乡"
  },
  {
    "station": "新余北",
    "province": "江西",
    "city": "新余"
  },
  {
    "station": "新余",
    "province": "江西",
    "city": "新余"
  },
  {
    "station": "分宜",
    "province": "江西",
    "city": "新余"
  },
  {
    "station": "罗山",
    "province": "河南",
    "city": "信阳"
  },
  {
    "station": "明港",
    "province": "河南",
    "city": "信阳"
  },
  {
    "station": "明港东",
    "province": "河南",
    "city": "信阳"
  },
  {
    "station": "商城",
    "province": "河南",
    "city": "信阳"
  },
  {
    "station": "新县",
    "province": "河南",
    "city": "信阳"
  },
  {
    "station": "信阳",
    "province": "河南",
    "city": "信阳"
  },
  {
    "station": "信阳东",
    "province": "河南",
    "city": "信阳"
  },
  {
    "station": "淮滨",
    "province": "河南",
    "city": "信阳"
  },
  {
    "station": "潢川",
    "province": "河南",
    "city": "信阳"
  },
  {
    "station": "固始",
    "province": "河南",
    "city": "信阳"
  },
  {
    "station": "乌兰浩特",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "阿尔山",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "葛根庙",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "大石寨",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "白音胡硕",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "德伯斯",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "白狼",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "归流河",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "兴安",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "西哲里木",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "索伦",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "五叉沟",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "吐列毛杜",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "卫东",
    "province": "江西",
    "city": "南昌"
  },
  {
    "station": "伊尔施",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "明水河",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "宁家",
    "province": "内蒙古",
    "city": "兴安"
  },
  {
    "station": "清河城",
    "province": "河北",
    "city": "邢台"
  },
  {
    "station": "临西",
    "province": "河北",
    "city": "邢台"
  },
  {
    "station": "邢台",
    "province": "河北",
    "city": "邢台"
  },
  {
    "station": "邢台东",
    "province": "河北",
    "city": "邢台"
  },
  {
    "station": "沙河市",
    "province": "河北",
    "city": "邢台"
  },
  {
    "station": "邳州",
    "province": "江苏",
    "city": "徐州"
  },
  {
    "station": "徐州",
    "province": "江苏",
    "city": "徐州"
  },
  {
    "station": "徐州东",
    "province": "江苏",
    "city": "徐州"
  },
  {
    "station": "新沂",
    "province": "江苏",
    "city": "徐州"
  },
  {
    "station": "许昌",
    "province": "河南",
    "city": "许昌"
  },
  {
    "station": "许昌东",
    "province": "河南",
    "city": "许昌"
  },
  {
    "station": "长葛",
    "province": "河南",
    "city": "许昌"
  },
  {
    "station": "广德",
    "province": "安徽",
    "city": "宣城"
  },
  {
    "station": "绩溪县",
    "province": "安徽",
    "city": "宣城"
  },
  {
    "station": "宁国",
    "province": "安徽",
    "city": "宣城"
  },
  {
    "station": "宣城",
    "province": "安徽",
    "city": "宣城"
  },
  {
    "station": "汉源",
    "province": "四川",
    "city": "雅安"
  },
  {
    "station": "徐家店",
    "province": "山东",
    "city": "烟台"
  },
  {
    "station": "海阳北",
    "province": "山东",
    "city": "烟台"
  },
  {
    "station": "桃村",
    "province": "山东",
    "city": "烟台"
  },
  {
    "station": "桃村北",
    "province": "山东",
    "city": "烟台"
  },
  {
    "station": "牟平",
    "province": "山东",
    "city": "烟台"
  },
  {
    "station": "烟台",
    "province": "山东",
    "city": "烟台"
  },
  {
    "station": "烟台南",
    "province": "山东",
    "city": "烟台"
  },
  {
    "station": "莱阳",
    "province": "山东",
    "city": "烟台"
  },
  {
    "station": "子长",
    "province": "陕西",
    "city": "延安"
  },
  {
    "station": "延安",
    "province": "陕西",
    "city": "延安"
  },
  {
    "station": "富县东",
    "province": "陕西",
    "city": "延安"
  },
  {
    "station": "富县",
    "province": "陕西",
    "city": "延安"
  },
  {
    "station": "黄陵",
    "province": "陕西",
    "city": "延安"
  },
  {
    "station": "甘泉",
    "province": "陕西",
    "city": "延安"
  },
  {
    "station": "甘泉北",
    "province": "陕西",
    "city": "延安"
  },
  {
    "station": "大兴沟",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "朝阳川",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "安图",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "春阳",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "和龙",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "大石头",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "黄泥河",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "庙岭",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "汪清",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "苇子沟",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "天桥岭",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "石岘",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "松江镇",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "图们",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "延吉",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "龙井",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "敦化",
    "province": "吉林",
    "city": "延边"
  },
  {
    "station": "盐城",
    "province": "江苏",
    "city": "盐城"
  },
  {
    "station": "建湖",
    "province": "江苏",
    "city": "盐城"
  },
  {
    "station": "阜宁",
    "province": "江苏",
    "city": "盐城"
  },
  {
    "station": "东台",
    "province": "江苏",
    "city": "盐城"
  },
  {
    "station": "盐津",
    "province": "云南",
    "city": "昭通"
  },
  {
    "station": "江都",
    "province": "江苏",
    "city": "扬州"
  },
  {
    "station": "仪征",
    "province": "江苏",
    "city": "扬州"
  },
  {
    "station": "扬州",
    "province": "江苏",
    "city": "扬州"
  },
  {
    "station": "春湾",
    "province": "广东",
    "city": "阳江"
  },
  {
    "station": "阳春",
    "province": "广东",
    "city": "阳江"
  },
  {
    "station": "岩会",
    "province": "山西",
    "city": "阳泉"
  },
  {
    "station": "娘子关",
    "province": "山西",
    "city": "阳泉"
  },
  {
    "station": "阳泉",
    "province": "山西",
    "city": "阳泉"
  },
  {
    "station": "阳泉北",
    "province": "山西",
    "city": "阳泉"
  },
  {
    "station": "红山",
    "province": "广东",
    "city": "深圳"
  },
  {
    "station": "金山屯",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "美溪",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "朗乡",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "红星",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "浩良河",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "带岭",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "晨明",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "新青",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "铁力",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "王杨",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "五营",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "桃山",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "友好",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "汤旺河",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "西林",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "双丰",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "神树",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "伊春",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "乌伊岭",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "南岔",
    "province": "黑龙江",
    "city": "伊春"
  },
  {
    "station": "伊宁",
    "province": "新疆",
    "city": "伊犁"
  },
  {
    "station": "布列开",
    "province": "新疆",
    "city": "伊犁"
  },
  {
    "station": "伊宁东",
    "province": "新疆",
    "city": "伊犁"
  },
  {
    "station": "霍尔果斯",
    "province": "新疆",
    "city": "伊犁"
  },
  {
    "station": "尼勒克",
    "province": "新疆",
    "city": "伊犁"
  },
  {
    "station": "枣林",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "阳明堡",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "原平",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "轩岗",
    "province": "山西",
    "city": "忻州"
  },
  {
    "station": "宜宾",
    "province": "四川",
    "city": "宜宾"
  },
  {
    "station": "宜昌东",
    "province": "湖北",
    "city": "宜昌"
  },
  {
    "station": "宜昌",
    "province": "湖北",
    "city": "宜昌"
  },
  {
    "station": "枝城",
    "province": "湖北",
    "city": "宜昌"
  },
  {
    "station": "长阳",
    "province": "湖北",
    "city": "宜昌"
  },
  {
    "station": "枝江北",
    "province": "湖北",
    "city": "宜昌"
  },
  {
    "station": "当阳",
    "province": "湖北",
    "city": "宜昌"
  },
  {
    "station": "丰城南",
    "province": "江西",
    "city": "宜春"
  },
  {
    "station": "丰城",
    "province": "江西",
    "city": "宜春"
  },
  {
    "station": "樟树",
    "province": "江西",
    "city": "宜春"
  },
  {
    "station": "樟树东",
    "province": "江西",
    "city": "宜春"
  },
  {
    "station": "宜春",
    "province": "江西",
    "city": "宜春"
  },
  {
    "station": "宜春西",
    "province": "江西",
    "city": "宜春"
  },
  {
    "station": "宜兴",
    "province": "江苏",
    "city": "无锡"
  },
  {
    "station": "益阳",
    "province": "湖南",
    "city": "益阳"
  },
  {
    "station": "灵武",
    "province": "宁夏",
    "city": "银川"
  },
  {
    "station": "暖泉",
    "province": "宁夏",
    "city": "银川"
  },
  {
    "station": "黄羊滩",
    "province": "宁夏",
    "city": "银川"
  },
  {
    "station": "银川",
    "province": "宁夏",
    "city": "银川"
  },
  {
    "station": "盐池",
    "province": "宁夏",
    "city": "吴忠"
  },
  {
    "station": "余江",
    "province": "江西",
    "city": "鹰潭"
  },
  {
    "station": "鹰潭北",
    "province": "江西",
    "city": "鹰潭"
  },
  {
    "station": "鹰潭",
    "province": "江西",
    "city": "鹰潭"
  },
  {
    "station": "东乡",
    "province": "江西",
    "city": "抚州"
  },
  {
    "station": "贵溪",
    "province": "江西",
    "city": "鹰潭"
  },
  {
    "station": "营口东",
    "province": "辽宁",
    "city": "营口"
  },
  {
    "station": "老边",
    "province": "辽宁",
    "city": "营口"
  },
  {
    "station": "营口",
    "province": "辽宁",
    "city": "营口"
  },
  {
    "station": "大石桥",
    "province": "辽宁",
    "city": "营口"
  },
  {
    "station": "熊岳城",
    "province": "辽宁",
    "city": "营口"
  },
  {
    "station": "永济北",
    "province": "山西",
    "city": "运城"
  },
  {
    "station": "永济",
    "province": "山西",
    "city": "运城"
  },
  {
    "station": "东安东",
    "province": "湖南",
    "city": "永州"
  },
  {
    "station": "道州",
    "province": "湖南",
    "city": "永州"
  },
  {
    "station": "永州",
    "province": "湖南",
    "city": "永州"
  },
  {
    "station": "祁阳",
    "province": "湖南",
    "city": "永州"
  },
  {
    "station": "祁阳北",
    "province": "湖南",
    "city": "永州"
  },
  {
    "station": "零陵",
    "province": "湖南",
    "city": "永州"
  },
  {
    "station": "江永",
    "province": "湖南",
    "city": "永州"
  },
  {
    "station": "江华",
    "province": "湖南",
    "city": "永州"
  },
  {
    "station": "余姚",
    "province": "浙江",
    "city": "宁波"
  },
  {
    "station": "余姚北",
    "province": "浙江",
    "city": "宁波"
  },
  {
    "station": "子洲",
    "province": "陕西",
    "city": "榆林"
  },
  {
    "station": "清涧县",
    "province": "陕西",
    "city": "榆林"
  },
  {
    "station": "靖边",
    "province": "陕西",
    "city": "榆林"
  },
  {
    "station": "米脂",
    "province": "陕西",
    "city": "榆林"
  },
  {
    "station": "榆林",
    "province": "陕西",
    "city": "榆林"
  },
  {
    "station": "神木",
    "province": "陕西",
    "city": "榆林"
  },
  {
    "station": "定边",
    "province": "陕西",
    "city": "榆林"
  },
  {
    "station": "绥德",
    "province": "陕西",
    "city": "榆林"
  },
  {
    "station": "吴堡",
    "province": "陕西",
    "city": "榆林"
  },
  {
    "station": "王家湾",
    "province": "甘肃",
    "city": "兰州"
  },
  {
    "station": "容县",
    "province": "广西",
    "city": "玉林"
  },
  {
    "station": "兴业",
    "province": "广西",
    "city": "玉林"
  },
  {
    "station": "文地",
    "province": "广西",
    "city": "玉林"
  },
  {
    "station": "玉林",
    "province": "广西",
    "city": "玉林"
  },
  {
    "station": "陆川",
    "province": "广西",
    "city": "玉林"
  },
  {
    "station": "北流",
    "province": "广西",
    "city": "玉林"
  },
  {
    "station": "玉溪",
    "province": "云南",
    "city": "玉溪"
  },
  {
    "station": "岳阳东",
    "province": "湖南",
    "city": "岳阳"
  },
  {
    "station": "岳阳",
    "province": "湖南",
    "city": "岳阳"
  },
  {
    "station": "临湘",
    "province": "湖南",
    "city": "岳阳"
  },
  {
    "station": "路口铺",
    "province": "湖南",
    "city": "岳阳"
  },
  {
    "station": "汨罗",
    "province": "湖南",
    "city": "岳阳"
  },
  {
    "station": "汨罗东",
    "province": "湖南",
    "city": "岳阳"
  },
  {
    "station": "新兴县",
    "province": "广东",
    "city": "云浮"
  },
  {
    "station": "郁南",
    "province": "广东",
    "city": "云浮"
  },
  {
    "station": "南江口",
    "province": "广东",
    "city": "云浮"
  },
  {
    "station": "云浮东",
    "province": "广东",
    "city": "云浮"
  },
  {
    "station": "新绛",
    "province": "山西",
    "city": "运城"
  },
  {
    "station": "东镇",
    "province": "山西",
    "city": "运城"
  },
  {
    "station": "河津",
    "province": "山西",
    "city": "运城"
  },
  {
    "station": "稷山",
    "province": "山西",
    "city": "运城"
  },
  {
    "station": "运城",
    "province": "山西",
    "city": "运城"
  },
  {
    "station": "运城北",
    "province": "山西",
    "city": "运城"
  },
  {
    "station": "风陵渡",
    "province": "山西",
    "city": "运城"
  },
  {
    "station": "枣庄",
    "province": "山东",
    "city": "枣庄"
  },
  {
    "station": "枣庄西",
    "province": "山东",
    "city": "枣庄"
  },
  {
    "station": "滕州",
    "province": "山东",
    "city": "枣庄"
  },
  {
    "station": "滕州东",
    "province": "山东",
    "city": "枣庄"
  },
  {
    "station": "遂溪",
    "province": "广东",
    "city": "湛江"
  },
  {
    "station": "徐闻",
    "province": "广东",
    "city": "湛江"
  },
  {
    "station": "河唇",
    "province": "广东",
    "city": "湛江"
  },
  {
    "station": "湛江",
    "province": "广东",
    "city": "湛江"
  },
  {
    "station": "湛江西",
    "province": "广东",
    "city": "湛江"
  },
  {
    "station": "雷州",
    "province": "广东",
    "city": "湛江"
  },
  {
    "station": "廉江",
    "province": "广东",
    "city": "湛江"
  },
  {
    "station": "张家界",
    "province": "湖南",
    "city": "张家界"
  },
  {
    "station": "慈利",
    "province": "湖南",
    "city": "张家界"
  },
  {
    "station": "郭磊庄",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "张家口",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "官厅",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "张家口",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "官厅西",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "柴沟堡",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "旧庄窝",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "沙城",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "下花园",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "新保安",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "西八里",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "宣化",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "沙岭子",
    "province": "河北",
    "city": "张家口"
  },
  {
    "station": "山丹",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "许三湾",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "狼尾山",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "临泽",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "临泽南",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "平原堡",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "高台",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "高台南",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "镜铁山",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "张掖",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "张掖西",
    "province": "甘肃",
    "city": "张掖"
  },
  {
    "station": "饶平",
    "province": "广东",
    "city": "潮州"
  },
  {
    "station": "诏安",
    "province": "福建",
    "city": "漳州"
  },
  {
    "station": "漳州",
    "province": "福建",
    "city": "漳州"
  },
  {
    "station": "漳州东",
    "province": "福建",
    "city": "漳州"
  },
  {
    "station": "漳浦",
    "province": "福建",
    "city": "漳州"
  },
  {
    "station": "云霄",
    "province": "福建",
    "city": "漳州"
  },
  {
    "station": "南靖",
    "province": "福建",
    "city": "漳州"
  },
  {
    "station": "龙山镇",
    "province": "福建",
    "city": "漳州"
  },
  {
    "station": "角美",
    "province": "福建",
    "city": "漳州"
  },
  {
    "station": "曾家坪子",
    "province": "云南",
    "city": "昭通"
  },
  {
    "station": "彝良",
    "province": "云南",
    "city": "昭通"
  },
  {
    "station": "水富",
    "province": "云南",
    "city": "昭通"
  },
  {
    "station": "昭通",
    "province": "云南",
    "city": "昭通"
  },
  {
    "station": "肇东",
    "province": "黑龙江",
    "city": "绥化"
  },
  {
    "station": "广宁",
    "province": "广东",
    "city": "肇庆"
  },
  {
    "station": "怀集",
    "province": "广东",
    "city": "肇庆"
  },
  {
    "station": "肇庆东",
    "province": "广东",
    "city": "肇庆"
  },
  {
    "station": "肇庆",
    "province": "广东",
    "city": "肇庆"
  },
  {
    "station": "丹徒",
    "province": "江苏",
    "city": "镇江"
  },
  {
    "station": "宝华山",
    "province": "江苏",
    "city": "镇江"
  },
  {
    "station": "丹阳",
    "province": "江苏",
    "city": "镇江"
  },
  {
    "station": "丹阳北",
    "province": "江苏",
    "city": "镇江"
  },
  {
    "station": "镇江",
    "province": "江苏",
    "city": "镇江"
  },
  {
    "station": "镇江南",
    "province": "江苏",
    "city": "镇江"
  },
  {
    "station": "中牟",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "贾鲁河",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "绿博园",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "巩义南",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "巩义",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "郑州",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "郑州东",
    "province": "河南",
    "city": "郑州"
  },
  {
    "station": "中山",
    "province": "广东",
    "city": "中山"
  },
  {
    "station": "中山北",
    "province": "广东",
    "city": "中山"
  },
  {
    "station": "小榄",
    "province": "广东",
    "city": "中山"
  },
  {
    "station": "南头",
    "province": "广东",
    "city": "中山"
  },
  {
    "station": "古镇",
    "province": "广东",
    "city": "中山"
  },
  {
    "station": "南朗",
    "province": "广东",
    "city": "中山"
  },
  {
    "station": "东升",
    "province": "广东",
    "city": "中山"
  },
  {
    "station": "中卫",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "褚家湾",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "中宁",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "中宁东",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "中宁南",
    "province": "宁夏",
    "city": "中卫"
  },
  {
    "station": "钟山",
    "province": "广西",
    "city": "贺州"
  },
  {
    "station": "丰都",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "石柱县",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "北碚",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "龙市",
    "province": "江西",
    "city": "吉安"
  },
  {
    "station": "酉阳",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "长寿",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "长寿北",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "赶水",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "合川",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "万州",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "重庆北",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "重庆",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "重庆南",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "秀山",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "黔江",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "武隆",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "永川",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "涪陵",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "涪陵北",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "彭水",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "荣昌",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "江津",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "梁平",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "綦江",
    "province": "重庆",
    "city": "重庆"
  },
  {
    "station": "周口",
    "province": "河南",
    "city": "周口"
  },
  {
    "station": "株洲",
    "province": "湖南",
    "city": "株洲"
  },
  {
    "station": "株洲西",
    "province": "湖南",
    "city": "株洲"
  },
  {
    "station": "攸县南",
    "province": "湖南",
    "city": "株洲"
  },
  {
    "station": "炎陵",
    "province": "湖南",
    "city": "株洲"
  },
  {
    "station": "珠海北",
    "province": "广东",
    "city": "珠海"
  },
  {
    "station": "珠海",
    "province": "广东",
    "city": "珠海"
  },
  {
    "station": "前山",
    "province": "广东",
    "city": "珠海"
  },
  {
    "station": "明珠",
    "province": "广东",
    "city": "珠海"
  },
  {
    "station": "唐家湾",
    "province": "广东",
    "city": "珠海"
  },
  {
    "station": "遂平",
    "province": "河南",
    "city": "驻马店"
  },
  {
    "station": "西平",
    "province": "河南",
    "city": "驻马店"
  },
  {
    "station": "驻马店",
    "province": "河南",
    "city": "驻马店"
  },
  {
    "station": "驻马店西",
    "province": "河南",
    "city": "驻马店"
  },
  {
    "station": "确山",
    "province": "河南",
    "city": "驻马店"
  },
  {
    "station": "资阳",
    "province": "四川",
    "city": "资阳"
  },

]

function parsePinyin(str, style) {
  let array = pinyin(str, {
    style: pinyin[style]
  })

  let res = ''
  for(let item of array) {
    res += item[0];
  }
  return res;

}

async function setFlights() {
  for (let flight of flights) {

    let flightPinyin = {
      city: {
        full: parsePinyin(flight.city, 'STYLE_NORMAL'),
        simple: parsePinyin(flight.city, 'STYLE_FIRST_LETTER')
      }
    }
    console.log(flightPinyin)
    console.log(`保存 ${flight.city}`, flightPinyin.city.full[0].toUpperCase())
    await Stations.updateOne({
      type: 0,
      city: flight.city,
      abbr: flight.abbr
    }, {
      type: 0,
      city: flight.city,
      abbr: flight.abbr,
      cityLetter: flightPinyin.city.full[0].toUpperCase(),
      pinyin: flightPinyin
    }, {upsert: true})
  }
}

async function setTrains() {
  for (let train of trains) {

    let trainPinyin = {
      station: {
        full: parsePinyin(train.station, 'STYLE_NORMAL'),
        simple: parsePinyin(train.station, 'STYLE_FIRST_LETTER')
      },
      city: {
        full: parsePinyin(train.city, 'STYLE_NORMAL'),
        simple: parsePinyin(train.city, 'STYLE_FIRST_LETTER')
      }
    }
    console.log(trainPinyin)
    console.log(`保存 ${train.city}`, trainPinyin.station.full[0].toUpperCase())
    await Stations.updateOne({
      type: 1,
      station: train.station,
      city: train.city,
    }, {
      type: 1,
      station: train.station,
      city: train.city,
      abbr: train.abbr,
      stationLetter: trainPinyin.station.full[0].toUpperCase(),
      cityLetter: trainPinyin.city.full[0].toUpperCase(),
      pinyin: trainPinyin
    }, {upsert: true})
  }
}

setFlights()
setTrains()