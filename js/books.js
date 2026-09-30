// GOOGLE BOOKS API

const URL = "https://www.googleapis.com/books/v1/volumes";

//API KEY
const API_KEY = "AIzaSyB0TdSemSIomorDlhH5g_E2wokxkRHLilE";

// DOM ELEMENT

const booksContainer = document.getElementById("booksContainer");

const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

const DEFAULT_PRICE = 399;




async function getBooks(query) {
  try {

     let startIndex = 0;

    const res = await fetch(
      `${URL}?q=${encodeURIComponent(query)}&maxResults=40&startIndex=${startIndex}&key=${AIzaSyB0TdSemSIomorDlhH5g_E2wokxkRHLilE}`,
    );

    console.log("Response:", res);
    console.log("Status:", res.status);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    console.log("API Response:", data);

    //KEEPS THE  BOOKS WITH IMAGE & AUTHOR

    const validBooks = data.items.filter((book) => {
      const info = book.volumeInfo || {};
      const hasAuthor = info.authors && info.authors.length > 0;
      const hasImage =
        info.imageLinks &&
        (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail);

      return hasAuthor && hasImage;
    });

    // FOR UNIQUE BOOKS

    const uniqueBooks = Array.from(
  new Map(
    validBooks.map(book => [book.id, book])
  ).values()
);

    // Show maximum 20 books
    displayBooks(uniqueBooks.slice(0, 40));

  } catch (error) {
    console.error("Error:", error);

    booksContainer.innerHTML = "";
  }
}






// Display BOOKS

function displayBooks(books) {

  booksContainer.innerHTML = "";

  books.forEach((book) => {
    const info = book.volumeInfo || {};
    const saleInfo = book.saleInfo || {};

    console.log("saleInfo", saleInfo);

    // get book id
    const bookId = book.id;

    // Title of Book

    const title = info.title || "Unknown Title";

    // BOOK Author

    const author =
      info.authors && info.authors.length > 0
        ? info.authors.join()
        : " NO author Found";

    //  BOOK IMage

    let image =
      info.imageLinks &&
      (info.imageLinks?.thumbnail ||
        info.imageLinks?.smallThumbnail ||
        "Image Not Found");

    //  To Avoid the http and Https conflict

    if (image) {
      image = image.replace("http://", "https://");
    }

    // CATAGORY

    const category =
      info.categories && info.categories.length > 0
        ? info.categories[0]
        : "General";

    //  GOOGLE BOOK PRICE

    const googlePrice = saleInfo.retailPrice || saleInfo.listPrice;

    let priceText = `₹${DEFAULT_PRICE}`;

    if (googlePrice && typeof googlePrice.amount === "number") {
      priceText = formatPrice(googlePrice.amount, "INR");
    }

 

// SEND THE BOOK ID TO DETAILS PAGE
const detailsPage = `book-details.html?id=${encodeURIComponent(bookId)}`;

// DYNAMICALLY CARD SHOWS ON UI

const card = document.createElement("div");
card.className = "book-card";
card.innerHTML = `    
   <a href="${detailsPage}" class="book-image-link">

   <img src="${image}" alt="${title}" class="book-image">

   </a>  

   <div class="book-details">
   <span class="book-category">${category}</span>
   <h2 class="book-title">${title}</h2>

   <p class="book-author">${author}</p>

   <div class="book-bottom">
   <span>${priceText}</span>
   <a href="${detailsPage}" class="details-btn">
    Details 
     <i class="fa-solid fa-arrow-right"></i>
     </a>

   </div>

   </div>
  
   `;

    booksContainer.appendChild(card);

     });
}



// FORMAT PRICE

function formatPrice(
  amount,
  currencyCode
) {

  try {

    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: currencyCode
      }
    ).format(amount);

  } catch (error) {

    return `₹${amount}`;

  }

}


// search Books

function searchBooks() {
  const query = searchInput.value.trim();
  // Empty search
  if (query === "") {

    getBooks("books");

    return;

  }

  // Search entered text

  getBooks(query);

}

searchBtn.addEventListener(
  "click",
  searchBooks
);


searchInput.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Enter") {

      searchBooks();

    }

  }
);





const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("search");

if (searchQuery) {

    searchInput.value = searchQuery;
    getBooks(searchQuery);

} else {

    getBooks("books");

}




