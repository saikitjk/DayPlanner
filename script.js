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




});

/*
    var eventArray= [];

    //generate textbox
    function genTextbox(){
        var ampm = "";
        for (var hour = 9; hour <= 17; hour++){
            var i = hour - 9;
            //console.log(hour);
            if (hour > 12) { 
                ampm = "pm";
              } 
            else {
                ampm = "am";
              }
            //timestamp
            console.log(ampm);
            var timeStamp = $("<div>");
            timeStamp.attr("type", "text");
            timeStamp.text(hour + " " + ampm);
            timeStamp.attr("class", "timeStamp");
            $("#timeStamp").append(timeStamp); 
          
            //input area
            var inputBox = $("<input>");
            inputBox.attr("type", "text");
            inputBox.attr("class", "eventBox");
            $("#eventBox").append(inputBox);

            //save button
            var saveButton = $("<button>");
            saveButton.attr("type", "button");
            saveButton.attr("value", "Save");
            saveButton.attr("save-id", i);
            saveButton.attr("class", "saveButton");
            $("#saveButton").append(saveButton);

        }


            $("#saveButton").on("click", function(event){
                event.preventDefault();  
                var event2Save = document.getElementById("eventBox").value;
                console.log(event2Save);
                if(event2Save === ""){
                    return; //check if tany data
                }

                var index = $(this).attr("save-id");
                
    
                eventArray.push(event2Save);
                console.log(eventArray);
    
                //store to local
                localStorage.setItem("eventArray", JSON.stringify(eventArray));
    
            });
       
         
        
    }
    genTextbox();

*/

/*
    var ampm = "";
    for (var hour = 9; hour <= 17; hour++){
        var i = hour - 9;
        //console.log(hour);
        if (hour > 12) { 
            ampm = "pm";
        } 
        else {
            ampm = "am";
        }
        /////////
        var eventRow = $("<div>");
        


        //timestamp
        console.log(ampm);
        var timeStamp = $("<div>");
        timeStamp.attr("type", "text");
        timeStamp.text(hour + " " + ampm);
        timeStamp.attr("class", "timeStamp");
        $("#timeStamp").append(timeStamp); 
    
        //input area
        var inputBox = $("<input>");
        inputBox.attr("type", "text");
        inputBox.attr("class", "eventBox");
        $("#eventBox").append(inputBox);

        //save button
        var saveButton = $("<button>");
        saveButton.attr("type", "button");
        saveButton.attr("value", "Save");
        saveButton.attr("save-id", i);
        saveButton.attr("class", "saveButton");
        $("#saveButton").append(saveButton);

    }

   

    
    
    
   

    //retrive from local

    //save 

    //


 */