// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const contactForm = document.getElementById('contactForm');
const filterButtons = document.querySelectorAll('.filter-btn');
const albumCards = document.querySelectorAll('.album-card');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const playButtons = document.querySelectorAll('.play-btn');

// CRUD Elements
const showAddFormBtn = document.getElementById('showAddForm');
const albumForm = document.getElementById('albumForm');
const crudForm = document.getElementById('crudForm');
const cancelFormBtn = document.getElementById('cancelForm');
const albumsTableBody = document.getElementById('albumsTableBody');
const searchAdminInput = document.getElementById('searchAdmin');
const filterGenreAdminSelect = document.getElementById('filterGenreAdmin');
const exportDataBtn = document.getElementById('exportData');
const importDataBtn = document.getElementById('importData');
const populateDatabaseBtn = document.getElementById('populateDatabase');

// Data Storage
let albums = [
    {
        id: 1,
        title: "Greatest Rock Hits",
        artist: "Various Artists",
        genre: "rock",
        price: 19.99,
        image: "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Rock+Album",
        description: "Una colección de los mejores éxitos del rock"
    },
    {
        id: 2,
        title: "Pop Sensations",
        artist: "Taylor Swift",
        genre: "pop",
        price: 24.99,
        image: "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Pop+Album",
        description: "Los éxitos pop más populares del momento"
    },
    {
        id: 3,
        title: "Smooth Jazz Collection",
        artist: "Miles Davis",
        genre: "jazz",
        price: 22.99,
        image: "https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Jazz+Album",
        description: "Jazz suave y relajante para todos los gustos"
    },
    {
        id: 4,
        title: "Classical Masterpieces",
        artist: "Beethoven",
        genre: "classical",
        price: 18.99,
        image: "https://via.placeholder.com/300x300/FFA07A/FFFFFF?text=Classical",
        description: "Obras maestras de la música clásica"
    },
    {
        id: 5,
        title: "Heavy Metal Thunder",
        artist: "Metallica",
        genre: "rock",
        price: 26.99,
        image: "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Metal+Album",
        description: "El mejor heavy metal de todos los tiempos"
    },
    {
        id: 6,
        title: "Indie Pop Vibes",
        artist: "Arctic Monkeys",
        genre: "pop",
        price: 21.99,
        image: "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Indie+Pop",
        description: "Sonidos indie pop frescos y modernos"
    }
];

// Shopping cart
let cart = [];
let currentEditingId = null;

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Catalog filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter albums
        albumCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.classList.add('show');
            } else {
                card.classList.add('hidden');
                card.classList.remove('show');
            }
        });
    });
});

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const albumCard = e.target.closest('.album-card');
        const albumTitle = albumCard.querySelector('.album-info h3').textContent;
        const albumArtist = albumCard.querySelector('.album-info p').textContent;
        const albumPrice = albumCard.querySelector('.price').textContent;
        const albumImage = albumCard.querySelector('.album-image img').src;
        
        const album = {
            id: Date.now(),
            title: albumTitle,
            artist: albumArtist,
            price: albumPrice,
            image: albumImage
        };
        
        addToCart(album);
        showNotification(`${albumTitle} agregado al carrito`);
    });
});

// Play button functionality
playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const albumCard = e.target.closest('.album-card');
        const albumTitle = albumCard.querySelector('.album-info h3').textContent;
        
        // Simular reproducción
        showNotification(`Reproduciendo: ${albumTitle}`);
        
        // Aquí podrías integrar con un servicio de música real
        playPreview(albumTitle);
    });
});

// Cart functions
function addToCart(album) {
    cart.push(album);
    updateCartDisplay();
    saveCartToFirebase(album);
}

function updateCartDisplay() {
    // Actualizar contador del carrito (si tienes uno en el header)
    console.log('Cart items:', cart.length);
}

function saveCartToFirebase(album) {
    // Integración con Firebase Firestore
    console.log('Saving to Firebase:', album);
    /*
    firebase.firestore().collection('cart').add({
        ...album,
        userId: getCurrentUserId(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log('Album added to cart in Firebase');
    }).catch((error) => {
        console.error('Error adding to cart:', error);
    });
    */
}

function playPreview(albumTitle) {
    // Simular preview de audio
    console.log('Playing preview for:', albumTitle);
    
    // Aquí podrías integrar con servicios como Spotify Web API
    /*
    fetch(`https://api.spotify.com/v1/search?q=${albumTitle}&type=album`)
        .then(response => response.json())
        .then(data => {
            // Reproducir preview
        });
    */
}

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        asunto: formData.get('asunto'),
        mensaje: formData.get('mensaje'),
        fecha: new Date().toISOString()
    };
    
    try {
        // Guardar en Firebase
        await saveMessageToFirebase(data);
        contactForm.reset();
    } catch (error) {
        showNotification('Error al enviar el mensaje', 'error');
    }
});

// Save message to Firebase
async function saveMessageToFirebase(data) {
    // Try Firebase first, fallback to local notification
    if (window.FirebaseManager) {
        try {
            await window.FirebaseManager.saveMessage(data);
            return;
        } catch (error) {
            console.error('Firebase message save failed:', error);
        }
    }
    
    // Fallback behavior
    console.log('Saving message locally:', data);
    showNotification('¡Mensaje enviado exitosamente!');
}

// Notification system
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1e3c72;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Firebase initialization
function initializeFirebase() {
    // Configuración de Firebase para la tienda de música
    const firebaseConfig = {
        // Reemplaza con tu configuración real de Firebase
        apiKey: "tu-api-key-aqui",
        authDomain: "harmony-music-store.firebaseapp.com",
        projectId: "harmony-music-store",
        storageBucket: "harmony-music-store.appspot.com",
        messagingSenderId: "123456789",
        appId: "tu-app-id-aqui"
    };
    
    console.log('Firebase config ready for:', firebaseConfig.projectId);
    
    // Inicializar Firebase (descomenta cuando tengas las credenciales)
    // firebase.initializeApp(firebaseConfig);
}

// Music catalog management
function loadCatalog() {
    // Cargar catálogo desde Firebase
    console.log('Loading music catalog...');
    
    /*
    firebase.firestore().collection('albums').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const album = doc.data();
                addAlbumToPage(album);
            });
        })
        .catch((error) => {
            console.error('Error loading catalog: ', error);
        });
    */
}

function addAlbumToPage(album) {
    // Crear elemento de álbum dinámicamente
    const albumCard = document.createElement('div');
    albumCard.className = 'album-card';
    albumCard.setAttribute('data-category', album.genre);
    
    albumCard.innerHTML = `
        <div class="album-image">
            <img src="${album.image}" alt="${album.title}">
            <div class="album-overlay">
                <button class="play-btn"><i class="fas fa-play"></i></button>
            </div>
        </div>
        <div class="album-info">
            <h3>${album.title}</h3>
            <p>Artista: ${album.artist}</p>
            <p class="price">$${album.price}</p>
            <button class="add-to-cart">Agregar al Carrito</button>
        </div>
    `;
    
    document.querySelector('.catalog-grid').appendChild(albumCard);
}

// Search functionality
function searchAlbums(query) {
    const albums = document.querySelectorAll('.album-card');
    
    albums.forEach(album => {
        const title = album.querySelector('h3').textContent.toLowerCase();
        const artist = album.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || artist.includes(query.toLowerCase())) {
            album.style.display = 'block';
        } else {
            album.style.display = 'none';
        }
    });
}

// User authentication (opcional)
function getCurrentUserId() {
    // Retornar ID del usuario actual
    return 'user-' + Math.random().toString(36).substr(2, 9);
}

// Analytics tracking
function trackEvent(eventName, eventData) {
    console.log('Tracking event:', eventName, eventData);
    
    /*
    firebase.analytics().logEvent(eventName, eventData);
    */
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('Harmony Music Store loaded successfully');
    
    // Initialize Firebase
    initializeFirebase();
    
    // Load catalog
    loadCatalog();
    
    // Track page view
    trackEvent('page_view', {
        page_title: 'Harmony Music Store',
        page_location: window.location.href
    });
});

// Handle errors
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
    // Reportar a Firebase Crashlytics
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Music store loaded in ${loadTime.toFixed(2)}ms`);
    
    trackEvent('performance', {
        load_time: loadTime,
        page_type: 'music_store'
    });
});

// CTA button functionality
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#catalogo').scrollIntoView({
        behavior: 'smooth'
    });
});

// ==================== CRUD FUNCTIONALITY ====================

// Show notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// CRUD Operations

// CREATE - Add new album
async function createAlbum(albumData) {
    // Try Firebase first, fallback to localStorage
    if (window.FirebaseManager) {
        try {
            await window.FirebaseManager.createAlbum(albumData);
            return;
        } catch (error) {
            console.error('Firebase create failed, using localStorage:', error);
        }
    }
    
    // Fallback to localStorage
    const newId = Math.max(...albums.map(a => parseInt(a.id) || 0), 0) + 1;
    const newAlbum = {
        id: newId.toString(),
        ...albumData,
        price: parseFloat(albumData.price),
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    albums.push(newAlbum);
    saveToLocalStorage();
    renderCatalog();
    renderAdminTable();
    showNotification('Álbum agregado exitosamente');
}

// READ - Get all albums or filter
function getAlbums(filter = {}) {
    let filteredAlbums = albums;
    
    if (filter.genre) {
        filteredAlbums = filteredAlbums.filter(album => album.genre === filter.genre);
    }
    
    if (filter.search) {
        const searchTerm = filter.search.toLowerCase();
        filteredAlbums = filteredAlbums.filter(album => 
            album.title.toLowerCase().includes(searchTerm) ||
            album.artist.toLowerCase().includes(searchTerm)
        );
    }
    
    return filteredAlbums;
}

// UPDATE - Edit existing album
async function updateAlbum(id, albumData) {
    // Try Firebase first, fallback to localStorage
    if (window.FirebaseManager) {
        try {
            await window.FirebaseManager.updateAlbum(id, albumData);
            return true;
        } catch (error) {
            console.error('Firebase update failed, using localStorage:', error);
        }
    }
    
    // Fallback to localStorage
    const index = albums.findIndex(album => album.id == id);
    if (index !== -1) {
        albums[index] = {
            ...albums[index],
            ...albumData,
            price: parseFloat(albumData.price),
            updatedAt: new Date()
        };
        saveToLocalStorage();
        renderCatalog();
        renderAdminTable();
        showNotification('Álbum actualizado exitosamente');
        return true;
    }
    return false;
}

// DELETE - Remove album
async function deleteAlbum(id) {
    // Try Firebase first, fallback to localStorage
    if (window.FirebaseManager) {
        try {
            await window.FirebaseManager.deleteAlbum(id);
            return true;
        } catch (error) {
            console.error('Firebase delete failed, using localStorage:', error);
        }
    }
    
    // Fallback to localStorage
    const index = albums.findIndex(album => album.id == id);
    if (index !== -1) {
        albums.splice(index, 1);
        saveToLocalStorage();
        renderCatalog();
        renderAdminTable();
        showNotification('Álbum eliminado exitosamente');
        return true;
    }
    return false;
}

// Local Storage Functions
function saveToLocalStorage() {
    localStorage.setItem('harmonyMusicAlbums', JSON.stringify(albums));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('harmonyMusicAlbums');
    if (saved) {
        albums = JSON.parse(saved);
    }
}

// Render Functions
function renderCatalog() {
    const catalogGrid = document.querySelector('.catalog-grid');
    if (!catalogGrid) return;
    
    catalogGrid.innerHTML = '';
    
    albums.forEach(album => {
        const albumCard = document.createElement('div');
        albumCard.className = 'album-card';
        albumCard.setAttribute('data-category', album.genre);
        
        albumCard.innerHTML = `
            <div class="album-image">
                <img src="${album.image}" alt="${album.title}" onerror="this.src='https://via.placeholder.com/300x300/cccccc/ffffff?text=No+Image'">
                <div class="album-overlay">
                    <button class="play-btn" onclick="playPreview('${album.title}')">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
            <div class="album-info">
                <h3>${album.title}</h3>
                <p>Artista: ${album.artist}</p>
                <p class="price">$${album.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCartFromCatalog(${album.id})">
                    Agregar al Carrito
                </button>
            </div>
        `;
        
        catalogGrid.appendChild(albumCard);
    });
}

function renderAdminTable() {
    if (!albumsTableBody) return;
    
    const filteredAlbums = getAlbums({
        genre: filterGenreAdminSelect?.value || '',
        search: searchAdminInput?.value || ''
    });
    
    albumsTableBody.innerHTML = '';
    
    filteredAlbums.forEach(album => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${album.image}" alt="${album.title}" class="album-image-small" 
                     onerror="this.src='https://via.placeholder.com/50x50/cccccc/ffffff?text=No+Image'">
            </td>
            <td>${album.title}</td>
            <td>${album.artist}</td>
            <td>${album.genre}</td>
            <td>$${album.price.toFixed(2)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-warning" onclick="editAlbum(${album.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-danger" onclick="confirmDeleteAlbum(${album.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </td>
        `;
        albumsTableBody.appendChild(row);
    });
}

// Form Functions
function showAddForm() {
    currentEditingId = null;
    document.getElementById('formTitle').textContent = 'Agregar Nuevo Álbum';
    crudForm.reset();
    albumForm.classList.remove('hidden');
    albumForm.scrollIntoView({ behavior: 'smooth' });
}

function editAlbum(id) {
    const album = albums.find(a => a.id === id);
    if (!album) return;
    
    currentEditingId = id;
    document.getElementById('formTitle').textContent = 'Editar Álbum';
    
    // Fill form with album data
    document.getElementById('albumId').value = album.id;
    document.getElementById('albumTitle').value = album.title;
    document.getElementById('albumArtist').value = album.artist;
    document.getElementById('albumPrice').value = album.price;
    document.getElementById('albumGenre').value = album.genre;
    document.getElementById('albumImage').value = album.image;
    document.getElementById('albumDescription').value = album.description || '';
    
    albumForm.classList.remove('hidden');
    albumForm.scrollIntoView({ behavior: 'smooth' });
}

function confirmDeleteAlbum(id) {
    const album = albums.find(a => a.id === id);
    if (!album) return;
    
    if (confirm(`¿Estás seguro de que quieres eliminar "${album.title}"?`)) {
        deleteAlbum(id);
    }
}

function cancelForm() {
    albumForm.classList.add('hidden');
    crudForm.reset();
    currentEditingId = null;
}

// Helper Functions
function addToCartFromCatalog(albumId) {
    const album = albums.find(a => a.id === albumId);
    if (album) {
        addToCart(album);
        showNotification(`${album.title} agregado al carrito`);
    }
}

function playPreview(albumTitle) {
    showNotification(`Reproduciendo: ${albumTitle}`, 'warning');
}

// Export/Import Functions
function exportData() {
    const dataStr = JSON.stringify(albums, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'harmony_music_catalog.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Datos exportados exitosamente');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    if (Array.isArray(importedData)) {
                        albums = importedData;
                        saveToLocalStorage();
                        renderCatalog();
                        renderAdminTable();
                        showNotification('Datos importados exitosamente');
                    } else {
                        showNotification('Formato de archivo inválido', 'error');
                    }
                } catch (error) {
                    showNotification('Error al leer el archivo', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}

// Event Listeners for CRUD
document.addEventListener('DOMContentLoaded', () => {
    // Load data (Firebase will handle this automatically)
    if (!window.FirebaseManager) {
        loadFromLocalStorage();
        renderCatalog();
        renderAdminTable();
    }
    
    // Initial render for localStorage fallback
    setTimeout(() => {
        renderCatalog();
        renderAdminTable();
    }, 1000);
    
    // Form events
    if (showAddFormBtn) {
        showAddFormBtn.addEventListener('click', showAddForm);
    }
    
    if (cancelFormBtn) {
        cancelFormBtn.addEventListener('click', cancelForm);
    }
    
    if (crudForm) {
        crudForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(crudForm);
            const albumData = {
                title: formData.get('albumTitle'),
                artist: formData.get('albumArtist'),
                price: formData.get('albumPrice'),
                genre: formData.get('albumGenre'),
                image: formData.get('albumImage') || 'https://via.placeholder.com/300x300/cccccc/ffffff?text=No+Image',
                description: formData.get('albumDescription')
            };
            
            try {
                if (currentEditingId) {
                    await updateAlbum(currentEditingId, albumData);
                } else {
                    await createAlbum(albumData);
                }
                cancelForm();
            } catch (error) {
                showNotification('Error al procesar la solicitud', 'error');
            }
        });
    }
    
    // Search and filter events
    if (searchAdminInput) {
        searchAdminInput.addEventListener('input', renderAdminTable);
    }
    
    if (filterGenreAdminSelect) {
        filterGenreAdminSelect.addEventListener('change', renderAdminTable);
    }
    
    // Export/Import events
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', exportData);
    }
    
    if (importDataBtn) {
        importDataBtn.addEventListener('click', importData);
    }
    
    // Populate database event
    if (populateDatabaseBtn) {
        populateDatabaseBtn.addEventListener('click', async () => {
            if (confirm('¿Estás seguro de que quieres poblar la base de datos con álbumes de ejemplo?')) {
                try {
                    populateDatabaseBtn.disabled = true;
                    populateDatabaseBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Poblando...';
                    
                    if (window.populateDatabase) {
                        await window.populateDatabase();
                    } else {
                        showNotification('Script de población no disponible', 'error');
                    }
                } catch (error) {
                    showNotification('Error al poblar base de datos', 'error');
                } finally {
                    populateDatabaseBtn.disabled = false;
                    populateDatabaseBtn.innerHTML = '<i class="fas fa-database"></i> Poblar Base de Datos';
                }
            }
        });
    }
    
    // Add migration button if Firebase is available
    setTimeout(() => {
        if (window.FirebaseManager) {
            addMigrationButton();
        }
    }, 2000);
});

// Add migration button for Firebase
function addMigrationButton() {
    const adminControls = document.querySelector('.admin-controls');
    if (adminControls && !document.getElementById('migrateBtn')) {
        const migrateBtn = document.createElement('button');
        migrateBtn.id = 'migrateBtn';
        migrateBtn.className = 'btn-secondary';
        migrateBtn.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Migrar a Firebase';
        migrateBtn.onclick = () => {
            if (confirm('¿Migrar datos locales a Firebase? Esto puede sobrescribir datos existentes.')) {
                window.FirebaseManager.migrateData();
            }
        };
        adminControls.appendChild(migrateBtn);
    }
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent += `
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .about-text, .contact-info');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Función para inicializar Firebase (ejemplo)
function initializeFirebase() {
    // Configuración de Firebase
    const firebaseConfig = {
        // Aquí van tus credenciales de Firebase
        apiKey: "tu-api-key",
        authDomain: "tu-proyecto.firebaseapp.com",
        projectId: "tu-proyecto",
        storageBucket: "tu-proyecto.appspot.com",
        messagingSenderId: "123456789",
        appId: "tu-app-id"
    };
    
    // Inicializar Firebase
    // firebase.initializeApp(firebaseConfig);
    console.log('Firebase inicializado');
}

// Función para analytics de Firebase
function trackPageView(pageName) {
    // Implementación con Firebase Analytics
    console.log('Tracking page view:', pageName);
    /*
    firebase.analytics().logEvent('page_view', {
        page_title: pageName,
        page_location: window.location.href
    });
    */
}

// Función para manejar errores
function handleError(error) {
    console.error('Error:', error);
    // Aquí podrías usar Firebase Crashlytics para reportar errores
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página web cargada exitosamente');
    // initializeFirebase();
    trackPageView('Inicio');
});

// Manejar errores globales
window.addEventListener('error', (e) => {
    handleError(e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Página cargada en ${loadTime.toFixed(2)}ms`);
    
    // Aquí podrías enviar métricas a Firebase Performance
    /*
    const trace = firebase.performance().trace('page_load');
    trace.putAttribute('load_time', loadTime);
    trace.stop();
    */
});

// ===== AUTHENTICATION FUNCTIONS =====

// Load albums from Firebase or localStorage
function loadAlbums() {
    if (window.FirebaseManager) {
        // Firebase will handle this automatically when the listener is set up
        console.log('Albums will be loaded from Firebase');
    } else {
        // Load from localStorage as fallback
        loadFromLocalStorage();
        renderCatalog();
        renderAdminTable();
    }
}

// Update cart UI
function updateCartUI() {
    // This function should update the cart display
    console.log('Cart updated:', cart);
    // You can add more UI updates here
}

// Show section function
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the requested section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show login form
function showLoginForm() {
    document.getElementById('auth-section').style.display = 'flex';
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'none';
}

// Show register form
function showRegisterForm() {
    document.getElementById('auth-section').style.display = 'flex';
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
}

// Hide auth section
function hideAuthSection() {
    document.getElementById('auth-section').style.display = 'none';
}

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    try {
        const result = await window.FirebaseManager.login(email, password);
        if (result.success) {
            alert('¡Inicio de sesión exitoso!');
            hideAuthSection();
            loadAlbums(); // Reload albums with user context
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

// Handle register form submission
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;
    
    if (!name || !email || !password) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    try {
        const result = await window.FirebaseManager.register(email, password, name, role);
        if (result.success) {
            alert('¡Registro exitoso!');
            hideAuthSection();
            loadAlbums(); // Reload albums with user context
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

// Update admin section visibility based on user role
function updateAdminSectionVisibility() {
    const adminSection = document.getElementById('admin-section');
    const isAdmin = window.FirebaseManager.checkAdmin();
    
    if (adminSection) {
        adminSection.style.display = isAdmin ? 'block' : 'none';
    }
    
    // Update navigation
    const adminNav = document.querySelector('a[href="#admin"]');
    if (adminNav) {
        adminNav.style.display = isAdmin ? 'block' : 'none';
    }
}

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Firebase to initialize
    setTimeout(() => {
        const user = window.FirebaseManager.getCurrentUser();
        if (user) {
            updateAdminSectionVisibility();
        }
    }, 1000);
});

// Override the showAdmin function to check authentication
function showAdmin() {
    const user = window.FirebaseManager.getCurrentUser();
    if (!user) {
        alert('Debes iniciar sesión para acceder a esta sección');
        showLoginForm();
        return;
    }
    
    if (!window.FirebaseManager.checkAdmin()) {
        alert('No tienes permisos de administrador');
        return;
    }
    
    showSection('admin');
}

// Add user context to add to cart functionality
function addToCart(id) {
    const user = window.FirebaseManager.getCurrentUser();
    if (!user) {
        alert('Debes iniciar sesión para agregar productos al carrito');
        showLoginForm();
        return;
    }
    
    const album = albums.find(a => a.id === id);
    if (!album) return;
    
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: album.id,
            title: album.title,
            artist: album.artist,
            price: album.price,
            image: album.image,
            quantity: 1
        });
    }
    
    // Save cart to Firebase
    window.FirebaseManager.saveCart(cart);
    
    updateCartUI();
    showNotification(`${album.title} agregado al carrito`);
}

// Create default admin user function
async function createDefaultAdmin() {
    try {
        const result = await window.FirebaseManager.register(
            'admin@comerciotech.com',
            'admin123',
            'Administrador',
            'admin'
        );
        
        if (result.success) {
            console.log('Admin user created successfully');
            return true;
        } else {
            console.log('Admin user may already exist');
            return false;
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
        return false;
    }
}
