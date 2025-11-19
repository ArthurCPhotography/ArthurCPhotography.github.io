// gallery.js - script universel pour toutes les galeries
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  const jsonUrl = gallery.dataset.json;
  const folder = gallery.dataset.folder;

  fetch(jsonUrl)
    .then(res => res.ok ? res.json() : Promise.reject("Impossible de charger le JSON"))
    .then(images => {

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

      // Protection contre le clic droit et le drag
      document.querySelectorAll('.gallery .img-wrapper img').forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
        img.addEventListener('dragstart', e => e.preventDefault());
      });

      // Appliquer Fancybox
      Fancybox.bind("[data-fancybox='gallery']", {
        Toolbar: { display: ["close"] },
        Thumbs: false,
        dragToClose: true,
        animated: true,
        caption: (f, c, s) => s.caption,
        hideScrollbar: false
      });

      // Ajuster la hauteur des images
      document.querySelectorAll('.gallery img').forEach(img => {
        const h = img.dataset.height ? parseInt(img.dataset.height) : 200;
        img.style.height = h + 'px';
      });

    })
    .catch(err => console.error("Erreur galerie :", err));
});
