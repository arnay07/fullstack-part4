const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce(
        (favorite, blog) => (favorite.likes > blog.likes ? favorite : blog),
        0
      );
};

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? 0
    : _.chain(blogs)
        .groupBy('author')
        .map((objs, key) => ({
          author: key,
          blogs: objs.length,
        }))
        .value()
        .reduce(
          (favorite, blog) => (favorite.blogs > blog.blogs ? favorite : blog),
          0
        );
};

const mostLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : _.chain(blogs)
        .groupBy('author')
        .map((objs, key) => ({
          author: key,
          likes: _.sumBy(objs, 'likes'),
        }))
        .value()
        .reduce(
          (favorite, blog) => (favorite.likes > blog.likes ? favorite : blog),
          0
        );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
