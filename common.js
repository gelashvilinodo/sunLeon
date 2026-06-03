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
        made_in_georgia: "Made in Georgia",
        buy_instagram: "Buy on Instagram",
        description: "Product Description",
        care: "Care Instructions",
        shipping: "Shipping Information",
        returns: "Returns & Exchanges",
        payments: "Payment Methods",
        bestsellers: "Bestsellers",
        follow_us: "Follow Us",
        faq_information: "FAQ & Information",
        related_products: "Similar Products"

    },

    ka: {
        categories: "კატეგორიები",
        sort: "დალაგება",
        colors: "ფერი",
        name_asc: "სახელი (ა-ჰ)",
        name_desc: "სახელი (ჰ-ა)",
        price_asc: "ფასი (დაბლიდან მაღლისკენ)",
        price_desc: "ფასი (მაღლიდან დაბლისკენ)",
        made_in_georgia: "დამზადებულია საქართველოში",
        buy_instagram: "შეძენა ინსტაგრამზე",
        description: "პროდუქტის აღწერა",
        care: "მოვლის წესები",
        shipping: "მიწოდების ინფორმაცია",
        returns: "დაბრუნება და გადაცვლა",
        payments: "გადახდის ვარიანტები",
        bestsellers: "ბესთსელერები",
        follow_us: "გამოგვყევით",
        faq_information: "კითხვები და ინფორმაცია",
        related_products: "მსგავსი პროდუქტები"
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

            if (typeof loadProducts === "function") {
                loadProducts();
            }

            if (typeof loadProduct === "function") {
                loadProduct();
            }
            if (typeof loadHeroCategory === "function") {
                loadHeroCategory();
            }

            if (typeof loadVideoReviews === "function") {
                loadVideoReviews();
            }

            if (typeof loadBestSellers === "function") {
                loadBestSellers();
            }

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

    }

    catch (error) {

        console.log(error);

    }

}

loadCategories();

// =======================
// FOOTER
// =======================

const footer =
    document.getElementById(
        "footer"
    );

if (footer) {

    footer.innerHTML = `

        <div class="footer_container">

            <a
                href="index.html"
                class="footer_logo"
            >
                <img
                    src="./assets/logo.png"
                    alt="Logo"
                >
            </a>

            <div class="footer_socials">

                <h3 data-key="follow_us">
                    Follow Us
                </h3>

                <div class="social_links">

                    <a
                        href="#"
                        target="_blank"
                        aria-label="Instagram"
                    >
                        <i class="fa-brands fa-instagram"></i>
                    </a>

                    <a
                        href="#"
                        target="_blank"
                        aria-label="TikTok"
                    >
                        <i class="fa-brands fa-tiktok"></i>
                    </a>

                    <a
                        href="#"
                        target="_blank"
                        aria-label="Facebook"
                    >
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>

                </div>

            </div>

            <div class="footer_links">

                <a
                    href="faq.html"
                    data-key="faq_information"
                >
                    FAQ & Information
                </a>

            </div>

            <p class="footer_copy">
                © 2026 SUNLEON.
            </p>

        </div>

    `;

    changeLanguage(currentLang);

}

function createProductCard(product) {
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

    // MADE IN GEORGIA BADGE

    const madeInGeorgiaBadge =
        product.made_in_georgia
            ? `
        <div class="made_in_georgia_badge">
            <img
                src="./assets/Flag_of_Georgia.svg.png"
                alt="Georgia Flag"
            />
            <span>
                ${currentLang === "ka"
                ? "დამზადებულია საქართველოში"
                : "Made in Georgia"
            }
            </span>
        </div>
        `
            : "";


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
${madeInGeorgiaBadge}
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

    return card;

};