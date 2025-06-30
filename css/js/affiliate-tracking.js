document.addEventListener('DOMContentLoaded', () => {
    const affiliateLinks = document.querySelectorAll('.affiliate-link');

    affiliateLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const productName = link.getAttribute('data-product-name');
            const store = link.getAttribute('data-store');

            console.log(`-- AFFILIATE CLICK --
Product: ${productName}
Store: ${store}
Timestamp: ${new Date().toISOString()}`);

            // In a real scenario, you would send this data to an analytics service
            // or your backend. The click proceeds as normal.
        });
    });
});