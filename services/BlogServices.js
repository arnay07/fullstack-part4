const Blog = require('../models/Blog');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://blog.codinghorror.com/goto-statement-damnation/',
    likes: 5,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'willremoveth',
    url: 'willremovethissoon',
    likes: 0,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const populateDb = () => Blog.insertMany(initialBlogs, { ordered: true });

const getBlogs = () => Blog.find({}).populate('user', { username: 1, name: 1 });

const getBlog = (id) => Blog.findById(id);

const createBlog = (blog) => Blog.create(blog);

const updateBlog = (id, blog) =>
  Blog.findByIdAndUpdate(id, blog, { new: true });

const deleteBlog = (id) => Blog.findByIdAndDelete(id);

const deleteAllBlogs = () => Blog.deleteMany({});

module.exports = {
  initialBlogs,
  nonExistingId,
  populateDb,
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteAllBlogs,
};
