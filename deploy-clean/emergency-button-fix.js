// ===== EMERGENCY BUTTON FIX =====
console.log('🚨 Cargando fix de emergencia para botones...');

// Verificar si las funciones ya están disponibles
function checkAndFixButtons() {
    console.log('🔍 Verificando funciones de botones...');
    
    // Si las funciones no están disponibles, crearlas directamente
    if (typeof window.showLoginForm !== 'function') {
        console.log('⚠️ showLoginForm no disponible, creando función de emergencia');
        window.showLoginForm = function() {
            console.log('🚨 EMERGENCY: Redirigiendo a login');
            window.location.href = 'login.html';
        };
    }
    
    if (typeof window.showRegisterForm !== 'function') {
        console.log('⚠️ showRegisterForm no disponible, creando función de emergencia');
        window.showRegisterForm = function() {
            console.log('🚨 EMERGENCY: Redirigiendo a registro');
            window.location.href = 'register.html';
        };
    }
    
    if (typeof window.handleLogout !== 'function') {
        console.log('⚠️ handleLogout no disponible, creando función de emergencia');
        window.handleLogout = function() {
            console.log('🚨 EMERGENCY: Cerrando sesión');
            if (firebase && firebase.auth) {
                firebase.auth().signOut().then(() => {
                    alert('Has cerrado sesión correctamente');
                    window.location.reload();
                }).catch((error) => {
                    console.error('Error al cerrar sesión:', error);
                    alert('Error al cerrar sesión');
                });
            } else {
                alert('Sistema de autenticación no disponible');
                window.location.reload();
            }
        };
    }
    
    // Verificar que los botones tengan los event listeners
    const loginBtn = document.querySelector('button[onclick="showLoginForm()"]');
    const registerBtn = document.querySelector('button[onclick="showRegisterForm()"]');
    
    if (loginBtn) {
        console.log('✅ Botón de login encontrado');
        // Agregar listener adicional por si acaso
        loginBtn.addEventListener('click', function(e) {
            console.log('🖱️ Click en botón login detectado');
            if (typeof window.showLoginForm === 'function') {
                window.showLoginForm();
            } else {
                console.log('🚨 Función no disponible, redirigiendo directamente');
                window.location.href = 'login.html';
            }
        });
    } else {
        console.log('❌ Botón de login no encontrado');
    }
    
    if (registerBtn) {
        console.log('✅ Botón de registro encontrado');
        // Agregar listener adicional por si acaso
        registerBtn.addEventListener('click', function(e) {
            console.log('🖱️ Click en botón registro detectado');
            if (typeof window.showRegisterForm === 'function') {
                window.showRegisterForm();
            } else {
                console.log('🚨 Función no disponible, redirigiendo directamente');
                window.location.href = 'register.html';
            }
        });
    } else {
        console.log('❌ Botón de registro no encontrado');
    }
    
    console.log('🧪 Estado final de funciones:');
    console.log('showLoginForm:', typeof window.showLoginForm);
    console.log('showRegisterForm:', typeof window.showRegisterForm);
    console.log('handleLogout:', typeof window.handleLogout);
}

// Ejecutar inmediatamente si el DOM ya está listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndFixButtons);
} else {
    checkAndFixButtons();
}

// También ejecutar después de un delay para asegurar que todo esté cargado
setTimeout(checkAndFixButtons, 2000);

console.log('✅ Emergency button fix cargado');
