console.log("script initialized");


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
        related_products: "Similar Products",
        care_text: `
        <p>The bag is made from eco-leather. To preserve its appearance and durability, please follow these care instructions:</p>
        <p>• Do not use chemical solutions or cleaning products containing harsh chemicals;</p>
        <p>• Do not wash the bag in a washing machine;</p>
        <p>• Clean only with a dry or slightly damp soft cloth;</p>
        <p>• The bag has a recommended load capacity — please do not exceed the maximum weight specified in the product description, as this may affect its shape and structure;</p>
        <p>• After use, it is recommended to store the bag in its protective Dust Bag.</p>
        <p>With proper care and use, your bag will maintain its original appearance for many seasons and remain a valuable part of your wardrobe.</p>
    `,
        shipping_text: `
            <p>We provide delivery throughout Georgia.</p>
            <p><strong>Tbilisi</strong></p>
            <p>• Orders placed before 00:00 are typically delivered on the next business day;</p>
            <p>• Exceptions may apply during public holidays, officially declared non-working days, or other unforeseen circumstances. In such cases, customers will be informed in advance.</p>
            <p><strong>Regions</strong></p>
            <p>• Delivery times to regions depend on the specific location;</p>
            <p>• For accurate delivery information, please contact us via direct message and provide your desired address;</p>
            <p>• Our team will provide detailed information regarding delivery times and conditions.</p>
            <p>We are committed to ensuring that your order is delivered safely and as quickly as possible.</p>
`,
        payment_text: `
            <p>We offer flexible and convenient payment methods.</p>
            <p>Payment can be made either by bank transfer or directly to the courier upon delivery.</p>
            <p>If you choose to pay the courier, the order amount is paid upon receipt of the package, while the courier service fee must be transferred to our bank account in advance.</p>
            <p>For additional information, please contact us through our social media channels.</p>
`

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
        related_products: "მსგავსი პროდუქტები",
        care_text: `
            <p>ჩანთა დამზადებულია ეკო ტყავისგან, ამიტომ მისი სილამაზისა და გამძლეობის შესანარჩუნებლად რეკომენდებულია შემდეგი წესების დაცვა:</p>
            <p>• არ გამოიყენოთ ქიმიური ხსნარები ან ქიმიური ნივთიერებების შემცველი საწმენდი საშუალებები;</p>
            <p>• დაუშვებელია სარეცხ მანქანაში გარეცხვა;</p>
            <p>• გასაწმენდად გამოიყენეთ მხოლოდ მშრალი ან ოდნავ ნესტიანი, რბილი ქსოვილი;</p>
            <p>• ჩანთას გააჩნია რეკომენდებული დატვირთვის რესურსი — გთხოვთ, არ გადააჭარბოთ პროდუქტის აღწერაში მითითებულ მაქსიმალურ წონას, რათა შეინარჩუნოს ფორმა და სტრუქტურა;</p>
            <p>• გამოყენების შემდეგ რეკომენდებულია ჩანთის შენახვა სპეციალურ მტვრის ჩანთაში (Dust Bag).</p>
            <p>სწორი მოვლისა და გამოყენების შემთხვევაში, თქვენი ჩანთა მრავალი სეზონის განმავლობაში შეინარჩუნებს თავდაპირველ იერსახეს და ღირსეულ ადგილს დაიკავებს თქვენს გარდერობში.</p>
            `,
        shipping_text:
            `   <p>ჩვენ ვახორციელებთ მიწოდებას მთელი საქართველოს მასშტაბით.</p>
            <p><strong>თბილისი</strong></p>
            <p>• 00:00 საათამდე გაფორმებული შეკვეთების მიწოდება, როგორც წესი, ხდება მომდევნო სამუშაო დღეს;</p>
            <p>• გამონაკლისს წარმოადგენს სადღესასწაულო დღეები, ოფიციალურად გამოცხადებული უქმეები და სხვა გაუთვალისწინებელი გარემოებები, რის შესახებაც მომხმარებელი წინასწარ იქნება ინფორმირებული.</p>
            <p><strong>რეგიონები</strong></p>
            <p>• რეგიონებში მიწოდების ვადა დამოკიდებულია კონკრეტულ ლოკაციაზე;</p>
            <p>• ზუსტი ინფორმაციის მისაღებად გთხოვთ, დაგვიკავშირდეთ პირად შეტყობინებაში და მოგვწეროთ სასურველი მისამართი;</p>
            <p>• ჩვენი გუნდი მოგაწვდით დეტალურ ინფორმაციას მიწოდების ვადებისა და პირობების შესახებ.</p>
            <p>ჩვენთვის მნიშვნელოვანია, რომ თქვენი შეკვეთა უსაფრთხოდ და მაქსიმალურად სწრაფად მოგეწოდოთ.</p>`,

        payment_text: `
            <p>ჩვენ გთავაზობთ გადახდის მოქნილ და კომფორტულ მეთოდებს.</p>
            <p>თანხის გადახდა შესაძლებელია როგორც საბანკო ანგარიშზე ჩარიცხვით, ასევე კურიერთან ადგილზე გადახდით.</p>
            <p>კურიერთან გადახდის არჩევის შემთხვევაში, შეკვეთის ღირებულებას იხდით მიღებისას, ხოლო საკურიერო მომსახურების საფასური წინასწარ ირიცხება საბანკო ანგარიშზე.</p>
            <p>დამატებითი ინფორმაციისთვის დაგვიკავშირდით სოციალური ქსელების საშუალებით.</p>
            `
    }

};

function initHeader() {

    const menuBtn =
        document.getElementById(
            "menu-btn"
        );

    const menu =
        document.querySelector(
            ".menu_container"
        );

    const nightBtn =
        document.getElementById(
            "night-mode-btn"
        );

    const langButtons =
        document.querySelectorAll(
            ".lang-btn"
        );

    // MENU

    menuBtn?.addEventListener(
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

    // DARK MODE

    if (
        localStorage.getItem(
            "theme"
        ) === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );

    }

    nightBtn?.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );

            localStorage.setItem(
                "theme",
                document.body.classList.contains(
                    "dark-mode"
                )
                    ? "dark"
                    : "light"
            );

        }


    );

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

    updateLanguageButton();

}

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

    const careContent =
        document.getElementById(
            "care-content"
        );

    if (careContent) {

        careContent.innerHTML =
            translations[lang].care_text;

    }

    const shippingContent =
        document.querySelector(
            ".static_shipping"
        );

    if (shippingContent) {

        shippingContent.innerHTML =
            translations[lang].shipping_text;

    }

    const paymentContent =
        document.querySelector(
            ".static_payment"
        );

    if (paymentContent) {

        paymentContent.innerHTML =
            translations[lang].payment_text;
    }

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

    const langButtons =
        document.querySelectorAll(
            ".lang-btn"
        );

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
// HEADER
// =======================

const header =
    document.getElementById(
        "header"
    );

if (header) {

    header.innerHTML = `

        <div class="menu_container">

            <nav class="menu">

                <h3
                    class="menu-title"
                    data-key="categories"
                >
                    Categories
                </h3>

                <div class="menu-divider"></div>

                <ul id="categories-list"></ul>

            </nav>

            <div class="language-switcher">

                <button
                    class="lang-btn"
                    data-lang="en"
                >
                    <img
                        src="assets/Flag_of_the_United_Kingdom_(3-5).svg.png"
                        alt="English"
                        class="lang-icon"
                    />
                </button>

                <button
                    class="lang-btn"
                    data-lang="ka"
                >
                    <img
                        src="assets/Flag_of_Georgia.svg.png"
                        alt="Georgian"
                        class="lang-icon"
                    />
                </button>

            </div>

        </div>

        <header>

            <button id="menu-btn">

                <i class="fa-solid fa-bars open-icon"></i>

                <i class="fa-solid fa-xmark close-icon"></i>

            </button>

            <a
                href="index.html"
                class="logo_link"
            >

                <img
                    src="assets/namelogo.jpg"
                    alt=""
                    class="namelogo"
                />

                <img
                    src="assets/dark_logo.jpg"
                    alt=""
                    class="dark_logo"
                />

            </a>

            <button id="night-mode-btn">

                <i class="fa-solid fa-moon moon-icon"></i>

                <i class="fa-regular fa-sun sun-icon"></i>

            </button>

        </header>

    `;

}

initHeader();

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

    console.log(product.bag_variants[0]);

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

    const colorDots = product.bag_variants
        .slice(0, 3)
        .map(
            variant => `
            <span
                class="color_dot"
                style="background-color: ${variant.color.hex}"
            ></span>
        `
        )
        .join("");

    const remainingColors =
        product.bag_variants.length - 3;

    const colorsHTML = `

    ${colorDots}

    ${remainingColors > 0
            ? `<span class="color_more">+${remainingColors}</span>`
            : ""
        }

`;

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
                        <div class="product_colors_preview">

                            ${colorsHTML}

                        </div>

                    </div>
                    
                    <div class="product_bottom">

                        <h3 class="product_title">
                        ${productName}
                        </h3>

                        ${priceHTML}

                    </div>

                </a>

            `;

    return card;

};