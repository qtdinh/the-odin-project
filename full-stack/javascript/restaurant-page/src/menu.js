{/* <h1>Menu</h1>

<h2>Menu Prestige</h2>
<div>
    <h3>Winter salad</h3>
    <p>smoked duck, beetroot, blackberries, hazelnuts</p>
</div>
<div>
    <h3>Ravioli</h3>
    <p>lobster, langoustine, salmon, black truffle</p>
</div>
<div>
    <h3>Cornish turbot</h3>
    <p>Violina pumpkin, clementine, shiso</p>
</div>
<div>
    <h3>Roast pigeon</h3>
    <p>celeriac, Alsacc bacon, spiced prune</p>
</div>
<div>
    <h3>100-day aged Cumbrian Blue Grey</h3>
    <p>Jerusalem artichoke, black garlic, smoked bone marrow</p>
</div>

<h2>Selection of cheeses <br>(£30 supplement)</h2>

<div>
    <h3>Sorbet</h3>
    <p>quince, masala chai, honey</p>
</div>

<div>
    <h3>Pecan praline</h3>
    <p>Pedro Ximenez, cocoa nib ice cream</p>
</div> */}

export function menuTab() {
    const createMenuItem = (name, description) => {
        const menuItem = document.createElement("div");

        const itemName = document.createElement("h3");
        itemName.textContent = name;

        const itemDescription = document.createElement("p");
        itemDescription.textContent = description;

        menuItem.appendChild(itemName);
        menuItem.appendChild(itemDescription);
        
        return menuItem;
    }

    const contentDiv = document.getElementById("content");

    const headline = document.createElement("h1");
    headline.textContent = "Menu";

    const menuPrestige = document.createElement("h2");
    menuPrestige.textContent = "Menu Prestige";

    const menuItems = [
        { name: "Winter salad", description: "smoked duck, beetroot, blackberries, hazelnuts" },
        { name: "Ravioli", description: "lobster, langoustine, salmon, black truffle" },
        { name: "Cornish turbot", description: "Violina pumpkin, clementine, shiso" },
        { name: "Roast pigeon", description: "celeriac, Alsacc bacon, spiced prune"},
        { name: "100-day aged Cumbrian Blue Grey", description: "Jerusalem artichoke, black garlic, smoked bone marrow"},
    ];

    const cheeseItems = [
        {name: "Sorbet", description: "quince, masala chai, honey"},
        {name: "Pecan praline", description: "Pedro Ximenez, cocoa nib ice cream"}
    ];

    const cheeseSelection = document.createElement("h2");
    cheeseSelection.innerHTML = "Selection of cheeses <br>(£30 supplement)";

    contentDiv.appendChild(headline);
    contentDiv.appendChild(menuPrestige);

    menuItems.forEach(item => {
        const menuItem = createMenuItem(item.name, item.description);
        contentDiv.appendChild(menuItem);
    });

    contentDiv.appendChild(cheeseSelection);

    cheeseItems.forEach(item => {
        const menuItem = createMenuItem(item.name, item.description);
        contentDiv.appendChild(menuItem);
    });
}