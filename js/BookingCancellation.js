var clubMemberID;
var membershipNo;
var confirmationID;
var courseID;
var flightDateTime;
var noOfHoles;

function loadBooking(membershipNo) {
    var htmlString = "";

    $.ajax({
        url: SERVER_END_POINT_API + '/api/Booking/GetByMemberID?',
        type: 'GET',
        dataType: 'json',
        data: {
            MembershipNo: membershipNo
        },
        success: function (result) {
            if (result != null && result != "") {
                $.each(result, function (index, element) {

                    htmlString = htmlString + "<ul data-role=\"listview\" data-inset=\"true\">" +
                    "<li data-role=\"list-divider\" data-theme=\"b\">" +
                        "<label>Booking ID:" + element.ConfirmationID + "<img src=\"images/cross.png\" class=\"deleteIcon btnCancelBooking\" confirmid=\"" + element.ConfirmationID + "\" courseid=\"" + element.CourseID + "\" flightdatetime=\"" + element.FlightDateTime + "\" noofholes=\"" + element.NoOfHoles + "\" /></label></li> " +
                    "<li data-theme=\"d\"><div class=\"ui-grid-b center\"><br />" +
                            "<div class=\"ui-block-a\"><img src=\"images/date.png\" class=\"cancellationIcon\" /></div>" +
                            "<div class=\"ui-block-b\"><img src=\"images/time.png\" class=\"cancellationIcon\" /></div>" +
                            "<div class=\"ui-block-c\"><img src=\"images/hole.png\" class=\"cancellationIcon\" /></div>" +
                            "<div class=\"ui-block-a\"><id>" + element.FlightDate + "</id></div>" +
                            "<div class=\"ui-block-b\"><id>" + element.FlightTime + "</id></div>" +
                            "<div class=\"ui-block-c\"><id>" + element.NoOfHoles + " Holes</id></div></div><br /></li>" +
                    "<li data-role=\"list-divider\" data-theme=\"b\">" +
                        "<label>" + element.CourseName + "</label></li></ul>"
                });
                $("#wrapper").html("");
                $("#wrapper").append(htmlString).trigger("create");
            } else {
                htmlString = htmlString + "<h1>You have no upcoming booking.</h1>"
                $("#wrapper").html("");
                $("#wrapper").append(htmlString);
            }

        },
        error: function () {
            alert("error");
        },
    });
}
$(document).one("pagebeforeshow", function () {
    if (localStorage.getItem("ClubMemberID") != null) {
        clubMemberID = localStorage.getItem("ClubMemberID");
    }
    if (localStorage.getItem("MembershipNo") != null) {
        membershipNo = localStorage.getItem("MembershipNo");
    }
    loadBooking(membershipNo);

    $(document).off('click', '.btnCancelBooking').on('click', '.btnCancelBooking', function (e) {
        confirmationID = $(this).attr("confirmid");
        courseID = $(this).attr("courseid");
        flightDateTime = $(this).attr("flightdatetime");
        noOfHoles = $(this).attr("noofholes");
        $("#popupDialog").popup("open");
    });

    $(document).off('click', '#cancelBooking').on('click', '#cancelBooking', function (e) {
        submitCancel(membershipNo, confirmationID, clubMemberID, courseID, flightDateTime, noOfHoles);
    });
});
function submitCancel(membershipno, confirmationid, clubMemberID, courseID, flightDateTime, noOfHoles) {
    $.ajax({
        url: SERVER_END_POINT_API + '/api/Booking/CancelBooking',
        type: 'GET',
        dataType: 'json',
        data: {
            MembershipNo: membershipno,
            ConfirmationID: confirmationid,
            ClubMemberID: clubMemberID,
            CourseID: courseID,
            FlightDateTime: flightDateTime,
            NoOfHoles: noOfHoles,
        },
        success: function (result) {
            if (result != null) {
                if (result == "ok") {
                    alert("Cancel Success");
                    loadBooking(membershipNo);
                } else {
                    alert("fail to cancel");
                }
            } else {
                alert("fail to cancel");
            }
        },
        error: function () {
            alert("error");
        },
    });
}
