// 1. search for a specific location
// 2. toggle displaying the data in F or C
// 3. change the look of the page based on the data
// 3.1. Giphy API?

import { apiKey, baseUrl } from "./environment";

async function fetchFromAPI() {
  const response = await fetch(
    `${baseUrl}/current.json?key=${apiKey}&q=10001`,
    { mode: "cors" }
    // {
    //   method: "GET",
    //   headers: {
    //     key: `${apiKey}`,
    //   },
    // }
  ).then(function (response) {
    return response.json();
  });

  return response;
}

function getLocation() {
  fetchFromAPI().then((result) => {
    console.log(result.location);
  });
}

getLocation();
