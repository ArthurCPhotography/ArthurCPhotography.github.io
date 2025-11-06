fetch('nav.html')  // si nav.html est dans un sous-dossier, met par ex. 'partials/nav.html'
  .then(response => response.text())
  .then(data => {
    document.getElementById('nav-placeholder').innerHTML = data;

    // ----- MENU MOBILE -----
    const galerie = document.querySelector('.no-click');
    const submenu = galerie.nextElementSibling;

    galerie.addEventListener('click', (e) => {
      e.stopPropagation();
      submenu.classList.toggle('show');
      galerie.classList.toggle('active'); // texte bleu mobile
    });

    document.addEventListener('click', (e) => {
      if (!submenu.contains(e.target) && !galerie.contains(e.target)) {
        submenu.classList.remove('show');
        galerie.classList.remove('active');
      }
    });
  });

// -----------------------------
// PROTECTION + EFFET DE SURVOL GALERIE INDEX
// -----------------------------
document.querySelectorAll('.gallery a img').forEach(img => {
  const link = img.closest('a');

  // Empêche clic droit et glisser
  img.addEventListener('contextmenu', e => e.preventDefault());
  img.addEventListener('dragstart', e => e.preventDefault());

  // Applique le style par défaut (ombre douce)
  img.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
  img.style.borderRadius = "12px";
  img.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
  img.style.display = "block";
  img.style.width = "100%";
  img.style.objectFit = "cover";

  // Créer une couche transparente
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'transparent';
  overlay.style.cursor = 'pointer';
  overlay.style.zIndex = 10;

  // Effet de survol identique à l'index
  overlay.addEventListener('mouseover', () => {
    img.style.transform = 'scale(1.03)';
    img.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
  });
  overlay.addEventListener('mouseout', () => {
    img.style.transform = 'scale(1)';
    img.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
  });

  // Bloquer clic droit et appui long sur mobile
  overlay.addEventListener('contextmenu', e => e.preventDefault());
  let pressTimer;
  const start = ev => { pressTimer = setTimeout(() => ev.preventDefault(), 600); };
  const cancel = () => clearTimeout(pressTimer);
  overlay.addEventListener('touchstart', start, { passive: false });
  overlay.addEventListener('touchend', cancel);
  overlay.addEventListener('touchmove', cancel);

  // Clic ouvre le lien
  if (link) overlay.addEventListener('click', () => link.click());

  // Position relative sur le parent
  const parent = img.parentElement;
  if (getComputedStyle(parent).position === 'static')
    parent.style.position = 'relative';

  parent.appendChild(overlay);
});
