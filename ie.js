$(function(){

let isIe = function()
{
    var ua = window.navigator.userAgent;
    return ua.indexOf("MSIE")>0 || ua.indexOf("Trident")>0;
}

if(isIe()){
    prettyAlert(
        $('header'),
        "Your browser may not be currently supported. If you have issues, please try a different browser",
        "alert-warning"
    );
}

});

