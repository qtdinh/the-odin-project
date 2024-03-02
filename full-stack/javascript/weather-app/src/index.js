import { apiKey, baseUrl } from "./environment";

async function getLocation() {
  const response = await fetch(
    `${baseUrl}/current.json?key=${apiKey}&q=10001`,
    { mode: "cors" }
    // {
    //   method: "GET",
    //   headers: {
    //     key: `${apiKey}`,
    //   },
    // }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
    });
}

getLocation();
