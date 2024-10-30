const express = require('express');
const router = express.Router();

const root = require('../lib/root');

router.get(
    '/',
    (req, res) => root.home(req, res)
);

module.exports = router;