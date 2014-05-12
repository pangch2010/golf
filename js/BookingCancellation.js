var clubMemberID;
var membershipNo;

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
                    htmlString = htmlString + "<ul class=\"menu\"><li class=\"item1\">" +
                                "<ul>" +
                                    "<li data-theme=\"d\" class=\"center\"><a data-role=\"button\" data-icon=\"delete\" data-theme=\"e\" class=\"btnRight ui-btn-right-cancel ui-link ui-btn ui-btn-e ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all btnCancelBooking\" confirmID=\"" + element.ConfirmationID + "\" courseID=\"" + element.CourseID + "\" flightDateTime=\"" + element.FlightDateTime + "\" noOfHoles=\"" + element.NoOfHoles + "\" >Cancel</a>" +
                                        "<div class=\"ui-grid-solo\">" +
                                            "<h1>KLGCC</h1>" +
                                        "</div>" +
                                        "<table align=\"center\">" +
                                "<tbody><tr>" +
                                    "<th>" +
                                    "<img src=\"images/course2.png\" class=\"dialogLogo\" /><br />" +
                                    "</th>" +
                                    "<th>" +
                                        "<id class=btnLeft>" + element.CourseName + "</id>" +
                                    "</th>" +
                                "</tr>" +
                                "<tr></tr>" +
                                "<tr>" +
                                    "<th>" +
                                        "<img src=\"images/date2.png\" class=\"dialogLogo\" /><br />" +
                                    "</th>" +
                                    "<th class=\"btnLeft\">" +
                                        "<id class=\"btnLeft\">" + element.FlightDate + "</id> " +
                                    "</th>" +
                                "</tr>" +
                                "<tr></tr>" +
                                "<tr>" +
                                    "<th>" +
                                        "<img src=\"images/time.png\" class=\"dialogLogo\" /><br />" +
                                    "</th>" +
                                    "<th>" +
                                        "<id class=\"btnLeft\">" + element.FlightTime + "</id>" +
                                    "</th>" +
                                "</tr>" +
                                "<tr></tr>" +
                                 "<tr>" +
                                    "<th>" +
                                        "<img src=\"images/course2.png\" class=\"dialogLogo\" /><br />" +
                                    "</th>" +
                                    "<th>" +
                                        "<id class=\"btnLeft\">" + element.NoOfHoles + " Holes</id>" +
                                    "</th>" +
                                "</tr>" +
                            "</tbody></table></li></ul></li></ul><li style=\"background: url('/" + location.pathname.split("/")[1] + "/images/repeat-bg.jpg') \" />"
                });
                $("#wrapper").html("");
                $("#wrapper").append(htmlString);
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
        var confirmationID = $(this).attr("confirmID");        
        var courseID = $(this).attr("courseID");
        var flightDateTime = $(this).attr("flightDateTime");
        var noOfHoles = $(this).attr("noOfHoles");
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
