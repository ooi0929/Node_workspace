const express = require('express');
const router = express.Router();

// 루트 관련 비즈니스 로직
const root = require('../lib/root');

// Home 페이지로 Get 요청
router.get(
    '/',
    (req, res) => {
        root.home(req, res);
    }
);

module.exports = router;