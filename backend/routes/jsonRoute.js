const express = require('express');
const router = express.Router();
const { getData } = require('../controllers/jsonController');

router.get('/', getData);

module.exports = router;
