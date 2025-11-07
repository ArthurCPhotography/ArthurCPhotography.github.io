fetch('nav.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('nav-placeholder').innerHTML = data;

    // ----- MENU MOBILE -----
    const galerie = document.querySelector('.no-click');
    const submenu = galerie.nextElementSibling;

    // Clic sur "Galerie"
    galerie.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = submenu.classList.toggle('show');
      galerie.classList.toggle('active', isOpen); // texte bleu quand ouvert
    });

    // Clique ailleurs → fermer menu
    document.addEventListener('click', (e) => {
      if (!submenu.contains(e.target) && !galerie.contains(e.target)) {
        submenu.classList.remove('show');
        galerie.classList.remove('active');
      }
    });

    // ----- SURVOL (PC) -----
    galerie.parentElement.addEventListener('mouseenter', () => {
      galerie.classList.add('active');
    });

    galerie.parentElement.addEventListener('mouseleave', () => {
      galerie.classList.remove('active');
    });
  });
// ----- GOOGLE ANALYTICS -----
(function() {
  const gtagScript = document.createElement('script');
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"; // ← remplace G-XXXXXXX par ton vrai ID Analytics
  gtagScript.async = true;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX'); // ← même ID ici
})();
