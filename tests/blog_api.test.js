const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper');

const Blog = require('../models/Blog');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');

const api = supertest(app);

let token;

beforeAll(async () => {
  await api.post('/api/users').send({
    username: 'tester',
    name: 'Test User',
    password: 'tester',
  });

  const loginResponse = await api.post('/api/login').send({
    username: 'tester',
    password: 'tester',
  });

  token = loginResponse.body.token;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

describe('viewing a specific blog', () => {
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');
    const contents = response.body.map((r) => r.title);
    expect(contents).toContain('Go To Statement Considered Harmful');
  });

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

describe('adding a blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'test',
      url: 'test',
      likes: 0,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
    const contents = blogsAtEnd.map((n) => n.title);
    expect(contents).toContain('async/await simplifies making async calls');
  });

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'something without likes',
      author: 'test',
      url: 'test',
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });

  test('if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
    const newBlog = {
      author: 'test',
      likes: 0,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
    const contents = blogsAtEnd.map((r) => r.title);
    expect(contents).not.toContain(blogToDelete.title);
  });

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = 'test';
    await api.delete(`/api/blogs/${invalidId}`).expect(400);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test('fails with status code 404 if id is not found', async () => {
    const invalidId = await nonExistingId();
    await api.delete(`/api/blogs/${invalidId}`).expect(404);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = {
      ...blogToUpdate,
      likes: 100,
    };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
    const contents = blogsAtEnd.map((r) => r.title);
    expect(contents).toContain(updatedBlog.title);
  });

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = 'test';
    const updatedBlog = {
      title: 'updated title',
      author: 'updated author',
      url: 'updated url',
      likes: 100,
    };
    await api.put(`/api/blogs/${invalidId}`).send(updatedBlog).expect(400);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test('fails with status code 404 if id is not found', async () => {
    const invalidId = await nonExistingId();
    const updatedBlog = {
      title: 'updated title',
      author: 'updated author',
      url: 'updated url',
      likes: 100,
    };
    await api.put(`/api/blogs/${invalidId}`).send(updatedBlog).expect(404);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
