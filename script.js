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

const nameText = "Sama Al-Harbi";
const nameElement = document.getElementById("name");
let index = 0;
let forward = true; 

function typeWriterLoop() {
  if (forward) {
    nameElement.textContent += nameText.charAt(index);
    index++;
    if (index === nameText.length) {
      forward = false;
      setTimeout(typeWriterLoop, 1000); 
      return;
    }
  } else {
    nameElement.textContent = nameText.substring(0, index - 1);
    index--;
    if (index === 0) {
      forward = true;
    }
  }
  setTimeout(typeWriterLoop, 150); // سرعة الكتابة والمسح
}

typeWriterLoop();
