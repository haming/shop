$(document).ready(function () {

    var ip = 'http://lcoalhost:3000';

    $("#getData").click(function () {
        getDate()
    })

    $("#setData").click(function () {
        setInfo()
    })

    function getDate() {
        $.post("http://192.168.11.30:3000/getDate", null, function (result) {
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