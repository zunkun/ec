import mongoose from 'mongoose';
import mongodb from '../core/db/mongodb';

// 保险schema
const insureSchema = new mongoose.Schema({
	name: String, // 	乘机人(保险人)姓名
	status: Number, // 	状态：1已出保 2已退保'
	insure_no: String // 保单号
});

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

// 商旅机票订单列表 参考alitrip.btrip.flight.order.search
const flightOrderSchema = new mongoose.Schema(
	{
		flat_order_id: Number, // 机票订单id
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
		dep_city: String, // 出发城市
		arr_city: String, // 	到达城市
		dep_date: Date, // 出发日期
		ret_date: Date, // 到达日期，注意不是arr_date
		trip_type: Number, 	// 行程类型。0:单程，1:往返，2:中转
		passenger_count: Number, // 	乘机人数量
		cabin_class: String, // 	舱位类型
		status: Number, // 订单状态：0待支付,1出票中,2已关闭,3有改签单,4有退票单,5出票成功,6退票申请中,7改签申请中
		insure_info_list: [ insureSchema ], // 保险信息
		price_info_list: [ priceSchema ], // 价目信息
		total_fee: Number, // 总费用，计算后获得
		cost_center: [ costCenterSchema ], // 成本中心
		invoice: [ invoiceSchema ], // 	发票信息对象
		arr_airport: String, // 到达机场
		dep_airport: String, // 出发机场
		passenger_name: String, // 乘机人，多个用‘,’分割
		flight_no: String, // 航班号
		discount: String, // 折扣
		thirdpart_itinerary_id: String // 第三方行程id
	}, {
		collection: 'flightOrders',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const FlightOrder = mongodb.model('flightOrders', flightOrderSchema);

export default FlightOrder;
