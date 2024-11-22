const apiKey = "acf12429a21ed706e002608e3aeca9f4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    // Case 1: Empty city input
    if (city.trim() === "") {
        document.querySelector(".error").innerHTML = "Please enter a valid city name.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return; // Exit the function to avoid making an API call
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        // Case 2: Invalid city name
        if (response.status == 404) {
            document.querySelector(".error").innerHTML = "City not found. Please try again.";
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return; // Exit the function after displaying the error
        }

        // Parse data if the response is valid
        const data = await response.json();

        // Update UI with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Set weather icon
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }

        // Display weather and hide error
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").innerHTML = "Something went wrong. Please try again later.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});