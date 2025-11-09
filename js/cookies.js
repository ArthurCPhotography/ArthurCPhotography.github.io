// ===========================
// cookies.js — Version de test (MOCK) avec attente du DOM + nav.html
// ===========================

const TEST_MODE = true;
const GA_ID = 'G-TEST1234AB'; // faux ID de test

document.addEventListener('DOMContentLoaded', function() {

  // Fonction pour surveiller l'apparition de la bannière
  function waitForBanner(callback) {
    const check = setInterval(() => {
      const banner = document.getElementById('cookie-banner');
      const acceptBtn = document.getElementById('accept-cookies');
      const refuseBtn = document.getElementById('refuse-cookies');
      if (banner && acceptBtn && refuseBtn) {
        clearInterval(check);
        callback(banner, acceptBtn, refuseBtn);
      }
    }, 200); // vérifie toutes les 200 ms
  }

  // Simule GA (mock local)
  function loadGA4_mock() {
    if (window.__ga4_loaded) return;
    window.__ga4_loaded = true;
    console.log('🧩 MOCK GA : Simule Google Analytics (aucun appel réseau)');
    document.cookie = "_ga_mock=1; path=/; max-age=" + (365*24*60*60);
  }

  // Charge GA4 réel (si TEST_MODE = false)
  function loadGA4_real() {
    if (window.__ga4_loaded) return;
    window.__ga4_loaded = true;
    console.log('📊 Google Analytics réel chargé avec ID : ' + GA_ID);
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  const loadGA4 = TEST_MODE ? loadGA4_mock : loadGA4_real;

  // Attendre que la bannière soit disponible
  waitForBanner((banner, acceptBtn, refuseBtn) => {

    const consent = localStorage.getItem('cookiesConsent');

    if (consent === 'accepted') {
      loadGA4();
      banner.style.display = 'none';
    } else if (consent === 'refused') {
      banner.style.display = 'none';
    } else {
      banner.style.display = 'flex';
    }

    acceptBtn.addEventListener('click', function() {
      localStorage.setItem('cookiesConsent', 'accepted');
      loadGA4();
      banner.style.display = 'none';
      console.log("✅ Consentement accepté.");
    });

    refuseBtn.addEventListener('click', function() {
      localStorage.setItem('cookiesConsent', 'refused');
      banner.style.display = 'none';
      console.log("❌ Consentement refusé.");
    });
  });
});
