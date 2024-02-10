import { Router } from 'express';
import auth from '../middleware/authentication.middleware.js';
import userManagerMongo from '../dao/Mongo/userManagerMongo.js';

const router = Router();
const sessionService = new userManagerMongo();

router.post('/login', auth ,async (req, res) => {
	const { email, password } = req.body;

	const user = await sessionService.getUserBy({ email });
	if (!user) return res.status(401).json({ error: 'User or password invalid' });
	console.log('Email session:', email, 'Password:', password);

	
	const role = req.session.user.role;

    req.session.user = { 
        id: user._id, 
        username: user.first_name, 
        role: role // Asignamos el rol obtenido del middleware
    };
	    
    res.redirect('/products');
});

router.post('/register', async (req, res) => {
	try {
		const { first_name, last_name, email, password } = req.body;
		if (email == '' || password == '')
			return res.send('Faltan Campos obligatorios');

		const newUser = {
			first_name,
			last_name,
			email,
			password,
		};
		const result = await sessionService.createUsers(newUser);

		res.redirect('/login');
	} catch (error) {
		res.send({ status: 'error', error: error.message });
	}
});

router.get('/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) return res.send('Logout Error');
		res.redirect('/login');
	});
});

router.get('/current', auth, (req, res) => {
	res.send('<h1>datos sensibles</h1>');
});

export default router;
