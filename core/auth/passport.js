
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');
const { stringHash } = require('../../util');

passport.use(new LocalStrategy(async (username, password, done) => {
	console.log('鉴权', { username, password });
	let user = await User.findOne({ where: { username } });
	if (!user) {
		console.log(`系统没有${username}用户`);
		done(null, false);
		return;
	}
	// 系统默认管理员账户和密码
	if (username === 'admin' && password === 'abcd1234') {
		console.log('管理员账户，登录成功');
		done(null, user);
		return;
	}

	let hashedPassword = stringHash(password);
	console.log(user.password, hashedPassword);
	if (user.password === hashedPassword) {
		console.log('鉴权成功，用户名和密码正确');
		done(null, user);
		return;
	}
	console.log('鉴权失败，密码不正确');
	done(null, false);
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findOne({ where: { id } });
	done(null, user);
});

module.exports = passport;
