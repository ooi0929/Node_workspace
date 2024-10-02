const db = require('./db');

module.exports = {
    home: (req, res) => {
        db.query(
            'SELECT * FROM topic',
            (err, results) => {
                var lists = '<ol type="1">';
                
                var i = 0;
                while(i < results.length) {
                    lists += `<li><a href="#">${results[i].title}</a></li>`;
                    i ++;
                }

                lists += '</ol>';
                

                var context = {
                    title: 'Welcome-db 모듈 생성',
                    list: lists,
                };
                console.log(context);

                res.render('home', context, (err, html)=> res.end(html));
            }
        );
    }
}