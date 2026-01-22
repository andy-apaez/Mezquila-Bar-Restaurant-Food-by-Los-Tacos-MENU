const itemGroups = document.querySelectorAll(".menu-grid");

itemGroups.forEach((grid) => {
  const items = grid.querySelectorAll(".menu-item");
  items.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--delay", `${index * 80}ms`);
  });
});

const revealTargets = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealTargets.forEach((target) => {
  const delay = target.dataset.delay ? `${target.dataset.delay}ms` : "0ms";
  target.style.setProperty("--delay", delay);
  observer.observe(target);
});

const menuTrigger = document.querySelector(".menu-jump__trigger");
const menuOverlay = document.querySelector(".menu-overlay");
const menuClose = document.querySelector(".menu-overlay__close");
const menuButtons = document.querySelectorAll(".menu-overlay__list button");

const toggleMenu = (isOpen) => {
  if (!menuOverlay) return;
  menuOverlay.classList.toggle("is-open", isOpen);
  menuOverlay.setAttribute("aria-hidden", isOpen ? "false" : "true");
  document.body.classList.toggle("menu-open", isOpen);
};

const handleHaptics = () => {
  if (navigator.vibrate) {
    navigator.vibrate(10);
  }
};

if (menuTrigger && menuOverlay) {
  menuTrigger.addEventListener("click", () => toggleMenu(true));
  menuTrigger.addEventListener("pointerdown", handleHaptics);
}

if (menuClose) {
  menuClose.addEventListener("click", () => toggleMenu(false));
  menuClose.addEventListener("pointerdown", handleHaptics);
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", (event) => {
    if (event.target === menuOverlay) {
      toggleMenu(false);
    }
  });
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.target);
    toggleMenu(false);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  button.addEventListener("pointerdown", handleHaptics);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleMenu(false);
  }
});

const stickyNav = document.querySelector(".sticky-nav");
const menuJump = document.querySelector(".menu-jump");
const stickyButtons = document.querySelectorAll(".sticky-nav button");
let lastScrollY = window.scrollY;
let isTicking = false;

const handleStickyScroll = () => {
  const currentY = window.scrollY;
  const shouldHide = currentY > lastScrollY && currentY > 120;
  if (stickyNav) {
    stickyNav.classList.toggle("is-hidden", shouldHide);
  }
  if (menuJump) {
    menuJump.classList.toggle("is-hidden", shouldHide);
  }
  lastScrollY = currentY;
  isTicking = false;
};

window.addEventListener("scroll", () => {
  if (!isTicking) {
    window.requestAnimationFrame(handleStickyScroll);
    isTicking = true;
  }
});

stickyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  button.addEventListener("pointerdown", handleHaptics);
});

document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("pointerdown", handleHaptics);
});

const priceElements = document.querySelectorAll(".menu-item span, .menu-block__header h2 span");
const updatePriceFormatting = () => {
  const hideDollar = window.matchMedia("(max-width: 720px)").matches;
  priceElements.forEach((el) => {
    if (!el.textContent.includes("$")) return;
    if (!el.dataset.originalPrice) {
      el.dataset.originalPrice = el.textContent;
    }
    el.textContent = hideDollar ? el.dataset.originalPrice.replace("$", "") : el.dataset.originalPrice;
  });
};

updatePriceFormatting();
window.addEventListener("resize", updatePriceFormatting);

const qrInput = document.querySelector("#qr-input");
const qrButton = document.querySelector("#qr-generate");
const qrImage = document.querySelector("#qr-image");
const qrPreview = document.querySelector(".qr-preview");

const updateQr = () => {
  if (!qrInput || !qrImage || !qrPreview) return;
  const value = qrInput.value.trim();
  if (!value) {
    qrImage.removeAttribute("src");
    qrPreview.classList.remove("has-code");
    return;
  }
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(value)}`;
  qrImage.src = qrUrl;
  qrPreview.classList.add("has-code");
};

if (qrButton) {
  qrButton.addEventListener("click", updateQr);
}

if (qrInput) {
  qrInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      updateQr();
    }
  });
}
