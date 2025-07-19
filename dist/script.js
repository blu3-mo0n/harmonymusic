// ==================== ESTILOS DE NOTIFICACIÓN ====================
(function injectNotificationStyles() {
    if (!document.getElementById('notification-style')) {
        const style = document.createElement('style');
        style.id = 'notification-style';
        style.innerHTML = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: #323232;
            color: #fff;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            font-size: 1rem;
            opacity: 0.95;
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 220px;
            max-width: 350px;
            pointer-events: auto;
            transition: opacity 0.3s;
        }
        .notification.success { background: #4CAF50; }
        .notification.error { background: #F44336; }
        .notification.info { background: #2196F3; }
        .notification .close-btn {
            background: none;
            border: none;
            color: #fff;
            font-size: 1.2rem;
            margin-left: auto;
            cursor: pointer;
        }
        `;
        document.head.appendChild(style);
    }
})();

// ==================== FUNCIONES DE NOTIFICACIÓN ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ==================== FUNCIONES DE AUTENTICACIÓN ====================
function showLoginForm() {
    document.getElementById('auth-section').style.display = 'flex';
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('auth-section').style.display = 'flex';
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
}

function hideAuthSection() {
    document.getElementById('auth-section').style.display = 'none';
}

// ==================== FUNCIONES DE CATÁLOGO (BÁSICO) ====================
function renderCatalog() {
    // Esta función debe ser implementada según tu lógica de Firestore
    // Aquí solo muestra un ejemplo de notificación
    showNotification('Catálogo renderizado (ejemplo)', 'info');
}

// ==================== FUNCIONES DE ALMACENAMIENTO LOCAL (BÁSICO) ====================
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        showNotification('No se pudo guardar en localStorage', 'error');
    }
}

// ==================== EXPORTAR FUNCIONES GLOBALES ====================
window.showNotification = showNotification;
window.showLoginForm = showLoginForm;
window.showRegisterForm = showRegisterForm;
window.hideAuthSection = hideAuthSection;
window.renderCatalog = renderCatalog;
window.saveToLocalStorage = saveToLocalStorage;
// Puedes agregar más funciones globales aquí según tu lógica

// ==================== INICIALIZACIÓN BÁSICA ====================
document.addEventListener('DOMContentLoaded', function() {
    // Ejemplo: mostrar el catálogo al cargar
    // renderCatalog();
});
