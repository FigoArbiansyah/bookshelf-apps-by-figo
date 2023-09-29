let books = JSON.parse(localStorage.getItem("books")) || [];

// Get Form Element
const form = document.getElementById("form");

// Get Input Element
const id = document.getElementById("id");
const title = document.getElementById("title");
const author = document.getElementById("author");
const year = document.getElementById("year");
const isComplete = document.getElementById("isComplete");

// Render Book Cards
function renderBooks() {
  const cardWrapperNotCompleted = document.querySelector(
    ".card-wrapper-not-completed"
  );
  const cardWrapperCompleted = document.querySelector(
    ".card-wrapper-completed"
  );

  cardWrapperNotCompleted.innerHTML = "";
  cardWrapperCompleted.innerHTML = "";

  books.map((book, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.setAttribute("id", book?.id);

    const titleHeading = document.createElement("h4");
    if (book?.isComplete) {
      titleHeading.className = "line-through-title";
    }
    titleHeading.textContent = book?.title;

    const tableElement = document.createElement("table");
    tableElement.setAttribute("cellspacing", "10");

    const row1 = document.createElement("tr");

    const authorCell = document.createElement("td");
    authorCell.textContent = "Penulis";

    const colonCell1 = document.createElement("td");
    colonCell1.textContent = ":";

    const authorNameCell = document.createElement("td");
    authorNameCell.textContent = book?.author;

    row1.appendChild(authorCell);
    row1.appendChild(colonCell1);
    row1.appendChild(authorNameCell);

    const row2 = document.createElement("tr");
    const yearCell = document.createElement("td");
    yearCell.textContent = "Tahun";

    const colonCell2 = document.createElement("td");
    colonCell2.textContent = ":";

    const yearValueCell = document.createElement("td");
    yearValueCell.textContent = book?.year;

    row2.appendChild(yearCell);
    row2.appendChild(colonCell2);
    row2.appendChild(yearValueCell);

    tableElement.appendChild(row1);
    tableElement.appendChild(row2);

    const actionButtonsDiv = document.createElement("div");
    actionButtonsDiv.className = "action-buttons";

    // Membuat tombol pertama
    const button1 = document.createElement("button");
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg1.setAttribute("fill", "none");
    svg1.setAttribute("viewBox", "0 0 24 24");
    svg1.setAttribute("stroke-width", "2.5");
    svg1.setAttribute("stroke", book?.isComplete ? "red" : "darkgreen");

    const path1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path1.setAttribute("stroke-linecap", "round");
    path1.setAttribute("stroke-linejoin", "round");
    path1.setAttribute(
      "d",
      book?.isComplete ? "M6 18L18 6M6 6l12 12" : "M4.5 12.75l6 6 9-13.5"
    );

    svg1.appendChild(path1);
    button1.appendChild(svg1);
    button1.addEventListener("click", () => {
      const filteredBook = books.find((_book) => _book.id === book.id);
      filteredBook.isComplete = !filteredBook.isComplete;
      renderBooks();
    });

    // Membuat tombol kedua (serupa dengan tombol pertama)
    const button2 = document.createElement("button");
    const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg2.setAttribute("fill", "none");
    svg2.setAttribute("viewBox", "0 0 24 24");
    svg2.setAttribute("stroke-width", "1.5");
    svg2.setAttribute("stroke", "orange");

    const path2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path2.setAttribute("stroke-linecap", "round");
    path2.setAttribute("stroke-linejoin", "round");
    path2.setAttribute(
      "d",
      "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    );

    svg2.appendChild(path2);
    button2.appendChild(svg2);
    button2.addEventListener("click", () => {
      id.value = book?.id;
      title.value = book?.title;
      author.value = book?.author;
      year.value = book?.year;
      isComplete.checked = book?.isComplete;
    });

    const button3 = document.createElement("button");
    const svg3 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg3.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg3.setAttribute("fill", "none");
    svg3.setAttribute("viewBox", "0 0 24 24");
    svg3.setAttribute("stroke-width", "1.5");
    svg3.setAttribute("stroke", "red");

    const path3 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path3.setAttribute("stroke-linecap", "round");
    path3.setAttribute("stroke-linejoin", "round");
    path3.setAttribute(
      "d",
      "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    );

    svg3.appendChild(path3);
    button3.appendChild(svg3);
    button3.addEventListener("click", () => {
      const deleteConfirmation = confirm(
        `Apakah anda yakin ingin menghapus buku ${book.title.toUpperCase()}?`
      );
      if (deleteConfirmation) {
        const notIncludesBook = books.filter((_book) => _book.id != book.id);
        books = notIncludesBook;
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
      }
    });

    actionButtonsDiv.appendChild(button1);
    actionButtonsDiv.appendChild(button2);
    actionButtonsDiv.appendChild(button3);

    cardDiv.appendChild(titleHeading);
    cardDiv.appendChild(tableElement);
    cardDiv.appendChild(actionButtonsDiv);

    if (book.isComplete) {
      cardWrapperCompleted.appendChild(cardDiv);
    } else {
      cardWrapperNotCompleted.appendChild(cardDiv);
    }

    const cardDivById = document.getElementById(book.id);
    cardDivById.style.animation = "cardShowing 0.4s ease";

    // Set Text Header
    document.querySelector(
      ".title-not-complete"
    ).innerText = `Belum Selesai Dibaca (${
      books.filter((book) => book.isComplete == false).length
    })`;
    document.querySelector(".title-complete").innerText = `Selesai Dibaca (${
      books.filter((book) => book.isComplete == true).length
    })`;
  });
}

// Render First Time
renderBooks();

const clearInput = (element) => {
  element.value = "";
};

const resetForm = () => {
  id.value = 0;
  clearInput(title);
  clearInput(author);
  clearInput(year);
  clearInput(isComplete);
  isComplete.checked = false;
};

document.getElementById("reset-button").addEventListener("click", resetForm);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const requestData = {
    id: id.value.toString() === "0" ? Date.now() : id.value,
    title: title.value,
    author: author.value,
    year: year.value,
    isComplete: isComplete.checked,
  };
  if (id.value.toString === "0") {
    books.push(requestData);
  } else {
    const notIncludesBook = books.filter((book) => book.id != id.value);
    notIncludesBook.push(requestData);
    books = notIncludesBook;
  }
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
  resetForm();
});

const searchBooks = (title) => {
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(title)
  );
  if (title === "") {
    books = JSON.parse(localStorage.getItem("books")) || [];
  } else {
    books = filteredBooks;
  }
  renderBooks();
  books = JSON.parse(localStorage.getItem("books")) || [];
  searchBarInput.value = "";
};

// Search Feature
const searchBarInput = document.getElementById("searchbar");

document.querySelector(".searchbar-button").addEventListener("click", (e) => {
  searchBooks(searchBarInput.value);
});
document
  .querySelector(".searchbar-elements")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    searchBooks(searchBarInput.value);
  });
