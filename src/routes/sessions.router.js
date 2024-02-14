import { Router } from "express";
import auth from "../middleware/authentication.middleware.js";
import userManagerMongo from "../dao/Mongo/userManagerMongo.js";
// import jwtModule from "../config/jsonwebtoken.js";
// import hashModule from "../config/hashBcrypt.js";
import passport from "passport";

const router = Router();
const sessionService = new userManagerMongo();

//passport ----------------------------

router.post("/register", passport.authenticate("register", {
    failureRedirect: "/api/sessions/failregister",
  }),
  async (req, res) => {
    res.redirect("/login");
  }
);

router.get("/failregister", async (req, res) => {
  res.send({ status: "error", message: "Register Fails" });
});

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  (req, res) => {
    if (!req.user)
      return res.send({ status: "error", message: "Sessions User not found" });
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      id: req.user._id,
    };
    res.redirect("/products");
  }
);

router.get("/faillogin", (req, res) => {
  res.send({ status: "error", message: "Login Fails" });
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.send("Logout Error");
    res.redirect("/login");
  });
});

router.get("/current", auth, (req, res) => {
  res.send("<h1>datos sensibles</h1>");
});

// github ----------------------------

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/api/sessions/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/products");
  }
);

// token --------------------

//   router.post('/login', auth ,async (req, res) => {
// 	  const { email, password } = req.body;

// 	  const user = await sessionService.getUserBy({ email });
// 	  if (!user) return res.status(401).json({ error: 'User or password invalid' });
// 	  console.log('Email session:', email, 'Password:', password);

// 	  const role = req.session.user.role;

// 	  if (!hashModule.isValidPassword(password, user.password)) return res.status(401).send ('No coinciden las credenciales')

// 	  req.session.user = {
// 		  id: user._id,
// 		  username: user.first_name,
// 		  role: role
// 	  };

// 	  const token = jwtModule.generateToken({
// 		  fullname: `${user.first_name} ${user.last_name}`,
// 		  id: user._id,
// 		  email: user.email
// 	  })

// 	  res.status(200).send({
// 		  status: "success",
// 		  usersCreate: 'login success',
// 		  token
// 		 })
// 		 console.log(token)

// 	  // res.redirect('/products');
//   });

//   router.post('/register', async (req, res) => {
// 	  try {
// 		  const { first_name, last_name, email, password } = req.body;
// 		  if (email == '' || password == '')
// 			  return res.send('Faltan Campos obligatorios');

// 		  const newUser = {
// 			  first_name,
// 			  last_name,
// 			  email,
// 			  password: hashModule.createHash(password)
// 		  };
// 		  const result = await sessionService.createUsers(newUser);

// 		  const token = jwtModule.generateToken({
// 			  id: result._id,
//   })
// 		   res.status(200).send({
// 		   status: "success",
// 		   usersCreate: result,
// 		   token
// 		  })
// 		  console.log(token)

// 		  // res.redirect('/login');
// 	  } catch (error) {
// 		  res.send({ status: 'error', error: error.message });
// 	  }
//   });

//   router.get("/current", jwtModule.authTokenMiddleware, (req, res) => {
// 		res.send("<h1>datos sensibles</h1>");
//   });

export default router;
