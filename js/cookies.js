// ----- COOKIES.JS -----
// Version test + attente dynamique de la bannière
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

  // Fonction pour charger GA réel (si nécessaire)
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

  // Fonction qui attend que la bannière existe
  function waitForBanner(callback) {
    const interval = setInterval(() => {
      const banner = document.getElementById('cookie-banner');
      const acceptBtn = document.getElementById('accept-cookies');
      const refuseBtn = document.getElementById('decline-cookies'); // correspond à ton HTML
      if (banner && acceptBtn && refuseBtn) {
        clearInterval(interval);
        callback(banner, acceptBtn, refuseBtn);
      }
    }, 200); // vérifie toutes les 200ms
    // Timeout sécurité 10s
    setTimeout(() => clearInterval(interval), 10000);
  }

  // Fonction principale
  function initCookies(banner, acceptBtn, refuseBtn) {
    const consent = localStorage.getItem('cookiesConsent');
    if (consent === 'accepted') {
      loadGA();
      banner.style.display = 'none';
    } else if (consent === 'refused') {
      banner.style.display = 'none';
    } else {
      banner.style.display = 'flex';
    }

    acceptBtn.addEventListener('click', () => {
      console.log("➡️ Bouton 'Accepter' cliqué");
      localStorage.setItem('cookiesConsent', 'accepted');
      loadGA();
      banner.style.display = 'none';
    });

    refuseBtn.addEventListener('click', () => {
      console.log("❌ Consentement refusé");
      localStorage.setItem('cookiesConsent', 'refused');
      banner.style.display = 'none';
    });
  }

  // Lancer l’attente une fois DOM prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForBanner(initCookies));
  } else {
    waitForBanner(initCookies);
  }
})();
