// ----- COOKIES.JS -----
// Version test + sans flash
(function() {
  const GA_ID = 'G-TEST1234AB'; // ID test
  const TEST_MODE = true;       // true = mock GA, false = réel

  // Fonction pour simuler GA
  function loadGA_mock() {
    if (window.__ga_loaded) return;
    window.__ga_loaded = true;
    console.log("✅ Google Analytics simulé (G-TEST1234AB) activé !");
    document.cookie = "_ga_mock=1; path=/; max-age=" + (365*24*60*60);
  }

  // Fonction pour charger GA réel
  function loadGA_real() {
    if (window.__ga_loaded) return;
    window.__ga_loaded = true;
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
    console.log("📊 GA réel chargé !");
  }

  const loadGA = TEST_MODE ? loadGA_mock : loadGA_real;

  // Attendre que la bannière existe
  function waitForBanner(callback) {
    const interval = setInterval(() => {
      const banner = document.getElementById('cookie-banner');
      const acceptBtn = document.getElementById('accept-cookies');
      const refuseBtn = document.getElementById('decline-cookies');
      if (banner && acceptBtn && refuseBtn) {
        clearInterval(interval);
        callback(banner, acceptBtn, refuseBtn);
      }
    }, 200);
    setTimeout(() => clearInterval(interval), 10000);
  }

  function initCookies(banner, acceptBtn, refuseBtn) {
    const consent = localStorage.getItem('cookiesConsent');

    // Afficher la bannière uniquement si pas encore de consentement
    if (!consent) {
      banner.style.display = 'flex';
    }

    // Accepter
    acceptBtn.addEventListener('click', () => {
      console.log("➡️ Bouton 'Accepter' cliqué");
      localStorage.setItem('cookiesConsent', 'accepted');
      loadGA();
      banner.style.display = 'none';
    });

    // Refuser
    refuseBtn.addEventListener('click', () => {
      console.log("❌ Consentement refusé");
      localStorage.setItem('cookiesConsent', 'refused');
      banner.style.display = 'none';
    });

    // Si déjà accepté/refusé, cacher immédiatement
    if (consent === 'accepted') {
      loadGA();
      banner.style.display = 'none';
    } else if (consent === 'refused') {
      banner.style.display = 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForBanner(initCookies));
  } else {
    waitForBanner(initCookies);
  }
})();
