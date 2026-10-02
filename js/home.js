const categories = [
    {
        "id": 1,
        "name": "Fiction",
        "description": "Imaginative stories, novels and literary works.",
        "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },
    {
        "id": 2,
        "name": "Romance",
        "description": "Stories about love, relationships and emotional connections.",
        "image": "https://images.unsplash.com/photo-1511108690759-009324a90311"
    },
    {
        "id": 3,
        "name": "Mystery",
        "description": "Detective stories, mysteries and crime investigations.",
        "image": "https://images.unsplash.com/photo-1505664194779-8beaceb93744"
    },
    {
        "id": 4,
        "name": "Science Fiction",
        "description": "Stories about science, technology, space and futuristic worlds.",
        "image": "https://images.unsplash.com/photo-1532012197267-da84d127e765"
    },
    {
        "id": 5,
        "name": "Fantasy",
        "description": "Magical worlds, mythical creatures and supernatural adventures.",
        "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794"
    }];
//     {
//         "id": 6,
//         "name": "Horror",
//         "description": "Scary stories, supernatural events and psychological thrillers.",
//         "image": "https://images.unsplash.com/photo-1516979187457-637abb4f9353"
//     },
//     {
//         "id": 7,
//         "name": "Thriller",
//         "description": "Suspenseful stories filled with danger, tension and unexpected twists.",
//         "image": "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
//     },
//     {
//         "id": 8,
//         "name": "Biography",
//         "description": "Books about the lives and experiences of real people.",
//         "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"
//     },
//     {
//         "id": 9,
//         "name": "History",
//         "description": "Books about historical events, civilizations and important figures.",
//         "image": "https://images.unsplash.com/photo-1461360228754-6e81c478b882"
//     },
//     {
//         "id": 10,
//         "name": "Self Help",
//         "description": "Books focused on personal growth, habits and improving your life.",
//         "image": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
//     },
//     {
//         "id": 11,
//         "name": "Business",
//         "description": "Books about business, entrepreneurship, leadership and finance.",
//         "image": "https://images.unsplash.com/photo-1556761175-b413da4baf72"
//     },
//     {
//         "id": 12,
//         "name": "Science",
//         "description": "Books covering science, discoveries, nature and the universe.",
//         "image": "https://images.unsplash.com/photo-1532094349884-543bc11b234d"
//     },
//     {
//         "id": 13,
//         "name": "Technology",
//         "description": "Books about programming, computers, AI and modern technology.",
//         "image": "https://images.unsplash.com/photo-1518770660439-4636190af475"
//     },
//     {
//         "id": 14,
//         "name": "Children",
//         "description": "Fun, educational and entertaining books for children.",
//         "image": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
//     },
//     {
//         "id": 15,
//         "name": "Poetry",
//         "description": "Collections of poems, verses and literary expressions.",
//         "image": "https://images.unsplash.com/photo-1455390582262-044cdead277a"
//     }
// ];

// const categoryContainer = document.getElementById("categoryContainer");

// function displayCategories() {
//     categoryContainer.innerHTML = "";

//     categories.forEach(category => {

//         const categoryCard = document.createElement("div");

//         categoryCard.classList.add("category-card");

//         categoryCard.innerHTML = `
//             <img 
//                 src="${category.image}" 
//                 alt="${category.name}"
//             >

//             <div class="category-info">
//                 <h3>${category.name}</h3>
//                 <p>${category.description}</p>
//             </div>
//         `;

//         categoryContainer.appendChild(categoryCard);
//     });
// }

// displayCategories();


const categoryContainer = document.getElementById("categoryContainer");

function displayCategories() {

    categoryContainer.innerHTML = "";

    categories.forEach(category => {

        const categoryCard = document.createElement("div");

        categoryCard.classList.add("category-card");

        categoryCard.innerHTML = `
            <img 
                src="${category.image}" 
                alt="${category.name}"
            >

            <div class="category-info">
                <h3>${category.name}</h3>
                <p>${category.description}</p>
            </div>
        `;

        // CLICK CATEGORY
        categoryCard.addEventListener("click", function () {

            window.location.href =
                `pages/books.html?search=${encodeURIComponent(category.name)}`;

        });

        categoryContainer.appendChild(categoryCard);
    });
}

displayCategories();






//search button
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function searchFromHome() {
    const query = searchInput.value.trim();

    if (query === "") {
        alert("Please enter a book name");
        return;
    }

    window.location.href =
        `pages/books.html?search=${encodeURIComponent(query)}`;
}

searchBtn.addEventListener("click", searchFromHome);

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchFromHome();
    }
});


// ======================================================
// FEATURED / COLLECTION BOOKS
// ======================================================

const BOOKS_API_URL =
    "https://www.googleapis.com/books/v1/volumes";

const BOOKS_API_KEY =
    "AIzaSyB0TdSemSIomorDlhH5g_E2wokxkRHLilE";

const featuredBooks =
    document.getElementById("featuredBooks");


// LOAD 8 FEATURED BOOKS
async function loadFeaturedBooks() {

    try {

        featuredBooks.innerHTML = `
            <p class="loading">Loading books...</p>
        `;


        // Get books from Google Books API
        const response = await fetch(
            `${BOOKS_API_URL}?q=books&maxResults=10&key=${BOOKS_API_KEY}`
        );


        if (!response.ok) {

            throw new Error(
                `API Error: ${response.status}`
            );

        }


        const data = await response.json();


        const books = data.items || [];


        if (books.length === 0) {

            featuredBooks.innerHTML = `
                <p class="loading">
                    No books found.
                </p>
            `;

            return;
        }


        // Clear loading message
        featuredBooks.innerHTML = "";


        // Show only 8 books
        books.slice(0, 10).forEach(book => {

            createFeaturedBookCard(book);

        });


    } catch (error) {

        console.error(
            "Featured books error:",
            error
        );


        featuredBooks.innerHTML = `
            <p class="loading">
                Unable to load books.
            </p>
        `;
    }
}



// ======================================================
// CREATE BOOK CARD
// ======================================================

function createFeaturedBookCard(book) {

    const info =
        book.volumeInfo || {};

    const saleInfo =
        book.saleInfo || {};


    // TITLE
    const title =
        info.title ||
        "Unknown Title";


    // AUTHOR
    const author =
        info.authors &&
        info.authors.length > 0
            ? info.authors.join(", ")
            : "Unknown Author";


    // CATEGORY
    const category =
        info.categories &&
        info.categories.length > 0
            ? info.categories[0]
            : "General";


    // IMAGE
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


    // PRICE
    const googlePrice =
        saleInfo.retailPrice ||
        saleInfo.listPrice;


    let price = "₹399";


    if (
        googlePrice &&
        typeof googlePrice.amount === "number"
    ) {

        price = formatFeaturedPrice(
            googlePrice.amount,
            googlePrice.currencyCode || "INR"
        );

    }


    // CREATE CARD
    const card =
        document.createElement("div");

    card.classList.add(
        "featured-book-card"
    );


    card.innerHTML = `

        <!-- BOOK IMAGE -->

        <div class="featured-book-image">

            <img
                src="${image}"
                alt="${escapeHTML(title)}"
            >

        </div>


        <!-- BOOK INFORMATION -->

        <div class="featured-book-info">

            <span class="featured-book-category">
                ${escapeHTML(category)}
            </span>


            <h3
                class="featured-book-title"
                title="${escapeHTML(title)}"
            >
                ${escapeHTML(title)}
            </h3>


            <p class="featured-book-author">
                ${escapeHTML(author)}
            </p>


            <div class="featured-book-bottom">

                <strong class="featured-book-price">
                    ${price}
                </strong>


                <a
                    href="pages/book-details.html?id=${encodeURIComponent(book.id)}"
                    class="featured-details-btn"
                >
                    Details
                    <span>→</span>
                </a>

            </div>

        </div>

    `;


    featuredBooks.appendChild(card);
}



// ======================================================
// PRICE FORMAT
// ======================================================

function formatFeaturedPrice(
    amount,
    currency
) {

    try {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: currency
            }
        ).format(amount);

    } catch (error) {

        return `₹${amount}`;

    }
}



// ======================================================
// HTML ESCAPE
// ======================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}



// LOAD FEATURED BOOKS
loadFeaturedBooks();