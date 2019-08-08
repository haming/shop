$(document).ready(function () {

var ip = 'http://lcoalhost:3000';
    $("button").click(function() {

    })

    getDate()
    function getDate() {

        $.ajax({
            // async:false,
            url:"http://localhost:3000/getDate",
            type:"post",
            // dataType:'jsonp',
            data:"",
            timeout:5000,
            success:function (data) {
                console.log(data);
            }
        })
    }

    function delayCarry(callback) {
        var _time = 0;
        $(document).keydown(function(event){
            console.log(event)
            if(event.keyCode != 13){
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