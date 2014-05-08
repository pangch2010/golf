//var SERVER_END_POINT_API = "http://localhost:3998/";
//var URL_API = "http://localhost:3998";
var URL_API = "http://175.139.183.94:76/GolfAPI";
var SERVER_END_POINT_API = "http://175.139.183.94:76/GolfAPI/";


var defaultDate_Test = "2008-08-17";

function showLoading() {
    $.mobile.loading("show", {
        text: "Loading",
        textVisible: true,
        textonly: false,
    });
}

function HideLoading() {
    $.mobile.loading("hide");
}

$(document).on({
    ajaxStart: function () {
        showLoading();
    },
    ajaxStop: function () {
        HideLoading();
    }
});