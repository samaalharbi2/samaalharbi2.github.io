// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.style.animation = "fadeIn 1s forwards";
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
// Mouse light effect for Skills section
document.addEventListener("mousemove", (e) => {
  const skills = document.querySelector("#skills");
  if (!skills) return;
  const rect = skills.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  skills.style.setProperty("--x", `${x}px`);
  skills.style.setProperty("--y", `${y}px`);
});
