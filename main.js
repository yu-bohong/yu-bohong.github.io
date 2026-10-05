"use strict";

document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const mobileQuery = window.matchMedia("(max-width: 760px)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

function closeMenu(restoreFocus = false) {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "打开导航菜单");
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "关闭导航菜单" : "打开导航菜单");
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) closeMenu();
});
header.addEventListener("focusout", (event) => {
  if (!header.contains(event.relatedTarget)) closeMenu();
});
mobileQuery.addEventListener("change", () => closeMenu());

const revealElements = [...document.querySelectorAll(".reveal")];
let revealObserver;

function configureReveals() {
  revealObserver?.disconnect();
  if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08 });
  for (const element of revealElements) {
    // Keep content visible when opening a section anchor directly.
    if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add("is-visible");
    else if (!element.classList.contains("is-visible")) {
      element.classList.add("will-reveal");
      revealObserver.observe(element);
    }
  }
}
configureReveals();

const hero = document.querySelector(".hero");
const heroArt = document.querySelector(".hero-art");
const heroDepth = document.querySelector(".hero-depth");
const motionButton = document.querySelector(".motion-toggle");
let manuallyPaused = false;
let heroVisible = true;
let frameId = 0;
const target = { x: 0, y: 0, scroll: 0 };
const current = { x: 0, y: 0, scroll: 0 };

function motionEnabled() {
  return !reducedMotionQuery.matches && !manuallyPaused && !document.hidden;
}

function updateDepth() {
  frameId = 0;
  if (!motionEnabled() || !heroVisible) return;
  let distance = 0;
  for (const key of Object.keys(current)) {
    current[key] += (target[key] - current[key]) * 0.09;
    distance += Math.abs(target[key] - current[key]);
  }
  heroDepth.style.setProperty("--pointer-x", `${current.x.toFixed(2)}px`);
  heroDepth.style.setProperty("--pointer-y", `${current.y.toFixed(2)}px`);
  heroDepth.style.setProperty("--scroll-y", `${current.scroll.toFixed(2)}px`);
  if (distance > 0.05) frameId = requestAnimationFrame(updateDepth);
}

function requestDepthUpdate() {
  if (!frameId && motionEnabled() && heroVisible) frameId = requestAnimationFrame(updateDepth);
}

function resetDepth() {
  cancelAnimationFrame(frameId);
  frameId = 0;
  for (const key of Object.keys(current)) current[key] = target[key] = 0;
  heroDepth.style.removeProperty("--pointer-x");
  heroDepth.style.removeProperty("--pointer-y");
  heroDepth.style.removeProperty("--scroll-y");
}

function configureMotion() {
  const reduced = reducedMotionQuery.matches;
  document.documentElement.classList.toggle("motion-paused", reduced || manuallyPaused || !heroVisible || document.hidden);
  motionButton.hidden = reduced;
  motionButton.setAttribute("aria-pressed", String(manuallyPaused));
  motionButton.setAttribute("aria-label", manuallyPaused ? "恢复动态，启用人物浮动与视差" : "暂停动态，停止人物浮动与视差");
  motionButton.querySelector("span").textContent = manuallyPaused ? "恢复动态" : "暂停动态";
  if (!motionEnabled() || !heroVisible) resetDepth();
}

heroArt.addEventListener("pointermove", (event) => {
  if (!finePointerQuery.matches || !motionEnabled()) return;
  const bounds = heroArt.getBoundingClientRect();
  target.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
  target.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
  requestDepthUpdate();
}, { passive: true });
heroArt.addEventListener("pointerleave", () => {
  target.x = target.y = 0;
  requestDepthUpdate();
});
motionButton.addEventListener("click", () => {
  manuallyPaused = !manuallyPaused;
  configureMotion();
});

function onScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
  if (finePointerQuery.matches && motionEnabled() && heroVisible) {
    target.scroll = Math.min(window.scrollY / hero.offsetHeight, 1) * 16;
    requestDepthUpdate();
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
if ("IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    configureMotion();
  }).observe(hero);
}
reducedMotionQuery.addEventListener("change", () => {
  configureReveals();
  configureMotion();
});
finePointerQuery.addEventListener("change", resetDepth);
document.addEventListener("visibilitychange", configureMotion);
configureMotion();
onScroll();
