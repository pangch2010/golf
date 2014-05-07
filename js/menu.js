$(document).on('pagecreate', '#menu-page', function () {
    alert("ddd");
    //$("#logout").click(function () {

    //    alert("dsadS");
    //    // $.mobile.navigate("login.html");
    //});

    $(document).on('click', '#logout', function (e) {

        alert("ddd");

        localStorage.clear();

        $.mobile.navigate("login.html");
        //$.mobile.changePage("login.html", {
        //    transition: "pop",
        //    reverse: false,
        //    changeHash: false
        //});
    });
});


