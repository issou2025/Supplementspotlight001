document.addEventListener('DOMContentLoaded', () => {
    const consentBanner = document.getElementById('cookie-consent-banner');
    const acceptButton = document.getElementById('cookie-accept');

    // Check if consent has already been given
    if (localStorage.getItem('cookieConsent') === 'true') {
        consentBanner.style.display = 'none';
        return;
    }

    // Show the banner
    consentBanner.style.display = 'flex';

    // Handle the accept button click
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        consentBanner.style.display = 'none';
    });
});