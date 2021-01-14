onLoad();

function onLoad() {
    let headBanner = $("<h1>").text("Weather App").attr("class", "notification");
    $("#headerApp").append(headBanner);

    let searchBtn = $("<button>").text("Search").attr("id", "searchBtn");
    let searchBar = $("<input>").attr("placeholder", "City Name");
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
        let cityTag = $("<h1>").text(cityName);
        let currTemp = $("<p>").text(`Temperature: ${temp}`)
        let humidity = $("<p>").text(`Humidity: ${response.main.humidity}`);
        let windSpeed = $("<p>").text(`Wind speed: ${response.wind.speed}`);
        let br = $("<br>");
        
        $("#displayResults").append(cityTag, br, currTemp, humidity, windSpeed);

        fiveDayForecast(cityName);
    });
});

function fiveDayForecast(city) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=xml&units=metric&cnt=7&appid=f53d3bed696d22da625060991087f2e7`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};