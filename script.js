// UNCLE MERCY — mobile menu, scroll effects, gallery lightbox
(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close the menu after tapping a link
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close the menu with the Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
})();

// Header shadow once the page is scrolled
(function () {
  var header = document.querySelector(".site-header");
  if (!header) return;

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// Scroll-reveal: fade blocks in as they enter the viewport.
// Without JS (or with reduced motion) everything stays fully visible.
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var selectors = [
    ".section-head",
    ".split",
    ".trio > div",
    ".event-card",
    ".gallery-grid figure",
    ".chips",
    ".video-frame",
    ".contact-actions",
    ".pull-quote",
    ".stats",
    ".songlist",
    ".provide-card",
    ".tally-embed-wrap",
    ".social-row",
    ".cta-final .btn-row"
  ];

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(selectors.join(",")).forEach(function (el) {
    el.classList.add("reveal");
    observer.observe(el);
  });
})();

// Gallery lightbox: click a photo to view it large
(function () {
  var figures = document.querySelectorAll(".gallery-grid figure");
  if (!figures.length) return;

  var lightbox = null;

  function close() {
    if (lightbox) {
      lightbox.remove();
      lightbox = null;
      document.removeEventListener("keydown", onKey);
    }
  }

  function onKey(e) {
    if (e.key === "Escape") close();
  }

  function open(img, caption) {
    close();
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", caption || "Photo");

    var full = document.createElement("img");
    full.src = img.src;
    full.alt = img.alt;
    lightbox.appendChild(full);

    if (caption) {
      var cap = document.createElement("figcaption");
      cap.textContent = caption;
      lightbox.appendChild(cap);
    }

    var btn = document.createElement("button");
    btn.className = "lightbox-close";
    btn.setAttribute("aria-label", "Close photo");
    btn.textContent = "×";
    btn.addEventListener("click", close);
    lightbox.appendChild(btn);

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });

    document.body.appendChild(lightbox);
    document.addEventListener("keydown", onKey);
    btn.focus();
  }

  figures.forEach(function (fig) {
    var img = fig.querySelector("img");
    var cap = fig.querySelector("figcaption");
    if (!img) return;
    img.addEventListener("click", function () {
      open(img, cap ? cap.textContent : "");
    });
  });
})();
