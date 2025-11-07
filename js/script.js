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

<!-- Banniere cookies -->
<div id="cookie-banner" style="position:fixed;bottom:0;width:100%;background:#222;color:#fff;padding:10px;text-align:center;z-index:9999;">
  Ce site utilise Google Analytics pour améliorer son contenu. 
  <button id="accept-cookies">Accepter</button>
  <button id="refuse-cookies">Refuser</button>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const refuseBtn = document.getElementById('refuse-cookies');

  // Vérifier si consentement déjà donné
  if(localStorage.getItem('cookiesConsent') === 'accepted'){
    loadGA();
    banner.style.display = 'none';
  } else if(localStorage.getItem('cookiesConsent') === 'refused'){
    banner.style.display = 'none';
  }

  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookiesConsent','accepted');
    loadGA();
    banner.style.display = 'none';
  });

  refuseBtn.addEventListener('click', function() {
    localStorage.setItem('cookiesConsent','refused');
    banner.style.display = 'none';
  });

  function loadGA(){
    // Script Google Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-XXXXXXXXX-X', 'auto'); // Remplace UA-XXXXXXXXX-X par ton ID GA
    ga('send', 'pageview');
  }
});

