// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to check cookie and show/hide banner
function checkCookie() {
    const cookieConsent = getCookie("cookieConsent");
    const banner = document.getElementById("cookie-banner");
    
    if (banner) {
        if (cookieConsent === "accepted") {
            // User has explicitly accepted tracking
            banner.style.display = "none";
            loadGoogleAnalytics();
        } else if (cookieConsent === "rejected") {
            // User explicitly rejected cookies
            banner.style.display = "none";
        } else {
            // No explicit consent - show the banner and prevent tracking
            banner.style.display = "block";
        }
    }
}

// Event listener for the Accept button
document.addEventListener("DOMContentLoaded", function () {
    const acceptButton = document.getElementById("accept-cookies");
    if (acceptButton) {
        acceptButton.addEventListener("click", function () {
            setCookie("cookieConsent", "accepted", 180);
            const banner = document.getElementById("cookie-banner");
            if (banner) {
                banner.style.display = "none";
            }
            loadGoogleAnalytics();
        });
    }

    const rejectButton = document.getElementById("reject-cookies");
    if (rejectButton) {
        rejectButton.addEventListener("click", function () {
            setCookie("cookieConsent", "rejected", 180);
            const banner = document.getElementById("cookie-banner");
            if (banner) {
                banner.style.display = "none";
            }
        });
    }
    
    // Check cookie status after DOM is ready
    checkCookie();
});

// Function to revoke cookie consent
function revokeCookie() {
    // Delete the cookie by setting it to empty with expiration in the past
    document.cookie = "cookieConsent=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    // Show the banner again
    const banner = document.getElementById("cookie-banner");
    if (banner) {
        banner.style.display = "block";
    }
}

// Function to reject cookie consent
function rejectCookie() {
    setCookie("cookieConsent", "rejected", 180);
    const banner = document.getElementById("cookie-banner");
    if (banner) {
        banner.style.display = "none";
    }
}

// Function to load Google Analytics scripts
function loadGoogleAnalytics() {
    // Load the Google Analytics script only after explicit consent
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-G6MZRGKKM4";
    document.head.appendChild(gaScript);

    // Initialize Google Analytics
    gaScript.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-G6MZRGKKM4');
    };
}