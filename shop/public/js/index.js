$(document).ready(function () {

    var ip = 'http://lcoalhost:3000';

    $("#getData").click(function () {
        getDate()
    })

    $("#setData").click(function () {
        setInfo()
    })

    $("#delData").click(function () {
        deleteInfo()
    })

    function getDate() {
        // var url = "http://192.168.11.30:3000/getDate";
        var url = "http://localhost:3001/getDate";
        interfact(url,null,function (result) {
            $("#list").empty()
            for (var x in result.rows) {
                var v = result.rows[x];
                $("#list").append("<div><span>" + v.id + "</span>--<span>" + v.name + "</span>--<span>" + v.passwork + "</span></div>")
            }
        })
    }

    function setInfo() {
        var postData = {
            name : $("#name").val(),
            passwork : $("#passwork").val(),
        };

        var url = "http://localhost:3001/setData";
        interfact(url, postData,function (result) {
            if(result.code == "success"){
                $("#name").val("")
                $("#passwork").val("")
            }
        })
    }

    function deleteInfo() {
        var postData = {
            name : $("#delName").val(),
            passwork : $("#delPasswork").val(),
        };

        var url = "http://localhost:3001/delData";
        interfact(url,postData,function (result) {
            
        })
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


    function interfact(url,postData,callback) {
        $.post(url, postData, function (result) {
            callback(result)
        });
    }
})