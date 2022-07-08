const post = require("../models/post");
// Module of Node 'file system' (image uploads and modifications) in this case
const fs = require("fs");


// Create a post
exports.createPost = (req, res, next) => {
  console.log('createPost', typeof req.body.post)
  // Get the post data
  const postObject = JSON.parse(req.body.post);
  // In case the user added an _id, we remove it from the post object
  delete postObject._id;

  // Instantiate a new post
  const newPost = {
    ...postObject, // Copy all the properties of postObject
    userId: req.auth.userId,
    // We create the URL of the image, we want to make it dynamic thanks to the segments of the URL
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  };
  post
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
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      res.status(404).json({
        error: new Error("No such post!"),
      });
    }
    // Check if the user editing the post is different than the one who created it
    if (post.userId !== req.auth.postId) {
      res.status(403).json({
        error: new Error("Unauthorized request!"),
      });
    }

    // update the post
    Post.updateOne(
      { _id: req.params.id },
      {
        ...postObject,
        // Using a ternary operator to update the image if it has been updated
        imageUrl: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : undefined,
      }
    )
      .then(() => {
        if (req.file) {
          // Split the image url on "/"
          let splitedUrl = post.imageUrl.split("/");
          // Get the last segment (image name)
          let filename = splitedUrl[splitedUrl.length - 1];
          // Delete the old image from the server
          fs.unlink(__dirname + "/../images/" + filename, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
        res.status(200).json({ message: " Modified post!" });
      })
      .catch((error) => res.status(400).json({ error }));
  });
};

// Delete several post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      res.status(404).json({
        error: new Error("No such post!"),
      });
    }
    if (post.userId !== req.auth.userId) {
      res.status(403).json({
        error: new Error("Unauthorized request!"),
      });
    }
    // delete one post
    Post.deleteOne({ _id: req.params.id })
      .then(() => {
        // Split the image url on "/"
        let splitedUrl = post.imageUrl.split("/");
        // Get the last segment (image name)
        let filename = splitedUrl[splitedUrl.length - 1];
        // Delete the old image from the server
        fs.unlink(__dirname + "/../images/" + filename, (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.status(200).json({
          message: "Deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};

// Get a single post
exports.getOnePost = (req, res, next) => {
  // returns a single post based on the comparison function passed to it (by its unique id)
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// Returns an array of all the base posts of data
exports.getAllPost = (req, res, next) => {
  // Return all the posts
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

// Allows you to "like" or "dislike" a post
exports.likeorDislike = (req, res, next) => {
  // Like present in the body
  let like = req.body.like;
  // Get userID
  let userId = req.body.userId;

  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      // If it's a like
      if (like === 1) {
        // Check that the user didn't already liked or disliked the post
        if (
          !post.usersLiked.includes(userId) &&
          !post.usersDisliked.includes(userId)
        ) {
          Post.updateOne(
            {
              _id: req.params.id,
            },
            {
              // We push the user id to the like array and we increment the counter by 1
              $push: {
                usersLiked: userId,
              },
              $inc: {
                likes: +1,
              },
            }
          )
            .then(() =>
              res.status(200).json({
                message: "Like added !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        } else {
          // It is not possible to like twice the same post
          res.status(400).json({
            message: "Cannot Like!",
          });
        }
      }
      //  If it's a dislike
      if (like === -1) {
        // Check that the user didn't already liked or disliked the post
        if (
          !post.usersDisliked.includes(userId) &&
          !post.usersLiked.includes(userId)
        ) {
          Post.updateOne(
            {
              _id: req.params.id,
            },
            // We push the user id to the dislike array and we increment dislike counter by 1
            {
              $push: {
                usersDisliked: userId,
              },
              $inc: {
                dislikes: +1,
              },
            }
          )
            .then(() => {
              res.status(200).json({
                message: "Dislike added !",
              });
            })
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        } else {
          res.status(400).json({
            // It is not possible to dislike twice the same post
            message: "Cannot disliked!",
          });
        }
      }
      
      // cancel a like or dislike
      if (like === 0) {
        if (post.usersLiked.includes(userId)) {
          // If it's about canceling a like
          Post.updateOne(
            {
              _id: req.params.id,
            },
            // Remove the user id from the like array
            {
              $pull: {
                usersLiked: userId,
              },
              $inc: {
                likes: -1,
              }, // We increment by -1
            }
          )
            .then(() =>
              res.status(200).json({
                message: "Like removed !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        }

        if (post.usersDisliked.includes(userId)) {
          // If it's about canceling a dislike
          Post.updateOne(
            {
              _id: req.params.id,
            },
            {
              // Remove the user id from the dislike array
              $pull: {
                usersDisliked: userId,
              },
              $inc: {
                dislikes: -1,
              }, // We increment by -1
            }
          )
            .then(() =>
              res.status(200).json({
                message: "Dislike remove !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        }

        if (
          !post.usersDisliked.includes(userId) &&
          !post.usersLiked.includes(userId)
        ) {
          res.status(400).json({
            message: "No like or dislike to cancel!",
          });
        }
      }
    })
    .catch((error) =>
      res.status(404).json({
        error,
      })
    );
};
