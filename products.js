console.log("Script initialized.");

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

        if (currentCategory && categoryTitle) {

            const category = products[0]?.categories?.find(
                item =>
                    item.categories_id.slug ===
                    currentCategory
            );

            if (category) {

                categoryTitle.textContent =

                    currentLang === "ka"

                        ? category.categories_id.name_ka

                        : category.categories_id.name_en;

            }

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