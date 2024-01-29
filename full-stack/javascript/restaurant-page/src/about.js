{/* <h1>Contact Us</h1>
<div>
    <h3>Gordon Ramsay</h3>
    <p>Chef</p>
    <p>email@email.com</p>

    <h3>Jocky Petrie</h3>
    <p>Sous Chef</p>
    <p>email@email.com</p>

    <h3>Scott Leibfried</h3>
    <p>Sous Chef</p>
    <p>email@email.com</p>
</div> */}

export function aboutTab() {
    const createContactItem = (name, title, email) => {
        const contactItem = document.createElement("div");

        const contactName = document.createElement("h3");
        contactName.textContent = name;

        const contactTitle = document.createElement("p");
        contactTitle.textContent = title;

        const contactEmail = document.createElement("p");
        contactEmail.textContent = email;

        contactItem.appendChild(contactName);
        contactItem.appendChild(contactTitle);
        contactItem.appendChild(contactEmail);
        
        return contactItem;
    }

    const contentDiv = document.getElementById("content");

    const headline = document.createElement("h1");
    headline.textContent = "Contact Us";

    contentDiv.appendChild(headline);

    const contactItems = [
        {name: "Gordon Ramsay", title: "Head Chef", email: "email@email.com"},
        {name: "Jocky Petrie", title: "Sous Chef", email: "email@email.com"},
        {name: "Scott Leibfried", title: "Sous Chef", email: "email@email.com"},
    ]

    contactItems.forEach(item => {
        const contactItem = createContactItem(item.name, item.title, item.email);
        contentDiv.appendChild(contactItem);
    })
}