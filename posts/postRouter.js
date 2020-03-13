const express = require("express");
const Posts = require("../posts/postDb.js");
const router = express.Router();

router.get("/", async (req, res) => {
	// do your magic!

	try {
		const posts = await Posts.get(req.query);
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json({ message: "error fetching posts", error });
	}
});

router.get("/:id", validatePostId, async (req, res) => {
	// do your magic!
	const id = req.params.id;
	try {
		const post = await Posts.getById(id);
		if (!post) {
			res.status(404).json({ message: "post not found" });
		} else {
			res.status(200).json(post);
		}
	} catch (err) {
		res.status(500).json({ message: "error fetching post", err });
	}
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Posts.getById(id);
    const del = await Posts.remove(id); 
    res.status(200).json({ message: `post: ${post.text}, has been removed` });
  } catch (err){
    res.status(500).json({ message: "error deleting post", err });
  }
});

router.put("/:id", async (req, res) => {
  // do your magic!

});

// custom middleware

async function validatePostId(req, res, next) {
  const id = req.params.id;
  try {
    const post = await Posts.getById(id);
    if (post) {
      next();
    } else {
      res.status(400).json({ message: `post with id of: ${id} does not exist` });
    }
  } catch (err) {
    res.status(500).json({ error: "there was an error fetching post", err });
  }
}

module.exports = router;
