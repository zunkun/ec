import mongoose from 'mongoose';
import mongodb from '../core/db/mongodb';

// 出行人 schema
const tralvlerListSchema = new mongoose.Schema({
	user_id: String, // 出行人id
	user_name: String // 出行人姓名
});

// 行程列表schema
const itinerayListSchema = new mongoose.Schema({
	arr_city: String, // 	到达城市
	dep_city: String, // 出发城市
	traffic_type: Number, // 交通方式：0飞机, 1,火车, 2汽车, 3其他
	itinerary_id: String, // 行程单ID
	trip_way: Number, // 	行程类型：0单程，1往返
	arr_date: Date, // 到达日期 2017-01-01 00:00:00
	dep_date: Date, // 出发日期 2017-01-01 00:00:00
	invoice_id: Number, // 发票Id
	cost_center_id: Number, // 商旅成本中心id，若不填则第三方成本中心id必填
	dep_city_code: String, // 出发城市编码
	arr_city_code: String, // 到达城市编码
	thirdpart_cost_center_id: String, // 第三方成本中心id，若不填则商旅成本中心id必填
	project_code: String, // 项目代号
	project_title: String // 项目名称
});

// 商旅审批单，参考 alitrip.btrip.approval.new
const tripApprovalSchema = new mongoose.Schema(
	{
		apply_id: String, // 申请单id,在商旅中该项称之为thirdpart_apply_id 用户传入审批单id
		btrip_apply_id: String, // btrip 商旅审批单id,此值为在发出申请后返回结果中获取
		trip_title: String, // 申请单标题
		trip_day: Number, // 出差天数
		depart_id: String, // 部门id
		depart_name: String, // 部门名称
		corp_id: String, // 企业id
		corp_name: String, // 企业名称
		user_id: String, // 用户id
		user_name: String, 	// 用户名称
		trip_cause: String, // 出差理由
		status: Number, // 审批单状态，不传入默认为0：0审批中，1同意，2拒绝 本系统中 写入的都是审批同意的
		traveler_list: [ tralvlerListSchema ], // 出行人
		itinerary_list: [ itinerayListSchema ] // 行程列表
	}, {
		collection: 'tripApprovals',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const TripApproval = mongodb.model('tripApprovals', tripApprovalSchema);

export default TripApproval;
