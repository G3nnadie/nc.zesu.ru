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

// Recovery sl
var swiper = new Swiper(".w-recovery-sl", {
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
    992: {
      spaceBetween: 20,
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

// Video play
document.querySelectorAll('.w-video-bg').forEach(bg => {
  bg.addEventListener('click', function () {
    const videoBlock = this.closest('.w-video');
    const video = videoBlock.querySelector('video');

    this.classList.add('w-video-bg--hidden');
    video.play();
  });
});