const config = require('../config');
const dingding = require('../core/dingding');

class Message {
	async sendApprovalMsg (approval, userIds) {
		let singleUrl = `${config.mobileBase}approval?id=${approval.id}`;
		let text = `您好，您有一条出差申请单需要审批，点击“出差审批”进行审批  \n 申请人:${approval.userName}  \n部门: ${approval.deptName}  \n 出行原因:${approval.trip.cause}`;
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

		try {
			await dingding.sendMsg(message);
		} catch (error) {
			console.error('发送出差审批信息失败', error);
			return Promise.resolve();
		}
	}

	async sendAppMsg (process, userIds) {
		let singleUrl = `${config.mobileBase}budget?id=${process.applicationId}?type=application`;
		let text = `您好，您有一条预算申请需要审批，点击“预算审批”进行审批  \n 申请人:${process.userName}  \n部门: ${process.deptName} `;
		const message = {
			touser: userIds.join('|'),
			agentid: config.agentid,
			msgtype: 'action_card',
			action_card: {
				title: '预算审批',
				markdown: `# 预算审批 \n ${text}`,
				single_title: '预算',
				single_url: singleUrl // 移动端访问地址
			}
		};
		console.log(singleUrl, message);
		try {
			await dingding.sendMsg(message);
		} catch (error) {
			console.log({ error });
			return Promise.resolve();
			// return Promise.reject('发送预算审批信息失败');
		}
	}

	async sendFinanceMsg (process, userIds) {
		let singleUrl = `${config.mobileBase}budget?id=${process.applicationId}?type=finance`;
		let text = `您好，您有一条预算申请需要处理，点击“预算调整”进行审批  \n 申请人:${process.userName}  \n部门: ${process.deptName} `;
		const message = {
			touser: userIds.join('|'),
			agentid: config.agentid,
			msgtype: 'action_card',
			action_card: {
				title: '预算调整',
				markdown: `# 预算调整 \n ${text}`,
				single_title: '预算',
				single_url: singleUrl // 移动端访问地址
			}
		};
		console.log(singleUrl, message);
		try {
			await dingding.sendMsg(message);
		} catch (error) {
			console.log({ error });
			return Promise.resolve();
			// return Promise.reject('发送预算审批信息失败');
		}
	}
}

const message = new Message();

module.exports = message;
