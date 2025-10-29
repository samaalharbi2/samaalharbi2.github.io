const elements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});

console.log("%cWelcome to Sama Al-Harbi’s Portfolio", "color:#9A5CFF;font-weight:bold;");
