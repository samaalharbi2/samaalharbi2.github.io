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
const words = ["AI", "Data", "Insight", "Innovation", "Creativity"];
const textElement = document.getElementById("dynamic-text");
let wordIndex = 0;
let charIndex = 0;

function typeWord() {
  const currentWord = words[wordIndex];
  if (charIndex < currentWord.length) {
    textElement.textContent += currentWord.charAt(charIndex);
    charIndex++;
    setTimeout(typeWord, 80);
  } else {
    setTimeout(eraseWord, 60); 
  }
}

function eraseWord() {
  const currentWord = words[wordIndex];
  if (charIndex > 0) {
    textElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseWord, 600);
  } else {
    wordIndex = (wordIndex + 1) % words.length; 
    setTimeout(typeWord, 300);
  }
}

typeWord();

