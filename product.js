const productParams =
    new URLSearchParams(window.location.search);

const slug =
    productParams.get("slug");

const PRODUCT_LOADER_TIMEOUT = 10000;
const PRODUCT_LOADER_FADE_DURATION = 400;

let productLoaderFinished = false;

function finishProductLoading() {

    if (productLoaderFinished) {
        return;
    }

    productLoaderFinished = true;

    window.clearTimeout(
        productLoaderFallback
    );

    const loader =
        document.getElementById(
            "product-loader"
        );

    document.body.classList.remove(
        "product-loading"
    );

    if (!loader) {
        return;
    }

    loader.classList.add("is-hiding");

    window.setTimeout(
        () => loader.remove(),
        PRODUCT_LOADER_FADE_DURATION
    );

}

const productLoaderFallback =
    window.setTimeout(
        finishProductLoading,
        PRODUCT_LOADER_TIMEOUT
    );

function waitForImage(image) {

    if (image.complete) {
        return Promise.resolve();
    }

    return new Promise(resolve => {

        const settle = () => {

            image.removeEventListener(
                "load",
                settle
            );

            image.removeEventListener(
                "error",
                settle
            );

            resolve();

        };

        image.addEventListener(
            "load",
            settle,
            { once: true }
        );

        image.addEventListener(
            "error",
            settle,
            { once: true }
        );

    });

}

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

                        renderSlides();
                        renderDots();
                        currentImageIndex = 0;
                        updateGallery(0, false);

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

        let allImages = [];

        const dotsContainer =
            document.querySelector(
                ".gallery_dots"
            );

        const galleryViewport =
            document.querySelector(
                ".gallery_viewport"
            );

        const galleryTrack =
            document.querySelector(
                ".gallery_track"
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

        function renderSlides() {

            galleryTrack.innerHTML = "";

            const imagePromises = [];

            allImages.forEach(
                (imageId, index) => {

                    const image =
                        document.createElement("img");

                    image.className =
                        "single_product_image";
                    image.src =
                        `${BASE_URL}/assets/${imageId}`;
                    image.alt =
                        productTitle.textContent;
                    image.draggable = false;
                    image.decoding = "async";
                    image.loading = "eager";

                    if (index === 0) {
                        image.id =
                            "main-product-image";
                    }

                    galleryTrack.appendChild(image);

                    imagePromises.push(
                        waitForImage(image)
                    );

                }
            );

            return Promise.all(
                imagePromises
            );

        }

        const galleryImagesReady =
            renderSlides();

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

        function updateGallery(
            index,
            smooth = true
        ) {

            galleryViewport.scrollTo({
                left:
                    galleryViewport.clientWidth *
                    index,
                behavior:
                    smooth ? "smooth" : "auto"
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
                            "button"
                        );

                    dot.classList.add(
                        "gallery_dot"
                    );
                    dot.type = "button";
                    dot.setAttribute(
                        "aria-label",
                        `Show image ${index + 1}`
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

        let scrollFrame = null;

        galleryViewport.addEventListener(
            "scroll",
            () => {

                if (scrollFrame) {
                    return;
                }

                scrollFrame =
                    requestAnimationFrame(() => {

                        scrollFrame = null;

                        const slideWidth =
                            galleryViewport.clientWidth;

                        if (!slideWidth) {
                            return;
                        }

                        const visibleIndex =
                            Math.min(
                                allImages.length - 1,
                                Math.max(
                                    0,
                                    Math.round(
                                        galleryViewport.scrollLeft /
                                        slideWidth
                                    )
                                )
                            );

                        if (
                            visibleIndex !==
                            currentImageIndex
                        ) {
                            currentImageIndex =
                                visibleIndex;

                            document
                                .querySelectorAll(
                                    ".gallery_dot"
                                )
                                .forEach(
                                    (dot, dotIndex) => {
                                        dot.classList.toggle(
                                            "active",
                                            dotIndex ===
                                                visibleIndex
                                        );
                                    }
                                );
                        }

                    });

            },
            { passive: true }
        );

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

        await galleryImagesReady;

        finishProductLoading();

        await loadRelatedProducts();

    } catch (error) {
        console.error(error);
        finishProductLoading();
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
