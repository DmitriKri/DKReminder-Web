const languagePreferenceKey = "dkreminder-language";

const getLanguagePreference = () => {
  try {
    const value = window.localStorage.getItem(languagePreferenceKey);
    return value === "uk" || value === "en" ? value : null;
  } catch {
    return null;
  }
};

const saveLanguagePreference = (language) => {
  try {
    window.localStorage.setItem(languagePreferenceKey, language);
  } catch {
    // The language switch still works when storage is unavailable.
  }
};

document.querySelectorAll(".language-link[hreflang]").forEach((link) => {
  link.addEventListener("click", () => saveLanguagePreference(link.hreflang));
});

const isUkrainianHome = document.documentElement.lang === "uk";
const preferredLanguage = getLanguagePreference();
const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
const browserPrefersUkrainian = browserLanguages.some((language) => language?.toLowerCase().startsWith("uk"));
const shouldOpenEnglish = preferredLanguage === "en" || (!preferredLanguage && !browserPrefersUkrainian);

if (isUkrainianHome && shouldOpenEnglish) {
  window.location.replace(new URL("index-en.html", window.location.href));
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const previousButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  let activeIndex = 0;

  const render = () => {
    slides.forEach((slide, index) => {
      slide.hidden = index !== activeIndex;
    });
    previousButton.hidden = activeIndex === 0;
    nextButton.hidden = activeIndex === slides.length - 1;
  };

  previousButton.addEventListener("click", () => {
    activeIndex -= 1;
    render();
  });

  nextButton.addEventListener("click", () => {
    activeIndex += 1;
    render();
  });

  render();
});
