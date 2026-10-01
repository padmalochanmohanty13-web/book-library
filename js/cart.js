// GET HTML ELEMENTS

const cartItems = document.getElementById("cartItems");

const emptyCart = document.getElementById("emptyCart");

const summaryItems = document.getElementById("summaryItems");

const subtotal = document.getElementById("subtotal");

const totalPrice = document.getElementById("totalPrice");

const cartCount = document.getElementById("cartCount");

const clearCartBtn = document.getElementById("clearCartBtn");

const checkoutBtn = document.getElementById("checkoutBtn");

// GET CART FROM LOCAL STORAGE

function getCart() {
  return JSON.parse(localStorage.getItem("bookCart")) || [];
}

// SAVE CART

function saveCart(cart) {
  localStorage.setItem("bookCart", JSON.stringify(cart));
}

// FORMAT PRICE

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
}

// DISPLAY CART

function displayCart() {
  const cart = getCart();

  cartItems.innerHTML = "";

  // EMPTY CART

  if (cart.length === 0) {
    cartItems.style.display = "none";

    emptyCart.style.display = "block";

    clearCartBtn.style.display = "none";

    summaryItems.textContent = "0";

    subtotal.textContent = "₹0";

    totalPrice.textContent = "₹0";

    cartCount.textContent = "0";

    return;
  }

  // SHOW CART

  cartItems.style.display = "block";

  emptyCart.style.display = "none";

  clearCartBtn.style.display = "block";

  let totalItems = 0;

  let totalAmount = 0;

  // CREATE CART ITEMS

  cart.forEach(function (book) {
    const quantity = Number(book.quantity) || 1;

    const price = Number(book.price) || 0;

    const itemTotal = price * quantity;

    totalItems += quantity;

    totalAmount += itemTotal;

    const item = document.createElement("div");

    item.className = "cart-item";

    item.innerHTML = `

            <img
                src="${book.image}"
                alt="${book.title}"
                class="cart-item-image"
            >


            <div class="cart-item-info">

                <h3>
                    ${book.title}
                </h3>

                <p class="cart-item-author">
                    Author: ${book.author}
                </p>

                <p class="cart-item-price">
                    ${formatPrice(price)}
                </p>


                <div class="quantity-container">

                    <button
                        class="quantity-btn decrease-btn"
                        data-id="${book.id}"
                    >
                        −
                    </button>


                    <span class="quantity">
                        ${quantity}
                    </span>


                    <button
                        class="quantity-btn increase-btn"
                        data-id="${book.id}"
                    >
                        +
                    </button>

                </div>

            </div>


            <div class="cart-item-right">

                <p class="item-total">
                    ${formatPrice(itemTotal)}
                </p>


                <button
                    class="remove-btn"
                    data-id="${book.id}"
                >

                    <i class="fa-solid fa-trash"></i>

                    Remove

                </button>

            </div>

        `;

    cartItems.appendChild(item);
  });

  // UPDATE SUMMARY

  summaryItems.textContent = totalItems;

  subtotal.textContent = formatPrice(totalAmount);

  totalPrice.textContent = formatPrice(totalAmount);

  cartCount.textContent = totalItems;
}

// INCREASE QUANTITY

function increaseQuantity(id) {
  const cart = getCart();

  const book = cart.find((item) => item.id === id);

  if (book) {
    book.quantity = (Number(book.quantity) || 1) + 1;
  }

  saveCart(cart);

  displayCart();
}

// DECREASE QUANTITY

function decreaseQuantity(id) {
  const cart = getCart();

  const book = cart.find((item) => item.id === id);

  if (!book) {
    return;
  }

  book.quantity = (Number(book.quantity) || 1) - 1;

  // REMOVE IF QUANTITY BECOMES ZERO

  if (book.quantity <= 0) {
    const index = cart.findIndex((item) => item.id === id);

    cart.splice(index, 1);
  }

  saveCart(cart);

  displayCart();
}

// REMOVE BOOK

function removeBook(id) {
  let cart = getCart();

  cart = cart.filter((item) => item.id !== id);

  saveCart(cart);

  displayCart();
}

// BUTTON EVENTS

cartItems.addEventListener("click", function (event) {
  const increaseButton = event.target.closest(".increase-btn");

  const decreaseButton = event.target.closest(".decrease-btn");

  const removeButton = event.target.closest(".remove-btn");

  // INCREASE

  if (increaseButton) {
    const id = increaseButton.dataset.id;
    increaseQuantity(id);
  }

  // DECREASE

  if (decreaseButton) {
    const id = decreaseButton.dataset.id;
    decreaseQuantity(id);
  }

  // REMOVE

  if (removeButton) {
    const id = removeButton.dataset.id;
    removeBook(id);
  }
});

// CLEAR CART

clearCartBtn.addEventListener("click", function () {
  const cart = getCart();

  if (cart.length === 0) {
    return;
  }

  const confirmClear = confirm("Are you sure you want to clear your cart?");

  if (confirmClear) {
    localStorage.removeItem("bookCart");
    displayCart();
  }
});

// CHECKOUT

checkoutBtn.addEventListener("click", function () {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty.");

    return;
  }

  alert("Checkout functionality will be added soon.");
});

// LOAD CART

displayCart();
