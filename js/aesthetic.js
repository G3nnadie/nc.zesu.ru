const plusItems = document.querySelectorAll('.plus-type');

if (plusItems.length) {
    plusItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        })
    })
}
$(function () {
    $(".comparison").twentytwenty();
});

function initSimpleSliderT({
    sliderSelector,
    trackSelector,
    slideSelector,
    prevSelector,
    nextSelector,
    dotSelector,
    activeDotClass = "active",
    transition = "0.4s"
}) {

    const slider = document.querySelector(sliderSelector);
    if (!slider) return;

    const track = slider.querySelector(trackSelector);
    const slides = slider.querySelectorAll(slideSelector);
    const dots = slider.querySelectorAll(dotSelector);

    const prevBtn = document.querySelector(prevSelector);
    const nextBtn = document.querySelector(nextSelector);

    let current = 0;
    const total = slides.length;

    function update() {

        const width = slides[0].offsetWidth;

        track.style.display = "flex";
        track.style.transition = `transform ${transition} ease`;
        track.style.transform = `translateX(-${current * width}px)`;

        if (dots.length) {
            dots.forEach(dot => dot.classList.remove(activeDotClass));

            if (dots[current]) {
                dots[current].classList.add(activeDotClass);
            }
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {

            current = (current + 1) % total;
            update();

        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {

            current = (current - 1 + total) % total;
            update();

        });
    }

    if (dots.length) {

        dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {

                current = index;
                update();

            });

        });

    }

    window.addEventListener("resize", update);

    update();
}

initSimpleSliderT({
    sliderSelector: ".aesthetic-technologies__slider",
    trackSelector: ":scope > div",
    slideSelector: ".aesthetic-technologies__slide",
    prevSelector: ".aesthetic-technologies__arrow--left",
    nextSelector: ".aesthetic-technologies__arrow--right",
    dotSelector: ".aesthetic-technologies__dot"
});

initSimpleSliderT({
    sliderSelector: ".aesthetic-results__slider",
    trackSelector: ":scope > div",
    slideSelector: ".aesthetic-results__slide",
    prevSelector: ".aesthetic-results__arrow--left",
    nextSelector: ".aesthetic-results__arrow--right"
});