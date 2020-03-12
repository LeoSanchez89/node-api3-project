const express = require('express');
const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());

// server.use("/api/posts", postRouter);
server.use(logger);
server.use("/api/users", userRouter);

server.get('/', (req, res) => {
  const environment = process.env;
  const port = process.env.PORT || 4001;

  res.status(200).json({ api: "up", port, environment})
  // res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
	const endpoint = req.originalUrl;
  const date = new Date; 
    
  console.log(`${method} to ${endpoint} at ${date.toLocaleString()}`);
  
  next();
}

module.exports = server;
