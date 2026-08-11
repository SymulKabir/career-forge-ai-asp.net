document.addEventListener("DOMContentLoaded", () => {

    // Mobile menu
    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });

        mobileMenu
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener("click", () => {
                    mobileMenu.classList.add("hidden");
                });

            });
    }


    // ATS score animation
    const scoreElement =
        document.getElementById("atsScore");

    if (scoreElement) {

        let score = 0;

        const targetScore = 92;

        const interval = setInterval(() => {

            score++;

            scoreElement.textContent = score;

            if (score >= targetScore) {
                clearInterval(interval);
            }

        }, 25);
    }


    // Scroll reveal
    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                });

            },
            {
                threshold: 0.1
            }
        );


    document
        .querySelectorAll(
            ".floating-card, .template-card"
        )
        .forEach((element) => {

            element.classList.add(
                "reveal-item"
            );

            observer.observe(element);
        });


    // Hero parallax
    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5) *
                20;

            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5) *
                20;

            document
                .querySelectorAll(".orb")
                .forEach((orb, index) => {

                    const multiplier =
                        (index + 1) * 0.35;

                    orb.style.transform =
                        `translate(
                            ${x * multiplier}px,
                            ${y * multiplier}px
                        )`;
                });
        }
    );

});