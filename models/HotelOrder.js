const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 价目信息schema
const priceSchema = new mongoose.Schema({
	pay_type: String, // 结算方式:1：个人现付，2:企业现付,4:企业月结，8、企业预存
	category: String, // 	交易类目
	type: Number, // 	资金流向:1:支出，2:收入
	price: Number, // 价格 100.0
	gmt_create: Date // 流水创建时间
});

const costCenterSchema = new mongoose.Schema({
	id: String, // 商旅成本中心id
	number: String, // 成本中心编号
	name: String, // 成本中心名称
	corpid: String //	企业id
});

// 发票信息对象schema
const invoiceSchema = new mongoose.Schema({
	id: String, // 商旅发票id
	title: String // 发票抬头
});

// 商旅酒店订单列表 参考alitrip.btrip.hotel.order.search
const hotelOrderSchema = new mongoose.Schema(
	{
		id: Number, // 酒店订单id
		gmt_create: Date, // 创建时间
		gmt_modified: Date, // 更新时间
		corpid: String, // 企业id
		corp_name: String, // 企业名称
		userid: String, // 用户id
		user_name: String, 	// 用户名称
		deptid: String, // 部门id
		dept_name: String, // 部门名称
		apply_id: String, // 申请单id
		contact_name: String, // 联系人名称
		contact_phone: String, // 联系人电话
		city: String, // 	酒店所在城市
		hotel_name: String, // 酒店名称
		check_in: Date, // 入住时间
		check_out: Date, // 离店时间
		room_type: String, // 房间类型
		room_num: Number, // 房间数
		night: Number, // 	总共住几晚

		price_info_list: [ priceSchema ], // 价目信息
		total_fee: Number, // 总费用，计算后获得
		invoice: [ invoiceSchema ], // 	发票信息对象
		cost_center: [ costCenterSchema ], // 成本中心

		guest: String, // 入住顾客，多个用','分割
		thirdpart_itinerary_id: String, // 第三方行程id
		order_type: Number, // 订单类型
		order_status: Number, // 订单状态
		order_status_desc: String, // 	订单状态描述
		order_type_desc: String // 	订单类型描述
	}, {
		collection: 'hotelOrders',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const HotelOrder = mongodb.model('hotelOrders', hotelOrderSchema);

module.exports = HotelOrder;
