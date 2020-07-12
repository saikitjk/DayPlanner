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

    //generate textbox
    function genTextbox(){
        for (var hour = 9; hour <= 17; hour++){
            console.log(hour);
            //timestamp
            var timeStamp = $("<div>");
            timeStamp.attr("type", "text");
            timeStamp.text(hour);
            
            timeStamp.attr("class", "timeStamp");
            //timeStamp.css("width","100%");
            
            $("#timeStamp").append(timeStamp); 
          
            //input area
            var inputBox = $("<input>");
            inputBox.attr("type", "textarea");
            inputBox.attr("value", "GG");
            inputBox.attr("class", "eventBox");
            //inputBox.css("width","100%");
            $("#eventBox").append(inputBox);

            //save button
            var saveButton = $("<button>");
            saveButton.attr("type", "button");
            saveButton.attr("value", "Save");
            saveButton.attr("class", "saveButton");
            //saveButton.css("width","100%");
            $("#saveButton").append(saveButton);
       
         
        }
    }

    genTextbox();
 /*     var saveButton = $("<button>");
            saveButton.addclass("col-md-1 fas fa-save btn-block savebutton");
            saveButton.attr("type", "button");
            saveButton.attr("value", "Save");
            $("#saveButton").append(saveButton);
            */


    //}



});

//<textarea class="eventBox col-md-9 description" id='eventBox'></textarea> <!--data-hour='9'-->
//<button class="col-md-1 fas fa-save btn-block saveBtn" id="btn"></button>