const express = require('express');

var router = express.Router();

router.get(
    '/',
    (req, res) => author.create(req, res)
);

router.post(
    '/create_process',
    (req, res) => author.create_process(req, res)
);

router.get(
    '/update/:authorId',
    (req, res) => author.update(req, res)
);

router.post(
    '/update_process',
    (req, res) => author.update_process(req, res)
);

router.get(
    '/delete/:authorId',
    (req, res) => author.delete_process(req, res)
);

module.exports = authorRouter;