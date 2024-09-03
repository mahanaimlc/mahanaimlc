'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 
*/
const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function() {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

/**
 * PRELOAD
 * 
 * Loading will end after the document is loaded
 

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function() {
    preloader.classList.add("loaded");
    setTimeout(() => {
        preloader.style.display = "none"; // Hide the preloader after animation
    }, 500); // Adjust the delay if needed to ensure the animation completes
});
*/


/**
 * add event listener on multiple elements
 */

const addEventOnElements = function(elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function() {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function() {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }

    lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function() {
    if (window.scrollY >= 50) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function() {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function() {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function() {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }

    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function() {
    autoSlideInterval = setInterval(function() {
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function() {
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);

// Get all the navigation links
const navLinks = document.querySelectorAll("[data-nav-link]");

const closeNavbar = function() {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
}

// Add an event listener to each link
addEventOnElements(navLinks, "click", function() {
    closeNavbar(); // Close the navbar after clicking a link
});

// Also ensure the navbar is visible after navigation
addEventOnElements(navLinks, "click", function() {
    header.classList.remove("hide");
});


// Add an event listener to each link for adjusting scroll behavior
addEventOnElements(navLinks, "click", function(event) {
    event.preventDefault(); // Prevent the default jump-to behavior
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
        top: targetElement.offsetTop - header.offsetHeight, // Adjust for the header height
        behavior: "smooth" // Smooth scroll
    });
});

const showNavbar = function() {
    header.classList.add("active");
}

addEventOnElements(navLinks, "click", showNavbar);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function(event) {

    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    // reverse the number eg. 20 -> -20, -5 -> 5
    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }

});






addEventOnElements(navLinks, "click", function(event) {
    event.preventDefault(); // Prevent the default jump-to behavior

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    // Check if the clicked section is #home or #about and close the navbar immediately
    if (targetId === "home" || targetId === "about") {
        closeNavbar(); // Close the navbar immediately
    }

    // Adjust scroll position
    window.scrollTo({
        top: targetElement.offsetTop - header.offsetHeight, // Adjust for the header height
        behavior: "smooth" // Smooth scroll
    });
});

const forceCloseNavbar = function() {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");

    setTimeout(() => {
        navbar.classList.add("active");
    }, 50); // Small delay to force reflow, adjust as needed
};

addEventOnElements(navLinks, "click", function(event) {
    event.preventDefault(); // Prevent the default jump-to behavior

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    // Use forceCloseNavbar specifically for #home and #about
    if (targetId === "home" || targetId === "about") {
        forceCloseNavbar();
    } else {
        closeNavbar(); // Default behavior for other sections
    }

    // Adjust scroll position
    window.scrollTo({
        top: targetElement.offsetTop - header.offsetHeight, // Adjust for the header height
        behavior: "smooth" // Smooth scroll
    });
});