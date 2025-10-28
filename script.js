// Fade-in animation on scroll
const elements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});

// Console message
console.log("Welcome to Sama Al-Harbi’s Interactive Portfolio!");

