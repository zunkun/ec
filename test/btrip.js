const Approvals = require('../models/Approvals');
// const Staffs = require('../models/Staffs');
// const jwt = require('jsonwebtoken');

// const util = require('../core/util');
// const approvalService = require('../services/approval');
const btrip = require('../services/btrip');

async function test () {
	let approval = await Approvals.findOne({ 'approvalId': '20190505172926634052643' });

	await btrip.createApproval(approval);
}

test();
