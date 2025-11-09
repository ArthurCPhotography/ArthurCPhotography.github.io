// ===========================
// cookies.js — Version de test (MOCK)
// ===========================

// Mode test :
// true = ne charge pas Google Analytics réel (mock local uniquement)
// false = charge GA4 avec l'ID réel
const TEST_MODE = true;
const GA_ID = 'G-TEST1234AB'; // ton faux ID de test

document.addEventListener('DOMContentLoaded', function() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const refuseBtn = document.getElementById('refuse-cookies');

  if (!banner || !acceptBtn || !refuseBtn) {
    console.warn("⚠️ Bannière cookies introuvable dans le DOM.");
    return;
  }

  // ---------------------------
  // Fonction : simulation GA (test local sans appel réseau)
  // ---------------------------
  function loadGA4_mock() {
    if (window.__ga4_loaded) return;
    window.__ga4_loaded = true;
    console.log('🧩 MOCK GA : Simule le chargement de Google Analytics (aucun appel réseau)');

    // Simuler un cookie pour vérifier la logique
    document.cookie = "_ga_mock=1; path=/; max-age=" + (365*24*60*60);
  }

  // ---------------------------
  // Fonction : vrai chargement GA (si TEST_MODE = false)
  // ---------------------------
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

  // Choisir quelle fonction utiliser selon TEST_MODE
  const loadGA4 = TEST_MODE ? loadGA4_mock : loadGA4_real;

  // ---------------------------
  // Gestion du consentement
  // ---------------------------
  const consent = localStorage.getItem('cookiesConsent');

  if (consent === 'accepted') {
    loadGA4();
    banner.style.display = 'none';
  } else if (consent === 'refused') {
    banner.style.display = 'none';
  } else {
    banner.style.display = 'flex';
  }

  // ---------------------------
  // Bouton "Accepter"
  // ---------------------------
  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookiesConsent', 'accepted');
    loadGA4();
    banner.style.display = 'none';
    console.log("✅ Consentement accepté.");
  });

  // ---------------------------
  // Bouton "Refuser"
  // ---------------------------
  refuseBtn.addEventListener('click', function() {
    localStorage.setItem('cookiesConsent', 'refused');
    banner.style.display = 'none';
    console.log("❌ Consentement refusé.");
  });
});
