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
        bestsellers: "Bestsellers"

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
        bestsellers: "ბესთსელერები"
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