function auth(req, res, next) {
	const { email, password } = req.body;
	console.log('Email middle:', email, 'Password:', password);

	if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
		req.session.user = { email: 'adminCoder@coder.com', role: 'admin' };
		console.log('email auth', req.session.user.email, 'role auth ', req.session.user.role);
		console.log('role middle', req.session.user.role);
	} else {
		req.session.user = { username: 'user', role: 'user' };
	}

	next();
}

export default auth;
