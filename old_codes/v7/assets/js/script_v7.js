var search_button = document.getElementById("search_button");

var user_city = document.getElementById("user_city");
var new_city = "";
var today = document.getElementById("today");
var today1 = document.getElementById("today1");
var today2 = document.getElementById("today2");
var today3 = document.getElementById("today3");
var today4 = document.getElementById("today4");
var today5 = document.getElementById("today5");

var forecast = document.getElementById("forecast");

//var user_city_new = []; // create empty user_city array at the beginning
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
    // before move on, let's delete previous city information
    while(today.firstChild){
        today.removeChild(today.firstChild);
    }
    while(today1.firstChild){
        today1.removeChild(today1.firstChild);
    }
    while(today2.firstChild){
        today2.removeChild(today2.firstChild);
    }
    while(today3.firstChild){
        today3.removeChild(today3.firstChild);
    }
    while(today4.firstChild){
        today4.removeChild(today4.firstChild);
    }
    while(today5.firstChild){
        today5.removeChild(today5.firstChild);
    }


    // insert the api url
    //var request_url = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
    var jw_api_key = "4ed7c4f0f170e3b9e35db228ebe6ff8c";
    var request_url = "https://api.openweathermap.org/data/2.5/forecast?lat="
    //request_url = request_url + lat + "&lon=" + lon + "&appid=" + jw_api_key;
    request_url = request_url + lat + "&lon=" + lon + "&units=metric&appid=" + jw_api_key; // I will use metric unit

    fetch(request_url).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
        console.log(data.list.length); // = 40

        // let's fill "column_2_1", i.e., today information        
        // find today's date
        var time_text = data.list[0].dt_txt.split(" ")
        var day_text = time_text[0]; // yyyy-mm-dd
        var day_text2 = day_text.split("-");
        var yyyy = day_text2[0];
        var mm = day_text2[1];
        var dd = day_text2[2];
        var day_text3 = mm + '/' + dd + '/' + yyyy; // mm/dd/yyyy, note: this is incorrect approach to get Today's date from the given forecast information. But, let's keep it and move on

        var h1 = document.createElement("h1");
        h1.textContent = new_city + " (" + day_text3 + ")";
        today.appendChild(h1);

        // include weather icon:
        var img = document.createElement("img");
        var icon_url = "http://openweathermap.org/img/w/";
        var icon_id = data.list[0].weather[0].icon; // e.g., 10d
        icon_url = icon_url + icon_id + ".png";
            
        img.setAttribute("id","wicon");
        img.setAttribute("src",icon_url); // e.g.: "http://openweathermap.org/img/w/10d.png"
        img.setAttribute("alt","Weather icon");
        img.setAttribute("style","width: 3.0em");
        today.appendChild(img);
        //h1.appendChild(img);
        //today.appendChild(h1);
        
        // include temp, wind, humidity:
        var temp = data.list[0].main.temp;
        var humidity = data.list[0].main.humidity;
        var wind = data.list[0].wind.speed;
        var p1 = document.createElement("p");
        var p2 = document.createElement("p");
        var p3 = document.createElement("p");
        p1.textContent = "Temp: " + temp + " ["+'\u2103'+"]";
        p2.textContent = "Wind: " + wind + " [m/s]";
        p3.textContent = "Humidity: " + humidity + " [%]";
        today.appendChild(p1);
        today.appendChild(p2);
        today.appendChild(p3);
        
        // css control with jquery:
        var styles = {
            backgroundColor: "#ddd",
            //border: "1px solid darkblue",
        };
        $("#today").css(styles);

        // let's fill "column_2_2", i.e., forecast information
        var h2 = document.getElementById("h2");
        h2.textContent = "5-Day Forecast:";

        for(var i=0;i<5;i++){ // 5day forecast with 3 hr interval; i.e., each day has 8 time data
            var t=(i*8)+4; // select 12pm each forecast day
            var time_text = data.list[t].dt_txt.split(" ")
            var day_text = time_text[0]; // yyyy-mm-dd
            var day_text2 = day_text.split("-");
            var yyyy = day_text2[0];
            var mm = day_text2[1];
            var dd = day_text2[2];
            var day_text3 = mm + '/' + dd + '/' + yyyy; // mm/dd/yyyy
            
            var buff = "today" + (i+1);
            var forecast_day = document.getElementById(buff);
            var h1 = document.createElement("h1");
            h1.textContent = day_text3
            forecast_day.appendChild(h1);

            // include weather icon:
            var img = document.createElement("img");
            var icon_url = "http://openweathermap.org/img/w/";
            var icon_id = data.list[t].weather[0].icon; // e.g., 10d
            icon_url = icon_url + icon_id + ".png";
            
            img.setAttribute("id","wicon");
            img.setAttribute("src",icon_url); // e.g.: "http://openweathermap.org/img/w/10d.png"
            img.setAttribute("alt","Weather icon");
            img.setAttribute("style","width: 3.0em");
            forecast_day.appendChild(img);
            
            // include temp, wind, humidity:
            var temp = data.list[t].main.temp;
            var humidity = data.list[t].main.humidity;
            var wind = data.list[t].wind.speed;
            var p1 = document.createElement("p");
            var p2 = document.createElement("p");
            var p3 = document.createElement("p");
            p1.textContent = "Temp: " + temp + " ["+'\u2103'+"]";
            p2.textContent = "Wind: " + wind + " [m/s]";
            p3.textContent = "Humidity: " + humidity + " [%]";
            forecast_day.appendChild(p1);
            forecast_day.appendChild(p2);
            forecast_day.appendChild(p3);
            
            // css control with jquery:
            var styles = {
                backgroundColor: "#001933",
                color: "white",
            };
            console.log(buff)
            var buff2 = "#"+buff;
            $(buff2).css(styles);
        };
    });
}

function search_city(event){
    event.preventDefault();

    var city = document.getElementById("city");
    new_city = city.value; // receive new city name when "click"

    // store to the localstorage as a "old_city":
    localStorage.setItem("old_city",new_city);

    if(city_count === 0){
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        li.textContent = new_city;
        ul.appendChild(li);
        user_city.appendChild(ul);
    }else{
        var old_city = localStorage.getItem("old_city");
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        li.textContent = old_city;
        ul.appendChild(li);
        user_city.appendChild(ul);    
    }

    /* call weathermap api to find lonlat */
    get_city_lonlat(new_city); // find lon/lat first
    get_city_weather(); // then find the weather

    city_count = city_count + 1; // for the next use
}


search_button.addEventListener("click",search_city);
