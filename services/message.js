const config = require('../config');
const dingding = require('../core/dingding');

class Message {
	async sendApprovalMsg (approval, userIds) {
		let singleUrl = `${config.mobileBase}approval?id=${approval.approvalId}`;
		let text = `您好，您有一条出差申请单需要审批，点击“出差审批”进行审批  \n 申请人:${approval.userName}  \n部门: ${approval.deptName}  \n 出行天数: ${approval.trip.day}天  \n 出行原因:${approval.trip.cause}`;
		// let text = '您好，您有一条出差申请单需要审批 \nsadfasdf  \n sadfasdfasd\ndsfasdf \naaaaa';
		const message = {
			touser: userIds.join('|'),
			agentid: config.agentid,
			msgtype: 'action_card',
			action_card: {
				title: '出差审批',
				markdown: `# 出差审批 \n ${text}`,
				single_title: '出差审批',
				single_url: singleUrl // 移动端访问地址
			}
		};

		console.log({ message });
		try {
			await dingding.sendMsg(message);
		} catch (error) {
			return Promise.reject('发送出差审批信息失败');
		}
	}
}

const message = new Message();

module.exports = message;
