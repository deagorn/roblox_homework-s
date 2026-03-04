// === ЛОГІКА СЛАЙДЕРА ===
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let currentSlide = 0;
let slideInterval;

// Функція показу конкретного слайду
function showSlide(index) {
  slides[currentSlide].classList.remove("active");

  // Зациклюємо індекс: після останньої йде перша
  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add("active");
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Запуск автоматичного перегортання (5000 мс = 5 секунд)
function startSlider() {
  slideInterval = setInterval(nextSlide, 5000);
}

// Скидання таймера (щоб картинка не перегорнулася відразу після ручного кліку)
function resetSlider() {
  clearInterval(slideInterval);
  startSlider();
}

// Події на кнопки стрілочок
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetSlider();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetSlider();
});

// Запускаємо таймер при завантаженні
startSlider();

// === ЛОГІКА МОДАЛЬНОГО ВІКНА (LIGHTBOX) ===
const modal = document.getElementById("lightbox-modal");
const modalImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-btn");

// Додаємо клік для кожної картинки у слайдері
slides.forEach((img) => {
  img.addEventListener("click", function () {
    modal.classList.add("active");
    modalImg.src = this.src; // Беремо адресу картинки, на яку клікнули
    clearInterval(slideInterval); // Зупиняємо автоскрол слайдера, поки відкрита картинка
  });
});

// Функція закриття
function closeModal() {
  modal.classList.remove("active");
  startSlider(); // Знову запускаємо автоскрол після закриття
}

// Закриття хрестиком
closeBtn.addEventListener("click", closeModal);

// Закриття при кліку на темний фон
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Закриття кнопкою Escape
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});
