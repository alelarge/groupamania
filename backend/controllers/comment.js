const postModel = require("../models/post");
const commentModel = require("../models/comment");

// Module of Node 'file system' (image uploads and modifications) in this case
const fs = require("fs");
const auth = require("../middleware/auth");


// Create a post
exports.createComment = (req, res, next) => {
  console.log('createComment', req.body)
  // Get the post data
  const commentObject = req.body;

  // Instantiate a new comment
  const newComment = {
    content: commentObject.comment, // Copy all the properties of commentObject
    userId: req.auth.userId,
    postId: req.params.postId,
  };
  commentModel
    // Saving the post in the database
    .create(newComment)
    .then(() => res.status(201).json({ message: "Commentaire enregistré!" }))
    .catch((error) => {
      console.log('error', error);
      res.status(400).json({ error })
    });
};

// Modify a post
exports.modifyComment = (req, res, next) => {
  let commentObject; // Init a variable to store comment data
  if (req.body.comment) {
    // If user uploaded an image, post data will be in body.comment
    postObject = JSON.parse(req.body.comment);
  } else {
    // Else no image has been updloaded, comment data are in body
    commentObject = req.body;
  }

  // Find the comment in the database by its id
  commentModel.findOne(req.params.id).then((comment) => {
    console.log('found comment', comment)
    if (!comment) {
      res.status(404).json({
        error: new Error("No such comment!"),
      });
    }
    // Check if the user editing the comment is different than the one who created it
    if (comment.id_user !== req.auth.commentId && req.auth.postId) {
      res.status(403).json({
        error: new Error("Unauthorized request!"),
      });
      return;
    }

    // update the comment
    commentModel.updateOne(
      {
        id: req.params.id,
        ...commentObject,
        // Using a ternary operator to update the image if it has been updated
        image_url: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : undefined,
      }
    )
      .then(() => {
        if (req.file) {
          console.log('file to upload', comment)
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

// Delete several comment
exports.deleteComment = (req, res, next) => {
  commentModel.findOne(req.params.id).then((comment) => {
    if (!comment) {
      res.status(404).json({
        error: new Error("No such comment!"),
      });
    }
    if (comment.id_user !== req.auth.userId && req.auth.post) {
      res.status(403).json({
        error: new Error("Unauthorized request!"),
      });
      return;
    }
    // delete one comment
    commentModel.deleteOne(req.params.id)
      .then(() => {
        // Split the image url on "/"
        console.log('after delete comment', comment);
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

// Get a single comment
exports.getPostComment = (req, res, next) => {
  // returns a single post based on the comparison function passed to it (by its unique id)
  postModel.getOneComment(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};
