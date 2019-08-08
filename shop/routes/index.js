var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '49.235.23.12',
    user: 'root',
    password: 'hd123456',
    database: 'shop',
    port: 3306,
});

connection.connect();
/* GET home page. */
router.post('/getDate', function (req, res, next) {
    var sql = 'SELECT * FROM userInfo';
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        if (error) {
            console.log("error")
        }
        console.log('--------------------------SELECT----------------------------');
        console.log(results);
        console.log('------------------------------------------------------------\n\n');

        res.render('index', {data: results});
    });

});

module.exports = router;
