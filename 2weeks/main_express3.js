// semantic URL 사용

const express = require('express');
const app = express();

app.get(
    '/:id',
    (req, res) => {
        // var _url = req.url;
        var id = req.params.id;
        title = 'welcome';

        // var queryData = urlm.parse(_url, true).query;
        console.log(id);
        var title = id;

        var template = '';

        res.send(template);
    }
);

app.get(
    '/favicon.ico',
    (req, res) => res.writeHead(404)
);

app.listen(
    3000,
    () => console.log('Example app listening on port3000')
);