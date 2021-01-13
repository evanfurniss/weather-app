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
    });
});