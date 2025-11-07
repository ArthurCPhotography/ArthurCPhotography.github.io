function initCookies() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const refuseBtn = document.getElementById('refuse-cookies');

  // Si la bannière n'est pas encore dans le DOM, réessaie dans 100ms
  if (!banner || !acceptBtn || !refuseBtn) {
    setTimeout(initCookies, 100);
    return;
  }

  function loadGA4() {
    const gtagScript = document.createElement('script');
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"; // Remplacer par ton ID GA4
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX'); // Même ID GA4
  }

  const consent = localStorage.getItem('cookiesConsent');
  if (consent === 'accepted') loadGA4();
  if (consent) banner.style.display = 'none';

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

// Démarre l’initialisation une fois le DOM prêt
document.addEventListener('DOMContentLoaded', initCookies);
