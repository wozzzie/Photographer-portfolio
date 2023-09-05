import i18Obj from "./translate.js";

const videoBtn = document.querySelector(".video-btn"),
  playIcon = document.querySelector(".play"),
  volumeIcon = document.querySelector(".volume-icon"),
  volumeInput = document.querySelector(".volume"),
  progressInput = document.querySelector(".progress"),
  video = document.querySelector(".viewer");

let videoVolume = 0.5;
video.volume = videoVolume;

function togglePlay() {
  if (video.paused) {
    video.play();
    videoBtn.classList.add("video-btn_hide");
    playIcon.classList.add("pause");
  } else {
    video.pause();
    videoBtn.classList.remove("video-btn_hide");
    playIcon.classList.remove("pause");
  }
}

videoBtn.addEventListener("click", togglePlay);
playIcon.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

// Change volume

function changeVolume() {
  video.muted = !video.muted;

  if (video.muted) {
    videoVolume = volumeInput.value;
    volumeInput.value = 0;
  } else {
    volumeInput.value = videoVolume;
  }

  volumeIcon.classList.toggle("mute");
}

function handleGradient(firstVal, secondVal) {
  return `linear-gradient(to right, rgb(189, 174, 130) 0%, 
            rgb(189, 174, 130) ${firstVal}%,
            rgb(200, 200, 200) ${secondVal}%,
            rgb(200, 200, 200) 100%)`;
}

function handleRangeUpdate() {
  video.volume = volumeInput.value;

  volumeInput.style.background = handleGradient(
    volumeInput.value * 100,
    volumeInput.value * 100
  );
}

volumeInput.addEventListener("input", () => {
  handleRangeUpdate();

  if (+volumeInput.value === 0) {
    volumeIcon.classList.add("mute");
  } else {
    volumeIcon.classList.remove("mute");
  }
});

volumeIcon.addEventListener("click", () => {
  changeVolume();
  handleRangeUpdate();
});

handleRangeUpdate();

// Update progress bar in video

video.addEventListener("timeupdate", () => {
  progressInput.value = video.currentTime / video.duration;

  progressInput.style.background = handleGradient(
    progressInput.value * 100,
    progressInput.value * 100
  );

  if (video.currentTime === video.duration) {
    playIcon.classList.add("pause");
  }
});
progressInput.addEventListener("input", () => {
  video.currentTime = progressInput.value * video.duration;
});

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
