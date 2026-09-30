// const URL = "https://www.googleapis.com/books/v1/volumes";

// const API_KEY = "AIzaSyB0TdSemSIomorDlhH5g_E2wokxkRHLilE";


// // ======================================================
// // CATEGORIES
// // ======================================================

// const categories = [

//     {
//         name: "Fiction",
//         query: "fiction",
//         description:
//             "Imaginative stories, novels and literary works."
//     },

//     {
//         name: "Romance",
//         query: "romance",
//         description:
//             "Stories about love, relationships and emotional connections."
//     },

//     {
//         name: "Mystery",
//         query: "mystery",
//         description:
//             "Detective stories, mysteries and crime investigations."
//     },

//     {
//         name: "Science Fiction",
//         query: "science fiction",
//         description:
//             "Stories about science, technology, space and futuristic worlds."
//     },

//     {
//         name: "Fantasy",
//         query: "fantasy",
//         description:
//             "Magical worlds, mythical creatures and supernatural adventures."
//     }

// ];


// // ======================================================
// // HTML ELEMENTS
// // ======================================================

// const categoryContainer =
//     document.getElementById("categoryContainer");

// const categorySearch =
//     document.getElementById("categorySearch");

// const noCategory =
//     document.getElementById("noCategory");

// const categoryBooksSection =
//     document.getElementById("categoryBooksSection");

// const categoryBooksContainer =
//     document.getElementById("categoryBooksContainer");

// const selectedCategoryTitle =
//     document.getElementById("selectedCategoryTitle");

// const booksHeading =
//     document.getElementById("booksHeading");

// const booksSubHeading =
//     document.getElementById("booksSubHeading");

// const bookLoading =
//     document.getElementById("bookLoading");

// const noBooks =
//     document.getElementById("noBooks");


// // ======================================================
// // LOAD CATEGORIES
// // ======================================================

// async function loadCategories() {

//     categoryContainer.innerHTML = "";

//     for (const category of categories) {

//         const image =
//             await getCategoryBookImage(category.query);

//         createCategoryCard(category, image);

//     }

// }


// // ======================================================
// // GET CATEGORY IMAGE
// // ======================================================

// async function getCategoryBookImage(category) {

//     try {

//         const apiURL =
//             `${URL}?q=subject:${encodeURIComponent(category)}&maxResults=5&key=${API_KEY}`;

//         const response =
//             await fetch(apiURL);

//         const data =
//             await response.json();


//         if (
//             data.items &&
//             data.items.length > 0
//         ) {

//             for (const book of data.items) {

//                 const image =
//                     book.volumeInfo.imageLinks?.thumbnail ||
//                     book.volumeInfo.imageLinks?.smallThumbnail;

//                 if (image) {

//                     return image.replace(
//                         "http://",
//                         "https://"
//                     );

//                 }

//             }

//         }

//     }
//     catch (error) {

//         console.error(
//             "Error loading category image:",
//             error
//         );

//     }


//     return "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80";

// }


// // ======================================================
// // CREATE CATEGORY CARD
// // ======================================================

// function createCategoryCard(category, image) {

//     const card =
//         document.createElement("div");

//     card.className =
//         "category-card";


//     card.innerHTML = `

//         <img
//             src="${image}"
//             alt="${category.name}"
//             class="category-image"
//         >

//         <div class="category-info">

//             <h3>
//                 ${category.name}
//             </h3>

//             <p>
//                 ${category.description}
//             </p>

//             <button class="category-btn">

//                 Explore Books

//                 <i class="fa-solid fa-arrow-right"></i>

//             </button>

//         </div>

//     `;


//     // ==================================================
//     // EXPLORE BOOKS
//     // ==================================================

//     card.addEventListener(
//         "click",
//         function () {

//             loadCategoryBooks(
//                 category.query,
//                 category.name
//             );

//         }
//     );


//     categoryContainer.appendChild(card);

// }


// // ======================================================
// // LOAD 20 BOOKS
// // ======================================================

// async function loadCategoryBooks(
//     category,
//     categoryName
// ) {

//     categoryBooksContainer.innerHTML = "";

//     bookLoading.style.display = "block";

//     noBooks.style.display = "none";


//     selectedCategoryTitle.textContent =
//         categoryName.toUpperCase();

//     booksHeading.textContent =
//         `${categoryName} Books`;

//     booksSubHeading.textContent =
//         `Explore 20 books from the ${categoryName} category.`;


//     try {

//         const apiURL =
//             `${URL}?q=subject:${encodeURIComponent(category)}&maxResults=20&startIndex=0&key=${API_KEY}`;


//         const response =
//             await fetch(apiURL);


//         if (!response.ok) {

//             throw new Error(
//                 `HTTP Error: ${response.status}`
//             );

//         }


//         const data =
//             await response.json();


//         bookLoading.style.display = "none";


//         if (
//             !data.items ||
//             data.items.length === 0
//         ) {

//             noBooks.style.display = "block";

//             return;

//         }


//         const books =
//             data.items.slice(0, 20);


//         books.forEach(
//             function (book) {

//                 createBookCard(book);

//             }
//         );


//         // Scroll to books section

//         categoryBooksSection.scrollIntoView({
//             behavior: "smooth",
//             block: "start"
//         });

//     }
//     catch (error) {

//         console.error(
//             "Error loading books:",
//             error
//         );


//         bookLoading.style.display = "none";

//         noBooks.textContent =
//             "Unable to load books. Please try again.";

//         noBooks.style.display = "block";

//     }

// }


// // ======================================================
// // CREATE BOOK CARD
// // ======================================================

// function createBookCard(book) {

//     const info =
//         book.volumeInfo;


//     const title =
//         info.title ||
//         "Unknown Title";


//     const authors =
//         info.authors
//             ? info.authors.join(", ")
//             : "Unknown Author";


//     let image =
//         info.imageLinks?.thumbnail ||
//         info.imageLinks?.smallThumbnail;


//     if (!image) {

//         image =
//             "https://via.placeholder.com/300x400?text=No+Image";

//     }


//     image =
//         image.replace(
//             "http://",
//             "https://"
//         );


//     let description =
//         info.description ||
//         "No description available.";


//     if (description.length > 100) {

//         description =
//             description.substring(0, 100) +
//             "...";

//     }


//     const publisher =
//         info.publisher ||
//         "Unknown Publisher";


//     const publishedDate =
//         info.publishedDate ||
//         "Unknown Date";


//     // ==================================================
//     // BOOK CARD
//     // ==================================================

//     const bookCard =
//         document.createElement("div");

//     bookCard.className =
//         "book-card";


//     bookCard.innerHTML = `

//         <img
//             src="${image}"
//             alt="${title}"
//             class="book-image"
//         >

//         <div class="book-info">

//             <h3>
//                 ${title}
//             </h3>

//             <p class="book-author">
//                 <strong>Author:</strong>
//                 ${authors}
//             </p>

//             <p class="book-description">
//                 ${description}
//             </p>

//             <p class="book-publisher">
//                 <strong>Publisher:</strong>
//                 ${publisher}
//             </p>

//             <p class="book-date">
//                 <strong>Published:</strong>
//                 ${publishedDate}
//             </p>

//             <button
//                 class="add-cart-btn">

//                 <i class="fa-solid fa-cart-plus"></i>

//                 Add to Cart

//             </button>

//         </div>

//     `;


//     // ==================================================
//     // ADD TO CART BUTTON
//     // ==================================================

//     const addCartButton =
//         bookCard.querySelector(
//             ".add-cart-btn"
//         );


//     addCartButton.addEventListener(
//         "click",
//         function (event) {

//             // Prevent card click

//             event.stopPropagation();


//             addToCart(book);


//         }
//     );


//     categoryBooksContainer.appendChild(
//         bookCard
//     );

// }


// // ======================================================
// // ADD BOOK TO CART
// // ======================================================

// function addToCart(book) {

//     const info =
//         book.volumeInfo;


//     // Get existing cart

//     let cart =
//         JSON.parse(
//             localStorage.getItem("bookCart")
//         ) || [];


//     // Check whether book already exists

//     const existingBook =
//         cart.find(
//             item =>
//                 item.id === book.id
//         );


//     if (existingBook) {

//         alert(
//             "This book is already in your cart!"
//         );

//         window.location.href =
//             "cart.html";

//         return;

//     }


//     // Create cart item

//     const cartBook = {

//         id: book.id,

//         title:
//             info.title ||
//             "Unknown Title",

//         author:
//             info.authors
//                 ? info.authors.join(", ")
//                 : "Unknown Author",

//         image:
//             info.imageLinks?.thumbnail ||
//             info.imageLinks?.smallThumbnail ||
//             "https://via.placeholder.com/300x400?text=No+Image",

//         price:
//             generateBookPrice(),

//         quantity: 1

//     };


//     // Save book

//     cart.push(cartBook);


//     localStorage.setItem(
//         "bookCart",
//         JSON.stringify(cart)
//     );


//     // Message

//     alert(
//         `"${cartBook.title}" added to cart!`
//     );


//     // Go to cart page

//     window.location.href =
//         "cart.html";

// }


// // ======================================================
// // GENERATE DEMO PRICE
// // ======================================================

// function generateBookPrice() {

//     const price =
//         Math.floor(
//             Math.random() * 400
//         ) + 199;

//     return price;

// }


// // ======================================================
// // SEARCH CATEGORY
// // ======================================================

// categorySearch.addEventListener(
//     "input",
//     function () {

//         const searchValue =
//             categorySearch.value
//                 .toLowerCase()
//                 .trim();


//         const cards =
//             document.querySelectorAll(
//                 ".category-card"
//             );


//         let found = false;


//         cards.forEach(
//             function (card, index) {

//                 const categoryName =
//                     categories[index]
//                         .name
//                         .toLowerCase();


//                 if (
//                     categoryName.includes(
//                         searchValue
//                     )
//                 ) {

//                     card.style.display =
//                         "block";

//                     found = true;

//                 }
//                 else {

//                     card.style.display =
//                         "none";

//                 }

//             }
//         );


//         if (found) {

//             noCategory.style.display =
//                 "none";

//         }
//         else {

//             noCategory.style.display =
//                 "block";

//         }

//     }
// );


// // ======================================================
// // START
// // ======================================================

// loadCategories();

// ======================================================
// GOOGLE BOOKS API
// ======================================================

const URL = "https://www.googleapis.com/books/v1/volumes";

const API_KEY = "AIzaSyB0TdSemSIomorDlhH5g_E2wokxkRHLilE";


// ======================================================
// CATEGORIES
// ======================================================

const categories = [

    {
        name: "Fiction",
        query: "fiction",
        description:
            "Imaginative stories, novels and literary works."
    },

    {
        name: "Romance",
        query: "romance",
        description:
            "Stories about love, relationships and emotional connections."
    },

    {
        name: "Mystery",
        query: "mystery",
        description:
            "Detective stories, mysteries and crime investigations."
    },

    {
        name: "Science Fiction",
        query: "science fiction",
        description:
            "Stories about science, technology, space and futuristic worlds."
    },

    {
        name: "Fantasy",
        query: "fantasy",
        description:
            "Magical worlds, mythical creatures and supernatural adventures."
    }

];


// ======================================================
// GET HTML ELEMENTS
// ======================================================

const categoryContainer =
    document.getElementById("categoryContainer");

const categorySearch =
    document.getElementById("categorySearch");

const noCategory =
    document.getElementById("noCategory");

const categoryBooksSection =
    document.getElementById("categoryBooksSection");

const categoryBooksContainer =
    document.getElementById("categoryBooksContainer");

const selectedCategoryTitle =
    document.getElementById("selectedCategoryTitle");

const booksHeading =
    document.getElementById("booksHeading");

const booksSubHeading =
    document.getElementById("booksSubHeading");

const bookLoading =
    document.getElementById("bookLoading");

const noBooks =
    document.getElementById("noBooks");


// ======================================================
// LOAD CATEGORIES
// ======================================================

async function loadCategories() {

    categoryContainer.innerHTML = "";

    for (const category of categories) {

        const image =
            await getCategoryBookImage(category.query);

        createCategoryCard(category, image);

    }

}


// ======================================================
// GET CATEGORY IMAGE
// ======================================================

async function getCategoryBookImage(category) {

    try {

        const apiURL =
            `${URL}?q=subject:${encodeURIComponent(category)}&maxResults=5&key=${API_KEY}`;

        const response =
            await fetch(apiURL);

        const data =
            await response.json();


        if (
            data.items &&
            data.items.length > 0
        ) {

            for (const book of data.items) {

                const image =
                    book.volumeInfo.imageLinks?.thumbnail ||
                    book.volumeInfo.imageLinks?.smallThumbnail;

                if (image) {

                    return image.replace(
                        "http://",
                        "https://"
                    );

                }

            }

        }

    }
    catch (error) {

        console.error(
            "Error loading category image:",
            error
        );

    }


    // Default image

    return "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80";

}


// ======================================================
// CREATE CATEGORY CARD
// ======================================================

function createCategoryCard(category, image) {

    const card =
        document.createElement("div");

    card.className =
        "category-card";


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

            <button class="category-btn">

                Explore Books

                <i class="fa-solid fa-arrow-right"></i>

            </button>

        </div>

    `;


    // ==================================================
    // EXPLORE BOOKS BUTTON
    // ==================================================

    const exploreButton =
        card.querySelector(".category-btn");


    exploreButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            loadCategoryBooks(
                category.query,
                category.name
            );

        }
    );


    // Also allow clicking the card

    card.addEventListener(
        "click",
        function () {

            loadCategoryBooks(
                category.query,
                category.name
            );

        }
    );


    categoryContainer.appendChild(card);

}


// ======================================================
// LOAD 20 BOOKS
// ======================================================

async function loadCategoryBooks(
    category,
    categoryName
) {

    // Clear old books

    categoryBooksContainer.innerHTML = "";


    // Show loading

    bookLoading.style.display = "block";

    noBooks.style.display = "none";


    // Update heading

    selectedCategoryTitle.textContent =
        categoryName.toUpperCase();

    booksHeading.textContent =
        `${categoryName} Books`;

    booksSubHeading.textContent =
        `Explore 20 books from the ${categoryName} category.`;


    try {

        const apiURL =
            `${URL}?q=subject:${encodeURIComponent(category)}&maxResults=20&startIndex=0&key=${API_KEY}`;


        const response =
            await fetch(apiURL);


        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }


        const data =
            await response.json();


        // Hide loading

        bookLoading.style.display = "none";


        // Check books

        if (
            !data.items ||
            data.items.length === 0
        ) {

            noBooks.textContent =
                "No books found for this category.";

            noBooks.style.display = "block";

            return;

        }


        // Get maximum 20 books

        const books =
            data.items.slice(0, 20);


        // Create book cards

        books.forEach(
            function (book) {

                createBookCard(book);

            }
        );


        // Scroll to books section

        categoryBooksSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
    catch (error) {

        console.error(
            "Error loading books:",
            error
        );


        bookLoading.style.display = "none";


        noBooks.textContent =
            "Unable to load books. Please try again.";


        noBooks.style.display = "block";

    }

}


// ======================================================
// CREATE BOOK CARD
// ======================================================

function createBookCard(book) {

    const info =
        book.volumeInfo;


    // Book title

    const title =
        info.title ||
        "Unknown Title";


    // Author

    const authors =
        info.authors
            ? info.authors.join(", ")
            : "Unknown Author";


    // Book image

    let image =
        info.imageLinks?.thumbnail ||
        info.imageLinks?.smallThumbnail;


    if (!image) {

        image =
            "https://via.placeholder.com/300x400?text=No+Image";

    }


    image =
        image.replace(
            "http://",
            "https://"
        );


    // Description

    let description =
        info.description ||
        "No description available.";


    if (description.length > 100) {

        description =
            description.substring(0, 100) +
            "...";

    }


    // Publisher

    const publisher =
        info.publisher ||
        "Unknown Publisher";


    // Published date

    const publishedDate =
        info.publishedDate ||
        "Unknown Date";


    // ==================================================
    // BOOK CARD
    // ==================================================

    const bookCard =
        document.createElement("div");

    bookCard.className =
        "book-card";


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
                <strong>Author:</strong>
                ${authors}
            </p>

            <p class="book-description">
                ${description}
            </p>

            <p class="book-publisher">
                <strong>Publisher:</strong>
                ${publisher}
            </p>

            <p class="book-date">
                <strong>Published:</strong>
                ${publishedDate}
            </p>

            <p class="book-price">
                <strong>Price:</strong>
                ₹${generateBookPrice()}
            </p>

            <button
                class="add-cart-btn">

                <i class="fa-solid fa-cart-plus"></i>

                Add to Cart

            </button>

        </div>

    `;


    // ==================================================
    // ADD TO CART BUTTON
    // ==================================================

    const addCartButton =
        bookCard.querySelector(
            ".add-cart-btn"
        );


    addCartButton.addEventListener(
        "click",
        function (event) {

            // Stop card click

            event.stopPropagation();


            // Add book to cart

            addToCart(book);

        }
    );


    // Add card to page

    categoryBooksContainer.appendChild(
        bookCard
    );

}


// ======================================================
// ADD BOOK TO CART
// ======================================================

function addToCart(book) {

    const info =
        book.volumeInfo;


    // ==================================================
    // GET EXISTING CART
    // ==================================================

    let cart =
        JSON.parse(
            localStorage.getItem("bookCart")
        ) || [];


    // ==================================================
    // CHECK IF BOOK ALREADY EXISTS
    // ==================================================

    const existingBook =
        cart.find(
            item =>
                item.id === book.id
        );


    if (existingBook) {

        alert(
            "This book is already in your cart!"
        );


        // Go to cart.html

        window.location.href =
            "cart.html";


        return;

    }


    // ==================================================
    // GET IMAGE
    // ==================================================

    let image =
        info.imageLinks?.thumbnail ||
        info.imageLinks?.smallThumbnail;


    if (!image) {

        image =
            "https://via.placeholder.com/300x400?text=No+Image";

    }


    image =
        image.replace(
            "http://",
            "https://"
        );


    // ==================================================
    // CREATE CART BOOK
    // ==================================================

    const cartBook = {

        id: book.id,

        title:
            info.title ||
            "Unknown Title",

        author:
            info.authors
                ? info.authors.join(", ")
                : "Unknown Author",

        image: image,

        price:
            generateBookPrice(),

        quantity: 1

    };


    // ==================================================
    // ADD TO CART ARRAY
    // ==================================================

    cart.push(cartBook);


    // ==================================================
    // SAVE TO LOCAL STORAGE
    // ==================================================

    localStorage.setItem(
        "bookCart",
        JSON.stringify(cart)
    );


    // ==================================================
    // GO TO CART.HTML
    // ==================================================

    window.location.href =
        "cart.html";

}


// ======================================================
// GENERATE BOOK PRICE
// ======================================================

function generateBookPrice() {

    const price =
        Math.floor(
            Math.random() * 400
        ) + 199;


    return price;

}


// ======================================================
// SEARCH CATEGORY
// ======================================================

categorySearch.addEventListener(
    "input",
    function () {

        const searchValue =
            categorySearch.value
                .toLowerCase()
                .trim();


        const cards =
            document.querySelectorAll(
                ".category-card"
            );


        let found = false;


        cards.forEach(
            function (card) {

                const categoryName =
                    card.querySelector("h3")
                        .textContent
                        .toLowerCase();


                if (
                    categoryName.includes(
                        searchValue
                    )
                ) {

                    card.style.display =
                        "block";

                    found = true;

                }
                else {

                    card.style.display =
                        "none";

                }

            }
        );


        // No category message

        if (found) {

            noCategory.style.display =
                "none";

        }
        else {

            noCategory.style.display =
                "block";

        }

    }
);


// ======================================================
// START APPLICATION
// ======================================================

loadCategories();