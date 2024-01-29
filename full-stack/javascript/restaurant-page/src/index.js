import { homeTab } from "./home";
import { menuTab } from "./menu";
import { aboutTab } from "./about";

const contentDiv = document.getElementById("content");
const homeButton = document.getElementById("home");
const menuButton = document.getElementById("menu");
const aboutButton = document.getElementById("about");

homeTab();

homeButton.addEventListener("click", () => {
    contentDiv.innerHTML = "";
    homeTab();
})

menuButton.addEventListener("click", () => {
    contentDiv.innerHTML = "";
    menuTab();
})

aboutButton.addEventListener("click", () => {
    contentDiv.innerHTML = "";
    aboutTab();
})


console.log("Webpack is working!");