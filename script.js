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
    setTimeout(typeWord, 120);
  } else {
    setTimeout(eraseWord, 1000); 
  }
}

function eraseWord() {
  const currentWord = words[wordIndex];
  if (charIndex > 0) {
    textElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseWord, 60);
  } else {
    wordIndex = (wordIndex + 1) % words.length; 
    setTimeout(typeWord, 400);
  }
}

typeWord();

  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // يمنع إعادة تحميل الصفحة
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        formMessage.style.display = 'block';
        form.reset();
      } else {
        alert('Oops! There was a problem submitting your form.');
      }
    }).catch(error => {
      alert('Oops! There was a problem submitting your form.');
    });
  });

const menu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menu) {
  menu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});


const menu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menu) {
  menu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}


