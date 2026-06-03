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

            productsSection.innerHTML +=
                createProductCard(product);

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