const productParams =
    new URLSearchParams(window.location.search);

const slug =
    productParams.get("slug");

async function loadProduct() {
    try {

        const response = await fetch(
            `${BASE_URL}/items/bag_collection?filter[slug][_eq]=${slug}&fields=*.*.*`
        );

        const result =
            await response.json();

        const product =
            result.data[0];

        console.log(product);

        console.log(product.categories);
        console.log(product.categories[0].categories_id);

        document.getElementById(
            "description-content"
        ).textContent =

            currentLang === "ka"
                ? product.description_ka
                : product.description_en;

        document.getElementById(
            "care-content"
        ).innerHTML =
            translations[currentLang].care_text;

        document.querySelector(
            ".static_shipping"
        ).innerHTML =
            translations[currentLang].shipping_text;

        document.querySelector(
            ".static_payments"
        ).innerHTML =
            translations[currentLang].payment_text;

        const variantsContainer =
            document.querySelector(
                ".variants_container"
            );

        variantsContainer.innerHTML = "";

        const variantsSection =
            document.querySelector(
                ".variants_section"
            );

        const productTitle =
            document.querySelector(
                ".single_product_title"
            );

        productTitle.textContent =
            currentLang === "ka"
                ? product.name_ka
                : product.name_en;

        let currentVariant =
            product.bag_variants[0];

        if (
            product.bag_variants.length <= 1
        ) {

            variantsSection.style.display =
                "none";

        }

        product.bag_variants.forEach(
            (variant, index) => {

                const variantCard =
                    document.createElement("div");

                variantCard.classList.add(
                    "variant_card"
                );

                if (index === 0) {

                    variantCard.classList.add(
                        "active"
                    );

                }

                variantCard.style.border =
                    `3px solid ${variant.color.hex}`;


                variantCard.dataset.hex =
                    variant.color.hex;

                if (index === 0) {

                    variantCard.style.border =
                        "3px solid #d4af37";

                }

                variantCard.innerHTML = `
            <img
                src="${BASE_URL}/assets/${variant.cover_img.id}"
                alt=""
            />
        `;

                if (variant.stock <= 0) {

                    variantCard.innerHTML += `
                <div class="variant_out_of_stock">

                    ${currentLang === "ka"
                            ? "არ არის მარაგში"
                            : "Out of Stock"}

                </div>
            `;
                }

                variantCard.addEventListener(
                    "click",
                    () => {

                        currentVariant = variant;

                        document
                            .querySelectorAll(
                                ".variant_card"
                            )
                            .forEach(card => {

                                card.classList.remove(
                                    "active"
                                );

                                card.style.border =
                                    `3px solid ${card.dataset.hex}`;

                            });

                        variantCard.classList.add(
                            "active"
                        );

                        variantCard.style.border =
                            "3px solid #d4af37";

                        renderPrice(
                            currentVariant
                        );

                        buildImagesArray(
                            currentVariant
                        );

                        currentImageIndex = 0;

                        document.getElementById(
                            "main-product-image"
                        ).src =
                            `${BASE_URL}/assets/${allImages[0]}`;

                        renderDots();

                    }
                );

                variantsContainer.appendChild(
                    variantCard
                );

            }
        );

        const priceContainer =
            document.getElementById(
                "price-container"
            );

        renderPrice(
            currentVariant
        );

        const imageUrl =
            `${BASE_URL}/assets/${currentVariant.cover_img.id}`;

        document.getElementById(
            "main-product-image"
        ).src = imageUrl;

        let allImages = [];

        const dotsContainer =
            document.querySelector(
                ".gallery_dots"
            );

        let currentImageIndex = 0;

        function buildImagesArray(variant) {

            allImages = [

                variant.cover_img.id,

                ...variant.gallery.map(
                    item => item.directus_files_id
                )

            ];

        }

        buildImagesArray(
            currentVariant
        );

        function renderPrice(variant) {

            const hasDiscount =
                variant.discount_price;

            if (hasDiscount) {

                priceContainer.innerHTML = `

            <span class="single_old_price">
                ${variant.price}₾
            </span>

            <span class="single_discount_price">
                ${variant.discount_price}₾
            </span>

        `;

            } else {

                priceContainer.innerHTML = `

            <span class="single_regular_price">
                ${variant.price}₾
            </span>

        `;

            }

        }

        const prevBtn =
            document.querySelector(
                ".prev_btn"
            );

        const nextBtn =
            document.querySelector(
                ".next_btn"
            );

        function updateGallery(index) {

            currentImageIndex = index;

            document.getElementById(
                "main-product-image"
            ).src =
                `${BASE_URL}/assets/${allImages[index]}`;

            document
                .querySelectorAll(
                    ".gallery_dot"
                )
                .forEach((dot, dotIndex) => {

                    dot.classList.toggle(
                        "active",
                        dotIndex === index
                    );

                });

        }

        function renderDots() {

            const dotsContainer =
                document.querySelector(
                    ".gallery_dots"
                );

            dotsContainer.innerHTML = "";

            allImages.forEach(
                (image, index) => {

                    const dot =
                        document.createElement(
                            "div"
                        );

                    dot.classList.add(
                        "gallery_dot"
                    );

                    if (index === 0) {

                        dot.classList.add(
                            "active"
                        );

                    }

                    dot.addEventListener(
                        "click",
                        () => {

                            updateGallery(
                                index
                            );

                        }
                    );

                    dotsContainer.appendChild(
                        dot
                    );

                }
            );

        }

        renderDots();

        const mainImage =
            document.getElementById(
                "main-product-image"
            );

        let touchStartX = 0;
        let touchEndX = 0;

        mainImage.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.changedTouches[0].screenX;

            }
        );

        mainImage.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].screenX;

                handleSwipe();

            }
        );

        function handleSwipe() {

            const swipeDistance =
                touchStartX - touchEndX;

            // მარცხნივ swipe

            if (swipeDistance > 50) {

                let nextIndex =
                    currentImageIndex + 1;

                if (
                    nextIndex >=
                    allImages.length
                ) {

                    nextIndex = 0;

                }

                updateGallery(nextIndex);

            }

            // მარჯვნივ swipe

            if (swipeDistance < -50) {

                let prevIndex =
                    currentImageIndex - 1;

                if (
                    prevIndex < 0
                ) {

                    prevIndex =
                        allImages.length - 1;

                }

                updateGallery(prevIndex);

            }

        }

        if (prevBtn) {

            prevBtn.addEventListener(
                "click",
                () => {

                    let prevIndex =
                        currentImageIndex - 1;

                    if (prevIndex < 0) {

                        prevIndex =
                            allImages.length - 1;

                    }

                    updateGallery(prevIndex);

                }
            );

        }

        if (nextBtn) {

            nextBtn.addEventListener(
                "click",
                () => {

                    let nextIndex =
                        currentImageIndex + 1;

                    if (
                        nextIndex >=
                        allImages.length
                    ) {

                        nextIndex = 0;

                    }

                    updateGallery(nextIndex);

                }
            );

        }

        await loadRelatedProducts();

    } catch (error) {
        console.error(error);
    }
}

loadProduct();

async function loadRelatedProducts() {

    try {

        const response = await fetch(
            `${BASE_URL}/items/bag_collection?fields=*,bag_variants.*,bag_variants.cover_img.*`
        );

        const result = await response.json();

        let products = result.data;

        products = products.filter(
            product => product.slug !== slug
        );

        products.sort(
            () => Math.random() - 0.5
        );

        products = products.slice(0, 8);

        const relatedProductsGrid =
            document.querySelector(
                ".related-products-grid"
            );

        relatedProductsGrid.innerHTML = "";

        products.forEach(product => {

            relatedProductsGrid.innerHTML +=
                createProductCard(product);

        });

        console.log(products);

    } catch (error) {

        console.error(error);

    }

}

document
    .querySelectorAll(
        ".detail_header"
    )
    .forEach(header => {

        header.addEventListener(
            "click",
            () => {

                header
                    .parentElement
                    .classList.toggle(
                        "active"
                    );

            }
        );

    });