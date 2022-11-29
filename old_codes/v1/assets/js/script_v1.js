// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.

    var my_schedule = []; // create empty schedule at the beginning

    $("button").click(function () {
        //console.log($(this).parent()[0]); // <div id="hour-9" ~
        //console.log($(this).parent()[0].children[1]); // <textarea class = ~
        //console.log($(this).parent()[0].children[1].value); // this returns the input value

        // so, now let's start
        var input_text = $(this).parent()[0].children[1].value
        var div_id = $(this).parent().attr('id'); // hour-9
        var id_hr2 = div_id.split("-"); // ['hour','9']
        var id_hr = id_hr2[1]; // 9
        for (var i = 0; i < 9; i++) {
            var schedule_hr = i + 9;
            if (schedule_hr === Number(id_hr)) {
                my_schedule[i] = input_text;
                //console.log(i);
                //console.log(my_schedule[i]);
                console.log(input_text);

                /* Note: here, the original "setItem" approach does not work correctly.
                    it also store an empty space and comma as an array value.
                    So, it is difficult to handle the data.
                    That is why I use JSON approach.
                */
                //localStorage.setItem("my_schedule",my_schedule); // store in the localStorage
                localStorage["my_schedule"] = JSON.stringify(my_schedule); // store in the localStorage
            }
        }
    });

    function retrieve_data() {
        /* 
        if there is a saved data in the local storage, retrieve the data
        Note: 
            Initial try using localStorage.getItem didn't work well since it also saves an empty space and comma.
                my_schedule = localStorage.getItem("my_schedule"); // save stored data to the global variable
            That is why I use JSON approach.
        */
        if (localStorage.getItem("my_schedule") !== null) {
            my_schedule = JSON.parse(localStorage["my_schedule"]); // save stored data to the global variable

            // display the stored schedule
            for (var i = 0; i < 9; i++) {
                if (my_schedule[i]) {
                    // if it is not empty, retrieve the data
                    $("textarea")[i].value = my_schedule[i];
                }
            }
        }
    }
    function update_past_present_future() {
        var today = new Date();
        hour = today.getHours(); // 'number'; 0 ~ 23
        // Note, I am useing 0 ~ 23 hour system, thus it is not required to distinguish AM/PM

        var past_text = 'row time-block past';
        var present_text = 'row time-block present';
        var future_text = 'row time-block future';

        var jw = document.querySelector('.container-lg');
        for (var i = 0; i < 9; i++) {
            var schedule_hr = i + 9; // starting from 9AM
            if (schedule_hr < hour) {
                // update to past
                jw.children[i].className = past_text; // change the class to the new_text
            } else if (schedule_hr == hour) {
                // update to present
                jw.children[i].className = present_text; // change the class to the new_text
            } else {
                // update to future
                jw.children[i].className = future_text; // change the class to the new_text
            }
        }
    }

    function display_today() {
        var today = new Date();
        var currentDay = $('#currentDay');
        //currentDay.text(weekday + ', ' + month + ', ' + day + ', ' + year);
        currentDay.text(today.toDateString()); // direct & simple approach
    }

    function display_today_dayjs(){
        // well, I don't see significant benefit using "dayjs" over original java here.
        var today = dayjs().format('MMM D, YYYY');
        var currentDay = $('#currentDay');
        currentDay.text(today);
    }
    function open_scheduler() {
        //display_today(); // display today at the top; java version
        display_today_dayjs(); // display today at the top; dayjs version
        update_past_present_future(); // update scheduler color depending on the current time
        retrieve_data(); // retrieve last data from the local storage
    }
    open_scheduler();

});



