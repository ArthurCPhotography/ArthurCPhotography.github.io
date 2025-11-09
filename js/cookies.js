// ----- COOKIES.JS -----
(function() {
  // Attendre que le DOM soit chargé
  document.addEventListener("DOMContentLoaded", function() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const refuseBtn = document.getElementById('decline-cookies'); // corrigé ici ✅

    if (!banner) {
      console.warn("⚠️ Bannière cookies introuvable dans le DOM.");
      return;
    }

    // Fonction simulant le chargement de Google Analytics
    function loadGA() {
      console.log("✅ Google Analytics simulé (G-TEST1234AB) activé !");
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-TEST1234AB'); // ID fictif pour test
    }

    // Vérifier le consentement existant
    const consent = localStorage.getItem('cookiesConsent');
    if (consent === 'accepted') {
      console.log("🍪 Consentement déjà accepté");
      loadGA();
      banner.style.display = 'none';
    } else if (consent === 'refused') {
      console.log("🚫 Consentement déjà refusé");
      banner.style.display = 'none';
    }

    // Gestion des clics
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        console.log("➡️ Bouton 'Accepter' cliqué");
        localStorage.setItem('cookiesConsent', 'accepted');
        loadGA();
        banner.style.display = 'none';
      });
    }

    if (refuseBtn) {
      refuseBtn.addEventListener('click', function() {
        console.log("❌ Consentement refusé");
        localStorage.setItem('cookiesConsent', 'refused');
        banner.style.display = 'none';
      });
    }
  });
})();
