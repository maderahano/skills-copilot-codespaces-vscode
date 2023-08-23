// Create web server
// -----------------

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create an express app
const app = express();

// Use body-parser to parse the body of a request
app.use(bodyParser.json());

// Use cors to allow cross-origin resource sharing
app.use(cors());

// Create an object to store comments
const commentsByPostId = {};

// Create a route handler for GET requests to '/posts/:id/comments'
app.get('/posts/:id/comments', (req, res) => {
  // Extract the id from the request
  const { id } = req.params;

  // Return the comments for the post with the given id
  res.send(commentsByPostId[id] || []);
});

// Create a route handler for POST requests to '/posts/:id/comments'
app.post('/posts/:id/comments', (req, res) => {
  // Extract the id from the request
  const { id } = req.params;

  // Create a random id for the comment
  const commentId = randomBytes(4).toString('hex');

  // Extract the comment from the request body
  const { content } = req.body;

  // Get the comments for the post with the given id
  const comments = commentsByPostId[id] || [];

  // Add the new comment to the comments array
  comments.push({ id: commentId, content });

  // Store the comments for the post with the given id
  commentsByPostId[id] = comments;

  // Return the comments for the post with the given id
  res.status(201).send(comments);
});

// Listen for requests on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});