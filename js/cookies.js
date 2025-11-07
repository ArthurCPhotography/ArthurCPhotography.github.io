// cookies.js - GA4 conditionnel
(function() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const refuseBtn = document.getElementById('refuse-cookies');

  function loadGA4() {
    // Charger le script GA4
    const gtagScript = document.createElement('script');
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"; // Remplace par ton ID GA4
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag; // rendre gtag global
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX'); // Remplace par ton ID GA4
  }

  // Vérifier le consentement
  const consent = localStorage.getItem('cookiesConsent');
  if(consent === 'accepted') {
    loadGA4();
    banner.style.display = 'none';
  } else if(consent === 'refused') {
    banner.style.display = 'none';
  }

  // Boutons de la bannière
  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookiesConsent','accepted');
    loadGA4();
    banner.style.display = 'none';
  });

  refuseBtn.addEventListener('click', function() {
    localStorage.setItem('cookiesConsent','refused');
    banner.style.display = 'none';
  });

})();
