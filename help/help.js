document.querySelectorAll("[data-preserve-hash]").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.location.hash) {
      link.hash = window.location.hash;
    }
  });
});

document.querySelectorAll(".help-mobile-bar").forEach((navigation) => {
  navigation.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.open) {
      navigation.open = false;
      navigation.querySelector("summary")?.focus();
    }
  });
});

document.querySelectorAll("[data-help-screen-tour]").forEach((tour) => {
  const tabs = Array.from(tour.querySelectorAll('[role="tab"]'));
  const panels = tabs
    .map((tab) => document.getElementById(tab.getAttribute("aria-controls")))
    .filter(Boolean);

  const activate = (nextTab, moveFocus = false) => {
    tabs.forEach((tab) => {
      const selected = tab === nextTab;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== nextTab.getAttribute("aria-controls");
    });

    if (moveFocus) nextTab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activate(tabs[nextIndex], true);
    });
  });
});
