
// GOOGLE BOOKS API

const API_URL =
    "https://www.googleapis.com/books/v1/volumes";

const API_KEY =
    "AIzaSyB0TdSemSIomorDlhH5g_E2wokxkRHLilE";

// HTML ELEMENTS

const bookDetails =
    document.getElementById("bookDetails");

const loading =
    document.getElementById("loading");

const error =
    document.getElementById("error");

const bookImage =
    document.getElementById("bookImage");

const bookTitle =
    document.getElementById("bookTitle");

const bookAuthor =
    document.getElementById("bookAuthor");

const bookCategory =
    document.getElementById("bookCategory");

const bookDescription =
    document.getElementById("bookDescription");

const bookRating =
    document.getElementById("bookRating");

const bookPrice =
    document.getElementById("bookPrice");

const bookPublisher =
    document.getElementById("bookPublisher");

const bookDate =
    document.getElementById("bookDate");

const bookPages =
    document.getElementById("bookPages");

const moreInfoBtn =
    document.getElementById("moreInfoBtn");

const addCartBtn =
    document.getElementById("addCartBtn");


// GET BOOK ID FROM URL


const urlParams =
    new URLSearchParams(
        window.location.search
    );

const bookId =
    urlParams.get("id");


console.log("================================");
console.log("CURRENT URL:");
console.log(window.location.href);

console.log("BOOK ID:");
console.log(bookId);
console.log("================================");

// CHECK BOOK ID


if (!bookId) {

    showError(
        "Book ID is missing. Please go back and click Details."
    );

} else {

    getBookDetails(bookId);

}


// GET BOOK DETAILS


async function getBookDetails(id) {

    try {

        console.log(
            "Fetching book:",
            id
        );


        const response =
            await fetch(
                `${API_URL}/${encodeURIComponent(id)}?key=${API_KEY}`
            );


        console.log(
            "API STATUS:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                `HTTP Error ${response.status}`
            );

        }


        const data =
            await response.json();


        console.log(
            "BOOK DATA:",
            data
        );


        displayBookDetails(data);


    } catch (err) {

        console.error(
            "BOOK ERROR:",
            err
        );


        showError(
            "Book details could not be loaded."
        );

    }

}

// DISPLAY BOOK


function displayBookDetails(book) {

    const info =
        book.volumeInfo || {};

    const saleInfo =
        book.saleInfo || {};


    // TITLE

    bookTitle.textContent =
        info.title ||
        "Unknown Title";


    // AUTHOR

    if (
        info.authors &&
        info.authors.length > 0
    ) {

        bookAuthor.textContent =
            info.authors.join(", ");

    } else {

        bookAuthor.textContent =
            "Unknown Author";

    }


    // CATEGORY

    if (
        info.categories &&
        info.categories.length > 0
    ) {

        bookCategory.textContent =
            info.categories[0];

    } else {

        bookCategory.textContent =
            "General";

    }


    // IMAGE

    let image = null;

    if (info.imageLinks) {

        image =
            info.imageLinks.thumbnail ||
            info.imageLinks.smallThumbnail;

    }


    if (image) {

        image =
            image.replace(
                "http://",
                "https://"
            );

        bookImage.src =
            image;

    } else {

        bookImage.src =
            "https://via.placeholder.com/300x430?text=No+Image";

    }


    // DESCRIPTION

    if (info.description) {

        const temp =
            document.createElement("div");

        temp.innerHTML =
            info.description;

        bookDescription.textContent =
            temp.textContent;

    } else {

        bookDescription.textContent =
            "No description available.";

    }


    // RATING

    if (info.averageRating) {

        bookRating.textContent =
            `${info.averageRating} / 5`;

    } else {

        bookRating.textContent =
            "No Rating";

    }


    // PRICE

    const googlePrice =
        saleInfo.retailPrice ||
        saleInfo.listPrice;


    if (
        googlePrice &&
        typeof googlePrice.amount === "number"
    ) {

        bookPrice.textContent =
            formatPrice(
                googlePrice.amount,
                googlePrice.currencyCode || "INR"
            );

    } else {

        bookPrice.textContent =
            "₹399";

    }


    // PUBLISHER

    bookPublisher.textContent =
        info.publisher ||
        "N/A";


    // DATE

    bookDate.textContent =
        info.publishedDate ||
        "N/A";


    // PAGES

    bookPages.textContent =
        info.pageCount ||
        "N/A";

    // SHOW DETAILS

    loading.style.display =
        "none";

    error.style.display =
        "none";

    bookDetails.style.display =
        "grid";


    console.log(
        "BOOK DISPLAYED SUCCESSFULLY"
    );

}



// FORMAT PRICE


function formatPrice(
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

    } catch (err) {

        return `₹${amount}`;

    }

}

// ERROR


function showError(message) {

    loading.style.display =
        "none";

    bookDetails.style.display =
        "none";

    error.style.display =
        "block";

    error.textContent =
        message;

}

// CART


if (addCartBtn) {

    addCartBtn.addEventListener(
        "click",
        function () {

            alert(
                "Book added to cart!"
            );

        }
    );

}