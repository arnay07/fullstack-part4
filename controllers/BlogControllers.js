const {
  getBlog: _getBlog,
  getBlogs: _getBlogs,
  createBlog: _createBlog,
  updateBlog: _updateBlog,
  deleteBlog: _deleteBlog,
  populateDb: _populateDb,
  deleteAllBlogs,
} = require('../services/BlogServices');

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
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const createdBlog = await _createBlog(blog);
  res.status(201).json(createdBlog);
};

const deleteBlog = async (req, res) => {
  const deletedBlog = await _deleteBlog(req.params.id);
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
