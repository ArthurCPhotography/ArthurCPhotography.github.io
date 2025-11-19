// gallery.js - script universel pour toutes les galeries
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  const jsonUrl = gallery.dataset.json;
  const folder = gallery.dataset.folder;

  // Charger les images depuis le JSON
  fetch(jsonUrl)
    .then(res => res.ok ? res.json() : Promise.reject("Impossible de charger le JSON"))
    .then(images => {

      // Génération HTML de la galerie
      images.forEach(img => {
        const block = `
          <div class="img-wrapper">
            <a href="${folder}/${img.file}" data-fancybox="gallery" data-caption="${img.caption}">
              <img src="${folder}/thumbs/${img.file}" alt="${img.alt}" data-height="${img.height}">
            </a>
          </div>
        `;
        gallery.insertAdjacentHTML("beforeend", block);
      });

      // Protection clic droit / drag pour les miniatures
      document.querySelectorAll('.gallery .img-wrapper img').forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
        img.addEventListener('dragstart', e => e.preventDefault());
      });

      // Ajuster la hauteur des images
      document.querySelectorAll('.gallery img').forEach(img => {
        const h = img.dataset.height ? parseInt(img.dataset.height) : 200;
        img.style.height = h + 'px';
      });

      // Lier Fancybox aux images générées dynamiquement
      Fancybox.bind("[data-fancybox='gallery']", {
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

      // Fonction de protection clic droit / drag dans Fancybox
      function protectSlide(fancybox) {
        const applyProtection = () => {
          const slide = fancybox.Carousel.slides[fancybox.Carousel.page];
          if (!slide) return;
          const img = slide.$el.querySelector('img');
          if (!img) return;

          const existing = slide.$el.querySelector('.__fancybox-protect-overlay');
          if (existing) existing.remove();

          const overlay = document.createElement('div');
          overlay.className = '__fancybox-protect-overlay';
          Object.assign(overlay.style, {
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            background: 'transparent', zIndex: 20
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

    })
    .catch(err => console.error("Erreur galerie :", err));
});
