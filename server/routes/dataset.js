const express = require('express');
const router = express.Router();
const { read, list, create, update, remove } = require('../controllers/dataset');


const { auth } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// router.get('/dataset', auth, list);
// router.get('/dataset/:id', auth, read);
// router.post('/dataset', auth, upload, create);
// router.put('/dataset/:id', auth, update);
// router.delete('/dataset/:id', auth, remove);

router.get('/dataset', list);
router.get('/dataset/:id', read);
router.post('/dataset', upload, create);
router.put('/dataset/:id', upload, update);
router.delete('/dataset/:id', remove);

module.exports = router;