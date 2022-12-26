const {
  getBlog: _getBlog,
  getBlogs: _getBlogs,
  createBlog: _createBlog,
  updateBlog: _updateBlog,
  deleteBlog: _deleteBlog,
  populateDb: _populateDb,
  deleteAllBlogs,
} = require('../services/BlogServices');

const User = require('../models/User');

const jwt = require('jsonwebtoken');

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const getBlogs = async (req, res) => {
  const blogs = await _getBlogs();
  res.json(blogs);
};

const getBlog = async (req, res) => {
  const blog = await _getBlog(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).send({ error: 'blog not found' });
  }
};

const createBlog = async (req, res) => {
  const body = req.body;
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: user._id,
  };

  if (!blog.title || !blog.url) {
    return res.status(400).send({ error: 'title or url missing' });
  }

  const createdBlog = await _createBlog(blog);
  user.blogs = user.blogs.concat(createdBlog._id);
  await user.save();
  res.status(201).json(createdBlog);
};

const deleteBlog = async (req, res) => {
  const deletedBlog = await _deleteBlog(req.params.id);
  if (!deletedBlog) return res.status(404).send({ error: 'blog not found' });
  res.status(204).json(deletedBlog);
};

const updateBlog = async (req, res) => {
  const body = req.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await _updateBlog(req.params.id, blog);
  if (!updatedBlog) return res.status(404).send({ error: 'blog not found' });
  res.status(200).json(updatedBlog);
};

const populateDb = async (req, res) => {
  await deleteAllBlogs();
  const result = await _populateDb();
  res.status(200).send({ message: `populated db with ${result.length} blogs` });
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  populateDb,
};
