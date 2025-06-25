// Property data with multiple examples
const properties = [
    {
        id: 1,
        name: "Modern Family House",
        price: "$450,000",
        type: "buy",
        location: "Downtown, City Center",
        beds: 3,
        baths: 2,
        sqft: "1,200",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        keywords: ["modern", "family", "house", "downtown", "city", "center", "spacious"]
    },
    {
        id: 2,
        name: "Luxury Apartment",
        price: "$2,500/month",
        type: "rent",
        location: "Uptown, Premium Area",
        beds: 2,
        baths: 2,
        sqft: "950",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        keywords: ["luxury", "apartment", "uptown", "premium", "modern", "amenities"]
    },
    {
        id: 3,
        name: "Cozy Cottage",
        price: "$320,000",
        type: "buy",
        location: "Suburban Area",
        beds: 2,
        baths: 1,
        sqft: "800",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        keywords: ["cozy", "cottage", "suburban", "quiet", "peaceful", "garden"]
    },
    {
        id: 4,
        name: "Penthouse Suite",
        price: "$4,200/month",
        type: "rent",
        location: "Financial District",
        beds: 3,
        baths: 3,
        sqft: "1,800",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        keywords: ["penthouse", "suite", "luxury", "financial", "district", "view", "high-rise"]
    },
    {
        id: 5,
        name: "Beach House",
        price: "$750,000",
        type: "buy",
        location: "Oceanfront, Malibu",
        beds: 4,
        baths: 3,
        sqft: "2,100",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        keywords: ["beach", "house", "oceanfront", "malibu", "vacation", "luxury", "waterfront"]
    },
    {
        id: 6,
        name: "Studio Loft",
        price: "$1,800/month",
        type: "rent",
        location: "Arts District",
        beds: 1,
        baths: 1,
        sqft: "600",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        keywords: ["studio", "loft", "arts", "district", "creative", "modern", "compact"]
    },
    {
        id: 7,
        name: "Victorian Mansion",
        price: "$1,200,000",
        type: "buy",
        location: "Historic District",
        beds: 6,
        baths: 4,
        sqft: "3,500",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        keywords: ["victorian", "mansion", "historic", "district", "classic", "elegant", "spacious"]
    },
    {
        id: 8,
        name: "Garden Apartment",
        price: "$1,950/month",
        type: "rent",
        location: "Green Valley",
        beds: 2,
        baths: 1,
        sqft: "900",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        keywords: ["garden", "apartment", "green", "valley", "nature", "peaceful", "plants"]
    },
    {
        id: 9,
        name: "City Townhouse",
        price: "$580,000",
        type: "buy",
        location: "Midtown",
        beds: 3,
        baths: 2,
        sqft: "1,400",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        keywords: ["city", "townhouse", "midtown", "urban", "convenient", "modern"]
    },
    {
        id: 10,
        name: "Mountain Cabin",
        price: "$3,000/month",
        type: "rent",
        location: "Pine Ridge Mountains",
        beds: 2,
        baths: 2,
        sqft: "1,100",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        keywords: ["mountain", "cabin", "pine", "ridge", "nature", "retreat", "peaceful"]
    }
];

// Global variables
let currentFilter = 'all';
let filteredProperties = [...properties];

// DOM elements
const propertiesGrid = document.getElementById('propertiesGrid');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const navLinks = document.querySelectorAll('.nav-link');
const noResults = document.getElementById('noResults');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    displayProperties(properties);
    setupEventListeners();
});

// Setup all event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setActiveFilter(this, filter);
            filterProperties(filter);
        });
    });

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            setActiveNavLink(this);
            
            if (filter && filter !== 'all') {
                setActiveFilter(document.querySelector(`[data-filter="${filter}"]`), filter);
                filterProperties(filter);
            } else {
                setActiveFilter(document.querySelector('[data-filter="all"]'), 'all');
                filterProperties('all');
            }
        });
    });

    // Visit property buttons (will be added dynamically)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('visit-btn')) {
            const propertyId = e.target.getAttribute('data-id');
            visitProperty(propertyId);
        }
    });

    // Ad buttons
    document.querySelectorAll('.ad-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const service = this.parentElement.querySelector('h4').textContent;
            alert(`Thank you for your interest in ${service}! We'll contact you soon.`);
        });
    });

    // Auth buttons
    document.querySelector('.signup-btn').addEventListener('click', function() {
        alert('Sign Up functionality would be implemented here!');
    });

    document.querySelector('.login-btn').addEventListener('click', function() {
        alert('Login functionality would be implemented here!');
    });
}

// Display properties in the grid
function displayProperties(propertiesToShow) {
    if (propertiesToShow.length === 0) {
        propertiesGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    propertiesGrid.style.display = 'grid';
    noResults.style.display = 'none';

    propertiesGrid.innerHTML = propertiesToShow.map(property => `
        <div class="property-card" data-type="${property.type}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.name}" loading="lazy">
            </div>
            <div class="property-details">
                <h3 class="property-name">${property.name}</h3>
                <p class="property-price">${property.price}</p>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i> ${property.location}
                </p>
                <div class="property-features">
                    <span><i class="fas fa-bed"></i> ${property.beds} Bed${property.beds > 1 ? 's' : ''}</span>
                    <span><i class="fas fa-bath"></i> ${property.baths} Bath${property.baths > 1 ? 's' : ''}</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.sqft} sq ft</span>
                </div>
                <button class="visit-btn" data-id="${property.id}">Visit Property</button>
            </div>
        </div>
    `).join('');
}

// Handle search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredProperties = properties.filter(property => 
            currentFilter === 'all' || property.type === currentFilter
        );
    } else {
        filteredProperties = properties.filter(property => {
            const matchesFilter = currentFilter === 'all' || property.type === currentFilter;
            const matchesSearch = 
                property.name.toLowerCase().includes(searchTerm) ||
                property.location.toLowerCase().includes(searchTerm) ||
                property.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)) ||
                property.price.toLowerCase().includes(searchTerm);
            
            return matchesFilter && matchesSearch;
        });
    }
    
    displayProperties(filteredProperties);
    
    // Update search results count
    updateResultsCount();
}

// Filter properties by type
function filterProperties(filter) {
    currentFilter = filter;
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (filter === 'all') {
        filteredProperties = properties;
    } else {
        filteredProperties = properties.filter(property => property.type === filter);
    }
    
    // Apply search if there's a search term
    if (searchTerm !== '') {
        filteredProperties = filteredProperties.filter(property => {
            return property.name.toLowerCase().includes(searchTerm) ||
                   property.location.toLowerCase().includes(searchTerm) ||
                   property.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)) ||
                   property.price.toLowerCase().includes(searchTerm);
        });
    }
    
    displayProperties(filteredProperties);
    updateResultsCount();
}

// Set active filter button
function setActiveFilter(activeBtn, filter) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Set active navigation link
function setActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Update results count
function updateResultsCount() {
    const sectionHeader = document.querySelector('.section-header h2');
    const count = filteredProperties.length;
    const filterText = currentFilter === 'all' ? 'Properties' : 
                      currentFilter === 'rent' ? 'Rental Properties' : 'Properties for Sale';
    
    sectionHeader.textContent = `${filterText} (${count} found)`;
}

// Visit property function
function visitProperty(propertyId) {
    const property = properties.find(p => p.id == propertyId);
    if (property) {
        alert(`Scheduling a visit to ${property.name} at ${property.location}. 
               
Property Details:
• Price: ${property.price}
• ${property.beds} bedroom${property.beds > 1 ? 's' : ''}, ${property.baths} bathroom${property.baths > 1 ? 's' : ''}
• ${property.sqft} sq ft
• Location: ${property.location}

A real estate agent will contact you within 24 hours to schedule your visit!`);
    }
}

// Smooth scrolling for internal links
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

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Initialize results count on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updateResultsCount();
    }, 100);
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to property cards
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Search suggestions (simple implementation)
searchInput.addEventListener('focus', function() {
    this.placeholder = 'Try: "luxury", "downtown", "2 beds", "beach"...';
});

searchInput.addEventListener('blur', function() {
    this.placeholder = 'Search properties by name, location, or features...';
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                searchInput.focus();
                break;
        }
    }
});

// Performance optimization: Debounce search
let searchTimeout;
const originalHandleSearch = handleSearch;
handleSearch = function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(originalHandleSearch, 300);
};
