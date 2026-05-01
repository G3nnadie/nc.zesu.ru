document.addEventListener("DOMContentLoaded", () => {
  // 1. Логика Сплиттера (До/После)
  const slider = document.getElementById("stom-slider");
  const container = document.querySelector(".stom-service-results__comparison");

  if (slider && container) {
    slider.addEventListener("input", (e) => {
      container.style.setProperty("--pos", `${e.target.value}%`);
    });
  }

  // 2. Логика Аккордеона (FAQ)
  const accordionBtns = document.querySelectorAll(".stom-service-faq__btn");

  accordionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Ищем родителя (item) и переключаем модификатор active
      const currentItem = btn.parentElement;
      currentItem.classList.toggle("stom-service-faq__item--active");
    });
  });
});