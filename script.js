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
// === КОПІЮВАННЯ КОДУ В БУФЕР ОБМІНУ ===
function copyCode(btnElement) {
  const codeText = document.getElementById("lua-code").innerText;

  // Використовуємо сучасний API для буфера обміну
  navigator.clipboard
    .writeText(codeText)
    .then(() => {
      // Змінюємо текст і стиль кнопки на 2 секунди
      const originalText = btnElement.innerText;
      btnElement.innerText = "✅ Скопійовано!";
      btnElement.classList.add("success");

      setTimeout(() => {
        btnElement.innerText = originalText;
        btnElement.classList.remove("success");
      }, 2000);
    })
    .catch((err) => {
      console.error("Помилка копіювання: ", err);
    });
}
// === КОПІЮВАННЯ ІНЛАЙН-КОДУ ===
function copyInlineCode(element) {
  const textToCopy = element.innerText;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      // Змінюємо вигляд на зелений (успіх)
      element.classList.add("copied");

      // Повертаємо початковий вигляд через 1.5 секунди
      setTimeout(() => {
        element.classList.remove("copied");
      }, 1500);
    })
    .catch((err) => {
      console.error("Помилка копіювання: ", err);
    });
}
// === script.js ===

// === КОПІЮВАННЯ ВЕЛИКОГО БЛОКУ КОДУ ЗА ID (З НАДІЙНИМ ФОЛЛБЕКОМ ДЛЯ LOCALHOST/FILE://) ===
function copyCode2(btnElement, sourceId) {
  // 1. Знаходимо текст всередині потрібного тегу code
  const codeElement = document.getElementById(sourceId);
  if (!codeElement) {
    console.error(`Блок коду з id '${sourceId}' не знайдено!`);
    return;
  }
  const codeText = codeElement.innerText; // recursively gets all text including from spans

  // 2. Створюємо тимчасове текстове поле (textarea)
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = codeText;
  // Ховаємо його поза екраном
  tempTextarea.setAttribute("readonly", ""); // prevent zooming on mobile
  tempTextarea.style.position = "absolute";
  tempTextarea.style.left = "-9999px";
  document.body.appendChild(tempTextarea);

  // 3. Виділяємо текст у тимчасовому полі
  tempTextarea.select();

  try {
    // 4. Виконуємо команду копіювання (це працює скрізь)
    document.execCommand("copy");

    // 5. Змінюємо текст і стиль кнопки на 2 секунди
    const originalText = btnElement.innerText;
    btnElement.innerText = "✅ Скопійовано!";
    btnElement.classList.add("success");

    setTimeout(() => {
      btnElement.innerText = originalText;
      btnElement.classList.remove("success");
    }, 2000);
  } catch (err) {
    console.error("Помилка копіювання: ", err);
    btnElement.innerText = "❌ Помилка!";
    setTimeout(() => {
      btnElement.innerText = originalText;
    }, 2000);
  } finally {
    // 6. У будь-якому випадку видаляємо тимчасове поле
    document.body.removeChild(tempTextarea);
  }
}

// === КОПІЮВАННЯ ІНЛАЙН-КОДУ (ПРИ КЛІКУ НА ТЕКСТ, ТАКОЖ НАДІЙНО) ===
// (Якщо ти не використовуєш інлайн-копіювання, просто проігноруй цей блок)
function copyInlineCode(element) {
  const textToCopy = element.innerText;

  // Створюємо тимчасове текстове поле
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = textToCopy;
  tempTextarea.setAttribute("readonly", "");
  tempTextarea.style.position = "absolute";
  tempTextarea.style.left = "-9999px";
  document.body.appendChild(tempTextarea);
  tempTextarea.select();

  try {
    // Копіюємо
    document.execCommand("copy");
    // Додаємо клас для візуального підтвердження (блимання)
    element.classList.add("copied");

    // Повертаємо початковий вигляд через 1.5 секунди
    setTimeout(() => {
      element.classList.remove("copied");
    }, 1500);
  } catch (err) {
    console.error("Помилка копіювання: ", err);
  } finally {
    // Видаляємо тимчасове поле
    document.body.removeChild(tempTextarea);
  }
}
