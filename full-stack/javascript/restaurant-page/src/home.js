
export function homeTab() {
    const headline = document.createElement("h1");
    headline.textContent = "Restaurant Gordon Ramsay"

    const image = document.createElement("img");
    image.src = "C:/Users/thoma/source/repos/the-odin-project/full-stack/javascript/restaurant-page/dist/pictures/restaurantgordonramsay.jpg";
    image.width = 600;
    image.height = 500;

    const description = document.createElement("p");
    description.textContent = "Wow, amazing restaurant. Beef Wellington";

    const pageContent = document.getElementById("content");

    pageContent.appendChild(headline);
    pageContent.appendChild(image);
    pageContent.appendChild(description);
}