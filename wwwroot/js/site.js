// ATS score animation
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

// Simple reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
  },
);

document
  .querySelectorAll(".floating-card, .template-card")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity .7s ease, transform .7s ease";

    observer.observe(element);
  });

// Mouse parallax effect for hero orbs
document.addEventListener("mousemove", (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 20;
  const y = (event.clientY / window.innerHeight - 0.5) * 20;

  document.querySelectorAll(".orb").forEach((orb, index) => {
    const multiplier = (index + 1) * 0.35;

    orb.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
  });
});
