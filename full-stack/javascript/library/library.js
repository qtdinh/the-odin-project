const myLibrary = [];
const container = document.createElement("div");
const bookDialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");
const bookSubmit = document.getElementById("book-submit");
container.id = "book-container";

//display one book
const book = new Book("The Hobbit", "J.R.R. Tolkien", "295", false);

myLibrary.push(book);

displayEachBook();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        beenRead = this.read ? "has been read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${beenRead}`;
    }

    this.toggleReadStatus = function() {
        this.read = !this.read;
    };
}

function openDialog() {
    bookDialog.showModal();
}

function addBookToLibrary() {

    //take input from user
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    
    //save new item
    const newBook = new Book(title, author, pages, read)

    //store into array
    myLibrary.push(newBook);

    // Update the display
    displayEachBook();
}

function removeBook(index) {
    //remove book
    myLibrary.splice(index, 1)
    //update the display after removal
    displayEachBook();
}

function changeReadStatus(book) {
    book.toggleReadStatus();
    displayEachBook();
}

//3
function displayEachBook() {

    //clear HTML
    container.innerHTML = "";

    //loop through the array
    //5. add a new DOM element with the actual book object
    //create a function that removes for a particular element
    //refactor into a for loop, from which we'll get the index
    //create a button that has the onClick property with the function

    for (var i = 0; i < myLibrary.length; i++) {
        (function(index) {
            const newDiv = document.createElement("div");
            const newNode = document.createTextNode(myLibrary[index].info());
            const buttonsContainer = document.createElement("div");
            const removeButton = document.createElement("button");
            const readButton = document.createElement("button");

            buttonsContainer.classList.add("buttons-container");

            removeButton.textContent = "Remove Book"
            removeButton.addEventListener('click', () => {
                removeBook(index);
            })

            readButton.textContent = "Read";
            readButton.addEventListener('click', () => {
                changeReadStatus(myLibrary[index]);
            })

            newDiv.appendChild(newNode);
            buttonsContainer.appendChild(removeButton);
            buttonsContainer.appendChild(readButton);
            newDiv.appendChild(buttonsContainer);


            container.appendChild(newDiv);

        })(i);
    };

    //display each book on the page
    document.body.appendChild(container);
}

bookSubmit.addEventListener('click', (event) => {
    //prevents form from trying to send the data to a server by default
    //implemented this for learning purposes
    event.preventDefault();
    bookDialog.close();
})

displayEachBook();