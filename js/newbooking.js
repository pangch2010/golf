﻿var value;
var course;
var date;
var time;
var hole;


function GenerateDateDropDownList() {
    var nowDate;
    
    var weekday = new Array(7);
    var month = new Array(14);

    weekday[0] = "SUN";
    weekday[1] = "MON";
    weekday[2] = "TUE";
    weekday[3] = "WED";
    weekday[4] = "THU";
    weekday[5] = "FRI";
    weekday[6] = "SAT";
    var monthName = new Array(12);
    monthName[0] = "January";
    monthName[1] = "February";
    monthName[2] = "March";
    monthName[3] = "April";
    monthName[4] = "May";
    monthName[5] = "June";
    monthName[6] = "July";
    monthName[7] = "August";
    monthName[8] = "September";
    monthName[9] = "October";
    monthName[10] = "November";
    monthName[11] = "December";

    $("#dropDate").html("<option Date='0'>-- Please Select a Date -- </option>");
    if (defaultDate_Test != "") {
        nowDate = new Date(defaultDate_Test);
    }
    else {
        nowDate = new Date();
    }
    
    for (var i = 1; i <= 14; i++) {
        var addDate = new Date(nowDate);
        addDate.setDate(nowDate.getDate() + i);
        var displayDate = new Date(addDate);
        
        var day = weekday[displayDate.getDay()];
        month[i] = monthName[displayDate.getMonth()];

        var date = displayDate.getFullYear() + "-" + (displayDate.getMonth() + 1) + "-" + displayDate.getDate();
        var DropdownlistDate = displayDate.getDate() + "/" + (displayDate.getMonth() + 1) + "/" + displayDate.getFullYear() + " " + weekday[displayDate.getDay()];
         
        $("#dropDate").append("<option Date=" + date + ">" + DropdownlistDate + "</option>");
    }
    $('#dropDate').selectmenu('refresh', true);

}
function GenerateCourseDropdownList() {
    $("#dropCourse").html("<option value='0' ClientID='0'>-- Please Select a Course --</option>");

    $.ajax({
        type: "GET",
        url: SERVER_END_POINT_API + "/api/TimeSlot/Course",
        success: function (result) {
            $.each(result, function (index, element) {
                $("#dropCourse").append("<option value=" + element.CourseID + " ClientID=" + element.ClientCourseID + ">" + element.CourseName + "</option>");
            });
            $('#dropCourse').selectmenu('refresh', true);
        },
        fail: function (jqXHR, exception) {
            alert(exception);
        }

    });
}
$(document).one('pagecreate', function () {
    GenerateDateDropDownList();
    GenerateCourseDropdownList();
});
$(document).on('pagebeforeshow', function () {
    $(document).off('click', '#SubmitBooking').on('click', '#SubmitBooking', function (e) {
        course = $('#dropCourse :selected').val();
        var clubMemberID = "38";
        if (localStorage.getItem("ClubMemberID") != null) {
            clubMemberID = localStorage.getItem("ClubMemberID");
        }
        $.ajax({
            type: "GET",
            url: SERVER_END_POINT_API + "api/Booking/Book",
            async: false,
            dataType: 'json',
            data: {
                Date: date + " " + value ,
                CourseCode: course,
                MembershipNo: "",
                HoleType: hole,
                ClubmemberID: clubMemberID,
            },
            success: function (result) {
                $.mobile.changePage("bookingConfirmed.html", { data: { "BookingID": result } });
            }
        });
    });

    $(document).off('click', '#btnSearch').on('click', '#btnSearch', function (e) {
        date = $('#dropDate :selected').attr("date");
        course = $('#dropCourse :selected').attr("value");
        ClientcourseID = $('#dropCourse :selected').attr("ClientID");
        time = $("input[name='radio-time']:checked").val();
        if (date == 0) {
            alert("Please Select a Date");
        }
        else if (course == 0) {
            alert("Please Select a Course");
        }
        else {
        $.ajax({
            type: "GET",
            url: SERVER_END_POINT_API + "/api/TimeSlot/Settings",
            dataType: 'json',
            data: {
                Date: date,
                CourseCode: ClientcourseID,
                Type: time,
            },
            success: function (result) {
                $("#listFlight").html("");
                $.each(result, function (index, element) {
                    var time = element;
                    var res = time.split(" ");
                    $("#listFlight").append("<button class=" + 'btnFlight' + " data-role=" + 'button' + " data-theme=" + 'c' + " data-corners=" + 'false' + " data-mini=" + 'true' + " data-inline=" + 'true' + " value =" + res + " time =" + res + ">" + time + "</button>").trigger("create");
                });
                $("#listFlight").append("<br/><br/>").children().last().trigger("create");
               
            },
            error: function () {
                alert("Error On get Data From Server");
            }
        });
        }
    });

    $(document).off('click', '.btnFlight').on('click', '.btnFlight', function (e) {
        value = $(this).attr("time");
        course = $('#dropCourse :selected').text();
        date = $('#dropDate :selected').attr("date");
        var datedisplayed = $('#dropDate :selected').text();
        time = $("input[name='radio-time']:checked").attr("value");
        hole = $("input[name='radio-hole']:checked").attr("value");

        var timeDisplay = value.split(",");
        $("#Inside-Course").html(course);
        $("#Inside-DateTime").html(datedisplayed);
        $("#Inside-Time").html(timeDisplay[0] + " [ " + time + " ]");
        $("#Inside-Hole").html("[ " + hole + " ]");
        $("#popup_Booking").popup("open");
    });
});
