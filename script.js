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


// ===== Lottie Animations for Skills =====
const skills = [
  {id:'python', path:'https://assets9.lottiefiles.com/packages/lf20_ukd2lk.json'},
  {id:'sql', path:'https://assets2.lottiefiles.com/packages/lf20_v2b1uuj3.json'},
  {id:'pytorch', path:'https://assets3.lottiefiles.com/packages/lf20_gjlm5j8q.json'},
  {id:'tensorflow', path:'https://assets10.lottiefiles.com/packages/lf20_0s6tfbuc.json'},
  {id:'scikitlearn', path:'https://assets7.lottiefiles.com/packages/lf20_x62chJ.json'},
  {id:'huggingface', path:'https://assets2.lottiefiles.com/packages/lf20_e3i5c0u4.json'},
  {id:'pandas', path:'https://assets5.lottiefiles.com/packages/lf20_ikvz6r7s.json'},
  {id:'powerbi', path:'https://assets8.lottiefiles.com/packages/lf20_0h6qv5pz.json'},
  {id:'tableau', path:'https://assets3.lottiefiles.com/packages/lf20_7q4x5s1a.json'},
  {id:'plotly', path:'https://assets1.lottiefiles.com/packages/lf20_vfwp4j6l.json'},
  {id:'seaborn', path:'https://assets4.lottiefiles.com/packages/lf20_t0f6yznm.json'},
  {id:'matplotlib', path:'https://assets6.lottiefiles.com/packages/lf20_yw0v9l7a.json'},
  {id:'abtesting', path:'https://assets1.lottiefiles.com/packages/lf20_5h2k4c.json'},
  {id:'usersegmentation', path:'https://assets2.lottiefiles.com/packages/lf20_6xvmql.json'},
  {id:'googleanalytics', path:'https://assets4.lottiefiles.com/packages/lf20_8zqpxr.json'},
  {id:'productstrategy', path:'https://assets5.lottiefiles.com/packages/lf20_tzv7h.json'},
  {id:'insightreports', path:'https://assets7.lottiefiles.com/packages/lf20_1r3k4x.json'},
  {id:'fastapi', path:'https://assets10.lottiefiles.com/packages/lf20_0s6tfbuc.json'},
  {id:'streamlit', path:'https://assets3.lottiefiles.com/packages/lf20_gjlm5j8q.json'},
  {id:'docker', path:'https://assets8.lottiefiles.com/packages/lf20_qzjfgj.json'},
  {id:'github', path:'https://assets2.lottiefiles.com/packages/lf20_g4h4b.json'},
  {id:'agile', path:'https://assets9.lottiefiles.com/packages/lf20_4p1x3v.json'}
];

skills.forEach(skill => {
  const el = document.getElementById(skill.id);
  if (el) {
    lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: skill.path
    });
  }
});
