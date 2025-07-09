




document.addEventListener("DOMContentLoaded", function () {
    const cart = document.querySelector(".cart");
    const cartClose = document.querySelector("#cart-close");
    const cartContent = document.querySelector(".cart-content");
    const totalPriceElement = document.querySelector(".total-price");

    document.querySelector("#cart-icon")?.addEventListener("click", () => {
        cart.classList.add("active");
    });

    cartClose.addEventListener("click", () => {
        cart.classList.remove("active");
    });

    document.querySelectorAll(".add-cart").forEach((btn) => {
        btn.addEventListener("click", () => {
            const productBox = btn.closest(".product-box");
            const title = productBox.querySelector(".product-title").textContent;
            const price = productBox.querySelector(".price").textContent;
            const imgSrc = productBox.querySelector("img").src;

            addToCart(title, price, imgSrc);
            updateTotal();
        });
    });

    function addToCart(title, price, imgSrc) {
        const existingItems = cartContent.querySelectorAll(".cart-box");

        for (let item of existingItems) {
            const itemTitle = item.querySelector(".cart-product-detail").textContent;
            if (itemTitle === title) {
                const qtySpan = item.querySelector(".number");
                qtySpan.textContent = parseInt(qtySpan.textContent) + 1;
                updateTotal();
                return;
            }
        }

        const cartBox = document.createElement("div");
        cartBox.classList.add("cart-box");

        cartBox.innerHTML = `
            <img src="${imgSrc}" class="cart-img">
            <div class="car-detail">
                <h2 class="cart-product-detail">${title}</h2>
                <span class="cart-price">${price}</span>
                <div class="cart-quantity">
                    <button class="decrement">-</button>
                    <span class="number">1</span>
                    <button class="increment">+</button>
                </div>
            </div>
            <i class="ri-delete-bin-line cart-remove"></i>
        `;

        cartContent.insertBefore(cartBox, cartContent.querySelector(".total"));
        attachCartEvents(cartBox); // <== Important
    }

    function attachCartEvents(cartBox) {
        const incrementBtn = cartBox.querySelector(".increment");
        const decrementBtn = cartBox.querySelector(".decrement");
        const quantitySpan = cartBox.querySelector(".number");
        const removeBtn = cartBox.querySelector(".cart-remove");

        incrementBtn.addEventListener("click", () => {
            quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
            updateTotal();
        });

        decrementBtn.addEventListener("click", () => {
            let qty = parseInt(quantitySpan.textContent);
            if (qty > 1) {
                quantitySpan.textContent = qty - 1;
                updateTotal();
            }
        });

        removeBtn.addEventListener("click", () => {
            cartBox.remove();
            updateTotal();
        });
    }

    function updateTotal() {
        const items = document.querySelectorAll(".cart-box");
        let total = 0;

        items.forEach((item) => {
            const price = parseFloat(item.querySelector(".cart-price").textContent.replace("$", ""));
            const qty = parseInt(item.querySelector(".number").textContent);
            total += price * qty;
        });

        totalPriceElement.textContent = `$${total}`;
    }
});




const buyNowButton = document.querySelector(".btn-buy");

buyNowButton.addEventListener("click", () => {
    const items = document.querySelectorAll(".cart-box");

    if (items.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Optionally show a message
    alert("Thank you for your purchase!");

    // Clear all cart items
    items.forEach(item => item.remove());

    // Reset total
    updateTotal();

    // ✅ Redirect to thank you page
    window.location.href = "thankyou.html";
});
