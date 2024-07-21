const myLibrary = [];

function Book(name, author, pages, status, link) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.link = link;
    
    this.info = () => {
        return `The ${this.name} by ${this.author}, ${this.pages} pages, ${this.status}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push({'name': book.name,
                    'author': book.author,
                    '# of pages': book.pages,
                    'status': book.status,
                    'link':book.link})
}


const LITOW = new Book("Lightning Is The Only Way", "Warmaisach", "1329", "Completed", "https://www.lightnovelworld.co/novel/lightning-is-the-only-way-16091347");
const RI = new Book("Revered Insanity", "Gu Zhen Ren", "2334", "Completed", "https://www.lightnovelworld.co/novel/reverend-insanity-05122222");
const SGIWM = new Book("Sword God In A World Of Magic", "Warmaisach", "1033", "Completed", "https://www.lightnovelworld.co/novel/sword-god-in-a-world-of-magic-05122221");
const SS = new Book("Shadow Slave", "Guiltythree", "1756", "Ongoing", "https://www.lightnovelworld.co/novel/shadow-slave-05122222");
addBookToLibrary(LITOW);
addBookToLibrary(RI);
addBookToLibrary(SGIWM);
addBookToLibrary(SS);


function createTableRow(book, index) {
    const currentRow = document.createElement("tr");

    const firstCell = document.createElement("td");
    const bookNumbering = document.createTextNode(index + 1);
    firstCell.appendChild(bookNumbering);
    currentRow.appendChild(firstCell);

    /* for name link */
    const bookLink = document.createElement("a");
    /* for status */
    const statusBtn = document.createElement("button");

    Object.entries(book).forEach(([key, value]) => {
        const currentCell = document.createElement("td");
        const currentText = document.createTextNode(value);

        if (key === 'name' && book.link) {
            bookLink.href = book.link;
            bookLink.target = "_blank";
            bookLink.appendChild(currentText);
            currentCell.appendChild(bookLink);
            currentRow.appendChild(currentCell);
        }

        else if (key === 'status') {
            if (value === "Ongoing") {
                statusBtn.classList.add("ongoing");
            } else if (value === "Completed") {
                statusBtn.classList.add("completed");
            }
            statusBtn.appendChild(currentText);
            statusBtn.addEventListener('click', (e) => {
                e.target.classList.toggle("completed");
                e.target.classList.toggle("ongoing");

                e.target.textContent = e.target.className.charAt(0).toUpperCase() + e.target.className.slice(1);
            })

            currentCell.appendChild(statusBtn);
            currentRow.appendChild(currentCell);
        }

        else if (key != 'link'){
            currentCell.appendChild(currentText);
            currentRow.appendChild(currentCell);
        }
    });

    return currentRow;
}

function createCloseButton(index) {
    const closeBtn = document.createElement('button');
    const span = document.createElement('span');

    span.classList.add('material-symbols-outlined');
    span.textContent = 'close';

    closeBtn.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        generateTable(myLibrary);
    });

    closeBtn.appendChild(span);

    return closeBtn;
}

function generateTable(myLibrary) {
    const tblBody = document.querySelector("#mainTableBody");
    const sectionTwo = document.querySelector(".sectionTwo");

    tblBody.textContent = "";
    sectionTwo.textContent = "";

    myLibrary.forEach((book, index) => {
        const currentRow = createTableRow(book, index);
        tblBody.appendChild(currentRow);

        const closeBtn = createCloseButton(index);
        sectionTwo.appendChild(closeBtn);
    });
}

function addBook(myLibrary) {
    const lastItem = myLibrary[myLibrary.length - 1];
    const tblBody = document.querySelector("#mainTableBody");
    const lastRow = createTableRow(lastItem, myLibrary.length - 1);

    tblBody.appendChild(lastRow);
    generateTable(myLibrary);
}

generateTable(myLibrary);

const dialog = document.getElementById("mainDialog");
const btnOpenBook = document.getElementById("openButton");
const btnCloseBook = document.getElementById("closeButton");
const btnAddBook = document.getElementById("addNewBook");

btnOpenBook.addEventListener('click', () => {
    dialog.showModal();
});

btnCloseBook.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
});

btnAddBook.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameBook = document.getElementById("nameBook").value;
    const authorBook = document.getElementById("authorBook").value;
    const pagesBook = document.getElementById("pagesBook").value;
    let statusBook = document.getElementById("statusBook").checked;
    const bookLink = document.getElementById("bookLink").value;

    statusBook = statusBook ? "Completed" : "Ongoing";

    const newBook = new Book(nameBook, authorBook, pagesBook, statusBook, bookLink);
    addBookToLibrary(newBook);
    addBook(myLibrary);
    dialog.close();
});

