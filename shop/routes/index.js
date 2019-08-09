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

function resheadrt(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    //这段仅仅为了方便返回json而已
    res.header("Content-Type", "application/json;charset=utf-8");

    return res
}
/* GET home page. */
router.post('/getDate', function (req, res, next) {
    // res = resheadrt(res)
    console.log(req)
   res = resheadrt(res)
    var sql = 'SELECT * FROM userInfo';
    connection.query(sql, function (error, results, fields) {
        if (error) {
        }
        var data = {
            rows : results
        }
        res.send(data);

    });
});
router.post('/setData', function (req, res, next) {
    res = resheadrt(res);
    var userData = req.body;
    var sql = "INSERT INTO userInfo ( name,passwork )  VALUES ( '"+ userData.name + "','"+ userData.passwork +"')";

    connection.query(sql, function (error, results, fields) {
        if (error) {
            console.log("error:",error)
        }
        console.log('--------------------------SELECT----------------------------');
        console.log(results);
        console.log('------------------------------------------------------------\n\n');

        var data = {
            code :"success"
        }
        res.send(data);

    })
})

module.exports = router;
