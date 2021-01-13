onLoad();

function onLoad() {
    let headBanner = $("<h1>").text("Weather App").attr("class", "notification");
    $("#headerApp").append(headBanner);

    let searchBtn = $("<button>").text("Search").attr("id", "searchBtn");
    let searchBar = $("<input>").attr("placeholder", "City Name");
    $("#searchCity").append(searchBar, searchBtn);
}