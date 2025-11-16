// -----------------------------
// PROTECTION GALERIE & FANCYBOX
// -----------------------------

// Protection des miniatures dans la galerie
document.querySelectorAll('.gallery .img-wrapper').forEach(wrapper => {
  const link = wrapper.querySelector('a');
  const img = wrapper.querySelector('img');
  if (!img || !link) return;

  img.addEventListener('contextmenu', e => e.preventDefault());
  img.addEventListener('dragstart', e => e.preventDefault());

  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'transparent';
  overlay.style.zIndex = 10;
  overlay.style.cursor = 'pointer';

  // clic = ouverture Fancybox
  overlay.addEventListener('click', () => link.click());
  overlay.addEventListener('contextmenu', e => e.preventDefault());

  // zoom au hover
  overlay.addEventListener('mouseover', () => {
    img.style.transform = 'scale(1.03)';
    img.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
  });
  overlay.addEventListener('mouseout', () => {
    img.style.transform = '';
    img.style.boxShadow = '';
  });

  // blocage appui long sur mobile
  let pressTimer;
  const start = ev => { pressTimer = setTimeout(() => ev.preventDefault(), 600); };
  const cancel = () => { clearTimeout(pressTimer); };
  overlay.addEventListener('touchstart', start, { passive: false });
  overlay.addEventListener('touchend', cancel);
  overlay.addEventListener('touchmove', cancel);

  if (getComputedStyle(wrapper).position === 'static') wrapper.style.position = 'relative';
  wrapper.appendChild(overlay);
});

// Initialisation Fancybox avec protection sur toutes les slides
Fancybox.bind("[data-fancybox='gallery-animaux']", {
  Toolbar: { display: ["close"] },
  Thumbs: false,
  dragToClose: true,
  animated: true,
  caption: (f, c, s) => s.caption,
  hideScrollbar: false,
  on: {
    ready: fancybox => protectSlide(fancybox),
    done: fancybox => protectSlide(fancybox)
  }
});

// Fonction de protection des images dans Fancybox
function protectSlide(fancybox) {
  const applyProtection = () => {
    const slide = fancybox.Carousel.slides[fancybox.Carousel.page];
    if (!slide) return;

    const img = slide.$el.querySelector('img');
    if (!img) return;

    // supprimer overlay précédent
    const existing = slide.$el.querySelector('.__fancybox-protect-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = '__fancybox-protect-overlay';
    Object.assign(overlay.style, {
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '100%', background: 'transparent', zIndex: 20
    });

    overlay.addEventListener('contextmenu', e => e.preventDefault());
    overlay.addEventListener('dragstart', e => e.preventDefault());

    let pressTimer;
    const start = ev => { pressTimer = setTimeout(() => ev.preventDefault(), 600); };
    const cancel = () => { clearTimeout(pressTimer); };
    overlay.addEventListener('touchstart', start, { passive: false });
    overlay.addEventListener('touchend', cancel);
    overlay.addEventListener('touchmove', cancel);

    if (getComputedStyle(img.parentNode).position === 'static') img.parentNode.style.position = 'relative';
    img.parentNode.appendChild(overlay);
  };

  applyProtection();
  if (fancybox.Carousel && fancybox.Carousel.on) {
    fancybox.Carousel.on('change', applyProtection);
  }
}

// -----------------------------
// MENU MOBILE
// -----------------------------
const galerie = document.querySelector('.no-click');
const submenu = galerie.nextElementSibling;
galerie.addEventListener('click', e => {
  e.stopPropagation();
  submenu.classList.toggle('show');
  galerie.classList.toggle('active');
});
document.addEventListener('click', e => {
  if (!submenu.contains(e.target)) {
    submenu.classList.remove('show');
    galerie.classList.remove('active');
  }
});

// -----------------------------
// HAUTEUR DYNAMIQUE DES MINIATURES
// -----------------------------
document.querySelectorAll('.gallery img').forEach(img => {
  const h = img.dataset.height ? parseInt(img.dataset.height) : 200;
  img.style.height = h + 'px';
});
