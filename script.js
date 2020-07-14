$(document).ready(function(){
    var nowDay = moment().format("MMMM DD gggg, dddd");
    var nowTime = moment().format("LTS");
    var currentHour = moment().hour();
    var currentDay = $("#currentDay");
    var currentTime = $("#currentTime");
    function headerClock(){
    //Time date on the header
    currentDay.text(nowDay);
    currentTime.text(nowTime);
    }

    headerClock();
    setInterval(headerClock,1000);
    //Time date on the header

    //retrieve event
    var eventArray = [];
    savedEvent = JSON.parse(localStorage.getItem("storedArray"));
    if(savedEvent !== null){
        eventArray = savedEvent;
    }

    var eventRowContainer = $("#eventContainer");
    eventRowContainer.empty();

    for (var hour = 0; hour <= 24; hour++) {
        //set index for labeling input box
        var i = hour;
        var j = hour;
        if(j > 12){
            j = j-12;
        }
        else if ( j === 0){
            j = j+12;
        }
        //display time
        var ampm = "";
        if (hour > 12) { 
            ampm = "PM";
        } 
        else {
            ampm = "AM";
        }
        
        var eventRow = $("<div>");
        eventRow.addClass("row");
        eventRow.addClass("eventRow");
        eventRow.attr("row-index",hour);
    
        //build the column in eventContainer
        var timeColumn = $("<div>");
        timeColumn.addClass("col-md-2 col-sm-2");
        var inputColumn = $("<div>");
        inputColumn.addClass("col-md-9  col-sm-8");
        var saveButtonColumn = $("<div>");
        saveButtonColumn.addClass("col-md-1 col-sm-2");

        const timeStamp = $("<div>");
        timeStamp.attr("class","timeStamp");

        //time stamp
        timeStamp.text(j + " " + ampm);
        eventRow.append(timeColumn);
        timeColumn.append(timeStamp);
    
        //input box
        var eventInputBox = $("<input>");
        eventInputBox.attr("id", `inputBoxId${i}`);
        eventInputBox.attr("boxIndex",i);
        eventInputBox.attr("type","text");
        eventInputBox.attr("class","eventBox");
        eventInputBox.val(eventArray[i]);
        eventRow.append(inputColumn);
        inputColumn.append(eventInputBox);


        //save button
        var saveButton = $("<button>");
        saveButton.attr("id", `saveButtonId${i}`);
        //console.log("gg" + index);
        saveButton.attr("saveIndex",i);
        saveButton.attr("class","far fa-save saveButton");
        eventRow.append(saveButtonColumn);
        saveButtonColumn.append(saveButton);

        eventRowColor();
        //append to html
        eventRowContainer.append(eventRow);
    
       };//end of for loop

    //button section
    var buttonContainer = $("#buttonContainer");

    var buttonRow = $("<div>");
    buttonRow.addClass("row");
    buttonRow.addClass("buttonRow");

    //build the columns in buttonContainer
    var leftColumn = $("<div>");
    leftColumn.addClass("col-md-4 col-sm-3");
    var middleColumn = $("<div>");
    middleColumn.addClass("col-md-4 col-sm-3");
    var rightColumn = $("<div>");
    rightColumn.addClass("col-md-4 col-sm-3");

    //left button
    var leftButton = $("<button>");
    leftButton.attr("id", "previousDay"); 
    leftButton.attr("class","btn btn-primary");
    buttonRow.append(leftColumn);
    leftColumn.append(leftButton);
    //middle button
    var middleButton = $("<button>");
    middleButton.attr("id", "clearEvent"); 
    middleButton.attr("class","btn btn-warning");
    buttonRow.append(middleColumn);
    middleColumn.append(middleButton);

    //right button
    var rightButton = $("<button>");
    rightButton.attr("id", "nextDay"); 
    rightButton.attr("class","btn btn-primary");
    buttonRow.append(rightColumn);
    rightColumn.append(rightButton);

    //append to buttonContainer
    buttonContainer.append(buttonRow)

       //on click save button
       $(document).on("click","button", function(event){
            event.preventDefault();  
            //var event2Save = document.getElementById("eventBox").value;
            //console.log(event2Save);
           

            var saveIndex = $(this).attr("saveIndex");
            var inputId = "#inputBoxId" + saveIndex;
            var value = $(inputId).val();
            //console.log('value= ', value); 
            //console.log('index= ', saveIndex); 
            if(value === ""){
                return; //check if tany data
            }
        
            eventArray[saveIndex] = value;

        //store to local
        localStorage.setItem("storedArray", JSON.stringify(eventArray));
        });

        //onclick clear button
        $("#clearEvent").on("click",function(){
            //console.log("resetbutton worked")
            resetEvent();
        });

        function eventRowColor(){
            //console.log(currentHour + " is ");
            var inputBoxId = i;
            //console.log("gg " + i);
            if ( inputBoxId < currentHour){
                eventInputBox.css("background-color","#ebebeb");
                eventInputBox.css("opacity","0.6");
                
                
            }
            else if (inputBoxId === currentHour){
                eventInputBox.css("background-color","#dbffff");
                eventInputBox.css("opacity","0.6");
                eventInputBox.css("font-family", "bold");
                
            }
            else {
                eventInputBox.css("background-color", "#ffffcc");
                eventInputBox.css("opacity","0.6");
            }

        }

        //adding reset button
        function resetEvent(){
            eventArray = [];
            localStorage.setItem("storedArray", JSON.stringify(eventArray));
            //console.log("remove worked")
            savedEvent = JSON.parse(localStorage.getItem("storedArray"));
            location.reload();
        }

        //adding previous day and next day
   
        





});

