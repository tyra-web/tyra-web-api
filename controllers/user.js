const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Type = require('../models/type.js');

/* Find USER by ID to keep it logged in */
exports.GetUser = (req, res) => {
	User.findById(req.query.id).exec((err, user) => {
		if(err)
			return res.status(401).json(err);

		if(user == null)
			return res.status(404).json({ error: "User doesn't exists" });

		/* Success */
		res.status(200).json({
			msg: 'User Exists',
			username: user.username,
			type: user.type
		});
	});
};

/* Find User to LogIn */
exports.Login = (req, res) => {
	const USERNAME = req.query.username;
	const PASSWORD = req.query.password;

	User.findOne({ username: USERNAME }).then(user => {
		if(!user)
			return res.status(404).json({ msg: "User does't exists" });

		bcryptjs.compare(PASSWORD, user.password, (err, data) => {
			if(err)
				throw err;

			if(data){
				const ACCESS_TOKEN = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)

				res.status(200).json({
					msg: 'LogIn Success',
					user: {
						_id: user._id,
						username: user.username,
						type: user.type
					},
					accessToken: ACCESS_TOKEN
				});
			}else{
				res.status(401).json({ msg: 'Invalid Credentials' });
			}
		});
	});
};

/* Create User */
exports.Signup = (req, res) => {
	bcryptjs.hash(req.body.password, 10, (err, hashed_password) => {
		if(err)
			return res.status(406).json(err);

		const MY_TYPE = new Type({ name: req.body.type });

		const user = new User({
			username: req.body.username,
			password: hashed_password,
			type: MY_TYPE,
			fullName: req.body.fullName,
			branchOffice: req.body.branchOffice
		}).save(err => {
			if(err)
				return res.status(406).json(err);

			/* Success */
			res.sendStatus(201);
		});
	});
};

/* Update User */
exports.Update = (req, res) => {
	bcryptjs.hash(req.body.password, 10, (err, hashed_password) => {
		if(err)
			return res.status(406).json(err);

		/* Success */
		const MY_TYPE = new Type({ name: req.body.type });

		User.findByIdAndUpdate(req.body.id, {
			_id: req.body.id,
			username: req.body.username,
			password: hashed_password,
			type: MY_TYPE,
			fullName: req.body.fullName,
			branchOffice: req.body.branchOffice
		}, err => {
			if(err)
				return res.status(406).json(err);

			/* Success */
			res.sendStatus(201);
		});
	});
};

/* Get all Users */
exports.GetUsers = (req, res, next) => {
	User.find()
		.populate('user')
		.exec((err, users) => {
			if(err)
				return res.status(406).json(err);

			/* Success */
			res.status(200).json(users);
		});
};

/* Delete User */
exports.Delete = (req, res) => {
	if(req.body.type === 'admin')
		return res.status(406).json({ msg: "Can't remove admin user" });

	User.findByIdAndRemove(req.body.id, (err) => {
		if(err)
			return res.status(406).json(err);

		/* Success */
		res.sendStatus(200);
	});
};
