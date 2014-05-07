$(document).one('pageinit', function () {
    var db = window.openDatabase("golfDB", "1.0", "Golf Database", 1000000);
    $(document).one('click', '#logout', function (e) {
        db.transaction(
                             function (tx) {
                                 var sql = 'UPDATE GolfDetail set RecordStatus="InActive" where UserName="' + localStorage.getItem("UserName") + '" ';
                                 tx.executeSql(sql);
                             }, function (err) {
                             },
                         function (err) {
                         }
                      );

        localStorage.clear();
        window.location.href = "index.html";
    });

    if (localStorage.getItem("UserName") == undefined && localStorage.getItem("Token") == undefined) {
        var success = false;
        db.transaction(
                function (tx) {
                    tx.executeSql('SELECT * FROM GolfDetail where RecordStatus="Active"', [], function (tx, result) {
                        for (var index = 0; index < result.rows.length; index++) {
                            var item = result.rows.item(index);
                            localStorage.setItem("Token", item.AuthToken);
                            localStorage.setItem("UserName", item.UserName);
                            localStorage.setItem("ICNo", item.ICNo);
                            localStorage.setItem("Email", item.Email);
                            localStorage.setItem("UserID", item.UserID);
                            localStorage.setItem("ClubMemberID", item.ClubMemberID);
                            localStorage.setItem("MembershipNo", item.MembershipNo);
                            localStorage.setItem("UserID", item.UserID);
                            localStorage.setItem("TokenExpiryDate", item.TokenExpiryDate);
                            localStorage.setItem("DeviceID", item.DeviceID);
                            localStorage.setItem("DeviceKey", item.DeviceKey);
                            success = true;
                        }
                    }, function (err) {

                    });
                },
                function (err) {
                },
                function (err) {
                    if (success == false) {
                        window.location.href = "index.html";
                    }
                }
                );
    }
});

