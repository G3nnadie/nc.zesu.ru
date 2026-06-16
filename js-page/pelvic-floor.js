// Vantage sl
var swiper = new Swiper(".w-vantage-sl", {
  spaceBetween: 10,
  slidesPerView: 'auto',
  observer: true,
  observeSlideChildren: true,
  observeParents: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      spaceBetween: 0,
      allowTouchMove: false,
      simulateTouch: false,
    },
  },
});

// Reviews sl
var swiper = new Swiper(".w-reviews-sl", {
  spaceBetween: 10,
  slidesPerView: 'auto',
  observer: true,
  observeSlideChildren: true,
  observeParents: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    1200: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
  },
});

// Chambers sl
var swiper = new Swiper(".w-chambers-sl", {
  loop: true,
  spaceBetween: 0,
  slidesPerView: 1,
  observer: true,
  observeSlideChildren: true,
  observeParents: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    992: {
      
    },
  },
});
