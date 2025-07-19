// ===== FIREBASE CONFIGURATION AND FUNCTIONS =====

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwDaNAQGtv-Y9ycgUF27IPqTq6b3nyfE4",
    authDomain: "comerciotech-75d66.firebaseapp.com",
    projectId: "comerciotech-75d66",
    storageBucket: "comerciotech-75d66.firebasestorage.app",
    messagingSenderId: "621107708698",
    appId: "1:621107708698:web:83707e829b27999d6c22a3",
    measurementId: "G-GPMNN80DGQ"
};

// Variables Firebase
let db;
let auth;
let initialized = false;
let currentUser = null;
let userRole = null;

// Initialize Firebase
function initializeFirebase() {
    try {
        if (typeof firebase !== 'undefined') {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            auth = firebase.auth();
            initialized = true;
            console.log('Firebase initialized successfully');
            
            // Monitor authentication state
            auth.onAuthStateChanged(onAuthStateChanged);
        } else {
            console.warn('Firebase not loaded');
        }
    } catch (error) {
        console.error('Error initializing Firebase:', error);
    }
}

// ===== AUTHENTICATION FUNCTIONS =====

// Authentication state observer
function onAuthStateChanged(user) {
    currentUser = user;
    if (user) {
        console.log('User signed in:', user.email);
        loadUserRole(user.uid);
        updateUIForUser(user);
    } else {
        console.log('User signed out');
        currentUser = null;
        userRole = null;
        updateUIForGuest();
    }
}

// Load user role from Firestore
async function loadUserRole(userId) {
    if (!initialized) return;
    
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            userRole = userDoc.data().role || 'cliente';
        } else {
            userRole = 'cliente';
        }
        console.log('User role loaded:', userRole);
    } catch (error) {
        console.error('Error loading user role:', error);
        userRole = 'cliente';
    }
}

// Register new user
async function registerUser(email, password, name, role = 'cliente') {
    if (!initialized) {
        throw new Error('Firebase not initialized');
    }
    
    try {
        console.log('Starting registration process...');
        
        // Create user with email and password
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        console.log('User created in Firebase Auth:', user.uid);
        
        // Update profile
        await user.updateProfile({
            displayName: name
        });
        
        // Save user data to Firestore
        await db.collection('users').doc(user.uid).set({
            email: email,
            name: name,
            role: role,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        console.log('User data saved to Firestore');
        console.log('User registered successfully');
        
        return { success: true, user: user };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, error: error.message };
    }
}

// Login user
async function loginUser(email, password) {
    if (!initialized) {
        throw new Error('Firebase not initialized');
    }
    
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('User logged in successfully');
        return { success: true, user: user };
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, error: error.message };
    }
}

// Logout user
async function logoutUser() {
    if (!initialized) {
        throw new Error('Firebase not initialized');
    }
    
    try {
        await auth.signOut();
        console.log('User logged out successfully');
        return { success: true };
    } catch (error) {
        console.error('Error logging out:', error);
        return { success: false, error: error.message };
    }
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Get user role
function getUserRole() {
    return userRole;
}

// Check if user is admin
function checkAdmin() {
    return userRole === 'admin';
}

// Update UI for authenticated user
function updateUIForUser(user) {
    const userInfo = document.getElementById('user-info');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (userInfo && authButtons) {
        authButtons.style.display = 'none';
        userInfo.style.display = 'block';
        userInfo.innerHTML = `
            <span>Bienvenido, ${user.displayName || user.email}</span>
            <span class="user-role">${userRole === 'admin' ? 'Administrador' : 'Cliente'}</span>
            <button onclick="handleLogout()" class="logout-btn">Cerrar Sesión</button>
        `;
    }
    
    // Show/hide admin section
    const adminSection = document.getElementById('admin');
    if (adminSection && userRole === 'admin') {
        adminSection.style.display = 'block';
    }
}

// Update UI for guest user
function updateUIForGuest() {
    const userInfo = document.getElementById('user-info');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (userInfo && authButtons) {
        userInfo.style.display = 'none';
        authButtons.style.display = 'flex';
    }
    
    // Hide admin section
    const adminSection = document.getElementById('admin');
    if (adminSection) {
        adminSection.style.display = 'none';
    }
}

// ===== FORM HANDLERS =====

// Handle registration form
function handleRegistration(event) {
    event.preventDefault();
    console.log('Registration form submitted');
    
    const name = document.getElementById('register-name')?.value;
    const email = document.getElementById('register-email')?.value;
    const password = document.getElementById('register-password')?.value;
    const role = document.getElementById('register-role')?.value || 'cliente';
    
    console.log('Form data:', { name, email, password: '***', role });
    
    if (!name || !email || !password) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    registerUser(email, password, name, role)
        .then(result => {
            if (result.success) {
                alert('¡Registro exitoso! Bienvenido a Harmony Music Store');
                window.location.href = 'index.html';
            } else {
                alert(`Error en el registro: ${result.error}`);
            }
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
            console.error('Registration error:', error);
        });
}

// Handle login form
function handleLogin(event) {
    event.preventDefault();
    console.log('Login form submitted');
    
    const email = document.getElementById('login-email')?.value;
    const password = document.getElementById('login-password')?.value;
    
    console.log('Login data:', { email, password: '***' });
    
    if (!email || !password) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    loginUser(email, password)
        .then(result => {
            if (result.success) {
                alert('¡Inicio de sesión exitoso!');
                window.location.href = 'index.html';
            } else {
                alert(`Error en el inicio de sesión: ${result.error}`);
            }
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
            console.error('Login error:', error);
        });
}

// Handle logout
function handleLogout() {
    console.log('Logout requested');
    
    logoutUser()
        .then(result => {
            if (result.success) {
                alert('Has cerrado sesión correctamente');
                window.location.reload();
            }
        })
        .catch(error => {
            alert(`Error al cerrar sesión: ${error.message}`);
            console.error('Logout error:', error);
        });
}

// Show login form
function showLoginForm() {
    console.log('Redirecting to login form');
    window.location.href = 'login.html';
}

// Show register form
function showRegisterForm() {
    console.log('Redirecting to register form');
    window.location.href = 'register.html';
}

// ===== GLOBAL EXPORTS =====

// Export all functions to window object
window.registerUser = registerUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.getCurrentUser = getCurrentUser;
window.getUserRole = getUserRole;
window.checkAdmin = checkAdmin;
window.handleRegistration = handleRegistration;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.showLoginForm = showLoginForm;
window.showRegisterForm = showRegisterForm;

// ===== INITIALIZATION =====

// Initialize Firebase when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Firebase...');
    
    // Wait a bit to ensure Firebase SDK is loaded
    setTimeout(() => {
        initializeFirebase();
    }, 100);
});

// Initialize Firebase immediately if possible
if (typeof firebase !== 'undefined') {
    console.log('Firebase detected, initializing immediately...');
    initializeFirebase();
} else {
    console.log('Firebase not yet loaded, waiting for DOM...');
}

console.log('firebase-functions.js loaded successfully');
