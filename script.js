// Animation on scroll
const elements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});

// Add glow to skills on hover (extra visual pulse)
document.querySelectorAll(".skill-card").forEach((skill) => {
  skill.addEventListener("mouseover", () => {
    skill.style.boxShadow = "0 0 25px rgba(143,58,255,0.8)";
  });
  skill.addEventListener("mouseout", () => {
    skill.style.boxShadow = "0 0 10px rgba(143,58,255,0.2)";
  });
});

// Console welcome message
console.log("%cWelcome to Sama Al-Harbi’s Portfolio ✨", "color:#B28CFF;font-weight:bold;");
