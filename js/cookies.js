function initCookies() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const refuseBtn = document.getElementById('refuse-cookies');

  // Si la bannière n'est pas encore dans le DOM, réessaie dans 100 ms
  if (!banner || !acceptBtn || !refuseBtn) {
    setTimeout(initCookies, 100);
    return;
  }

  function loadGA4() {
    if (window.gtag) return; // éviter double chargement
    const gtagScript = document.createElement('script');
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"; // Remplace par ton ID GA4
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX'); // Même ID GA4
  }

  // Vérifier le consentement déjà donné
  const consent = localStorage.getItem('cookiesConsent');
  if (consent === 'accepted') loadGA4();
  if (consent) banner.style.display = 'none';

  // Gestion des boutons
  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookiesConsent','accepted');
    loadGA4();
    banner.style.display = 'none';
  });

  refuseBtn.addEventListener('click', function() {
    localStorage.setItem('cookiesConsent','refused');
    banner.style.display = 'none';
  });
}

// Démarre l’initialisation après le DOM
document.addEventListener('DOMContentLoaded', initCookies);
