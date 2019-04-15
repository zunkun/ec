const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 价目信息schema
const priceSchema = new mongoose.Schema({
	pay_type: String, // 结算方式:1：个人现付，2:企业现付,4:企业月结，8、企业预存
	category: String, // 	交易类目
	type: Number, // 	资金流向:1:支出，2:收入
	price: Number, // 价格 100.0
	gmt_create: Date, // 流水创建时间
	alipay_trade_no: String // 支付流水号
});

const costCenterSchema = new mongoose.Schema({
	number: String, // 成本中心编号
	name: String, // 成本中心名称
	corp_id: String //	企业id
});

// 发票信息对象schema
const invoiceSchema = new mongoose.Schema({
	id: String, // 商旅发票id
	title: String // 发票抬头
});

// 商旅火车票订单列表 参考alitrip.btrip.train.order.search
const TrainOrderSchema = new mongoose.Schema(
	{
		train_order_id: Number, // 火车票订单id
		gmt_create: Date, // 创建时间
		gmt_modified: Date, // 更新时间
		corp_id: String, // 企业id
		corp_name: String, // 企业名称
		user_id: String, // 用户id
		user_name: String, 	// 用户名称
		depart_id: String, // 部门id
		depart_name: String, // 部门名称
		apply_id: String, // 申请单id
		contact_name: String, // 联系人名称
		contact_phone: String, // 联系人电话

		dep_station: String, // 出发站
		arr_station: String, // 	到达站
		dep_time: Date, // 出发时间
		arr_time: Date, // 	到达时间
		train_type: String, // 车次类型
		train_number: String, // 车次
		seat_type: String, // 座位类型
		run_time: String, // 运行时长
		dep_city: String, // 出发城市
		arr_city: String, // 到达城市
		ticket_no12306: String, // 12306票号
		rider_name: String, // 乘客姓名
		ticket_count: Number, 	// 	票的数量

		price_info_list: [ priceSchema ], // 价目信息
		cost_center: [ costCenterSchema ], // 成本中心
		invoice: [ invoiceSchema ], // 	发票信息对象
		total_fee: Number, // 总费用，计算后获得

		status: Number, // 订单状态：0待支付,1出票中,2已关闭,3,改签成功,4退票成功,5出票完成,6退票申请中,7改签申请中,8已出票,已发货,9出票失败,10改签失败,11退票失败
		thirdpart_itinerary_id: String // 第三方行程id
	}, {
		collection: 'trainOrders',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const TrainOrder = mongodb.model('trainOrders', TrainOrderSchema);

module.exports = TrainOrder;
