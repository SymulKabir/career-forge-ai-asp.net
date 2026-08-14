/* =========================================================
   ATS SCORE ANIMATION
========================================================= */

const scoreElement = document.getElementById("atsScore");

let score = 0;

const targetScore = 92;

const scoreInterval = setInterval(() => {
  score++;

  scoreElement.textContent = score;

  if (score >= targetScore) {
    clearInterval(scoreInterval);
  }
}, 25);

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  observer.observe(element);
});

/* =========================================================
   MOUSE PARALLAX
========================================================= */

const orbs = document.querySelectorAll(".orb");

document.addEventListener("mousemove", (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 30;

  const y = (event.clientY / window.innerHeight - 0.5) * 30;

  orbs.forEach((orb, index) => {
    const multiplier = (index + 1) * 0.35;

    orb.style.transform = `translate(
                    ${x * multiplier}px,
                    ${y * multiplier}px
                )`;
  });
});

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-violet-600");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-violet-600");
    }
  });
});

/* =========================================================
   BUTTON RIPPLE
========================================================= */

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function () {
    this.style.transform = "scale(.97)";

    setTimeout(() => {
      this.style.transform = "";
    }, 120);
  });
});
