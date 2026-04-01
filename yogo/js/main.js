const weekPeriod = document.getElementById("weekPeriod");
const weekButtons = document.querySelectorAll("[data-week]");
const periods = ["26 Января - 1 Февраля", "2 - 8 Февраля", "9 - 15 Февраля"];
let periodIndex = 1;

const initHeaderScroll = () => {
  const header = document.getElementById("header");
  if (!header) {
    return;
  }

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }

    if (currentScroll <= 0 || currentScroll < lastScroll) {
      header.classList.remove("header-hidden");
    } else if (currentScroll > header.offsetHeight) {
      header.classList.add("header-hidden");
    }

    lastScroll = currentScroll;
  });
};

const initSection6Carousel = () => {
  const carousel = document.querySelector(".section-6 .teacher-carousel");
  const track = document.querySelector(".section-6 .teacher-track");
  const pagesContainer = document.querySelector(".section-6 .teacher-pagination__pages");
  const prevButton = document.querySelector(".section-6 .teacher-pagination__btn[data-direction='prev']");
  const nextButton = document.querySelector(".section-6 .teacher-pagination__btn[data-direction='next']");

  if (!carousel || !track || !pagesContainer || !prevButton || !nextButton) {
    return;
  }

  const teacherSlides = Array.from(track.querySelectorAll(".teacher-slide"));
  if (!teacherSlides.length) {
    return;
  }
  const MAX_TEACHER_PAGES = 3;

  const getItemsPerPage = () => {
    if (window.innerWidth < 768) return 4;
    if (window.innerWidth < 992) return 4;
    if (window.innerWidth < 1200) return 3;
    return 5;
  };

  let itemsPerPage = getItemsPerPage();
  let currentPage = 0;
  const getTotalPages = () => Math.min(Math.ceil(teacherSlides.length / itemsPerPage), MAX_TEACHER_PAGES);

  const buildPagination = (totalPages) => {
    pagesContainer.innerHTML = Array.from({ length: totalPages }, (_, idx) => {
      const page = idx + 1;
      return `<button class="teacher-pagination__btn${idx === currentPage ? " is-active" : ""}" type="button" data-page="${page}">${page}</button>`;
    }).join("");

    pagesContainer.querySelectorAll(".teacher-pagination__btn").forEach((button) => {
      button.addEventListener("click", () => {
        const page = Number(button.dataset.page) - 1;
        if (Number.isNaN(page)) return;
        currentPage = page;
        update();
      });
    });
  };

  const buildPages = () => {
    track.innerHTML = "";
    const totalPages = getTotalPages();

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
      const pageElement = document.createElement("div");
      pageElement.className = "teacher-page";

      const pageSlides = teacherSlides.slice(
        pageIndex * itemsPerPage,
        pageIndex * itemsPerPage + itemsPerPage,
      );
      pageSlides.forEach((slide) => pageElement.appendChild(slide));
      track.appendChild(pageElement);
    }

    return totalPages;
  };

  const update = () => {
    itemsPerPage = getItemsPerPage();
    const totalPages = buildPages();
    currentPage = Math.max(0, Math.min(currentPage, totalPages - 1));

    track.style.transform = `translate3d(${-currentPage * 100}%, 0, 0)`;
    buildPagination(totalPages);

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage >= totalPages - 1;
  };

  prevButton.addEventListener("click", () => {
    currentPage = Math.max(0, currentPage - 1);
    update();
  });

  nextButton.addEventListener("click", () => {
    const totalPages = getTotalPages();
    currentPage = Math.min(totalPages - 1, currentPage + 1);
    update();
  });

  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const delta = touchStartX - touchEndX;

    if (Math.abs(delta) < 40) {
      return;
    }

    if (delta > 0) {
      nextButton.click();
    } else {
      prevButton.click();
    }
  }, { passive: true });

  currentPage = 0;
  update();
  window.addEventListener("resize", update);
};

const initSection7Carousel = () => {
  const cardsWrap = document.querySelector(".section-7 .section-7__cards-wrap");
  const prevButton = document.querySelector(".section-7 .section-7__arrow[data-direction='prev']");
  const nextButton = document.querySelector(".section-7 .section-7__arrow[data-direction='next']");

  if (!cardsWrap || !prevButton || !nextButton) {
    return;
  }

  const getScrollStep = () => {
    const card = cardsWrap.querySelector(".format-card");
    if (!card) {
      return 260;
    }
    const gap = 10;
    return card.getBoundingClientRect().width + gap;
  };

  prevButton.addEventListener("click", () => {
    cardsWrap.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    cardsWrap.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  });
};

const initSection9Carousel = () => {
  const cardsWrap = document.querySelector(".section-9 .section-9__cards-wrap");
  const prevButton = document.querySelector(".section-9 .section-9__arrow[data-direction='prev']");
  const nextButton = document.querySelector(".section-9 .section-9__arrow[data-direction='next']");

  if (!cardsWrap || !prevButton || !nextButton) {
    return;
  }

  const getScrollStep = () => {
    const card = cardsWrap.querySelector(".price-card");
    if (!card) {
      return 260;
    }
    const gap = 10;
    return card.getBoundingClientRect().width + gap;
  };

  prevButton.addEventListener("click", () => {
    cardsWrap.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    cardsWrap.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  });
};

weekButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.week === "prev") {
      periodIndex = Math.max(0, periodIndex - 1);
    }

    if (button.dataset.week === "next") {
      periodIndex = Math.min(periods.length - 1, periodIndex + 1);
    }

    if (weekPeriod) {
      weekPeriod.textContent = periods[periodIndex];
    }
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuClose = document.querySelector(".mobile-menu-close");
const mobileNavToggles = document.querySelectorAll(".mobile-nav-toggle");

const closeMobileMenu = () => {
  if (!mobileMenu) {
    return;
  }

  mobileMenu.classList.remove("active");
  document.body.classList.remove("menu-open");
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.classList.add("menu-open");
  });
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", closeMobileMenu);
}

if (mobileMenu) {
  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu) {
      closeMobileMenu();
    }
  });
}

mobileNavToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const parent = toggle.closest(".mobile-nav-item");
    if (!parent) {
      return;
    }

    const isOpen = parent.classList.contains("active");
    parent.classList.toggle("active");
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });
});

initHeaderScroll();
initSection6Carousel();
initSection7Carousel();
initSection9Carousel();
