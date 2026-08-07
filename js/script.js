document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var full = item.getAttribute('data-full');
        var img = item.querySelector('img');
        lightboxImg.src = full;
        lightboxImg.alt = img ? img.alt : '';
        lightbox.classList.add('open');
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightboxImg.src = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  initMenuTabs();
  initScrollSpy();
});

function initMenuTabs() {
  var grid = document.getElementById('menu-grid');
  var tabs = document.querySelectorAll('.menu-tab');
  if (!grid || !tabs.length) return;

  var panels = grid.querySelectorAll('.menu-card');
  grid.classList.add('js-tabs-enabled');

  function activate(index) {
    tabs.forEach(function (tab, i) {
      tab.classList.toggle('active', i === index);
    });
    panels.forEach(function (panel, i) {
      panel.classList.toggle('active', i === index);
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { activate(i); });
  });

  activate(0);
}

function initScrollSpy() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

  var linkFor = {};
  navLinks.forEach(function (link) {
    linkFor[link.getAttribute('href').slice(1)] = link;
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var link = linkFor[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
}

