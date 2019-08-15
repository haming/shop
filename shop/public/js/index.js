$(document).ready(function () {

    var ip = 'http://lcoalhost:3000';

    $("#getData").click(function () {
        getDate()
    })

    $("#setData").click(function () {
        setInfo()
    })

    //获取本机的网络ip地址
    function jsonpCallback(res) {
        var ip = res.Ip;    // ip地址
        var aa = res.Isp.split("市");
        var isp = aa[0];    // ip省份
        alert(ip);
    }

    function getIntnetIP() {
        var JSONP=document.createElement("script");
        JSONP.type="text/javascript";
        JSONP.src="http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js";

        console.log(JSONP)
        document.getElementsByTagName("head")[0].appendChild(JSONP);
    }
    getIntnetIP();
    // jsonpCallback()


    function getDate() {

        // var url = "http://192.168.11.30:3000/getDate";
        var url = "http://localhost:3000/getDate";
        $.post(url, null, function (result) {
            console.log("result:", result)
            $("#list").empty()
            for (var x in result.rows) {
                var v = result.rows[x];
                $("#list").append("<div><span>" + v.id + "</span>--<span>" + v.name + "</span>--<span>" + v.passwork + "</span></div>")
            }
        });
    }

    function setInfo() {
        var postData = {
            name : $("#name").val(),
            passwork : $("#passwork").val(),
        };
        $.post("http://192.168.11.30:3000/setData", postData, function (result) {
            console.log("result:", result)
            if(result.code == "success"){
                $("#name").val("")
                $("#passwork").val("")
            }
        });
    }

    function delayCarry(callback) {
        var _time = 0;
        $(document).keydown(function (event) {
            console.log(event)
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