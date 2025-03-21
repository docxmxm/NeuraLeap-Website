// Component loader function
function loadComponent(componentName, targetId) {
    fetch(`/components/${componentName}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById(targetId).innerHTML = html;
        })
        .catch(error => console.error('Error loading component:', error));
}