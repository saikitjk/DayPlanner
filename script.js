$(document).ready(function(){
    function headerClock(){
    //Time date on the header
    var nowDay = moment().format('MMMM DD gggg, dddd');
    var nowTime = moment().format('LTS');
    var currentDay = $("#currentDay");
    var currentTime = $("#currentTime");
    currentDay.text(nowDay);
    currentTime.text(nowTime);
    }

    headerClock();
    setInterval(headerClock,1000);
    //Time date on the header

    //generate tex



});