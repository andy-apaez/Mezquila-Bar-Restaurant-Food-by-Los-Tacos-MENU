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

if (menuTrigger && menuOverlay) {
  menuTrigger.addEventListener("click", () => toggleMenu(true));
}

if (menuClose) {
  menuClose.addEventListener("click", () => toggleMenu(false));
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
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleMenu(false);
  }
});

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
