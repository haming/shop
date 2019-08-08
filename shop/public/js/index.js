$(document).ready(function () {

var ip = 'http://lcoalhost:3000';
    $("button").click(function() {
        getDate()
    })


    function getDate() {
        $.post("http://192.168.11.30:3000/getDate",null,function(result){
            console.log("result:",result)
        });
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