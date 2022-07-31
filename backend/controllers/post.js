const postModel = require("../models/post");
// Module of Node 'file system' (image uploads and modifications) in this case
const fs = require("fs");


// Create a post
exports.createPost = (req, res, next) => {
  console.log('createPost', typeof req.body.post)
  // Get the post data
  const postObject = JSON.parse(req.body.post);

  // Instantiate a new post
  const newPost = {
    ...postObject, // Copy all the properties of postObject
    userId: req.auth.userId,
    // We create the URL of the image, we want to make it dynamic thanks to the segments of the URL
    image_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  };
  postModel
    // Saving the post in the database
    .create(newPost)
    .then(() => res.status(201).json({ message: "Post enregistré!" }))
    .catch((error) => {
      console.log('error', error);
      res.status(400).json({ error })
    });
};

// Modify a post
exports.modifyPost = (req, res, next) => {
  let postObject; // Init a variable to store post data
  if (req.body.post) {
    // If user uploaded an image, post data will be in body.post
    postObject = JSON.parse(req.body.post);
  } else {
    // Else no image has been updloaded, post data are in body
    postObject = req.body;
  }

  // Find the post in the database by its id
  postModel.findOne(req.params.id).then((post) => {
    console.log('found post', post)
    if (!post) {
      res.status(404).json({
        error: new Error("No such post!"),
      });
    }
    // Check if the user editing the post is different than the one who created it
    if (post.id_user !== req.auth.postId) {
      res.status(403).json({
        error: new Error("Unauthorized request!"),
      });
      return;
    }

    // update the post
    postModel.updateOne(
      {
        id: req.params.id,
        ...postObject,
        // Using a ternary operator to update the image if it has been updated
        image_url: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : undefined,
      }
    )
      .then(() => {
        if (req.file) {
          console.log('file to upload', post)
          // Split the image url on "/"
          let splitedUrl = post.image_url.split("/");
          // Get the last segment (image name)
          let filename = splitedUrl[splitedUrl.length - 1];
          // Delete the old image from the server
          console.log('filename', filename);
          fs.unlink(__dirname + "/../images/" + filename, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
        console.log('return 200')
        res.status(200).json({ message: " Modified post!" });
      })
      .catch((error) => res.status(400).json({ error }));
  });
};

// Delete several post
exports.deletePost = (req, res, next) => {
  postModel.findOne(req.params.id).then((post) => {
    if (!post) {
      res.status(404).json({
        error: new Error("No such post!"),
      });
    }
    if (post.id_user !== req.auth.userId) {
      res.status(403).json({
        error: new Error("Unauthorized request!"),
      });
      return;
    }
    // delete one post
    postModel.deleteOne(req.params.id)
      .then(() => {
        // Split the image url on "/"
        console.log('after delete post', post);
        let splitedUrl = post.image_url.split("/");
        // Get the last segment (image name)
        let filename = splitedUrl[splitedUrl.length - 1];
        // Delete the old image from the server
        fs.unlink(__dirname + "/../images/" + filename, (err) => {
          if (err) {
            console.log(err);
          }
        });
        console.log('Removed image', filename);
        res.status(200).json({
          message: "Deleted!",
        });
      })
      .catch((error) => {
        console.log('error', error);
        res.status(400).json({
          error: error,
        });
      });
  });
};

// Get a single post
exports.getOnePost = (req, res, next) => {
  // returns a single post based on the comparison function passed to it (by its unique id)
  postModel.getOnePost(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// Returns an array of all the base posts of data
exports.getAllPost = (req, res, next) => {
  // Return all the posts
  postModel.getAllPost()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

// Allows you to "like" a post
exports.like = (req, res, next) => {
  console.log('coucou')
  // Like present in the body
  let like = req.body.like;
  // Get userID
  let userId = req.body.userId;

  postModel.findOne(req.params.id)
    .then((post) => {
      console.log('post', post);
      console.log('like', like);
      // If it's a like
      if (like === 1) {
        console.log('like = 1');
        // Check that the user didn't already liked the post
        if (!post.usersliked.includes(userId)) {
          console.log('Will addLike');
          postModel.addLike(req.params.id, req.auth.userId)
            .then(() => {
              res.status(200).json({
                message: "Like added !",
              })
            })
            .catch((error) => {
              res.status(400).json({
                error,
              })
            });
        } else {
          // It is not possible to like twice the same post
          res.status(400).json({
            message: "Cannot Like!",
          });
        }
      }
      
      // cancel a like 
      if (like === 0) {
        if (post.usersliked.includes(userId)) {
          // If it's about canceling a like
          postModel.removeLike(req.params.id, req.auth.userId)
          .then(() => {
            res.status(200).json({
              message: "Like removed !",
            })
          })
          .catch((error) => {
            res.status(400).json({
              error,
            })
          })
        }
      }
    })
    .catch((error) =>
      res.status(404).json({
        error,
      })
    );
};
