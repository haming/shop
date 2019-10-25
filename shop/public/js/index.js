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
        var defer = $.Deferred();
        var postData = {
            name: $("#name").val(),
            passwork: $("#passwork").val(),
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