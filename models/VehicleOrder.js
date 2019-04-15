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

// 商旅用车订单列表 参考alitrip.btrip.vehicle.order.search
const VehicleOrderSchema = new mongoose.Schema(
	{
		vehicle_order_id: Number, // 火车票订单id
		gmt_create: Date, // 创建时间
		gmt_modified: Date, // 更新时间
		corp_id: String, // 企业id
		corp_name: String, // 企业名称
		user_id: String, // 用户id
		user_name: String, 	// 用户名称
		depart_id: String, // 部门id
		depart_name: String, // 部门名称
		apply_id: String, // 	商旅系统审批单id

		business_category: String, // 用车原因：TRAVEL: 差旅, TRAFFIC: 市内交通, WORK: 加班, OTHER: 其它
		car_license: String, // 车牌号
		service_type: Number, // 打车服务类型 1:出租车, 2:专车, 3:快车
		travel_distance: String, // 	行驶公里数

		cancel_time: Date, // 取消时间
		driver_confirm_time: Date, // 司机到达目的地时间
		taken_time: Date, // 乘客上车时间
		publish_time: Date, // 乘客发布用车时间
		estimate_price: String, // 	订单预估价格

		car_info: String, // 	车辆类型
		car_level: Number, // 类型级别：1经济型、2舒适型、3豪华型

		order_status: Number, // 0:初始状态 1:创建失败 2: 派单成功 3：派单失败 4: 已退款 5: 已支付 6: 取消成功 7: 冻结账户失败 8： 已超时

		memo: String, // 	打车事由
		to_city_name: String, // 	目的城市
		from_city_name: String, // 	出发城市
		to_address: String, // 目的地
		from_address: String, // 	出发地

		passenger_name: String, // 	乘客名称

		ticket_count: Number, 	// 	票的数量

		price_info_list: [ priceSchema ], // 价目信息
		cost_center: [ costCenterSchema ], // 成本中心
		invoice: [ invoiceSchema ], // 	发票信息对象
		total_fee: Number, // 总费用，计算后获得

		status: Number, // 订单状态：0待支付,1出票中,2已关闭,3,改签成功,4退票成功,5出票完成,6退票申请中,7改签申请中,8已出票,已发货,9出票失败,10改签失败,11退票失败
		thirdpart_itinerary_id: String // 第三方行程id
	}, {
		collection: 'vehicleOrders',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const VehicleOrder = mongodb.model('vehicleOrders', VehicleOrderSchema);

module.exports = VehicleOrder;
