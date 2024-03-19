// 1. search for a specific location
// 2. toggle displaying the data in F or C
// 3. change the look of the page based on the data
// 3.1. Giphy API?

/*
            <p>Current conditions at (location)<br>
            <strong>Lat:</strong> placeholder <strong>Lon:</strong> placeholder
            </p>

            <section>
                <div>
                    condition<br>
                    <strong>fahrenheit</strong><br>
                    celsius
                </div>

                <ul>
                    <li>Humidity</li>
                    <li>Wind Speed</li>
                    <li>Barometer</li>
                    <li>Dewpoint</li>
                    <li>Visibility</li>
                    <li>Last update</li>
                </ul>

            </section>

            <div class="weatherForm">
                <label for="location">
                    <input type="text" name="location" id="location" required />
                </label>
            </div>
            <div class="weatherForm">
                <input type="submit" value="Fetch weather data" />
            </div>
*/

import { apiKey, baseUrl, gifKey } from "./environment";

const img = document.querySelector("img");

function createWeatherDisplay(data) {
  const conditions = document.querySelector(".weatherForm p");
  conditions.innerHTML = `Current conditions at ${data.name}<br>
  <strong>Lat:</strong> ${data.lat} <strong>Lon:</strong> ${data.lon}`;

  const weatherCondition = document.getElementById("condition");
  const temperatureF = document.getElementById("fahrenheit");
  const temperatureC = document.getElementById("celsius");

  weatherCondition.textContent = `${data.condition}`;
  temperatureF.textContent = `${data.temp_f}`;
  temperatureC.textContent = `${data.temp_c}`;

  const weatherItems = [
    { name: "Humidity", value: `${data.humidity}` },
    { name: "Wind Speed", value: `${data.wind_mph}` },
    { name: "Barometer", value: `${data.pressure_in}` },
    { name: "Dewpoint", value: `0` },
    { name: "Visibility", value: `${data.vis_miles}` },
    { name: "Last update", value: `${data.last_updated}` },
  ];
}

async function fetchFromAPI() {
  let location = document.getElementById("location").value;
  let formattedLocation = location.toLowerCase().replace(/\s/g, "_");

  getGif(location);

  const response = await fetch(
    `${baseUrl}/current.json?key=${apiKey}&q=${formattedLocation}`,
    { mode: "cors" }
    // {
    //   method: "GET",
    //   headers: {
    //     key: `${apiKey}`,
    //   },
    // }
  ).then(function (response) {
    return response.json(); //return after fetching
  });

  //imperative to return from the function to use it
  return response;
}

async function getGif(location) {
  const image = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${gifKey}=${location}`,
    { mode: "cors" }
  );

  const imageData = await image.json();
  img.src = imageData.data.images.original.url;
}

function getWeatherData() {
  //use a .then() to get the result from an asynchronous call in a synchronous function
  return fetchFromAPI().then((result) => {
    const {
      condition,
      humidity,
      wind_mph,
      pressure_in,
      vis_miles,
      last_updated,
      temp_c,
      temp_f,
    } = result.current;
    const { name, region, lon, lat } = result.location;
    const data = {
      name,
      region,
      lon,
      lat,
      condition,
      humidity,
      wind_mph,
      pressure_in,
      vis_miles,
      last_updated,
      temp_c,
      temp_f,
    };
    return data;
  });
}

// calculate dewpoint

async function displayWeatherData(event) {
  event.preventDefault();
  const container = document.querySelector(".weatherDataContainer");
  container.innerHTML = ""; // Clear previous content

  const data = await getWeatherData();
  console.log(data);

  for (const [key, value] of Object.entries(data)) {
    const element = document.createElement("p");
    if (typeof value === "object") {
      // If the value is an object, stringify it
      element.textContent = `${key}: ${JSON.stringify(value)}`;
    } else {
      // Otherwise, display it as normal
      element.textContent = `${key}: ${value}`;
    }
    container.appendChild(element);
  }
}

const form = document.querySelector(".weatherForm");
form.addEventListener("submit", displayWeatherData);

// let location = getLocation();
// location.then((data) => {
//   console.log(data);
// });

// let weatherData = getWeatherData();
// weatherData.then((data) => {
//   console.log(data);
// });
