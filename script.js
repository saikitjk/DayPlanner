$(document).ready(function(){
    
    //Time date on the header
    function headerClock(){
    var nowTime = moment().format("LTS");
    var currentTime = $("#currentTime");
    console.log("this is time");
    currentTime.text(nowTime);
    }
    setInterval(headerClock,1000);
   
    //headerClock();


    //Time date on the header
    //control buttons
    var thisDay = true;
    var dayBefore = false;
    var dayAfter = false;

    function controlButton(){
        var buttonContainer = $("#buttonContainer");

        var buttonRow = $("<div>");
        buttonRow.addClass("row");
        buttonRow.addClass("buttonRow");

        //build the columns in buttonContainer
        var leftColumn = $("<div>");
        leftColumn.addClass("col-md-3 col-sm-3");
        var middleColumn = $("<div>");
        middleColumn.addClass("col-md-3 col-sm-3");
        var rightColumn = $("<div>");
        rightColumn.addClass("col-md-3 col-sm-3");
        var clearColumn = $("<div>");
        clearColumn.addClass("col-md-3 col-sm-3");

        //left button
        var leftButton = $("<button>");
        leftButton.attr("id", "previousDay"); 
        leftButton.attr("class","btn btn-primary");
        leftButton.text("Yesterday");
        buttonRow.append(leftColumn);
        leftColumn.append(leftButton);
        //middle button
        var middleButton = $("<button>");
        middleButton.attr("id", "today"); 
        middleButton.attr("class","btn btn-primary");
        middleButton.text("Today");
        buttonRow.append(middleColumn);
        middleColumn.append(middleButton);

        //right button
        var rightButton = $("<button>");
        rightButton.attr("id", "nextDay"); 
        rightButton.attr("class","btn btn-primary");
        rightButton.text("Tomorrow");
        buttonRow.append(rightColumn);
        rightColumn.append(rightButton);
        
        //clear button
        var clearButton = $("<button>");
        clearButton.attr("id", "clearEvent"); 
        clearButton.attr("class","btn btn-warning");
        clearButton.text("Clear All");
        buttonRow.append(clearColumn);
        clearColumn.append(clearButton);

        //append to buttonContainer
        buttonContainer.append(buttonRow)
    };
    controlButton();

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

    //previousday
    function previousDay(){
        //console.log("ggggg")
        $("#eventContainer").hide();
        $("#nextEventContainer").hide();
        $("#prevEventContainer").show();
        $("#currentDay").hide();
        $("#currentTime").hide();
        $("#nextDate").hide();
        $("#previousDate").show();
        var prevDay = moment().subtract(1, "days").format("MMMM DD gggg, dddd");
        var lastDay = $("#previousDate");
     
        //Time date on the header
        lastDay.text(prevDay);
        //Time date on the header
    
        //retrieve event
        var prevEventArray = [];
        prevSavedEvent = JSON.parse(localStorage.getItem("prevStoredArray"));
        if(prevSavedEvent !== null){
            prevEventArray = prevSavedEvent;
        }
    
        var prevEventRowContainer = $("#prevEventContainer");
        prevEventRowContainer.empty();
        
    
        for (var hour = 0; hour < 24; hour++) {
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
            if (hour > 11) { 
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
            inputColumn.addClass("col-md-8  col-sm-8");
            var saveButtonColumn = $("<div>");
            saveButtonColumn.addClass("col-md-2 col-sm-2");
    
            const timeStamp = $("<div>");
            timeStamp.attr("class","timeStamp");
    
            //time stamp
            timeStamp.text(j + " " + ampm);
            timeStamp.css("background-color","#ebebeb");
            eventRow.append(timeColumn);
            timeColumn.append(timeStamp);
        
            //input box
            var eventInputBox = $("<input>");
            eventInputBox.attr("id", `prevInputBoxId${i}`);
            eventInputBox.attr("boxIndex",i);
            eventInputBox.attr("type","text");
            eventInputBox.attr("class","eventBox");
            eventInputBox.css("background-color","#ebebeb");
            eventInputBox.css("opacity","0.6");
            eventInputBox.val(prevEventArray[i]);
            eventRow.append(inputColumn);
            inputColumn.append(eventInputBox);
    
    
            //save button
            var saveButton = $("<button>");
            saveButton.attr("id", `saveButtonId${i}`);
            //console.log("gg" + i);
            saveButton.attr("prevSaveIndex",i);
            saveButton.attr("class","far fa-save saveButton");
            saveButton.text("Save")
            eventRow.append(saveButtonColumn);
            saveButtonColumn.append(saveButton);
    
            
            //append to html
            prevEventRowContainer.append(eventRow);
        
           };//end of for loop
    
           //on click save button
           $(document).on("click","button", function(event){
                event.preventDefault();  

               
    
                var prevSaveIndex = $(this).attr("prevSaveIndex");
                var prevInputId = "#prevInputBoxId" + prevSaveIndex;
                var prevValue = $(prevInputId).val();
                //console.log('value= ', value); 
                //console.log('index= ', saveIndex); 
                if(prevValue === ""){
                    return; //check if tany data
                }
            
                prevEventArray[prevSaveIndex] = prevValue;
    
            //store to local
            localStorage.setItem("prevStoredArray", JSON.stringify(prevEventArray));
            });

            //adding reset button
            function prevResetEvent(){
                prevEventArray = [];
                localStorage.setItem("prevStoredArray", JSON.stringify(prevEventArray));
                console.log("previous remove worked")
                prevSavedEvent = JSON.parse(localStorage.getItem("prevStoredArray"));
                location.reload();
            }
            return{
                prevResetEvent:prevResetEvent //function scooping
            };

    }

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
    //next day
    function nextDay(){
        //console.log("ggggg")
        $("#eventContainer").hide();
        $("#prevEventContainer").hide();
        $("#nextEventContainer").show();
        $("#currentDay").hide();
        $("#currentTime").hide();
        $("#previousDate").hide();
        $("#nextDate").show()
        var nextDay = moment().add(1, "days").format("MMMM DD gggg, dddd");
        var comingDay = $("#nextDate");
     
        //Time date on the header
        comingDay.text(nextDay);
        //Time date on the header
    
        //retrieve event
        var nextEventArray = [];
        nextSavedEvent = JSON.parse(localStorage.getItem("nextStoredArray"));
        if(nextSavedEvent !== null){
            nextEventArray = nextSavedEvent;
        }
    
        var nextEventRowContainer = $("#nextEventContainer");
        nextEventRowContainer.empty();
        
    
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
            inputColumn.addClass("col-md-8  col-sm-8");
            var saveButtonColumn = $("<div>");
            saveButtonColumn.addClass("col-md-2 col-sm-2");
    
            const timeStamp = $("<div>");
            timeStamp.attr("class","timeStamp");
    
            //time stamp
            timeStamp.text(j + " " + ampm);
            timeStamp.css("background-color","#ebebeb");
            eventRow.append(timeColumn);
            timeColumn.append(timeStamp);
        
            //input box
            var eventInputBox = $("<input>");
            eventInputBox.attr("id", `nextInputBoxId${i}`);
            eventInputBox.attr("boxIndex",i);
            eventInputBox.attr("type","text");
            eventInputBox.attr("class","eventBox");
            eventInputBox.css("background-color", "#ffffcc");
            eventInputBox.css("opacity","0.6");
            eventInputBox.val(nextEventArray[i]);
            eventRow.append(inputColumn);
            inputColumn.append(eventInputBox);
    
    
            //save button
            var saveButton = $("<button>");
            saveButton.attr("id", `saveButtonId${i}`);
            //console.log("gg" + index);
            saveButton.attr("nextSaveIndex",i);
            saveButton.attr("class","far fa-save saveButton");
            saveButton.text("Set");
            eventRow.append(saveButtonColumn);
            saveButtonColumn.append(saveButton);
    
            
            //append to html
            nextEventRowContainer.append(eventRow);
        
           };//end of for loop
    
           //on click save button
           $(document).on("click","button", function(event){
                event.preventDefault();   
                var nextSaveIndex = $(this).attr("nextSaveIndex");
                var nextInputId = "#nextInputBoxId" + nextSaveIndex;
                var nextValue = $(nextInputId).val();
                //console.log('value= ', value); 
                //console.log('index= ', saveIndex); 
                if(nextValue === ""){
                    return; //check if tany data
                }
            
                nextEventArray[nextSaveIndex] = nextValue;
    
            //store to local
            localStorage.setItem("nextStoredArray", JSON.stringify(nextEventArray));
            });

            //adding reset button
            function nextResetEvent(){
                nextEventArray = [];
                localStorage.setItem("nextStoredArray", JSON.stringify(nextEventArray));
                console.log("next day remove worked")
                nextSavedEvent = JSON.parse(localStorage.getItem("nextStoredArray"));
                location.reload();
            }
            return{
                nextResetEvent: nextResetEvent //function scooping
            };

    
        
    }

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

    function today(){
    $("#nextEventContainer").hide();
    $("#prevEventContainer").hide();
    $("#eventContainer").show();
    $("#previousDate").hide();
    $("#nextDate").hide();
    $("#currentDay").show();
    $("#currentTime").show();
    var nowDay = moment().format("MMMM DD gggg, dddd");
    var currentDay = $("#currentDay");
    var currentHour = moment().hour();
    //header date
    currentDay.text(nowDay);

 
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
        inputColumn.addClass("col-md-8  col-sm-8");
        var saveButtonColumn = $("<div>");
        saveButtonColumn.addClass("col-md-2 col-sm-2");

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
        saveButton.text("Set");
        eventRow.append(saveButtonColumn);
        saveButtonColumn.append(saveButton);

        eventRowColor();
        //append to html
        eventRowContainer.append(eventRow);
    
       };//end of for loop

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

        //today reset
        function resetEvent(){
            console.log("today reset event says hi");
            eventArray = [];
            localStorage.setItem("storedArray", JSON.stringify(eventArray));
            console.log(" today remove worked")
            savedEvent = JSON.parse(localStorage.getItem("storedArray"));
            location.reload();
        }
        return{
            resetEvent: resetEvent //function scooping
        };


        //coloring today event rows
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

    }
    today();

    //////////////////////////////////////////////
            //onclick yesterday button
            $("#previousDay").on("click",function(){
                console.log("previous day worked");
                previousDay();
                thisDay = false;
                dayAfter = false;
                dayBefore = true;
                
                
            });
            //onclick tomorrow button
            $("#nextDay").on("click",function(){
                console.log("next day worked");
                nextDay();
                thisDay = false;
                dayAfter = true;
                dayBefore = false;
            });
            //onclick today button
            $("#today").on("click",function(){
                console.log("today worked");
                today();
                thisDay = true;
                dayAfter = false;
                dayBefore = false;
            });


             //onclick clear button
        $("#clearEvent").on("click",function(){
            console.log("bye");
            if(thisDay === true){
                //console.log("today event worked");
                var gg = today(); //calling function inside the function
                gg.resetEvent();
                
            }
            else if(dayAfter === true){
                //console.log("next event worked");
                var diu = nextDay(); //calling function inside the function
                diu.nextResetEvent(); 
                
            }
            else if(dayBefore === true){
                console.log("prev event worked");
                var dllm = previousDay(); //calling function inside the function
                dllm.prevResetEvent();
                
            }
        });



});

