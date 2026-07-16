document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav open/close
  var toggle = document.querySelector("[data-nav-toggle]");
  var closeBtn = document.querySelector("[data-nav-close]");
  var backdrop = document.querySelector("[data-nav-backdrop]");
  var mobileNav = document.querySelector("[data-mobile-nav]");

  function openNav() {
    if (!mobileNav) return;
    mobileNav.setAttribute("data-open", "true");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.setAttribute("data-open", "false");
    document.body.style.overflow = "";
  }
  if (toggle) toggle.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
  if (backdrop) backdrop.addEventListener("click", closeNav);
  document.querySelectorAll("[data-mobile-nav] a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });

  // Header floats transparent over the hero image, then solidifies once the
  // user scrolls away from the very top of the page.
  var header = document.querySelector(".site-header");
  if (header) {
    var updateHeaderSolidity = function () {
      header.setAttribute("data-solid", window.scrollY > 24 ? "true" : "false");
    };
    updateHeaderSolidity();
    window.addEventListener("scroll", updateHeaderSolidity, { passive: true });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Live "open now" status, derived from the hours posted on the Find Us page.
  // Sun=0 ... Sat=6, values are [openHour, closeHour] in 24h decimal.
  var HOURS = { 0: [11.5, 20], 1: [11.5, 21], 2: [11.5, 21], 3: [11.5, 21], 4: [11.5, 22], 5: [11.5, 22], 6: [11.5, 22] };
  function formatHour(h) {
    var whole = Math.floor(h);
    var minutes = Math.round((h - whole) * 60);
    var period = whole >= 12 ? "pm" : "am";
    var hour12 = whole % 12 === 0 ? 12 : whole % 12;
    return minutes ? hour12 + ":" + (minutes < 10 ? "0" : "") + minutes + period : hour12 + period;
  }
  document.querySelectorAll("[data-open-status]").forEach(function (el) {
    var now = new Date();
    var range = HOURS[now.getDay()];
    var hourNow = now.getHours() + now.getMinutes() / 60;
    var isOpen = hourNow >= range[0] && hourNow < range[1];
    el.textContent = isOpen
      ? "Open now · kitchen closes " + formatHour(range[1])
      : "Closed now · opens " + formatHour(range[0]);
    el.setAttribute("data-live", isOpen ? "true" : "false");
  });

  // Forms without a backend: compile fields into a mailto: link on submit.
  document.querySelectorAll("[data-mailto-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var to = form.getAttribute("data-mailto-to");
      var subject = form.getAttribute("data-mailto-subject") || "Website inquiry";
      var lines = [];
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || !el.value) return;
        lines.push(el.previousElementSibling && el.previousElementSibling.tagName === "LABEL"
          ? el.previousElementSibling.textContent + ": " + el.value
          : el.name + ": " + el.value);
      });
      var body = encodeURIComponent(lines.join("\n"));
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + body;
    });
  });
});
