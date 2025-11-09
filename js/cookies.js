// js/cookies.js
(function() {
  const GA_ID = 'G-XXXXXXX'; // <-- Remplace par ton ID GA4
  const BANNER_SELECTOR = '#cookie-banner';
  const ACCEPT_SELECTOR = '#accept-cookies';
  const REFUSE_SELECTOR = '#refuse-cookies';

  // Fonction pour charger GA4 (sûre — empêche double chargement)
  function loadGA4() {
    if (window.__ga4_loaded) return;
    window.__ga4_loaded = true;

    const gtagScript = document.createElement('script');
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  // Actions à executer quand on accepte ou refuse
  function acceptAction(banner) {
    localStorage.setItem('cookiesConsent','accepted');
    loadGA4();
    if (banner) banner.style.display = 'none';
  }
  function refuseAction(banner) {
    localStorage.setItem('cookiesConsent','refused');
    if (banner) banner.style.display = 'none';
  }

  // Attacher écouteurs si éléments présents
  function attachIfReady(root) {
    const banner = document.querySelector(BANNER_SELECTOR);
    const acceptBtn = document.querySelector(ACCEPT_SELECTOR);
    const refuseBtn = document.querySelector(REFUSE_SELECTOR);

    if (!banner || !acceptBtn || !refuseBtn) return false;

    // Éviter double attachement
    if (banner.__cookies_listeners_attached) return true;
    banner.__cookies_listeners_attached = true;

    // Si consentement déjà donné -> appliquer
    const consent = localStorage.getItem('cookiesConsent');
    if (consent === 'accepted') {
      loadGA4();
      banner.style.display = 'none';
    } else if (consent === 'refused') {
      banner.style.display = 'none';
    } else {
      banner.style.display = ''; // afficher si pas de choix
    }

    acceptBtn.addEventListener('click', function(e) {
      e.preventDefault();
      acceptAction(banner);
    });
    refuseBtn.addEventListener('click', function(e) {
      e.preventDefault();
      refuseAction(banner);
    });

    return true;
  }

  // Si injecté dynamiquement, utiliser MutationObserver pour détecter l'ajout
  function waitForBannerAndAttach() {
    if (attachIfReady(document)) return;

    const observer = new MutationObserver(function(mutations, obs) {
      if (attachIfReady(document)) {
        obs.disconnect();
      }
    });

    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true
    });

    // Safety timeout: arrêter après 10s pour éviter boucle infinie
    setTimeout(function() { observer.disconnect(); }, 10000);
  }

  // Démarrer une fois que le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForBannerAndAttach);
  } else {
    waitForBannerAndAttach();
  }
})();
