// import jwt from "jsonwebtoken";

// const private_key = "myPrivateKey";
// const generateToken = (user) =>
//   jwt.sign(user, private_key, { expiresIn: "24h" });

// const authTokenMiddleware = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) return res.status(401).send("Unauthorized request");
//   const token = authHeader.split(" ")[1]; //Bearer <token>

//   jwt.verify(token, private_key, (err, decodeUser) => {
//     if (error) {
//       return res.status(401).send("Unauthorized request");
//     }
//     req.user = decodeUser;
//     next();
//   });
// };

// export default { generateToken, authTokenMiddleware };
