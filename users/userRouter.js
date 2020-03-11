const express = require('express');
const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");
const router = express.Router();

router.post('/', (req, res) => {
  
  Users.insert(req.body)
		.then(added => {
			res.status(201).json(added);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ error: "error adding user" });
		});
});

router.post('/:id/posts', (req, res) => {
  
 Users.getUserPosts(req.params.id)
		.then(userPosts => {
      Posts.insert(req.body)
				.then(post => {
					res.status(201).json(post);
				})
				.catch(error => {
					console.log(error);
					res.status(500).json({ error: "error posting" });
				});
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ error: "error fetching user posts" });
		});
  
});

router.get('/', (req, res) => {
 
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "error retrieving users" });
    });
});

router.get('/:id', (req, res) => {
  
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: "error fetching user by id" });
    });
});

router.get('/:id/posts', (req, res) => {

  Users.getUserPosts(req.params.id)
    .then(posts => {
     
			res.status(200).json(posts);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ error: "error fetching user posts" });
		});
});

router.delete('/:id', (req, res) => {
  
  Users.remove(req.params.id)
    .then(deleted => {
      res.status(200).json({ message: `user ${req.params.id} has been nuked`});
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "error deleting user" });
    });
});

router.put('/:id', (req, res) => {
  
  Users.update(req.params.id, req.body)
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
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
