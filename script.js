// ===== Fade-in on scroll =====
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


// ===== Global Mouse Light Effect =====
document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", `${e.clientX}px`);
  document.body.style.setProperty("--y", `${e.clientY}px`);
});


// ===== Typewriter Effect for Name =====
const nameElement = document.getElementById("name");
const fullName = nameElement.textContent;
nameElement.textContent = ""; // يبدأ الاسم فاضي
let index = 0;

function typeName() {
  if (index < fullName.length) {
    nameElement.textContent += fullName.charAt(index);
    index++;
    setTimeout(typeName, 150); // سرعة الكتابة
  }
}
typeName();


// ===== Changing Text Animation =====
const words = ["AI", "Data", "Insight", "Innovation","Creativity"];
let i = 0;
const textElement = document.getElementById("dynamic-text");

setInterval(() => {
  i = (i + 1) % words.length;
  textElement.style.opacity = 0;
  setTimeout(() => {
    textElement.textContent = words[i];
    textElement.style.opacity = 1;
  }, 500);
}, 2000);

