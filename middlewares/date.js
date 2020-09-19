var now = new Date();

function checkTime(i){
    if(i<10)
        i = "0" + i;
    return i;
}

module.exports.getDate = function(){
    return checkTime(now.getDate() ) + '/' + checkTime(now.getMonth() + 1) + '/' + now.getFullYear();
}

module.exports.getTime = function(){
    return checkTime(now.getHours()) + ' : ' + checkTime(now.getMinutes());
}