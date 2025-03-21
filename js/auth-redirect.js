// Handle authentication redirects
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
        handleAuthRedirect(hash);
    }
});

async function handleAuthRedirect(hash) {
    // Auth redirect handling code
}