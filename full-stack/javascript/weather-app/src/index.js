// 1. search for a specific location
// 2. toggle displaying the data in F or C
// 3. change the look of the page based on the data
// 3.1. Giphy API?

import { apiKey, baseUrl, gifKey } from "./environment";

const img = document.querySelector("img");

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

function getLocation(event) {
  event.preventDefault();
  //use a .then() to get the result from an asynchronous call in a synchronous function
  fetchFromAPI().then((result) => {
    console.log(result.location);
  });
}

function getWeatherData(event) {
  event.preventDefault();
  //use a .then() to get the result from an asynchronous call in a synchronous function
  fetchFromAPI().then((result) => {
    displayWeatherData(result.current);
  });
}

function displayWeatherData(data) {
  const container = document.querySelector(".weatherDataContainer");
  container.innerHTML = ""; // Clear previous content

  for (const [key, value] of Object.entries(data)) {
    const element = document.createElement("p");
    element.textContent = `${key}: ${value}`;
    container.appendChild(element);
  }
}

const form = document.querySelector(".weatherForm");
form.addEventListener("submit", getWeatherData);

// let location = getLocation();
// location.then((data) => {
//   console.log(data);
// });

// let weatherData = getWeatherData();
// weatherData.then((data) => {
//   console.log(data);
// });
