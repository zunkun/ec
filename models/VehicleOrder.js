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

// 商旅用车订单列表 参考alitrip.btrip.vehicle.order.search
const VehicleOrderSchema = new mongoose.Schema(
	{
		groupCode: String, // group code
		groupName: String, // group name
		id: Number, // 火车票订单id
		year: String,
		month: String,
		day: String,
		gmt_create: Date, // 创建时间
		gmt_modified: Date, // 更新时间
		corpid: String, // 企业id
		corp_name: String, // 企业名称
		userid: String, // 用户id
		user_name: String, 	// 用户名称
		deptid: String, // 部门id
		dept_name: String, // 部门名称
		apply_id: String, // 	商旅系统审批单id
		apply_show_id: String, // 商旅审批单展示id(非审批api对接企业)

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

		order_status: Number, // 订单状态:0:初始状态,1:已超时,2:派单成功,3:派单失败,4:已退款,5:已支付,6:已取消

		memo: String, // 	打车事由
		real_from_city_name: String, // 实际出发城市
		real_to_city_name: String, // 实际到达城市
		from_city_name: String, // 	出发城市
		to_city_name: String, // 	目的城市
		from_address: String, // 	出发地
		to_address: String, // 目的地

		passenger_name: String, // 	乘客名称

		pay_time: Date, // 支付时间

		price_info_list: [ priceSchema ], // 价目信息
		total_fee: Number,
		cost_center_id: String, // 	商旅成本中心id
		cost_center_number: String, // 成本中心编号
		cost_center_name: String, // 	成本中心名称
		invoice_id: String, // 	商旅发票id
		invoice_title:	String, // 	发票抬头
		thirdpart_itinerary_id: String // 第三方行程id
	}, {
		collection: 'vehicleOrders',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const VehicleOrder = mongodb.model('vehicleOrders', VehicleOrderSchema);

module.exports = VehicleOrder;
