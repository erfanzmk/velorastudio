/* =====================================================
   VELLORA WEDDING STUDIO
   MAIN JAVASCRIPT
===================================================== */


/* ================= PRELOADER ================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const preloader = document.getElementById("preloader");

        if (preloader) {
            preloader.classList.add("hide");
        }

    }, 900);

});


/* ================= HEADER ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

});


document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


/* ================= LIGHTBOX ================= */

const portfolioItems =
    document.querySelectorAll(".portfolio-item");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeButton =
    document.getElementById("lightboxClose");

const prevButton =
    document.getElementById("galleryPrev");

const nextButton =
    document.getElementById("galleryNext");

const counter =
    document.getElementById("galleryCounter");


let currentIndex = 0;

const galleryImages = [];


/* Collect images */

portfolioItems.forEach((item, index) => {

    const image = item.querySelector("img");

    if (!image) return;

    galleryImages.push(image.src);

    item.addEventListener("click", () => {

        currentIndex = index;

        openLightbox();

    });

});


/* Open */

function openLightbox() {

    lightbox.classList.add("active");

    document.body.classList.add("no-scroll");

    updateGallery();

}


/* Close */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


/* Update */

function updateGallery() {

    lightboxImage.src =
        galleryImages[currentIndex];

    counter.textContent =
        String(currentIndex + 1).padStart(2, "0")
        +
        " / "
        +
        String(galleryImages.length).padStart(2, "0");

}


/* Next */

function nextImage() {

    currentIndex++;

    if (currentIndex >= galleryImages.length) {
        currentIndex = 0;
    }

    updateGallery();

}


/* Previous */

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = galleryImages.length - 1;
    }

    updateGallery();

}


/* Buttons */

nextButton.addEventListener(
    "click",
    nextImage
);

prevButton.addEventListener(
    "click",
    previousImage
);

closeButton.addEventListener(
    "click",
    closeLightbox
);


/* Click outside image */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* Keyboard */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        previousImage();
    }

    if (event.key === "ArrowLeft") {
        nextImage();
    }

});


/* ================= TOUCH SWIPE ================= */

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", (event) => {

    touchStartX =
        event.changedTouches[0].screenX;

});


lightbox.addEventListener("touchend", (event) => {

    touchEndX =
        event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const distance =
        touchEndX - touchStartX;

    if (Math.abs(distance) < 50) {
        return;
    }

    if (distance > 0) {
        previousImage();
    } else {
        nextImage();
    }

}


/* ================= IMAGE LAZY LOAD ================= */

document.querySelectorAll("img").forEach(img => {

    if (!img.hasAttribute("loading")) {
        img.setAttribute("loading", "lazy");
    }

});


/* ================= SMOOTH BUTTON EFFECT ================= */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mousedown", () => {

        button.style.transform = "scale(.97)";

    });

    button.addEventListener("mouseup", () => {

        button.style.transform = "";

    });

});


/* ================= CONSOLE ================= */

console.log(
    "VELLORA Wedding Studio — Website Loaded."
);
/* ================= PROFESSIONAL SCROLL ANIMATION ================= */

document.addEventListener("DOMContentLoaded", () => {

  // متن‌ها و المان‌های معمولی
  const revealElements = document.querySelectorAll(
    "section h1, section h2, section h3, section p, section .btn, section .service-card, section .package-card"
  );

  revealElements.forEach((el, index) => {
    el.classList.add("reveal");

    // ایجاد تأخیر خیلی ظریف
    const delay = index % 4;
    if (delay > 0) {
      el.classList.add(`reveal-delay-${delay}`);
    }
  });

  // تصاویر
  const images = document.querySelectorAll(
    "section img, .portfolio-item, .album-card"
  );

  images.forEach(el => {
    el.classList.add("reveal-image");
  });

  // تشخیص ورود و خروج عناصر از صفحه
  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          // وقتی وارد صفحه می‌شود
          entry.target.classList.add("show");
          entry.target.classList.remove("hide-up");

        } else {

          // وقتی از صفحه خارج می‌شود
          const rect = entry.target.getBoundingClientRect();

          if (rect.top < 0) {
            // از بالا خارج شده
            entry.target.classList.remove("show");
            entry.target.classList.add("hide-up");
          } else {
            // پایین صفحه قرار گرفته
            entry.target.classList.remove("show");
            entry.target.classList.remove("hide-up");
          }

        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "-50px 0px -80px 0px"
    }
  );

  revealElements.forEach(el => observer.observe(el));
  images.forEach(el => observer.observe(el));

});
