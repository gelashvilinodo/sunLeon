const heroCategoryBtn =
    document.querySelector(
        ".hero_category_btn"
    );

async function loadHeroCategory() {

    if (!heroCategoryBtn) return;

    try {

        const response =
            await fetch(
                `${BASE_URL}/items/categories`
            );

        const result =
            await response.json();

        const category =
            result.data.find(
                item =>
                    item.slug ===
                    "new-arrivals"
            );

        if (!category) return;

        heroCategoryBtn.textContent =

            currentLang === "ka"

                ? category.name_ka

                : category.name_en;

        heroCategoryBtn.href =

            `products.html?category=${category.slug}`;

    }

    catch (error) {

        console.error(error);

    }

}

loadHeroCategory();

const videoReviewSection =
    document.querySelector(
        ".video_review"
    );

async function loadVideoReviews() {

    if (!videoReviewSection) return;

    try {

        const response =
            await fetch(

                `${BASE_URL}/items/bag_collection?fields=slug,name_en,name_ka,review_video`

            );

        const result =
            await response.json();

        console.log("VIDEO RESPONSE:", result);

        const products =
            result.data.filter(
                product =>
                    product.review_video
            );

        videoReviewSection.innerHTML = "";

        products.forEach(product => {

            const videoUrl =
                `${BASE_URL}/assets/${product.review_video}`;

            videoReviewSection.innerHTML += `

                <a
                    href="product.html?slug=${product.slug}"
                    class="video_card"
                >

                    <video
                        class="review_video"
                        muted
                        loop
                        playsinline
                    >

                        <source
                            src="${videoUrl}"
                            type="video/mp4"
                        >

                    </video>

                </a>

            `;

        });

        document
            .querySelectorAll(
                ".review_video"
            )

            .forEach(video => {

                video.play();

            });

    }

    catch (error) {

        console.error(error);

    }

}

loadVideoReviews();

const bestSellersSection =
    document.querySelector(
        ".best_sellers"
    );

async function loadBestSellers() {

    if (!bestSellersSection) return;

    try {

        const response =
            await fetch(

                `${BASE_URL}/items/bag_collection?fields=*,categories.categories_id.*,bag_variants.*,bag_variants.cover_img.*`

            );

        const result =
            await response.json();

        const products =
            result.data.filter(
                product =>
                    product.categories?.some(
                        item =>
                            item.categories_id.slug ===
                            "bestsellers"
                    )
            );

        const duplicatedProducts = [
            ...products,
            ...products
        ];

        bestSellersSection.innerHTML =

            `
                <div class="best_sellers_track">
                    ${duplicatedProducts.map(product => {

                const firstVariant =
                    product.bag_variants?.[0];

                if (!firstVariant)
                    return "";

                const imageUrl =
                    `${BASE_URL}/assets/${firstVariant.cover_img.id}`;

                return `

                            <a
                                href="product.html?slug=${product.slug}"
                                class="best_seller_card"
                            >

                                <img
                                    src="${imageUrl}"
                                    alt="${product.name_en}"
                                    class="best_seller_image"
                                >

                            </a>

                        `;

            }).join("")}
                </div>
            `;

    }

    catch (error) {

        console.error(error);

    }

}

loadBestSellers();