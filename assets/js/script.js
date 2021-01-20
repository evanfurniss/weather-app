let pastCities = $("#pastResults");
let cityArr = [];
let uv;

onLoad();

function onLoad() {
    let returnCities = JSON.parse(localStorage.getItem("cities"));
    if (returnCities !== null) {
        cityArr = returnCities;
    }
    displayHistory();
}

setDate();
function setDate() {
    var date = dayjs();
    return date.format("MM/DD/YYYY");
}

function setPastSearches(city) {
    localStorage.setItem("cities", JSON.stringify(city));
}

function displayHistory() {
    pastCities.empty();

    for (let i = 0; i < cityArr.length; i++) {
        let li = $("<li>").text(cityArr[i]).attr("class", "list-group-item thatsHistory");
        pastCities.prepend(li);
    }
}

$("#searchCity").on("click", function(e){
    e.preventDefault();
    let city = $("input").val().trim();
    cityArr.push(city);
    setPastSearches(cityArr);
    todaysWeather(city);
    displayHistory();
});

function todaysWeather(city) {
    $("#displayResults").empty();

    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f53d3bed696d22da625060991087f2e7`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        let temp = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
        let cityName = response.name;
        let date = setDate();
        let icon = $("<i>");
        if (response.weather[0].main === "Clouds") {
            icon.attr("class", "fas fa-cloud")
        };
        let cityTag = $("<h1>").text(`${cityName} ${date} `).attr("class", "title");
        cityTag.append(icon);
        let currTemp = $("<p>").text(`Temperature: ${temp}`)
        let humidity = $("<p>").text(`Humidity: ${response.main.humidity}`);
        let windSpeed = $("<p>").text(`Wind speed: ${response.wind.speed}`);
        let container = $("<div>").append(currTemp, humidity, windSpeed).attr("class", "subtitle notification");
        let br = $("<br>");
        uvIndex(response.coord.lat, response.coord.lon);

        fiveDayForecast(cityName);
        $("#displayResults").append(cityTag, br, container);
    });
}

function fiveDayForecast(city) {
    $("#fiveDay").empty();

    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f53d3bed696d22da625060991087f2e7`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        let fiveDayArr =[];
        let j = 1;
        for (let i = 3; i < 40; i+=8) {
            let dayCreator = {
                day: $("<h4>").text(`Day ${j}`),
                temp: $("<p>").text(`Temperature: ${((response.list[i].main.temp - 273.15) * 1.80 + 32).toFixed(2)}`),
                humidity: $("<p>").text(`Humidity: ${response.list[i].main.humidity}`)
            }
            j++;
            fiveDayArr.push(dayCreator);
        }
        $("#fiveDay").append(fiveDayArr[0].day, fiveDayArr[0].temp, fiveDayArr[0].humidity, fiveDayArr[1].day, fiveDayArr[1].temp, fiveDayArr[1].humidity, fiveDayArr[2].day, fiveDayArr[2].temp, fiveDayArr[2].humidity, fiveDayArr[3].day, fiveDayArr[3].temp, fiveDayArr[3].humidity, fiveDayArr[4].day, fiveDayArr[4].temp, fiveDayArr[4].humidity,);
    });
};

function uvIndex (lat, lon) {
    let queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=f53d3bed696d22da625060991087f2e7&lat=${lat}&lon=${lon}`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        uv = $("<p>").text(`UV Index: ${response.value}`);
        $("#displayResults").append(uv);
    })
};

$(".thatsHistory").on("click", function(e){
    e.preventDefault();
    todaysWeather(e.currentTarget.outerText);
})