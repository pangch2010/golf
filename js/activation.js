$(document).one('pagecreate', function () {

    $("#activate").click(function () {
        alert("testing active");
         var aToken = localStorage.getItem("aToken");
         var regid = localStorage.getItem("regid");
         var verifykey = localStorage.getItem("verifykey");

         var code = $("#code").val();
         alert(aToken + ":" + regid + ":" + verifykey + "code=" + code);
         if (code.length != 0 && code.length > 3) {
             alert("in IF loop" + URL_API);
             $.ajax({
                 type: "POST",
                 contentType: "application/json",
                 url: URL_API + "/api/User/MembershipsActivation?atoken=" + aToken + "&regid=" + regid + "&verifykey=" + verifykey + "&code=" + code ,
                 
                
             })
            .done(function (data) {
                alert("Activate Sucessfully...");
                var data = data.split("|");
                localStorage.setItem("username", data[0]);
                localStorage.setItem("password", data[1]);

                window.location.href = "login.html";
            }).fail(function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    alert('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found. [404]');

                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    alert('Time out error.');
                } else if (exception === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error.\n' + jqXHR.responseText);

                }
            });
         }
         else {
             alert("Please enter the Membership No.");

         }
    });

});