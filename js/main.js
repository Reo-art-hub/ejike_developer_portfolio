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
  const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
  const statusMsg = document.getElementById("form-status") || document.querySelector(".form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!submitBtn) return;

      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = "Sending...";
      submitBtn.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          contactForm.reset();
          submitBtn.innerText = "Message Sent! ✓";
          submitBtn.style.backgroundColor = "#22c55e";
          if (statusMsg) {
            statusMsg.innerText = "Thank you! Your message has been sent successfully.";
            statusMsg.style.color = "#22c55e";
            statusMsg.style.display = "block";
          }
          setTimeout(() => {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = "";
          }, 4000);
        } else {
          throw new Error("Form response not OK");
        }
      } catch (err) {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
        if (statusMsg) {
          statusMsg.innerText =
            "Oops! Something went wrong. Please email okoye.ejike@gmail.com directly.";
          statusMsg.style.color = "#ef4444";
          statusMsg.style.display = "block";
        }
      }
    });
  }
})();
