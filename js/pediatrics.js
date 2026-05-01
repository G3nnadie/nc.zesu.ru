/* ============================================
   PEDIATRICS PAGE - JS
   Отдельный скрипт для педиатрии
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ============================================
       Hero Slider (Pediatrics)
       ============================================ */
    var pedSlides = document.querySelectorAll('.ped-hero__slide');
    var pedBgs = document.querySelectorAll('.ped-hero__bg');
    var pedDots = document.querySelectorAll('.ped-hero__dot');
    var pedPrev = document.querySelector('.ped-hero__arrow--prev');
    var pedNext = document.querySelector('.ped-hero__arrow--next');
    var pedCurrent = 0;
    var pedAutoplay = null;

    function pedShowSlide(index) {
        if (pedSlides.length === 0) return;
        pedSlides.forEach(function (s) { s.classList.remove('active'); });
        pedBgs.forEach(function (b) { b.classList.remove('active'); });
        pedDots.forEach(function (d) { d.classList.remove('active'); });
        pedCurrent = (index + pedSlides.length) % pedSlides.length;
        pedSlides[pedCurrent].classList.add('active');
        if (pedBgs[pedCurrent]) pedBgs[pedCurrent].classList.add('active');
        if (pedDots[pedCurrent]) pedDots[pedCurrent].classList.add('active');
    }

    function pedNextSlide() {
        pedShowSlide(pedCurrent + 1);
    }

    function pedPrevSlide() {
        pedShowSlide(pedCurrent - 1);
    }

    function pedStartAutoplay() {
        pedStopAutoplay();
        pedAutoplay = setInterval(pedNextSlide, 6000);
    }

    function pedStopAutoplay() {
        if (pedAutoplay) clearInterval(pedAutoplay);
    }

    if (pedNext) {
        pedNext.addEventListener('click', function () {
            pedNextSlide();
            pedStartAutoplay();
        });
    }

    if (pedPrev) {
        pedPrev.addEventListener('click', function () {
            pedPrevSlide();
            pedStartAutoplay();
        });
    }

    pedDots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            pedShowSlide(i);
            pedStartAutoplay();
        });
    });

    if (pedSlides.length > 1) {
        pedStartAutoplay();
    }

    /* Move hero arrows next to CTA on mobile */
    if (window.innerWidth <= 767) {
        var heroArrows = document.querySelector('.ped-hero__arrows');
        if (heroArrows) {
            pedSlides.forEach(function (slide) {
                var cta = slide.querySelector('.ped-hero__cta');
                if (!cta) return;
                var row = document.createElement('div');
                row.className = 'ped-hero__cta-row';
                cta.parentNode.insertBefore(row, cta);
                row.appendChild(cta);
                var clone = heroArrows.cloneNode(true);
                clone.removeAttribute('id');
                row.appendChild(clone);
            });
            heroArrows.style.display = 'none';
            // Bind cloned arrows
            document.querySelectorAll('.ped-hero__cta-row .ped-hero__arrow--prev').forEach(function (b) {
                b.addEventListener('click', function () { pedPrevSlide(); pedStartAutoplay(); });
            });
            document.querySelectorAll('.ped-hero__cta-row .ped-hero__arrow--next').forEach(function (b) {
                b.addEventListener('click', function () { pedNextSlide(); pedStartAutoplay(); });
            });
        }
    }


    /* ============================================
       Reviews Carousel
       ============================================ */
    var revTrack = document.querySelector('.ped-reviews__track');
    var revPrev = document.querySelector('.ped-reviews__arrow--prev');
    var revNext = document.querySelector('.ped-reviews__arrow--next');
    var revOffset = 0;

    function revGetStep() {
        var card = document.querySelector('.ped-reviews__card');
        if (!card) return 300;
        var style = getComputedStyle(revTrack);
        var gap = parseFloat(style.gap) || 16;
        return card.offsetWidth + gap;
    }

    function revGetMaxOffset() {
        if (!revTrack) return 0;
        var wrapper = revTrack.parentElement;
        return Math.max(0, revTrack.scrollWidth - wrapper.offsetWidth);
    }

    function revMove(dir) {
        if (!revTrack) return;
        var step = revGetStep();
        var max = revGetMaxOffset();
        revOffset = Math.min(max, Math.max(0, revOffset + dir * step));
        revTrack.style.transform = 'translateX(-' + revOffset + 'px)';
    }

    if (revNext) revNext.addEventListener('click', function () { revMove(1); });
    if (revPrev) revPrev.addEventListener('click', function () { revMove(-1); });


    /* ============================================
       Comfort Gallery Carousel
       ============================================ */
    var comTrack = document.querySelector('.ped-comfort__track');
    var comSlides = document.querySelectorAll('.ped-comfort__slide');
    var comDots = document.querySelectorAll('.ped-comfort__dot');
    var comPrev = document.querySelector('.ped-comfort__arrow--prev');
    var comNext = document.querySelector('.ped-comfort__arrow--next');
    var comCurrent = 0;
    var comAutoplay = null;

    function comShowSlide(index) {
        if (comSlides.length === 0 || !comTrack) return;
        comCurrent = (index + comSlides.length) % comSlides.length;
        comTrack.style.transform = 'translateX(-' + (comCurrent * 100) + '%)';
        comDots.forEach(function (d) { d.classList.remove('active'); });
        if (comDots[comCurrent]) comDots[comCurrent].classList.add('active');
    }

    function comNextSlide() { comShowSlide(comCurrent + 1); }
    function comPrevSlide() { comShowSlide(comCurrent - 1); }

    function comStartAutoplay() {
        comStopAutoplay();
        comAutoplay = setInterval(comNextSlide, 5000);
    }

    function comStopAutoplay() {
        if (comAutoplay) clearInterval(comAutoplay);
    }

    if (comNext) comNext.addEventListener('click', function () { comNextSlide(); comStartAutoplay(); });
    if (comPrev) comPrev.addEventListener('click', function () { comPrevSlide(); comStartAutoplay(); });

    comDots.forEach(function (dot, i) {
        dot.addEventListener('click', function () { comShowSlide(i); comStartAutoplay(); });
    });

    if (comSlides.length > 1) {
        comStartAutoplay();
    }


    /* ============================================
       Mobile Scroll Arrows (reasons, services, extras)
       ============================================ */
    function setupScrollArrows(prevSel, nextSel, trackSel, cardSel) {
        var prev = document.querySelector(prevSel);
        var next = document.querySelector(nextSel);
        var track = document.querySelector(trackSel);
        if (!prev || !next || !track) return;

        function getStep() {
            var card = track.querySelector(cardSel);
            if (!card) return 170;
            var gap = parseFloat(getComputedStyle(track).gap) || 10;
            return card.offsetWidth + gap;
        }

        next.addEventListener('click', function () {
            track.scrollBy({ left: getStep(), behavior: 'smooth' });
        });
        prev.addEventListener('click', function () {
            track.scrollBy({ left: -getStep(), behavior: 'smooth' });
        });
    }

    setupScrollArrows(
        '.ped-reasons__arrow--prev', '.ped-reasons__arrow--next',
        '.ped-reasons__grid', '.ped-reasons__card'
    );
    setupScrollArrows(
        '.ped-services__arrow--prev', '.ped-services__arrow--next',
        '.ped-services__grid', '.ped-services__card'
    );
    setupScrollArrows(
        '.ped-extras__arrow--prev', '.ped-extras__arrow--next',
        '.ped-extras__grid', '.ped-extras__card'
    );
    setupScrollArrows(
        '.ped-steps__arrow--prev', '.ped-steps__arrow--next',
        '.ped-steps__grid', '.ped-steps__item'
    );


    /* ============================================
       Legal Accordion
       ============================================ */
    var legalToggle = document.querySelector('.ped-legal__toggle');
    var legalContent = document.querySelector('.ped-legal__content');

    if (legalToggle && legalContent) {
        legalToggle.addEventListener('click', function () {
            var expanded = legalToggle.getAttribute('aria-expanded') === 'true';
            legalToggle.setAttribute('aria-expanded', !expanded);
            legalContent.classList.toggle('open');
        });
    }
});
