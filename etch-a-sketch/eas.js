// todo
//3. make a button to prompt the user for dimensions of the grid

//1
const resetButton = document.getElementById("reset")
const gridContainer = document.createElement("div")
gridContainer.classList.add("grid-container")
document.body.appendChild(gridContainer)

let squaresPerSide = 0

resetButton.addEventListener("click", (event) => {
    squaresPerSide = prompt("How many squares per each side? (squares x squares)")
    squaresPerSide = parseInt(squaresPerSide);


    const gridContainer = document.querySelector(".grid-container");
    const flexBasisPercentage = `calc(100% / ${squaresPerSide})`;
    gridContainer.innerHTML = "";

    dimensions = squaresPerSide * squaresPerSide

    for(let i = 0; i < dimensions; i++) {
        const div = document.createElement("div")
        div.classList.add("box")
        div.style.flexBasis = flexBasisPercentage
    
        //2
        div.addEventListener("mouseover", (event) => {
            event.target.style.backgroundColor = "purple";
        });
        
        gridContainer.appendChild(div)
    }

})

