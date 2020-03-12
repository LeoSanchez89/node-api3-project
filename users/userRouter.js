const express = require('express');
const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  
  Users.insert(req.body)
		.then(added => {
			res.status(201).json(added);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ error: "error adding user" });
		});
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  req.body.user_id = req.user.id
  Posts.insert(req.body)
		.then(post => {
			res.status(201).json(post);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ error: "error posting" });
		});
  
});

router.get('/', (req, res) => {
 
  Users.get(req.query)
    .then(users => {
      res.status(200).json({ motd: process.env.MOTD, users });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "error retrieving users" });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  
  Users.getById(req.user.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: "error fetching user by id" });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {

  Users.getUserPosts(req.user.id)
    .then(posts => {
     
			res.status(200).json(posts);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ error: "error fetching user posts" });
		});
});

router.delete('/:id', validateUserId, (req, res) => {
  
  Users.remove(req.user.id)
    .then(deleted => {
      res.status(200).json({ message: `user ${req.user.name} has been nuked`});
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "error deleting user" });
    });
});

router.put('/:id', validateUserId, (req, res) => {
  
  Users.update(req.user.id, req.body)
    .then(updated => {
      res.status(201).json({message: "username successfully updated"});
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "error updating username" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic! 
 Users.getById(req.params.id)
   .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ message: "error finding user", error });
		});
}

function validateUser(req, res, next) {
  // do your magic!

  if (req.body === {}) {
		res.status(400).json({ message: "missing user data" });
	} else if (!req.body.text) {
		res.status(400).json({ message: "missing required name field" });
	} else {
		next();
	}
}

function validatePost(req, res, next) {
	// do your magic!

	if (!req.body) {
		res.status(400).json({ message: "missing post data" });
	} else if (!req.body.text) {
		res.status(400).json({ message: "missing required text field" });
	} else {
		next();
	}
}

module.exports = router;
