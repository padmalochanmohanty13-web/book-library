// ======================================================
// GOOGLE BOOKS API
// ======================================================

const API_URL = "https://www.googleapis.com/books/v1/volumes";

const API_KEY = "AIzaSyB0TdSemSIomorDlhH5g_E2wokxkRHLilE";

// ======================================================
// CATEGORIES
// ======================================================

const categories = [
  {
    name: "Fiction",
    query: "fiction",
    description: "Imaginative stories, novels and literary works.",
  },

  {
    name: "Romance",
    query: "romance",
    description: "Stories about love, relationships and emotional connections.",
  },

  {
    name: "Mystery",
    query: "mystery",
    description: "Detective stories, mysteries and crime investigations.",
  },

  {
    name: "Science Fiction",
    query: "science fiction",
    description:
      "Stories about science, technology, space and futuristic worlds.",
  },

  {
    name: "Fantasy",
    query: "fantasy",
    description:
      "Magical worlds, mythical creatures and supernatural adventures.",
  },
];

// ======================================================
// GET HTML ELEMENTS
// ======================================================

const categoryContainer = document.getElementById("categoryContainer");

const categorySearch = document.getElementById("categorySearch");

const noCategory = document.getElementById("noCategory");

const categoryBooksSection = document.getElementById("categoryBooksSection");

const categoryBooksContainer = document.getElementById(
  "categoryBooksContainer",
);

const selectedCategoryTitle = document.getElementById("selectedCategoryTitle");

const booksHeading = document.getElementById("booksHeading");

const booksSubHeading = document.getElementById("booksSubHeading");

const bookLoading = document.getElementById("bookLoading");

const noBooks = document.getElementById("noBooks");

// ======================================================
// LOAD CATEGORIES
// ======================================================

async function loadCategories() {
  categoryContainer.innerHTML = "";

  noCategory.style.display = "none";

  for (const category of categories) {
    const image = await getCategoryBookImage(category.query);

    createCategoryCard(category, image);
  }
}

// ======================================================
// GET CATEGORY IMAGE
// ======================================================

async function getCategoryBookImage(category) {
  try {
    const apiURL = `${API_URL}?q=subject:${encodeURIComponent(category)}&maxResults=5&key=${API_KEY}`;

    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      for (const book of data.items) {
        const image =
          book.volumeInfo?.imageLinks?.thumbnail ||
          book.volumeInfo?.imageLinks?.smallThumbnail;

        if (image) {
          return image.replace("http://", "https://");
        }
      }
    }
  } catch (error) {
    console.error("Error loading category image:", error);
  }

  // DEFAULT IMAGE

  return "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80";
}

// ======================================================
// CREATE CATEGORY CARD
// ======================================================

function createCategoryCard(category, image) {
  const card = document.createElement("div");

  card.className = "category-card";

  card.innerHTML = `

        <img
            src="${image}"
            alt="${category.name}"
            class="category-image"
        >


        <div class="category-info">

            <h3>
                ${category.name}
            </h3>


            <p>
                ${category.description}
            </p>


            <button
                class="category-btn"
            >

                Explore Books

                <i class="fa-solid fa-arrow-right"></i>

            </button>

        </div>

    `;

  // ==================================================
  // EXPLORE BUTTON
  // ==================================================

  const exploreButton = card.querySelector(".category-btn");

  exploreButton.addEventListener("click", function (event) {
    event.stopPropagation();

    loadCategoryBooks(category.query, category.name);
  });

  // ==================================================
  // CLICK CATEGORY CARD
  // ==================================================

  card.addEventListener("click", function () {
    loadCategoryBooks(category.query, category.name);
  });

  categoryContainer.appendChild(card);
}

// ======================================================
// LOAD CATEGORY BOOKS
// ======================================================

async function loadCategoryBooks(category, categoryName) {
  // CLEAR OLD BOOKS

  categoryBooksContainer.innerHTML = "";

  // SHOW LOADING

  bookLoading.style.display = "block";

  noBooks.style.display = "none";

  // UPDATE HEADING

  selectedCategoryTitle.textContent = categoryName.toUpperCase();

  booksHeading.textContent = `${categoryName} Books`;

  booksSubHeading.textContent = `Explore 20 books from the ${categoryName} category.`;

  try {
    const apiURL = `${API_URL}?q=subject:${encodeURIComponent(category)}&maxResults=20&startIndex=0&key=${API_KEY}`;

    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    // HIDE LOADING

    bookLoading.style.display = "none";

    // CHECK BOOKS

    if (!data.items || data.items.length === 0) {
      noBooks.textContent = "No books found for this category.";

      noBooks.style.display = "block";

      return;
    }

    // MAXIMUM 20 BOOKS

    const books = data.items.slice(0, 20);

    // CREATE BOOK CARDS

    books.forEach(function (book) {
      createBookCard(book);
    });

    // ==================================================
    // SCROLL TO CATEGORY BOOK SECTION
    // ==================================================

    categoryBooksSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } catch (error) {
    console.error("Error loading books:", error);

    bookLoading.style.display = "none";

    noBooks.textContent = "Unable to load books. Please try again.";

    noBooks.style.display = "block";
  }
}

// ======================================================
// CREATE BOOK CARD
// ======================================================

function createBookCard(book) {
  const info = book.volumeInfo || {};

  const saleInfo = book.saleInfo || {};

  // ==================================================
  // BOOK ID
  // ==================================================

  const bookId = book.id;

  // ==================================================
  // TITLE
  // ==================================================

  const title = info.title || "Unknown Title";

  // ==================================================
  // AUTHOR
  // ==================================================

  const authors = info.authors ? info.authors.join(", ") : "Unknown Author";

  // ==================================================
  // IMAGE
  // ==================================================

  let image = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail;

  if (!image) {
    image = "https://via.placeholder.com/300x400?text=No+Image";
  }

  image = image.replace("http://", "https://");

  // ==================================================
  // DESCRIPTION
  // ==================================================

  let description = info.description || "No description available.";

  if (description.length > 100) {
    description = description.substring(0, 100) + "...";
  }

  // ==================================================
  // PUBLISHER
  // ==================================================

  const publisher = info.publisher || "Unknown Publisher";

  // ==================================================
  // PUBLISHED DATE
  // ==================================================

  const publishedDate = info.publishedDate || "Unknown Date";

  // ==================================================
  // PRICE
  // ==================================================

  const price = getBookPrice(saleInfo);

  // ==================================================
  // CREATE CARD
  // ==================================================

  const bookCard = document.createElement("div");

  bookCard.className = "book-card";

  bookCard.innerHTML = `

        <img
            src="${image}"
            alt="${title}"
            class="book-image"
        >


        <div class="book-info">

            <h3>
                ${title}
            </h3>


            <p class="book-author">

                <strong>
                    Author:
                </strong>

                ${authors}

            </p>


            <p class="book-description">

                ${description}

            </p>


            <p class="book-publisher">

                <strong>
                    Publisher:
                </strong>

                ${publisher}

            </p>


            <p class="book-date">

                <strong>
                    Published:
                </strong>

                ${publishedDate}

            </p>


            <p class="book-price">

                <strong>
                    Price:
                </strong>

                ${formatPrice(price)}

            </p>


            <div class="book-buttons">


                <button
                    class="details-btn"
                    type="button"
                >

                    <i class="fa-solid fa-eye"></i>

                    Details

                </button>


                <button
                    class="add-cart-btn"
                    type="button"
                >

                    <i class="fa-solid fa-cart-plus"></i>

                    Add to Cart

                </button>


            </div>

        </div>

    `;

  // ==================================================
  // DETAILS BUTTON
  // ==================================================

  const detailsButton = bookCard.querySelector(".details-btn");

  detailsButton.addEventListener("click", function (event) {
    event.stopPropagation();

    window.location.href = `book-details.html?id=${encodeURIComponent(bookId)}`;
  });

  // ==================================================
  // IMAGE CLICK → DETAILS
  // ==================================================

  const bookImage = bookCard.querySelector(".book-image");

  bookImage.addEventListener("click", function () {
    window.location.href = `book-details.html?id=${encodeURIComponent(bookId)}`;
  });

  // ==================================================
  // ADD TO CART
  // ==================================================

  const addCartButton = bookCard.querySelector(".add-cart-btn");

  addCartButton.addEventListener("click", function (event) {
    event.stopPropagation();

    addToCart(book, price, image);
  });

  // ==================================================
  // ADD BOOK CARD TO PAGE
  // ==================================================

  categoryBooksContainer.appendChild(bookCard);
}

// ======================================================
// GET BOOK PRICE
// ======================================================

function getBookPrice(saleInfo) {
  const googlePrice = saleInfo.retailPrice || saleInfo.listPrice;

  if (googlePrice && typeof googlePrice.amount === "number") {
    return googlePrice.amount;
  }

  // DEFAULT PRICE

  return 399;
}

// ======================================================
// FORMAT PRICE
// ======================================================

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
}

// ======================================================
// ADD BOOK TO CART
// ======================================================

function addToCart(book, price, image) {
  const info = book.volumeInfo || {};

  // ==================================================
  // GET EXISTING CART
  // ==================================================

  let cart = JSON.parse(localStorage.getItem("bookCart")) || [];

  // ==================================================
  // CHECK IF BOOK ALREADY EXISTS
  // ==================================================

  const existingBook = cart.find((item) => item.id === book.id);

  // ==================================================
  // IF ALREADY EXISTS
  // ==================================================

  if (existingBook) {
    existingBook.quantity = (Number(existingBook.quantity) || 1) + 1;
  }

  // ==================================================
  // NEW BOOK
  // ==================================================
  else {
    const cartBook = {
      id: book.id,

      title: info.title || "Unknown Title",

      author: info.authors ? info.authors.join(", ") : "Unknown Author",

      image: image,

      price: price,

      quantity: 1,
    };

    cart.push(cartBook);
  }

  // ==================================================
  // SAVE CART
  // ==================================================

  localStorage.setItem("bookCart", JSON.stringify(cart));

  // ==================================================
  // GO TO CART
  // ==================================================

  window.location.href = "cart.html";
}

// ======================================================
// CATEGORY SEARCH
// ======================================================

categorySearch.addEventListener("input", function () {
  const searchValue = categorySearch.value.toLowerCase().trim();

  const cards = document.querySelectorAll(".category-card");

  let found = false;

  cards.forEach(function (card) {
    const categoryName = card.querySelector("h3").textContent.toLowerCase();

    if (categoryName.includes(searchValue)) {
      card.style.display = "block";

      found = true;
    } else {
      card.style.display = "none";
    }
  });

  // ==================================================
  // NO CATEGORY
  // ==================================================

  if (found) {
    noCategory.style.display = "none";
  } else {
    noCategory.style.display = "block";
  }
});

// ======================================================
// START APPLICATION
// ======================================================

loadCategories();
