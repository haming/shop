$(document).ready(function () {

    var ip = 'http://localhost:3000';

    $("#getData").click(function () {
        getDate()
            .then(function (data) {
                $("#list").empty();
                for (var x in data) {
                    var v = data[x];
                    $("#list").append("<div><span>" + v.id + "</span>--<span>" + v.name + "</span>--<span>" + v.passwork + "</span></div>")
                }
            })
    })

    $("#setData").click(function () {
        var defer = $.Deferred();
        getDate()
            .then(function (data) {
                return checkUserName(data)
            })
            .then(function (data) {
                console.log("setInfo:data",data)
                return setInfo()
            })
            .fail(function (data) {
                alert(data)
            })

        return defer.promise();
    });

    function checkUserName(data) {
        var defer = $.Deferred();
        var username = $("#name").val();
        $.each(data, function (_index, item) {
            if (item.name == username) {
                defer.reject("已有相同的名称")
            }else{
                if(_index == data.length-1){
                    defer.resolve(data)
                }
            }
        });
        return defer.promise();
    }

    //获取本机的网络ip地址
    function jsonpCallback(res) {
        var ip = res.Ip;    // ip地址
        var aa = res.Isp.split("市");
        var isp = aa[0];    // ip省份
        alert(ip);
    }

    function getIntnetIP() {
        var JSONP = document.createElement("script");
        JSONP.type = "text/javascript";
        JSONP.src = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js";

        document.getElementsByTagName("head")[0].appendChild(JSONP);
    }

    getIntnetIP();

    // jsonpCallback()


    function getDate() {
        var defer = $.Deferred();
        // var url = "http://192.168.11.30:3000/getDate";
        var url = ip + "/getDate";
        $.post(url, null, function (result) {
            defer.resolve(result.rows);
        });

        return defer.promise();
    }


    function setInfo() {
        var defer = $.Deferred();
        var postData = {
            name: $("#name").val(),
            passwork: $("#passwork").val(),
        };

        var url = ip + '/setData'
        $.post(url, postData, function (result) {
            if (result.code == "success") {
                $("#name").val("")
                $("#passwork").val("")
            }
            defer.resolve();
        });
        return defer.promise();
    }

    function delayCarry(callback) {
        var _time = 0;
        $(document).keydown(function (event) {
            if (event.keyCode != 13) {
                clearTimeout(_time)
                time(callback)
            }
        });

        function time(_callback) {
            _time = setTimeout(function () {
                _callback()
            }, 3000)
        }
    }

})