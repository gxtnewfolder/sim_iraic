const express = require('express');
const router = express.Router();
const { read, list, create, update, remove } = require('../controllers/product');


const { auth } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// router.get('/product', auth, list);
// router.get('/product/:id', auth, read);
// router.post('/product', auth, upload, create);
// router.put('/product/:id', auth, update);
// router.delete('/product/:id', auth, remove);

router.get('/product', list);
router.get('/product/:id', read);
router.post('/product', upload, create);
router.put('/product/:id', upload, update);
router.delete('/product/:id', remove);

module.exports = router;