const express = require('express');
const router = express.Router();

// 인증 관련 비즈니스 로직
const auth = require('../lib/auth');

// 로그인 페이지로 Get 요청
router.get(
    '/login',
    (req, res) => auth.login(req, res)
);

// 로그인 프로세스 처리 Post 요청
router.post(
    '/login_process',
    (req, res) => auth.loginProcess(req, res)
);

// 로그아웃 프로세스 처리 Get 요청
router.get(
    '/logout',
    (req, res) => auth.logout(req, res)
);

// 회원가입 페이지로 Get 요청
router.get(
    '/register',
    (req, res) => auth.register(req, res)
);

// 회원가입 프로세스 처리 Post 요청
router.post(
    '/register_process',
    (req, res) => auth.registerProcess(req, res)
);

module.exports = router;