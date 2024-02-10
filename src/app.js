import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import appRouter from './routes/index.js';
import connectDB from './config/connectDB.js';
import handlebars from 'express-handlebars';
import __dirname, { uploader } from './utils.js';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import productsModel from './dao/models/products.model.js';
import messagesModel from './dao/models/messages.model.js';
import { initializeSocket } from './config/initializeSocket .js';
// import fileStore from 'session-file-store';
import MongoStore from 'connect-mongo';

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// Set up sessions

//file store-------------------------
// const FileStore = fileStore(session)
// app.use(session({
//     store: new FileStore({
//         path: './sessions',
//         ttl: 100,
//         retries: 0
//     }),
//     secret: 'coderhouse',
//     resave: true,
//     saveUninitialized: true,
// }))

// mongo store -----------------------------
app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				'mongodb+srv://loriensdesign:laureano@cluster0.jhxk024.mongodb.net/ecommerce?retryWrites=true&w=majority',
			ttl: 60 * 60 * 1000 * 24,
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		}),
		secret: 'coderhouse',
		resave: true,
		saveUninitialized: true,
	})
);

app.use(logger('dev'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use('/', viewsRouter);

app.post('/upload', uploader.single('myFile'), (req, res) => {
	res.send('imagen subida');
});

app.use(appRouter);

const httpServer = app.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`Escuchando en el puerto ${PORT}`);
});

initializeSocket(httpServer);
