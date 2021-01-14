onLoad();

function onLoad() {
    // let headBanner = $("<h1>").text("Weather App").attr("class", "notification center");
    $("#headerApp").text("Weather App").attr("class", "center title");

    let searchBtn = $("<button>").text("Search").attr({
        id: "searchBtn"
    });
    let searchBar = $("<input>").attr({
        placeholder: "City Name"
    });
    $("#searchCity").append(searchBar, searchBtn);
}

$("#searchBtn").on("click", function(e){
    e.preventDefault();
    let city = $("input").val().trim();
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f53d3bed696d22da625060991087f2e7`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        let temp = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
        let cityName = response.name;
        let cityTag = $("<h1>").text(cityName).attr("class", "title");
        let currTemp = $("<p>").text(`Temperature: ${temp}`)
        let humidity = $("<p>").text(`Humidity: ${response.main.humidity}`);
        let windSpeed = $("<p>").text(`Wind speed: ${response.wind.speed}`);
        let container = $("<div>").append(currTemp, humidity, windSpeed).attr("class", "subtitle notification");
        let br = $("<br>");
        let uv = uvIndex(response.coord.lat, response.coord.lon);
        console.log(uv);

        fiveDayForecast(cityName);
        $("#displayResults").append(cityTag, br, container);
    });
});

function fiveDayForecast(city) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f53d3bed696d22da625060991087f2e7`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

function uvIndex (lat, lon) {
    let queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclue=minutely,hourly,daily,alerts&appid=f53d3bed696d22da625060991087f2e7`
    let uv;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        uv = response.current.uvi;
        console.log(response.current.uvi);
    });
    console.log(uv);
};