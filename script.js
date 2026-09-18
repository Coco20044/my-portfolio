/* =========================================
   WAIT FOR DOM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       CURRENT YEAR
    ========================================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        document.body.classList.toggle("no-scroll");

    });


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            document.body.classList.remove("no-scroll");

        });

    });


    /* =========================================
       GSAP
    ========================================= */

    if (typeof gsap === "undefined") {
        console.warn("GSAP did not load.");
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    /* =========================================
       CHECK REDUCED MOTION
    ========================================= */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =========================================
       LOADER
    ========================================= */

    const loader = document.getElementById("loader");

    if (!reducedMotion) {

        const loaderTimeline = gsap.timeline();

        loaderTimeline
            .to(".loader-text", {
                scale: 1.2,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            })
            .to(loader, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut"
            })
            .set(loader, {
                display: "none"
            })
            .from(".hero-item", {
                y: 40,
                opacity: 0,
                duration: 0.9,
                stagger: 0.08,
                ease: "power3.out"
            });

    } else {

        loader.style.display = "none";

    }


    /* =========================================
       HERO IMAGE FLOAT
    ========================================= */

    if (!reducedMotion) {

        gsap.to(".hero-image-wrapper", {
            y: -12,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });


        gsap.to(".orb-one", {
            x: 30,
            y: 20,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });


        gsap.to(".orb-two", {
            x: -25,
            y: -20,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }


    /* =========================================
       SCROLL REVEALS
    ========================================= */

    if (!reducedMotion && typeof ScrollTrigger !== "undefined") {

        const revealElements = document.querySelectorAll(".reveal");

        revealElements.forEach((element) => {

            gsap.from(element, {

                y: 60,
                opacity: 0,
                duration: 1,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }

            });

        });


        /* =========================================
           SKILL CARD STAGGER
        ========================================= */

        gsap.from(".skill-group", {

            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".skills-grid",
                start: "top 80%"
            }

        });


        /* =========================================
           PROJECT IMAGE REVEAL
        ========================================= */

        gsap.utils.toArray(".project-image").forEach((image) => {

            gsap.from(image, {

                scale: 0.92,
                opacity: 0,
                duration: 1,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: image,
                    start: "top 85%"
                }

            });

        });


        /* =========================================
           LEARNING ITEMS
        ========================================= */

        gsap.from(".learning-item", {

            x: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".learning-list",
                start: "top 80%"
            }

        });


        /* =========================================
           CONTACT ANIMATION
        ========================================= */

        gsap.from(".contact-container", {

            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".contact-section",
                start: "top 75%"
            }

        });

    }


    /* =========================================
       PROJECT HOVER
    ========================================= */

    if (!reducedMotion) {

        const projectImages = document.querySelectorAll(".project-image");

        projectImages.forEach((image) => {

            image.addEventListener("mouseenter", () => {

                gsap.to(image, {
                    scale: 1.02,
                    duration: 0.5,
                    ease: "power2.out"
                });

            });


            image.addEventListener("mouseleave", () => {

                gsap.to(image, {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });

            });

        });

    }


    /* =========================================
       SMOOTH NAVIGATION
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (
                targetId === "#" ||
                targetId === "" ||
                targetId === null
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    if (!reducedMotion && typeof ScrollTrigger !== "undefined") {

        const sections = document.querySelectorAll("section[id]");
        const navigationLinks = document.querySelectorAll(".nav-menu a");

        sections.forEach((section) => {

            ScrollTrigger.create({

                trigger: section,

                start: "top center",
                end: "bottom center",

                onEnter: () => updateActiveNav(section.id),
                onEnterBack: () => updateActiveNav(section.id)

            });

        });


        function updateActiveNav(id) {

            navigationLinks.forEach((link) => {

                link.style.color = "";

                if (link.getAttribute("href") === `#${id}`) {link.style.color = "#171717";
                }

            });

        }

    }

});