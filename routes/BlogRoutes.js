const { Router } = require('express');

const {
  getBlog,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  populateDb,
} = require('../controllers/BlogControllers');

const router = Router();

router.get('/', getBlogs);
router.post('/', createBlog);
router.get('/populate', populateDb);
router.get('/:id', getBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
