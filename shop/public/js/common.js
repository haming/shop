/**
 * 搜索延迟执行
 * @param callback
 */
function delayCarry(callback) {
    var _time = 0;
    $(document).keydown(function(event){
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