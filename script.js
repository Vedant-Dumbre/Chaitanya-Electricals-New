/* =========================================================
   CHAITANYA ELECTRICALS
   Advertising Landing Page
   Interactive JavaScript
========================================================= */


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("chaitanya-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

updateThemeIcon();


function updateThemeIcon() {

    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if (!icon) return;


    if (document.body.classList.contains("dark-mode")) {

        icon.className = "bi bi-sun-fill";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to light mode"
        );

    } else {

        icon.className = "bi bi-moon-stars-fill";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to dark mode"
        );

    }

}


themeToggle?.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "chaitanya-theme",
        isDark ? "dark" : "light"
    );

    updateThemeIcon();

});


/* =========================================================
   SCROLL REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    /* Fallback for older browsers */

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* =========================================================
   SMOOTH ANCHOR SCROLLING
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", function(event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


/* =========================================================
   NAVIGATION SHADOW ON SCROLL
========================================================= */

const nav =
    document.querySelector(".top-nav");


function updateNavigation() {

    if (!nav) return;


    if (window.scrollY > 20) {

        nav.style.boxShadow =
            "0 10px 35px rgba(20, 50, 100, 0.12)";

        nav.style.background =
            "rgba(255, 255, 255, 0.78)";

    } else {

        nav.style.boxShadow = "none";

        nav.style.background =
            "rgba(255, 255, 255, 0.68)";

    }

}


window.addEventListener(
    "scroll",
    updateNavigation,
    {
        passive: true
    }
);


updateNavigation();


/* =========================================================
   DARK MODE NAVIGATION BACKGROUND
========================================================= */

function updateDarkNavigation() {

    if (!nav) return;


    if (
        document.body.classList.contains("dark-mode") &&
        window.scrollY > 20
    ) {

        nav.style.background =
            "rgba(8, 13, 24, 0.88)";

    }

}


themeToggle?.addEventListener(
    "click",
    () => {

        setTimeout(
            updateDarkNavigation,
            50
        );

    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
    document.getElementById("currentYear");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   PRODUCT / SERVICE CARD TILT
   Only enabled for mouse devices
========================================================= */

const canHover =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;


if (canHover) {

    document
        .querySelectorAll(".explore-card")
        .forEach(card => {


            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;


                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) / centerY) * -2;


                    const rotateY =
                        ((x - centerX) / centerX) * 2;


                    card.style.transform =
                        `translateY(-7px)
                         perspective(700px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );


        });

}


/* =========================================================
   HERO GLOW PARALLAX
========================================================= */

const heroGlow =
    document.querySelector(".hero-glow");


if (
    heroGlow &&
    canHover
) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                (event.clientX / window.innerWidth - 0.5) * 20;

            mouseY =
                (event.clientY / window.innerHeight - 0.5) * 20;

        },
        {
            passive: true
        }
    );


    function animateHeroGlow() {

        currentX +=
            (mouseX - currentX) * 0.08;

        currentY +=
            (mouseY - currentY) * 0.08;


        heroGlow.style.transform =
            `translateX(calc(-50% + ${currentX}px))
             translateY(${currentY}px)`;


        requestAnimationFrame(
            animateHeroGlow
        );

    }


    animateHeroGlow();

}


/* =========================================================
   HERO CTA EFFECT
========================================================= */

const primaryCTA =
    document.querySelector(".google-btn");


if (primaryCTA) {

    primaryCTA.addEventListener(
        "click",
        () => {

            primaryCTA.classList.add(
                "cta-clicked"
            );


            setTimeout(
                () => {

                    primaryCTA.classList.remove(
                        "cta-clicked"
                    );

                },
                500
            );

        }
    );

}


/* =========================================================
   CONTACT CTA FEEDBACK
========================================================= */

const contactItems =
    document.querySelectorAll(".contact-item");


contactItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            item.classList.add(
                "contact-clicked"
            );


            setTimeout(
                () => {

                    item.classList.remove(
                        "contact-clicked"
                    );

                },
                400
            );

        }
    );

});


/* =========================================================
   PROJECT IMAGE LAZY EFFECT
========================================================= */

const projectImages =
    document.querySelectorAll(".project-large img");


projectImages.forEach(image => {

    image.addEventListener(
        "load",
        () => {

            image.classList.add(
                "image-loaded"
            );

        }
    );

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /* Escape closes any focused interaction */

        if (event.key === "Escape") {

            document.activeElement?.blur();

        }

    }
);