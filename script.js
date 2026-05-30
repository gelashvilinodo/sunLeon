console.log("Script initialized.");

// =======================
// MENU
// =======================

const menuBtn =
    document.getElementById(
        "menu-btn"
    );

const menu =
    document.querySelector(
        ".menu_container"
    );

menuBtn.addEventListener(
    "click",
    () => {

        menu.classList.toggle(
            "active"
        );

        menuBtn.classList.toggle(
            "active"
        );

    }
);


// =======================
// DARK MODE
// =======================

const nightBtn =
    document.getElementById(
        "night-mode-btn"
    );

// შენახულის შემოწმება

if (
    localStorage.getItem("theme")
    === "dark"
) {

    document.body.classList.add(
        "dark-mode"
    );

}

nightBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );

        // შენახვა

        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }
);


// =======================
// TRANSLATIONS
// =======================

const translations = {

    en: {
        categories: "Categories",
        colors: "Colors",
        name_asc: "Name (A-Z)",
        name_desc: "Name (Z-A)",
        price_asc: "Price (Low to High)",
        price_desc: "Price (High to Low)",

    },

    ka: {
        categories: "კატეგორიები",
        sort: "დალაგება",
        colors: "ფერი",
        name_asc: "სახელი (ა-ჰ)",
        name_desc: "სახელი (ჰ-ა)",
        price_asc: "ფასი (დაბლიდან მაღლისკენ)",
        price_desc: "ფასი (მაღლიდან დაბლისკენ)"
    }

};


// =======================
// LANGUAGE
// =======================

let currentLang =

    localStorage.getItem(
        "language"
    )

    || "en";

const langButtons =
    document.querySelectorAll(
        ".lang-btn"
    );

function changeLanguage(lang) {

    currentLang = lang;

    localStorage.setItem(
        "language",
        lang
    );

    document
        .querySelectorAll(
            "[data-key]"
        )

        .forEach(element => {

            const key =
                element.dataset.key;

            if (
                translations[lang][key]
            ) {

                element.textContent =

                    translations[lang][key];

            }

        });

    updateSortOptions();

}

function updateSortOptions() {

    document
        .querySelectorAll(
            "#sort-select option"
        )

        .forEach(option => {

            const key =
                option.dataset.sort;

            option.textContent =

                translations[
                currentLang
                ][key];

        });

}

function updateLanguageButton() {

    langButtons.forEach(btn => {

        btn.classList.remove(
            "show"
        );

        if (

            currentLang === "en"

            &&

            btn.dataset.lang === "ka"

        ) {

            btn.classList.add(
                "show"
            );

        }

        if (

            currentLang === "ka"

            &&

            btn.dataset.lang === "en"

        ) {

            btn.classList.add(
                "show"
            );

        }

    });

}

langButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            changeLanguage(
                btn.dataset.lang
            );

            updateLanguageButton();

            loadCategories();

            loadProducts();

        }
    );

});

changeLanguage(currentLang);

updateSortOptions();

updateLanguageButton();


// =======================
// DIRECTUS
// =======================

const BASE_URL =
    "http://127.0.0.1:8055";


// =======================
// LOAD CATEGORIES
// =======================

async function loadCategories() {

    try {

        const response =
            await fetch(

                `${BASE_URL}/items/categories`

            );

        const result =
            await response.json();

        const categories =
            result.data;

        const categoriesList =
            document.getElementById(
                "categories-list"
            );

        if (!categoriesList) return;

        categoriesList.innerHTML = "";

        categories.forEach(category => {

            const li =
                document.createElement(
                    "li"
                );

            const a =
                document.createElement(
                    "a"
                );

            a.href =
                `products.html?category=${category.slug}`;

            a.textContent =

                currentLang === "ka"

                    ? category.name_ka

                    : category.name_en;

            li.appendChild(a);

            categoriesList.appendChild(li);

        });

        if (
            currentCategory &&
            categoryTitle
        ) {

            const currentCategoryObj =
                categories.find(
                    category =>
                        category.slug ===
                        currentCategory
                );

            if (
                currentCategoryObj
            ) {

                categoryTitle.textContent =

                    currentLang === "ka"

                        ? currentCategoryObj.name_ka

                        : currentCategoryObj.name_en;

            }

        }

    }

    catch (error) {

        console.log(error);

    }

}

loadCategories();


// =======================
// PRODUCTS
// =======================

const productsSection =
    document.querySelector(
        ".products_section"
    );

const params =
    new URLSearchParams(
        window.location.search
    );

const currentCategory =
    params.get("category");


const categoryTitle =
    document.querySelector(
        ".category_title"
    );

const productsCount =
    document.querySelector(
        ".products_count"
    );

const sortSelect =
    document.getElementById(
        "sort-select"
    );

// =======================
// LOAD PRODUCTS
// =======================

async function loadProducts() {

    if (!productsSection) return;

    try {

        // FETCH PRODUCTS

        const response =
            await fetch(

                `${BASE_URL}/items/bag_collection?fields=*,categories.categories_id.*,bag_variants.*,bag_variants.cover_img.*`

            );

        const result =
            await response.json();

        let products =
            result.data;


        // CATEGORY FILTER

        if (currentCategory) {

            products = products.filter(

                (product) => {

                    return (

                        product.categories?.some(

                            item =>

                                item.categories_id.slug ===
                                currentCategory

                        )

                    );

                }

            );

        }

        // SORTING

        const sortValue =
            sortSelect?.value;

        function getActualPrice(
            product
        ) {

            const variant =
                product.bag_variants[0];

            return (
                variant.discount_price
                ||
                variant.price
            );

        }

        if (
            sortValue ===
            "name-asc"
        ) {

            products.sort(
                (a, b) => {

                    const nameA =

                        currentLang ===
                            "ka"

                            ? a.name_ka

                            : a.name_en;

                    const nameB =

                        currentLang ===
                            "ka"

                            ? b.name_ka

                            : b.name_en;

                    return nameA.localeCompare(
                        nameB
                    );

                }
            );

        }

        if (
            sortValue ===
            "name-desc"
        ) {

            products.sort(
                (a, b) => {

                    const nameA =

                        currentLang ===
                            "ka"

                            ? a.name_ka

                            : a.name_en;

                    const nameB =

                        currentLang ===
                            "ka"

                            ? b.name_ka

                            : b.name_en;

                    return nameB.localeCompare(
                        nameA
                    );

                }
            );

        }

        if (
            sortValue ===
            "price-asc"
        ) {

            products.sort(
                (a, b) =>

                    getActualPrice(a)
                    -
                    getActualPrice(b)
            );

        }

        if (
            sortValue ===
            "price-desc"
        ) {

            products.sort(
                (a, b) =>

                    getActualPrice(b)
                    -
                    getActualPrice(a)
            );

        }

        // PRODUCTS COUNT

        if (
            productsCount
        ) {

            productsCount.textContent =

                currentLang === "ka"

                    ? `${products.length} პროდუქტი`

                    : products.length === 1

                        ? "1 Product"

                        : `${products.length} Products`;

        }

        // CLEAR SECTION

        productsSection.innerHTML = "";

        // LOOP PRODUCTS

        products.forEach(product => {

            // პირველი variant

            const firstVariant =

                product.bag_variants?.[0];

            // თუ variant არ არსებობს

            if (!firstVariant) return;

            // IMAGE URL

            const imageUrl =

                `${BASE_URL}/assets/${firstVariant.cover_img.id}`;

            // PRODUCT NAME

            const productName =

                currentLang === "ka"

                    ? product.name_ka

                    : product.name_en;

            // COLORS COUNT

            const colorsCount =

                product.bag_variants.length;

            // DISCOUNT CHECK

            const hasDiscount =

                firstVariant.discount_price;

            // DISCOUNT PERCENT

            let discountPercent = "";

            if (hasDiscount) {

                discountPercent = Math.round(

                    (
                        (
                            firstVariant.price
                            -
                            firstVariant.discount_price
                        )

                        /

                        firstVariant.price
                    )

                    * 100

                );

            }

            // PRICE HTML

            const priceHTML =

                hasDiscount

                    ? `

                    <div class="product_prices">

                        <span class="old_price">
                            ${firstVariant.price}₾
                        </span>

                        <span class="discount_price">
                            ${firstVariant.discount_price}₾
                        </span>

                    </div>

                    `

                    : `

                    <div class="product_prices">

                        <span class="price">
                            ${firstVariant.price}₾
                        </span>

                    </div>

                    `;

            // CARD

            const card = `

                <a
                    href="product.html?slug=${product.slug}"
                    class="product_card"
                >

                    <div class="product_image_wrapper">
                        ${hasDiscount ? `

    <div class="discount_badge">

        -${discountPercent}%

    </div>

` : ""}
                        <img
                            src="${imageUrl}"
                            alt="${productName}"
                            class="product_image"
                        />

                    </div>

                    <div class="product_info">

                        <div class="product_left">

                            <h3 class="product_title">
                                ${productName}
                            </h3>

                            <p class="product_colors">

    ${colorsCount}

    ${currentLang === "ka"
                    ? " ფერი"
                    : colorsCount === 1
                        ? " Color"
                        : " Colors"}

</p>

                        </div>

                        <div class="product_right">

                            ${priceHTML}

                        </div>

                    </div>

                </a>

            `;

            // APPEND CARD

            productsSection.innerHTML +=
                card;

        });

    }

    catch (error) {

        console.error(error);

    }

}

loadProducts();

if (
    sortSelect
) {

    sortSelect.addEventListener(
        "change",
        () => {

            loadProducts();

        }
    );

}