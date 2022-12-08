const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  expect(dummy(blogs)).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 5,
    },
  ];

  test('when list has only one blog equals the likes of that', () => {
    expect(totalLikes(listWithOneBlog)).toBe(5);
  });

  const listWithMultipleBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 15,
    },
  ];

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(listWithMultipleBlogs)).toBe(30);
  });

  const listWithNoBlogs = [];

  test('of empty list is 0', () => {
    expect(totalLikes(listWithNoBlogs)).toBe(0);
  });
});

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 5,
    },
  ];

  test('when list has only one blog equals the likes of that', () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]);
  });

  const listWithMultipleBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 15,
    },
  ];

  test('of a bigger list is calculated right', () => {
    expect(favoriteBlog(listWithMultipleBlogs)).toEqual(
      listWithMultipleBlogs[2]
    );
  });

  const listWithNoBlogs = [];

  test('of empty list is 0', () => {
    expect(favoriteBlog(listWithNoBlogs)).toBe(0);
  });
});

describe('most blogs', () => {
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 5,
    },
  ];

  test('when list has only one blog equals the likes of that', () => {
    expect(mostBlogs(listWithOneBlog)).toEqual({
      author: 'Edsger W Dijkstra',
      blogs: 1,
    });
  });

  const listWithMultipleBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Sam Lewis',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 15,
    },
  ];

  test('of a bigger list is calculated right', () => {
    expect(mostBlogs(listWithMultipleBlogs)).toEqual({
      author: 'Edsger W Dijkstra',
      blogs: 2,
    });
  });

  const listWithNoBlogs = [];

  test('of empty list is 0', () => {
    expect(mostBlogs(listWithNoBlogs)).toBe(0);
  });
});

describe('most likes', () => {
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 5,
    },
  ];

  test('when list has only one blog equals the likes of that', () => {
    expect(mostLikes(listWithOneBlog)).toEqual({
      author: 'Edsger W Dijkstra',
      likes: 5,
    });
  });

  const listWithMultipleBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Sam Lewis',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 15,
    },
  ];

  test('of a bigger list is calculated right', () => {
    expect(mostLikes(listWithMultipleBlogs)).toEqual({
      author: 'Edsger W Dijkstra',
      likes: 20,
    });
  });

  const listWithNoBlogs = [];

  test('of empty list is 0', () => {
    expect(mostLikes(listWithNoBlogs)).toBe(0);
  });
});
