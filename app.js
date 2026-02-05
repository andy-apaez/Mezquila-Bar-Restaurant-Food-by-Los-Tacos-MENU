const itemGroups = document.querySelectorAll(".menu-grid");

itemGroups.forEach((grid) => {
  const items = grid.querySelectorAll(".menu-item");
  items.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--delay", `${index * 50}ms`);
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
  menuTrigger.addEventListener("pointerup", (event) => {
    event.preventDefault();
    toggleMenu(true);
  });
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

const spanishTranslations = {
  "Guajillo-marinated pork with grilled pineapple and avocado salsa.": "Cerdo marinado en guajillo con piña asada y salsa de aguacate.",
  "Dry chile marinated steak with salsa roja.": "Bistec marinado con chile seco y salsa roja.",
  "Ancho chile marinated chicken with salsa verde.": "Pollo marinado en chile ancho con salsa verde.",
  "Mexican chorizo with crispy pork skin, black beans, salsa verde.": "Chorizo mexicano con chicharrón crujiente, frijoles negros y salsa verde.",
  "Slow braised pork with salsa roja.": "Cerdo braseado lentamente con salsa roja.",
  "Slow-cooked beef brisket with salsa picante.": "Brisket de res cocido lentamente con salsa picante.",
  "Sauteed mushrooms with onions, jalapeños, salsa verde.": "Champiñones salteados con cebolla, jalapeños y salsa verde.",
  "Achiote mushrooms with grilled pineapple, avocado salsa.": "Champiñones en achiote con piña asada y salsa de aguacate.",
  "Slow braised beef tongue with salsa roja.": "Lengua de res braseada lentamente con salsa roja.",
  "Thin sliced pork on flour tortilla with sour cream, lime onions, salsa picante.": "Cerdo en rebanadas finas en tortilla de harina con crema, cebollas al limón y salsa picante.",
  "Corn tortilla tacos topped with onion, cilantro, and salsa verde.": "Tacos en tortilla de maíz con cebolla, cilantro y salsa verde.",
  "10\" flour tortilla with melted mozzarella and birria.": "Tortilla de harina de 10\" con mozzarella derretida y birria.",
  "Toasted Portuguese roll, Oaxaca cheese, onions, cilantro.": "Bolillo portugués tostado con queso Oaxaca, cebolla y cilantro.",
  "Birria, black beans, rice, Oaxaca cheese, onions, cilantro.": "Birria, frijoles negros, arroz, queso Oaxaca, cebolla y cilantro.",
  "Raw shrimp in spicy lime juice, serranos, cucumber, cilantro.": "Camarón crudo en jugo de limón picante, serranos, pepino y cilantro.",
  "Raw shrimp in spicy lime juice, cucumber, chile chiltepin.": "Camarón crudo en jugo de limón picante, pepino y chile chiltepín.",
  "Raw shrimp in spicy lime juice, tomatillo, chile chiltepin.": "Camarón crudo en jugo de limón picante, tomatillo y chile chiltepín.",
  "Mahi-mahi in lime juice, serrano, cucumber, red onion, salsa macha.": "Mahi-mahi en jugo de limón, serrano, pepino, cebolla morada y salsa macha.",
  "Crispy shrimp with chipotle mayo, cilantro, sliced carrots.": "Camarón crujiente con mayonesa de chipotle, cilantro y zanahorias en láminas.",
  "Crispy fish with chipotle mayo, sliced carrots, salsa.": "Pescado crujiente con mayonesa de chipotle, zanahorias en láminas y salsa.",
  "Traditional homemade style with cilantro, onions, tomatoes, jalapeños.": "Estilo casero tradicional con cilantro, cebolla, tomate y jalapeños.",
  "Topped with sour cream, cotija, salsa verde, salsa roja.": "Coronadas con crema, cotija, salsa verde y salsa roja.",
  "With grilled chicken, tortilla strips, Oaxaca cheese, guajillo chiles.": "Con pollo a la parrilla, tiras de tortilla, queso Oaxaca y chiles guajillo.",
  "Oaxaca & Chihuahua cheeses with chorizo and tomatillo serrano salsa.": "Quesos Oaxaca y Chihuahua con chorizo y salsa de tomatillo serrano.",
  "10\" flour tortilla with Chihuahua cheese + choice of filling.": "Tortilla de harina de 10\" con queso Chihuahua y elección de relleno.",
  "Layered chips with protein, black beans, Chihuahua cheese, pico de gallo.": "Totopos en capas con proteína, frijoles negros, queso Chihuahua y pico de gallo.",
  "Grilled shrimp filled tortillas, creamy tomatillo sauce, mozzarella, Oaxaca.": "Tortillas rellenas de camarón a la parrilla, salsa cremosa de tomatillo, mozzarella y Oaxaca.",
  "Chicken, salsa ranchera, lettuce, crema, cotija, cilantro.": "Pollo, salsa ranchera, lechuga, crema, cotija y cilantro.",
  "Chicken, mole poblano, crema, cotija, sesame seeds.": "Pollo, mole poblano, crema, cotija y semillas de sésamo.",
  "Zucchini, eggplant, peppers, salsa verde, crema, radishes.": "Calabacín, berenjena, pimientos, salsa verde, crema y rábanos.",
  "Steak and jumbo shrimp with jalapeños, tomatoes, onions, queso.": "Bistec y camarones jumbo con jalapeños, tomates, cebolla y queso."
};

const langToggle = document.querySelector(".lang-toggle");
const langToggleState = document.querySelector(".lang-toggle__state");
const heroMenuTitle = document.querySelector(".menu-title");
const heroSubhead = document.querySelector(".subhead");
const heroEyebrow = document.querySelector(".eyebrow");
const menuDescriptions = document.querySelectorAll(".menu-item p");

const toggleSpanish = (isSpanish) => {
  menuDescriptions.forEach((item) => {
    const trimmed = item.textContent.trim();
    if (!item.dataset.en) {
      item.dataset.en = trimmed;
    }
    const englishText = item.dataset.en;
    const spanishText = spanishTranslations[englishText];
    if (isSpanish && spanishText) {
      item.textContent = spanishText;
    } else {
      item.textContent = englishText;
    }
  });

  if (heroMenuTitle) {
    if (!heroMenuTitle.dataset.enHtml) {
      heroMenuTitle.dataset.enHtml = heroMenuTitle.innerHTML.trim();
    }
    if (!heroMenuTitle.dataset.esHtml) {
      heroMenuTitle.dataset.esHtml = "Comida <span>Menú</span>";
    }
    heroMenuTitle.innerHTML = isSpanish ? heroMenuTitle.dataset.esHtml : heroMenuTitle.dataset.enHtml;
  }

  if (heroSubhead) {
    if (!heroSubhead.dataset.en) {
      heroSubhead.dataset.en = heroSubhead.textContent.trim();
    }
    if (!heroSubhead.dataset.es) {
      heroSubhead.dataset.es = "Tortillas hechas a mano, carnes braseadas lentamente y mariscos del litoral.";
    }
    heroSubhead.textContent = isSpanish ? heroSubhead.dataset.es : heroSubhead.dataset.en;
  }

  if (heroEyebrow) {
    if (!heroEyebrow.dataset.enHtml) {
      heroEyebrow.dataset.enHtml = heroEyebrow.innerHTML.trim();
    }
    if (!heroEyebrow.dataset.esHtml) {
      heroEyebrow.dataset.esHtml = "Comida de Los Tacos · IG: <a href=\"https://www.instagram.com/lostacosbk/\">@lostacosbk</a>";
    }
    heroEyebrow.innerHTML = isSpanish ? heroEyebrow.dataset.esHtml : heroEyebrow.dataset.enHtml;
  }
};

const translateTextNodes = (elements, map) => {
  elements.forEach((el) => {
    const trimmed = el.textContent.trim();
    if (!el.dataset.en) {
      el.dataset.en = trimmed;
    }
    const englishText = el.dataset.en;
    const spanishText = map[englishText];
    if (spanishText) {
      el.textContent = document.body.classList.contains("lang-es") ? spanishText : englishText;
    }
  });
};

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const isSpanish = !document.body.classList.contains("lang-es");
    document.body.classList.toggle("lang-es", isSpanish);
    langToggle.setAttribute("aria-pressed", isSpanish ? "true" : "false");
    if (langToggleState) {
      langToggleState.textContent = isSpanish ? "On" : "Off";
    }
    toggleSpanish(isSpanish);

    translateTextNodes(document.querySelectorAll(".menu-jump__text"), {
      Menu: "Menú"
    });
    translateTextNodes(document.querySelectorAll(".scroll-cue span:first-child"), {
      "Scroll to explore the menu": "Desplázate para explorar el menú"
    });
    translateTextNodes(document.querySelectorAll(".hero__chips span"), {
      "Handmade tortillas": "Tortillas hechas a mano",
      "Slow-braised meats": "Carnes braseadas lentamente",
      "Coastal mariscos": "Mariscos del litoral"
    });
    translateTextNodes(document.querySelectorAll(".menu-block__header p"), {
      "100% corn nixtamal tortillas with fresh onions, cilantro, and salsa on the side.": "Tortillas de maíz nixtamalizado 100% con cebolla fresca, cilantro y salsa al lado.",
      "Slow-braised guajillo birria, served with salsa verde on the side.": "Birria de guajillo braseada lentamente, servida con salsa verde al lado.",
      "Coastal flavors with bright lime, serrano, and cilantro.": "Sabores costeros con limón fresco, serrano y cilantro.",
      "Perfect to share while the mezcal pours.": "Perfecto para compartir mientras corre el mezcal.",
      "Served with a side of house rice and beans.": "Servido con arroz y frijoles de la casa.",
      "Sauteed bell peppers and onions, served with flour tortillas, rice, beans.": "Pimientos y cebolla salteados, servidos con tortillas de harina, arroz y frijoles.",
      "Rice, beans, romaine lettuce, pico de gallo, salsa, crema, cotija.": "Arroz, frijoles, lechuga romana, pico de gallo, salsa, crema y cotija.",
      "Toasted Portuguese roll with chipotle mayo, black beans, avocado, Chihuahua cheese.": "Pan portugués tostado con mayonesa de chipotle, frijoles negros, aguacate y queso Chihuahua.",
      "Little extras to round out the table.": "Pequeños extras para completar la mesa.",
      "Sweet finishes straight from the kitchen.": "Finales dulces directos de la cocina.",
      "Follow along or reach us directly.": "Síguenos o contáctanos directamente."
    });
    translateTextNodes(document.querySelectorAll(".menu-footnote"), {
      "Quesadilla fillings: chicharrón, hongos, steak, pollo. Nacho proteins: steak, hongos, chorizo, pollo.": "Rellenos de quesadilla: chicharrón, hongos, bistec, pollo. Proteínas para nachos: bistec, hongos, chorizo, pollo."
    });
    translateTextNodes(document.querySelectorAll(".contact-label"), {
      Instagram: "Instagram",
      Address: "Dirección",
      Phone: "Teléfono"
    });
    translateTextNodes(document.querySelectorAll(".contact-value"), {
      "Add address": "Agregar dirección",
      "Add phone": "Agregar teléfono"
    });
    translateTextNodes(document.querySelectorAll(".menu-overlay__header h2"), {
      "Choose a category": "Elige una categoría"
    });
    translateTextNodes(document.querySelectorAll(".menu-overlay__close"), {
      Close: "Cerrar"
    });
    translateTextNodes(document.querySelectorAll(".footer p"), {
      "Menu visuals sourced from house menu photography. Prices and items subject to change.": "Imágenes del menú tomadas de la fotografía del restaurante. Precios y artículos sujetos a cambios."
    });
  });
}

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

const palettes = [
  {
    name: "Candlelit Taqueria",
    vars: {
      "--cream": "#D9C3A1",
      "--sand": "#B68D40",
      "--clay": "#5A3324",
      "--ink": "#120D0A",
      "--espresso": "#120D0A",
      "--charcoal": "#120D0A",
      "--chili": "#8B4A2B",
      "--amber": "#B68D40",
      "--avocado": "#5A3324",
      "--paper": "#F5EFE6",
      "--card": "#F5EFE6",
      "--card-alt": "#D9C3A1",
      "--muted": "rgba(245, 239, 230, 0.72)",
      "--smoke": "rgba(18, 13, 10, 0.35)",
      "--bg-top": "rgba(18, 13, 10, 0.92)",
      "--bg-mid": "rgba(18, 13, 10, 0.95)",
      "--bg-deep": "rgba(18, 13, 10, 0.98)",
      "--hero-paper-1": "rgba(245, 239, 230, 0.78)",
      "--hero-paper-2": "rgba(217, 195, 161, 0.72)",
      "--hero-paper-3": "rgba(182, 141, 64, 0.62)",
      "--hero-paper-solid": "rgba(245, 239, 230, 0.92)",
      "--topbar-bg": "rgba(18, 13, 10, 0.55)",
      "--topbar-border": "rgba(182, 141, 64, 0.3)",
      "--menu-item-bg": "#D9C3A1",
      "--menu-item-border": "rgba(182, 141, 64, 0.45)",
      "--menu-block-bg": "#2E1F18",
      "--menu-block-alt": "#5A3324",
      "--menu-block-border": "rgba(139, 74, 43, 0.55)",
      "--menu-block-shadow": "0 16px 34px rgba(18, 13, 10, 0.28)",
      "--stripe-warm": "rgba(139, 74, 43, 0.08)",
      "--stripe-cool": "rgba(182, 141, 64, 0.08)",
      "--section-hero-bg": "#5A3324",
      "--section-hero-overlay": "rgba(18, 13, 10, 0.25)",
      "--section-hero-glow": "rgba(245, 239, 230, 0.25)",
      "--photo-placeholder-grad-1": "rgba(139, 74, 43, 0.1)",
      "--photo-placeholder-grad-2": "rgba(182, 141, 64, 0.18)",
      "--photo-placeholder-border": "rgba(182, 141, 64, 0.6)",
      "--footer-text": "rgba(245, 239, 230, 0.7)"
    }
  }
];

const applyPalette = (index) => {
  const palette = palettes[index];
  if (!palette) return;
  Object.entries(palette.vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
  const creamText = "#F3E9D2";
  const creamMuted = "rgba(243, 233, 210, 0.72)";
  document.documentElement.style.setProperty("--ink", creamText);
  document.documentElement.style.setProperty("--paper", creamText);
  document.documentElement.style.setProperty("--muted", creamMuted);
};

applyPalette(0);
