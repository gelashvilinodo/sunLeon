// console.log("Script initialized.");

const menuBtn = document.getElementById("menu-btn");
const menu = document.querySelector(".menu_container");
menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuBtn.classList.toggle("active");
});


// ღამის რეჟიმის ღილაკი

const nightBtn =
    document.getElementById(
        "night-mode-btn"
    );

/* შენახულის შემოწმება */

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

        /* შენახვა */

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

    });








// თარგმნის ბაზა

const translations = {
    en: {
        categories: "Categories",
        new_arrivals: "New Arrivals",
        bestseller: "Bestseller",
        shoulder_bags: "Shoulder Bags",
        outlet: "Outlet",
        sales: "Sales",
    },

    ka: {
        categories: "კატეგორიები",
        new_arrivals: "ახალი კოლექცია",
        bestseller: "ბესტსელერები",
        shoulder_bags: "მხრის ჩანთები",
        outlet: "აუთლეტი",
        sales: "აქციები",
    }
};

// თარგმნის ფუნქცია

let currentLang = "en";

const langButtons = document.querySelectorAll(".lang-btn");

function changeLanguage(lang) {

    currentLang = lang;

    document
        .querySelectorAll("[data-key]")
        .forEach(element => {

            const key = element.dataset.key;

            if (translations[lang][key]) {
                element.textContent =
                    translations[lang][key];
            }

        });

}

// ენის დამახსოვრება

function updateLanguageButton() {

    langButtons.forEach(btn => {

        btn.classList.remove("show");

        if (
            currentLang === "en" &&
            btn.dataset.lang === "ka"
        ) {
            btn.classList.add("show");
        }

        if (
            currentLang === "ka" &&
            btn.dataset.lang === "en"
        ) {
            btn.classList.add("show");
        }

    });

}

// langButtons.forEach(btn => {

//     btn.addEventListener("click", () => {

//         changeLanguage(btn.dataset.lang);

//         updateLanguageButton();

//     });

// });

langButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        changeLanguage(
            btn.dataset.lang
        );

        updateLanguageButton();

        loadCategories();

    });

});

changeLanguage(currentLang);
updateLanguageButton();

async function loadCategories() {

    try {

        const response = await fetch(
            "http://localhost:8055/items/categories"
        );

        const result = await response.json();

        const categories =
            result.data;

        const categoriesList =
            document.getElementById(
                "categories-list"
            );

        categoriesList.innerHTML = "";

        categories.forEach(category => {

            const li =
                document.createElement("li");

            const a =
                document.createElement("a");

            a.href = `products.html?category=${category.slug}`;

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