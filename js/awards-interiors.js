document.addEventListener('DOMContentLoaded', function () {
    generateImages();
    initAwardsInteriorsTabs();
    initModals();
});

const awardsImagesCount = 37; // При добавлении фотографий изменить количество картинок Наград
const interiorsImagesCount = 25; // Интерьеры

function generateImages() {
    const awardsContainer = document.querySelector('.awards-interiors__awards-flex');
    const interiorsContainer = document.querySelector('.interiors-flex');

    if (awardsContainer) {
        const modal = awardsContainer.querySelector('.award-modal');
        const modalImages = modal?.querySelector('.award-modal__images');

        if (modalImages && !modalImages.querySelector('.arrow-btn')) {
            modalImages.innerHTML = `
                <button class="arrow-btn arrow-prev" type="button">
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none">
                        <path d="M17 7.5H1m0 0L7.5 1M1 7.5l6.5 6.5" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                ${modalImages.innerHTML}
                <button class="arrow-btn arrow-next" type="button">
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none">
                        <path d="M1 7.5h16m0 0L10.5 1M17 7.5l-6.5 6.5" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            `;
        }

        for (let i = 2; i <= awardsImagesCount; i++) { // при изменении количества картинок
            const imgDiv = document.createElement('div');
            imgDiv.className = 'award-image';
            imgDiv.innerHTML = `<img src="assets/images/awards-interiors/awards-thumb/award-thumb-${i}.jpg" alt="">`;

            if (modal) {
                awardsContainer.insertBefore(imgDiv, modal);
            } else {
                awardsContainer.appendChild(imgDiv);
            }
        }
    }

    if (interiorsContainer) {
        const modal = interiorsContainer.querySelector('.award-modal');
        const modalImages = modal?.querySelector('.award-modal__images');

        if (modalImages && !modalImages.querySelector('.arrow-btn')) {
            modalImages.innerHTML = `
                <button class="arrow-btn arrow-prev" type="button">
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none">
                        <path d="M17 7.5H1m0 0L7.5 1M1 7.5l6.5 6.5" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                ${modalImages.innerHTML}
                <button class="arrow-btn arrow-next" type="button">
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none">
                        <path d="M1 7.5h16m0 0L10.5 1M17 7.5l-6.5 6.5" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            `;
        }

        for (let i = 2; i <= interiorsImagesCount; i++) {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'award-image';
            imgDiv.innerHTML = `<img src="assets/images/awards-interiors/interiors-thumb/interior-thumb-${i}.jpg" alt="">`;

            if (modal) {
                interiorsContainer.insertBefore(imgDiv, modal);
            } else {
                interiorsContainer.appendChild(imgDiv);
            }
        }
    }
}

function initAwardsInteriorsTabs() {
    const tabs = document.querySelectorAll('.awards-interiors__tab');
    const awardsPanel = document.querySelector('.awards-interiors__awards-flex');
    const interiorsPanel = document.querySelector('.awards-interiors [data-awards-interiors="interiors"]');

    if (!tabs.length || !awardsPanel || !interiorsPanel) return;

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.awardsInteriorsTab;
            tabs.forEach((t) => {
                t.classList.toggle('active', t === tab);
                t.setAttribute('aria-selected', t === tab);
            });
            awardsPanel.hidden = target !== 'awards';
            interiorsPanel.hidden = target !== 'interiors';
        });
    });
}

function initModals() {
    const containers = document.querySelectorAll('.awards-interiors__flex');

    containers.forEach((container) => {
        const thumbnails = container.querySelectorAll('.award-image');   // все thumb'ы
        const modal = container.querySelector('.award-modal');
        const overlay = container.querySelector('.award-modal__overlay');
        const modalImg = modal?.querySelector('.award-modal_image');
        const prevBtn = modal?.querySelector('.arrow-prev');
        const nextBtn = modal?.querySelector('.arrow-next');

        if (!thumbnails.length || !modal || !modalImg) return;

        const total = thumbnails.length;   // общее количество изображений в категории

        // Функция обновления модального окна по индексу (1-based)
        function showImage(index) {
            const thumb = thumbnails[index - 1].querySelector('img');
            if (!thumb) return;

            const thumbSrc = thumb.getAttribute('src');
            const fullSrc = thumbSrc.replace(/thumb/g, 'full');
            modalImg.src = fullSrc;

            // Управление стрелками
            if (prevBtn) prevBtn.style.display = index === 1 ? 'none' : '';
            if (nextBtn) nextBtn.style.display = index === total ? 'none' : '';

            // Сохраняем текущий индекс в data-атрибуте модалки
            modal.dataset.currentIndex = index;
        }

        // Открытие модалки по клику на миниатюру
        thumbnails.forEach((thumb, idx) => {
            thumb.addEventListener('click', () => {
                const currentIndex = idx + 1;
                showImage(currentIndex);
                modal.classList.remove('award-modal__hidden');
                overlay.classList.remove('award-modal__hidden');
            });
        });

        // Кнопки перелистывания
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let current = parseInt(modal.dataset.currentIndex, 10) || 1;
                if (current > 1) {
                    showImage(current - 1);
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let current = parseInt(modal.dataset.currentIndex, 10) || 1;
                if (current < total) {
                    showImage(current + 1);
                }
            });
        }

        // Закрытие модалки
        const closeModal = () => {
            modal.classList.add('award-modal__hidden');
            overlay.classList.add('award-modal__hidden');
        };

        const closeBtn = modal.querySelector('.award-modal__close');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('award-modal__hidden')) {
                closeModal();
            }
        });
    });
}