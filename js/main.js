/**
 * Portfolio interactions — Ejike Okoye
 */

(function () {
  "use strict";

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const navMobile = document.querySelector(".nav-mobile");
  const navOverlay = document.querySelector(".nav-overlay");
  const navLinks = document.querySelectorAll(".nav-panel a, .nav-desktop a");

  function closeMenu() {
    if (!menuToggle || !navMobile) return;
    menuToggle.setAttribute("aria-expanded", "false");
    navMobile.classList.remove("open");
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (!menuToggle || !navMobile) return;
    menuToggle.setAttribute("aria-expanded", "true");
    navMobile.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  navOverlay?.addEventListener("click", closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const sections = document.querySelectorAll("section[id]");
  const navDesktopLinks = document.querySelectorAll(".nav-desktop a");

  function setActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute("id") || "";
      }
    });

    navDesktopLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  const fadeEls = document.querySelectorAll(".fade-in");
  if (fadeEls.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    fadeEls.forEach((el) => observer.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add("visible"));
  }

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    const submitBtn = contactForm.querySelector(".contact-form-submit");
    const statusEl = document.querySelector(".contact-form-status");
    const defaultBtnText = submitBtn ? submitBtn.textContent.trim() : "Send Message";

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!submitBtn) return;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      if (statusEl) {
        statusEl.hidden = true;
        statusEl.textContent = "";
        statusEl.classList.remove("is-success", "is-error");
      }

      try {
        const data = new FormData(contactForm);
        const res = await fetch("https://formspree.io/f/xbgrbqjp", {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          throw new Error("Request failed");
        }

        contactForm.reset();
        contactForm.hidden = true;

        if (statusEl) {
          statusEl.textContent = "Thank you! Your message has been sent successfully.";
          statusEl.classList.add("is-success");
          statusEl.hidden = false;
        }
      } catch (err) {
        if (statusEl) {
          statusEl.textContent =
            "Something went wrong. Please try again or email me directly at okoye.ejike@gmail.com.";
          statusEl.classList.add("is-error");
          statusEl.hidden = false;
        }

        submitBtn.textContent = defaultBtnText;
        submitBtn.disabled = false;
      }
    });
  }
})();
