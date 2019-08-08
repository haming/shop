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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    //这段仅仅为了方便返回json而已
    res.header("Content-Type", "application/json;charset=utf-8");
    var sql = 'SELECT * FROM userInfo';
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        if (error) {
            console.log("error")
        }
        console.log('--------------------------SELECT----------------------------');
        console.log(results);
        console.log('------------------------------------------------------------\n\n');
        var data = {
            rows : results
        }
        res.send(data);

    });

});

module.exports = router;
