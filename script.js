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
