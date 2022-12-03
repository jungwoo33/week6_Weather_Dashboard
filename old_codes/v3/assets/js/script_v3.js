var search_button = document.getElementById("search_button");
var user_city = document.getElementById("user_city");
var user_city_new = []; // create empty user_city array at the beginning
var city_num = 5; // set the initial city number to 5; this is for the arry initialization
var city_count = 0;
var lon = 0.0;
var lat = 0.0;

function get_city_lonlat(input){
    // insert the api url
    //var request_url = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
    var jw_api_key = "4ed7c4f0f170e3b9e35db228ebe6ff8c";
    var city_name = input;
    var limit = 5;
    //var request_url = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"
    var request_url = "http://api.openweathermap.org/geo/1.0/direct?q=";
    request_url = request_url + city_name + "&limit=" + limit + "&appid=" + jw_api_key;

    fetch(request_url).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);

        // let's find the city in the USA only:
        for(var i=0;i<limit;i++){
            if(data[i].country === "US"){
                lon = data[i].lon;
                lat = data[i].lat;
                console.log(lon);
                console.log(lat);
                break; // exit for loop
            }
        }
    });
}

function get_city_weather(){
    // insert the api url
    //var request_url = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
}

function search_city(event){
    event.preventDefault();
    var city = document.getElementById("city");
    var i = city_count;

    if(i>city_num-1){
        city_count = 0;
        i = city_count;
    }

    var city_value = city.value;
    console.log(city_value);

    user_city_new[i] = city_value;
    console.log(user_city_new[i]);

    // store to the localstorage:
    localStorage.setItem("user_city_new",user_city_new);

    var ul = document.createElement("ul");
    var li = document.createElement("li");
    li.textContent = user_city_new[i];
    ul.appendChild(li);
    user_city.appendChild(ul);
    
    /*
    for(i=0;i<city_num;i++){
        var li = document.createElement("li");
        li.textContent = user_city_new[i];
        ul.appendChild(li);
    }
    user_city.appendChild(ul);
    */

    /* call weathermap api to find lonlat */
    get_city_lonlat('London'); /* let's test with london */
    console.log(lon);
    console.log(lat);

    city_count = city_count + 1; // for the next use
}


search_button.addEventListener("click",search_city);




/* Link to HTML elements =============================================== */





// var start_quiz = document.querySelector("#start_quiz"); // select the "Start Quiz" button
// var stopwatch = document.querySelector("#stopwatch");
// var quiz = document.querySelector("#quiz");
// //var correct_wrong = document.querySelector("#correct_wrong"); // I will not include this 
// var next = document.querySelector("#next"); // "Next" button
// var prev = document.querySelector("#prev"); // "Prev" button
// /* End of HTML elements linking ======================================== */

// / * pre-define global variables: ======================================== */
// var elapsed_question_num = 0; // total elapsing (showing or solving) questions
// var user_selection = []; // array of user answer choices for each question
// var timer_status = "off"; // set initial timer as "off" condition
// var time_left; // inital time left in [sec]; it will be defined later
// var final_score; // user's final test score
// /* End of global variables ============================================= */

// /* create questions ===================================================== */
// import {my_questions} from "./my_questions.js"; // import my_questions from my_questions.js:

// // check if they are correctly coded...
// // Note: this is for the test...
// function console_test(){
//     console.log(my_questions.length);
//     console.log(my_questions[0]);
//     console.log(my_questions[0].question);
//     console.log(my_questions[0].choices);
//     console.log(my_questions[0].choices[0]);    
//     console.log(typeof "my_questions[0].correct_answer"); // string
// }
// /* end of question creation ============================================ */


// /* create question displaying functions ================================ */
// // This will remove previous question displaying:
// function remove_previous_question(){
//     // remove previous elements:
//     while(quiz.firstChild){
//         quiz.removeChild(quiz.firstChild);
//     }
//     //correct_wrong.children[0].textContent = "";
// }

// // This will reset the test to the initial point:
// function reset(){
//     remove_previous_question();

//     // reset() requires additional process as follows:
//     elapsed_question_num = 0; // reset to 0

//     // delete "Prev" button and show "Next" button
//     next.style.display = "inline-block";
//     prev.style.display = "none";

//     // kill previous timer and restart timer. 
//     reset_timer();
// }

// // This will display the next question:
// function display_next_question(){
//     remove_previous_question(); // remove previous question before showing the next question:
//     if(elapsed_question_num < my_questions.length){
//         var i = elapsed_question_num;

//         // show "Prev" button from the second question
//         next.style.display = "inline-block";
//         if(elapsed_question_num !== 0){
//             var prev = document.querySelector("#prev");
//             prev.style.display = "inline-block";
//         }

//         var p = document.createElement("p"); // create <p></p> element for question
//         p.textContent = my_questions[i].question; // include question in <p></p>
//         quiz.appendChild(p);

//         var ul = document.createElement("ul"); // create unordered list (ul)
//         var choice_length = my_questions[i].choices.length; //each question's choice length; This will allow me to have different length choices.
//         for(var j=0; j<choice_length; j++){
//             // include radio button lists
//             var li = document.createElement("li");
//             var input = document.createElement("input");
//             input.setAttribute("type","radio");
//             input.setAttribute("name","answer");

//             input.setAttribute("id","radio_button");

//             input.setAttribute("value",j+1); // 1, 2, 3, 4
//             var label = document.createElement("label");
//             label.setAttribute("for","radio_button");
            
//             label.textContent = my_questions[i].choices[j];
//             li.appendChild(input);
//             li.appendChild(label);
//             ul.appendChild(li);
//         }
//         quiz.appendChild(ul);

//         // if user select an answer and click "Next" button, 
//         // read the user selection and save it to an array, and
//         // increase "elapsed_question_num" to move to the next question
//         document.getElementById('next').onclick = function(){
//             var selected = document.querySelector('input[type=radio][name=answer]:checked');
//             // if nothing is selected, show alert,
//             // otherwise move foreward.
//             if(selected === null){
//                 var start = Date.now(); // [milli-second]
//                 //console.log(start);
//                 window.alert("Please choose an answer!");
//                 var finish = Date.now(); // [milli-second]
//                 //console.log(finish);
//                 var time_reduction = Math.floor((Number(finish) - Number(start))/1000); // only consider [integer] part
//                 //console.log(time_reduction);

//                 // subtract "pausing" time from the time remaining
//                 time_left = time_left - time_reduction;
//             }else{
//                 user_selection[elapsed_question_num] = selected.value;
//                 //console.log(user_selection[elapsed_question_num]);

//                 // show correct/wrong & 10 sec time reduction
//                 var i = elapsed_question_num;
//                 if(Number(user_selection[i]) === Number(my_questions[i].correct_answer)){
//                     // show correct!
//                     //correct_wrong.children[0].textContent = "Correct!"; // I will not show this...
//                 }else{
//                     // show wrong! & 10 sec time reduction
//                     //correct_wrong.children[0].textContent = "Wrong!" // I will not show this...
//                     time_left = time_left - 10;
//                 }
//                 elapsed_question_num++;
//             }
//         }
//         document.getElementById('prev').onclick = function(){
//             elapsed_question_num--;
//             remove_previous_question();
//             display_next_question();
//         }
//         next.addEventListener("click",display_next_question);
//     }else{
//         // delete previous question and show the final result
//         show_score();      
//         reset_timer();
//         //stopwatch.children[0].textContent = " "
//     }
// }
// // End of question displaying function ================================= /

// function show_score(){
//     // delete previous question and show the final result
//     remove_previous_question();
//     var score = 0;
//     for(var i=0;i<my_questions.length;i++){
//         //console.log(typeof(user_selection[i])); // string
//         //console.log(typeof(my_questions[i].correct_answer)); // string

//         if(Number(user_selection[i]) === Number(my_questions[i].correct_answer)){
//             score++;
//         }
//     }
//     final_score = score; // I will use this later
//     var p = document.createElement("p"); // create <p></p> element for question
//     p.textContent = "Your final score: "+ score + " out of " + my_questions.length; // include question in <p></p>
//     quiz.appendChild(p);

//     // deactivate both "Prev" and "Next" button
//     next.style.display = "none";
//     prev.style.display = "none";

//     // include Initial form & submit button:
//     var label = document.createElement("label");
//     label.setAttribute("for","user_initial");
//     label.textContent = "Initial: ";
//     var input = document.createElement("input");
//     input.setAttribute("type","text");
//     input.setAttribute("id","user_initial")
//     quiz.appendChild(label);
//     quiz.appendChild(input);
    
//     var input2 = document.createElement("input");
//     input2.setAttribute("type","submit");
//     input2.setAttribute("id","submit_button");
//     input2.setAttribute("value","Submit");
//     quiz.appendChild(input2);

//     // when click "Submit" button, retrieve the user info and show it again.
//     var submit_button = document.querySelector("#submit_button");
//     submit_button.addEventListener("click", retrieve_score);
// }

// function retrieve_score(){
//     // save user info to local storage:
//     var initial = document.querySelector("#user_initial");
//     var current_initial = initial.value;
//     localStorage.setItem("initial",current_initial);

//     var score = final_score;
//     localStorage.setItem("score",score);

//     // retrieve user info from the local storage:
//     var last_initial = localStorage.getItem("initial");
//     var last_score = localStorage.getItem("score");

//     // Now, clear the previous question & show the saved info:
//     remove_previous_question();
//     stopwatch.style.display = "none"; // hide stopwatch

//     var h2 = document.createElement("h2");
//     h2.textContent = "Highscores:"
//     var p = document.createElement("p");
//     p.textContent = last_initial + ": " + last_score
//     quiz.appendChild(h2);
//     quiz.appendChild(p);
// }


// // Show stopwatch ====================================================== /
// function start_timer(){
//     if(timer_status === "off"){
//         // if timer is "off" turn it on
//         stopwatch.style.display = "block"; // show stopwatch
//         stopwatch.children[0].textContent = ""; // hide any remaining text

//         time_left = 60;
//         timer_status = setInterval(show_stopwatch,1000);
//         function show_stopwatch(){
//             if(time_left > 0){
//                 stopwatch.children[0].textContent = "Time Left: " + time_left + " sec";
//                 time_left --;
//                 console.log('jw')
//             }else{
//                 show_score();
//                 stopwatch.children[0].textContent = "Time Over!";
//                 clearInterval(timer_status); // kill countdown    
//             }
//         }
//     }
// }

// function reset_timer(){
//     // clear opened timer, and switch the status to "off"
//     clearInterval(timer_status);
//     timer_status = "off";
// }

// function generate_quiz(){
//     reset();
//     display_next_question();
//     start_timer();
// }

// start_quiz.addEventListener("click", generate_quiz);
