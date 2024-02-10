import { Router } from 'express';
import productsModel from '../dao/models/products.model.js';
import usersModel from '../dao/models/users.model.js';
import cartsModel from '../dao/models/carts.model.js';

const router = Router();

router.get('/products', async (req, res) => {
	const { limit = 10, page = 1, sort = '', query = '' } = req.query;

	try {
		const options = {
			limit,
			page,
			sort: sort || {},
			query,
			lean: true,
		};

		const {
			docs,
			hasPrevPage,
			hasNextPage,
			prevPage,
			nextPage,
			page: currentPage,
		} = await productsModel.paginate({}, options);

		const username = req.session.user.username;
    const role = req.session.user.role;
    console.log('username view/prod', username, 'role', role);
    
		res.render('products', {
			username,
      role,
			products: docs,
			hasPrevPage,
			hasNextPage,
			prevPage,
			nextPage,
			page: currentPage,
			style: 'index.css',
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Error interno del servidor');
	}
});

router.get('/chat', (req, res) => {
	res.render('chat', {
		style: 'index.css',
	});
});

router.get('/realtimeproducts', async (req, res) => {
	try {
		const products = await productsModel.find({});
		res.render('realTimeProducts', {
			productos: products,
			style: 'index.css',
		});
	} catch (error) {
		console.log(error);
		res.json('Error al intentar obtener la lista de productos!');
		return;
	}
});

router.get('/productDetails/:pid', async (req, res) => {
	const { pid } = req.params;
	try {
		const product = await productsModel.findById(pid).lean();
		res.render('productDetails', {
			product,
			style: 'index.css',
		});
	} catch (error) {
		console.log(error);
		res.json('Error al intentar obtener el producto!');
		return;
	}
});

router.get('/product-added/:productId', async (req, res) => {
	try {
		const { productId } = req.params;

		res.render('product-added', { productId, style: 'index.css' });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: 'error',
			message: 'Error interno del servidor',
		});
	}
});

router.get('/carts/:cid', async (req, res) => {
	try {
		const cid = '65c2865ee7d8464e663be2b9';

		const cart = await cartsModel.findOne({ _id: cid }).lean();

		if (!cart) {
			return res.status(404).json({
				status: 'error',
				message: 'El carrito especificado no existe',
			});
		}

		res.render('cart', { cart: cart.products, style: 'index.css' }); // Renderiza la vista cart y pasa el carrito como datos.
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: 'error',
			message: 'Error interno del servidor',
		});
	}
});

router.post('/', async (req, res) => {
	try {
		const products = await productsModel.find({});
		res.render('realTimeProducts', {
			productos: products,
			style: 'index.css',
		});
	} catch (error) {
		console.log(error);
		res.render('Error al intentar obtener la lista de productos!');
		return;
	}
});

router.get('/', (req, res) => {
  res.render('login', { 
    style: 'index.css'
   });
});

router.get('/login', (req, res) => {
	res.render('login', { 
    style: 'index.css'
   });
});

router.get('/register', (req, res) => {
	res.render('register', {
    style: 'index.css'
  });
});
export default router;
