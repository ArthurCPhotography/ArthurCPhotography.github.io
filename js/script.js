fetch('nav.html')
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
