$(document).ready(function(){
    function headerClock(){
    //Time date on the header
    var nowDay = moment().format("MMMM DD gggg, dddd");
    var nowTime = moment().format("LTS");
    var currentDay = $("#currentDay");
    var currentTime = $("#currentTime");
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
        var i = hour
        //display time
        var ampm = "";
        if (hour > 12) { 
            ampm = "pm";
        } 
        else {
            ampm = "am";
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
        timeStamp.text(hour + " " + ampm);
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

        //append to html
        eventRowContainer.append(eventRow);
    
    

       };

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






});

