import i18Obj from "./translate.js";

console.log(`Rolling Scopes School - portfolio#3 - Добавление функционала
Self-evaluation by Maria Gornashevich 75 / 75 (85 / 85)
✅ Смена изображений в секции portfolio +25
✅ Перевод страницы на два языка +25
✅ Переключение светлой и тёмной темы +25
✅ Дополнительный функционал +10
developed by goldmarkol - 2022
    `);

//  Logic for hamburger menu

const hamburger = document.querySelector(".hamburger"),
  navList = document.querySelector(".navigation-list"),
  navLink = document.querySelectorAll(".navigation-link"),
  navigation = document.querySelector(".navigation"),
  menu = document.querySelector(".menu"),
  overlay = document.querySelector(".navigation-overlay"),
  body = document.querySelector("body");

function toggleMenu() {
  const isHamburgerOpen = hamburger.classList.toggle("open");

  if (isHamburgerOpen) {
    navigation.classList.add("navigation-active");
    menu.classList.add("menu-active");
    overlay.classList.add("navigation-overlay-active");
    body.classList.add("active");
  } else {
    navigation.classList.remove("navigation-active");
    menu.classList.remove("menu-active");
    overlay.classList.remove("navigation-overlay-active");
    body.classList.remove("active");
  }

  navLink.forEach((el) => {
    el.addEventListener("click", () => {
      navigation.classList.remove("navigation-active"),
        overlay.classList.remove("navigation-overlay-active"),
        hamburger.classList.remove("open"),
        body.classList.remove("active"),
        menu.classList.remove("menu-active");
    });
  });
}
hamburger.addEventListener("click", toggleMenu);

// Change images from section portfolio

const portfolioBtn = document.querySelectorAll(".button_black"),
  portfolioImages = document.querySelectorAll(".portfolio-img"),
  portfolioBtns = document.querySelector(".button-block");

function changeImage(event) {
  // Changing style of active buttons for portfolio section
  if (event.target.classList.contains("button_black")) {
    portfolioBtn.forEach((el) => {
      el.classList.remove("button_black_active");
    });
    event.target.classList.add("button_black_active");

    portfolioImages.forEach(
      (img, index) =>
        (img.src = `../portfolio/assets/img/${event.target.dataset.season}/${
          index + 1
        }.jpg`)
    );
  }
}

portfolioBtns.childNodes.forEach((btn) => {
  btn.addEventListener("click", (event) => changeImage(event));
});

// Cashing images from section portfolio

function preloadSummerImages() {
  const seasons = ["winter", "spring", "summer", "autumn"];

  seasons.forEach((el) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `../portfolio/assets/img/${el}/${i}.jpg`;
    }
  });
}
preloadSummerImages();

//  Connect translations

const navLinkLang = document.querySelectorAll(".nav-link_en");

let langDefault = "en";

function getTranslate(lang) {
  langDefault = lang;

  setLang(lang);

  let data = document.querySelectorAll("[data-i18]");

  data.forEach((el) => {
    const key = i18Obj[lang][el.dataset.i18];

    el.textContent = key;

    if (el.placeholder) {
      el.placeholder = key;
      el.textContent = "";
    }
  });
}

navLinkLang.forEach((linkLang) => {
  linkLang.addEventListener("click", (event) => {
    navLinkLang.forEach((lang) => lang.classList.remove("nav-link_en_active"));

    event.target.classList.add("nav-link_en_active");

    getTranslate(event.target.textContent);
  });
});

// Switch theme

let themeDefault = "dark";

const switchTheme = document.querySelector(".switch-theme");

function changeTheme() {
  switchTheme.addEventListener("click", () => {
    if (themeDefault === "dark") {
      body.classList.add("ligth-theme");
      themeDefault = "light";
    } else {
      body.classList.remove("ligth-theme");
      themeDefault = "dark";
    }
    setTheme(themeDefault);
  });
}
changeTheme();

// Local storage

function getLocalStorage() {
  const theme = localStorage.getItem("theme");

  if (theme) {
    themeDefault = theme;

    if (theme === "light") {
      body.classList.add("ligth-theme");
    } else {
      body.classList.remove("ligth-theme");
    }
  }

  const lang = localStorage.getItem("lang");

  if (lang) {
    navLinkLang.forEach((lang) => lang.classList.remove("nav-link_en_active"));

    navLinkLang.forEach((link) => {
      if (link.textContent === lang) {
        link.classList.add("nav-link_en_active");
      }
    });

    getTranslate(lang);
  }
}

const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

const setLang = (lang) => {
  localStorage.setItem("lang", lang);
};

window.addEventListener("beforeunload", () => {
  setTheme(themeDefault);
  setLang(langDefault);
});

window.addEventListener("load", getLocalStorage);

function hoverBubbleBtnsEffect() {
  const bubbleButtons = document.querySelectorAll(".bubbly-button");

  bubbleButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", (e) => {
      e.target.classList.toggle("animate");
    });

    btn.addEventListener("mouseleave", (e) => {
      e.target.classList.toggle("animate");
    });
  });
}

hoverBubbleBtnsEffect();
