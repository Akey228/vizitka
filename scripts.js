// Скрипт для карусели "Мои работы" и переключения темы

document.addEventListener('DOMContentLoaded', () => {
    /* Карусель "Мои работы" */

    const track = document.querySelector('.carousel__track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');

    const slideWidth = slides[0].getBoundingClientRect().width + 30; // включая маржины

    // Расположение слайдов
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };

    slides.forEach(setSlidePosition);

    let currentIndex = 0;

    // Обработчик кнопки "Вправо"
    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 3) { // Показываем 3 слайда
            currentIndex++;
            moveToSlide(currentIndex);
        }
    });

    // Обработчик кнопки "Влево"
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            moveToSlide(currentIndex);
        }
    });

    // Функция перемещения карусели
    const moveToSlide = (index) => {
        track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
    };

    // Автоматическое пролистывание
    setInterval(() => {
        if (currentIndex < slides.length - 3) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        moveToSlide(currentIndex);
    }, 7000); // Пролистывание каждые 7 секунд

    /* Переключение темы (темная/светлая) */

    const toggleCheckbox = document.getElementById('toggle-checkbox');

    // Проверка сохранённой темы в localStorage
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        toggleCheckbox.checked = true;
    } else {
        document.body.classList.add('dark-mode');
    }

    toggleCheckbox.addEventListener('change', () => {
        if (toggleCheckbox.checked) {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
});
