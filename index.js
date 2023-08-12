// ***************nav scroll effect js ************** //
let nav = document.getElementById("nv-st-sc"), logo = document.getElementById("logo");

window.addEventListener("scroll", function (e) {
    // print "false" if direction is down and "true" if up
    let scroll = this.scrollY;
    let y = this.oldScroll > this.scrollY;
    this.oldScroll = this.scrollY;

    // ***************nav scroll effect js************** //
    if (y) {
        if (scroll == 0) {
            nav.classList.remove("sticky")
            // logo.src = "icons/logo.svg"; if logo was img use this to switch img of logo 
        } else {
            nav.classList.add("sticky")
            // logo.src = "icons/logo-dark.svg";if logo was img use this to switch img  of logo 
            nav.style.cssText = "top:-0rem";


        }
    } else {
        nav.style.cssText = "top:-128px"
    }

})

// ***************nav scroll effect js************** //

let searchicon2 = document.getElementById("search-icon-2"), CI2 = document.getElementById("CI2"), CI1 = document.getElementById("CI1");

CI1.addEventListener("click", () => {
    const displatofci = CI2.style.visibility
    if (displatofci == "visible") {
        CI2.style.cssText = ""
        CI1.className = 'fa fa-search'

    } else {
        CI2.style.cssText = "bottom: -8rem;visibility: visible;opacity: 1;"
        CI1.className = 'fa-solid fa-x'
    }

})

// fetching


fetch("data/data.json")
    .then(response => response.json())
    .then(data => {

        // Info

        let arry = data.nav.information["type Of Plants"];
        let html = "";
        let uls = document.getElementsByClassName('cata_JS_FUNC_CLASS');
        for (let I = 0; I < uls.length; I++) {
            const ul = uls[I];
            for (let J = 0; J < arry.length; J++) { 
                const a = arry[J];
                const apiKey = 'xmfkYzF3tGFrCknbdXhGfWspUrP-Y1u0LpH4Wf4XhMU';
        
                fetch(`https://api.unsplash.com/search/photos?query=${a.name}&per_page=1&client_id=${apiKey}`)
                    .then(response => response.json())
                    .then(data => {
                        let url = data.results[0].urls.small;
                        html += `<li class="nav-hvt text-align: start; d-flex"
                                        style="flex-wrap: nowrap; width: fit-content;"><a
                                        href=""><img src="${url}" style="width: 2em;height: 2em;"
                                        alt=""> &nbsp;&nbsp; ${a.name}</a></li>`;
        
                        ul.innerHTML = html; 
                    })
                    .catch(error => console.log(error));
            }
        }


        let aa = data.nav.information["Plant Care Tip"];
let uuls = document.getElementsByClassName("cata_JS_FUNC_2");

for (let I = 0; I < uuls.length; I++) {
    const ul = uuls[I];
    let htl = ``; 

    for (let J = 0; J < aa.length; J++) { 
        const a = aa[J];
        const apiKey = 'xmfkYzF3tGFrCknbdXhGfWspUrP-Y1u0LpH4Wf4XhMU';

        fetch(`https://api.unsplash.com/search/photos?query=${a.name}&per_page=1&client_id=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                let url = data.results[0].urls.small;
                htl += `<li class="nav-hvt text-align: start; d-flex"
                                style="flex-wrap: nowrap; width: fit-content;"><a
                                href=""><img src="${url}" style="width: 2em;height: 2em;"
                                alt=""> &nbsp;&nbsp; ${a.name}</a></li>`;

                ul.innerHTML = htl; 
            })
            .catch(error => console.log(error));
    }
}


       















        //categori


        const catDiv = document.querySelector(".JS_CAT_FUNC");

        const catArry = data.nav.categories;

        catArry.forEach(category => {
            const ul = document.createElement("ul");
            ul.classList.add("col-3", "p-5", "d-flex", "flex-column");
            ul.style.height = "30rem";
            ul.style.flexWrap = "nowrap";

            const heading = category.heading;
            const categories = category.categories;

            let imagePromises = [];

            categories.forEach(a => {
                const apiKey = 'xmfkYzF3tGFrCknbdXhGfWspUrP-Y1u0LpH4Wf4XhMU';

                const imagePromise = fetch(`https://api.unsplash.com/search/photos?query=${a.name}&per_page=1&client_id=${apiKey}`)
                    .then(response => response.json())
                    .then(data => {
                        const _Url = data.results[0].urls.small;
                        const listItem = `
                            <li class="nav-hvt p-2 d-flex" style="list-style-type: none;">
                                <a href="#">
                                    <img src="${_Url}" style="width: 3em; height: 3em; border-radius: 50%;" alt="">&nbsp;&nbsp;&nbsp;&nbsp;${a.name}
                                </a>
                            </li>`;
                        return listItem;
                    })
                    .catch(error => {
                        console.error('Error fetching image:', error);
                        return '';
                    });

                imagePromises.push(imagePromise);
            });

            Promise.all(imagePromises)
                .then(listItems => {
                    let html = `
                        <li style="list-style-type: none; width: 100%;" class="pl-4">
                            <h6 style="font-weight: bolder; opacity: 0.5;" class="mb-4">${heading}</h6>
                        </li>
                        ${listItems.join('')}`;

                    ul.innerHTML = html;
                    catDiv.appendChild(ul);
                });
        });
    })
    .catch(error => console.error('Error fetching data:', error));








    const cartItems = [];

    function updateCartDisplay() {
        const cartContainer = document.querySelector(".dCartBtn");
        cartContainer.innerHTML = "";
        cartItems.forEach(item => {
            if (item.quantity > 0) {
                const cartItem = document.createElement("div");
                cartItem.className = "cart-item mb-2";
                cartItem.innerHTML = `
                    <p>${item.name} - $${item.price.toFixed(2)} (Quantity: ${item.quantity})
                        <button onclick="decrementQuantity(${item.id})">-</button>
                        ${item.quantity}
                        <button onclick="incrementQuantity(${item.id})">+</button>
                        <button onclick="removeCard(${item.id})">X</button>
                    </p>
                `;
                cartContainer.appendChild(cartItem);
            }
        });
    }

    function incrementQuantity(productId) {
        const existingCartItem = cartItems.find(item => item.id === productId);
        if (existingCartItem) {
            existingCartItem.quantity++;
            updateCartDisplay();
        }
    }

    function decrementQuantity(productId) {
        const existingCartItem = cartItems.find(item => item.id === productId);
        if (existingCartItem && existingCartItem.quantity > 0) {
            existingCartItem.quantity--;
            updateCartDisplay();
        }
    }

    function removeCard(productId) {
        const existingCartItem = cartItems.find(item => item.id === productId);
        if (existingCartItem) {
            existingCartItem.quantity = 0;
            updateCartDisplay();
        }
    }

    fetch("data/data.json")
        .then(response => response.json())
        .then(data => {
            const products = data.products;

            products.forEach(product => {
                const productCard = createProductCard(product);
                document.querySelector(".products").appendChild(productCard);
            });

            const addToCartButtons = document.querySelectorAll(".add-to-cart");
            addToCartButtons.forEach(button => {
                button.addEventListener("click", function (event) {

                    const productId = event.target.getAttribute("data-id");
                    const selectedProduct = products.find(product => product.id.toString() === productId);

                    if (selectedProduct) {
                        const existingCartItem = cartItems.find(item => item.id.toString() === productId);

                        if (existingCartItem) {
                            existingCartItem.quantity++;
                        } else {
                            cartItems.push({ ...selectedProduct, quantity: 1 });
                        }
                        alert("product added ");
                        updateCartDisplay();
                    }
                });
            });

            function createProductCard(product) {
                const productCard = document.createElement("div");
                productCard.className = "col-md-4 mb-4";
                productCard.innerHTML = `
                    <div class="card">
                        <img src="images/${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">$${product.price.toFixed(2)}</p>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div></br>
                `;
                return productCard;
            }
        })
        .catch(error => console.error("Error fetching products:", error));