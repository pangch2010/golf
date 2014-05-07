function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}
function convertJsonDateTime(data) {
    var dateString = data;
    var reggie = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
    var dateArray = reggie.exec(dateString);
    var dateObject = new Date(
        (+dateArray[1]),
        (+dateArray[2]) - 1, // Careful, month starts at 0!
        (+dateArray[3]),
        (+dateArray[4]),
        (+dateArray[5]),
        (+dateArray[6])
    );
    return dateObject;
}
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    var hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
$(document).one('pagebeforeshow', function (event, data) {
    var parameters = getURLParameter("BookingID");
    $.ajax({
        url: SERVER_END_POINT_API + 'api/Booking/GetBookingDetail',
        type: 'GET',
        dataType: 'json',
        data: {
            BookingID: parameters,
        },
        success: function (Data) {
            Club = Data.Club;
            RecordStatus = Data.RecordStatus;
            FlightDateTime = new Date(convertJsonDateTime(Data.FlightDateTime));
            Course = Data.Course;
            $('#bookedClub').html("");
            $("#bookedClub").append(Club);
            $('#bookedCourse').html("");
            $("#bookedCourse").append(Course);
            $('#bookedDate').html("");
            $("#bookedDate").append(FlightDateTime.getFullYear() + "-" + (FlightDateTime.getMonth() + 1) + "-" + FlightDateTime.getDate());
            $('#bookedTime').html("");
            $("#bookedTime").append(formatAMPM(FlightDateTime));
        }
    });
});