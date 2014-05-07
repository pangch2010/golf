
    $(document).on("pagecreate", "#loginpage", function () {
        alert("login page");
        alert(SERVER_END_POINT_API);
        function navigateToMenu() {
            $.mobile.navigate("menu.html");
        }


        if (localStorage.getItem("UserName") != undefined && localStorage.getItem("Token") != undefined) {


            navigateToMenu();

            $.ajaxSetup({
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("Token")
                }
            });


        }

        $("#login").click(function () {
            login($("#username").val(), $("#password").val());
        });

        function login(username, password) {
            alert(username);
            $.ajax({
                type: "POST",
                url: SERVER_END_POINT_API + "token",
                async: false,
                contentType: "application/x-www-form-urlencoded",
                data: "grant_type=password&username=" + username + "&password=" + password
            })
           .done(function (data) {

               // alert("sucess");

               localStorage.setItem("Token", data.access_token);
               localStorage.setItem("UserName", data.userName);

               var isLogin = authenticate(data);


           }).fail(function () {
               alert("Invalid login");

           });
        }


        function getDeviceID() {

            if (localStorage.getItem("DeviceKey") != null) {
                return localStorage.getItem("DeviceKey");
            } else {
                return "no-device-id";
            }

        }

        function authenticate(msg) {

            var IsAuthenticated = false;
            //alert(msg.access_token);
            var token = {
                DeviceKey: getDeviceID(),
                Token: msg.access_token,
                TokenExpiryDate: msg.expires_in,
                UserName: msg.userName
            };


            $.ajax({
                type: "POST",
                url: SERVER_END_POINT_API + "api/User/Authenticate",
                contentType: "application/json",
                async: true,
                data: JSON.stringify(token),
                headers: {
                    "Authorization": "Bearer " + msg.access_token
                }
            }).done(function (data) {

                var msg = JSON.parse(data);

                localStorage.setItem("ICNo", msg.ICNo);
                localStorage.setItem("Email", msg.Email);
                localStorage.setItem("UserID", msg.UserID);
                localStorage.setItem("ClubMemberID", msg.ClubMemberID);
                localStorage.setItem("MembershipNo", msg.MembershipNo);
                IsAuthenticated = true;
                // alert(msg.ICNo);
                navigateToMenu();
            }).fail(function () {
                IsAuthenticated = false;
                // alert("fail authenticate");

                if (localStorage.getItem("UserName") != undefined) {
                    $("#login").click();
                }



            });

            return IsAuthenticated;
        }


    });


