// Search functionality
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query === '') {
        alert('Please enter a search term');
        return;
    }
    
    // Search through pets database
    const results = searchPets(query);
    
    // Display results
    displaySearchResults(query, results);
}

// Search function
function searchPets(query) {
    const lowerQuery = query.toLowerCase();
    
    return petsDatabase.filter(pet => {
        return pet.name.toLowerCase().includes(lowerQuery) ||
                pet.type.toLowerCase().includes(lowerQuery) ||
                pet.breed.toLowerCase().includes(lowerQuery) ||
                pet.gender.toLowerCase().includes(lowerQuery) ||
                pet.age.toLowerCase().includes(lowerQuery);
    });
}

// Display search results
function displaySearchResults(query, results) {
    // Get all elements
    const adoptionSection = document.getElementById('adoptionSection');
    const searchSection = document.getElementById('searchSection');
    const searchResultsSection = document.getElementById('searchResultsSection');
    const searchQuery = document.getElementById('searchQuery');
    const resultsContainer = document.getElementById('searchResults');
    const resultsCount = document.getElementById('resultsCount');
    
    // Debug: Check which elements are missing
    console.log('Element check:', {
        adoptionSection: !!adoptionSection,
        searchSection: !!searchSection,
        searchResultsSection: !!searchResultsSection,
        searchQuery: !!searchQuery,
        resultsContainer: !!resultsContainer,
        resultsCount: !!resultsCount
    });
    
    // Check if elements exist
    if (!adoptionSection || !searchSection || !searchResultsSection || !searchQuery || !resultsContainer || !resultsCount) {
        console.error('Missing elements - check console log above');
        alert('Search feature is not properly configured. Please check the page setup.');
        return;
    }
    
    // Hide adoption section and search section
    adoptionSection.classList.add('hidden');
    searchSection.classList.add('hidden');
    
    // Show search results section
    searchResultsSection.classList.add('active');
    
    // Display the search query
    searchQuery.textContent = query;
    
    if (results.length > 0) {
        resultsCount.textContent = `Found ${results.length} pet${results.length > 1 ? 's' : ''} matching your search`;
        
        const resultsHTML = `
            <div class="results-grid">
                ${results.map(pet => `
                    <a href="${pet.link}" class="pet-result-card">
                        <img src="${pet.image}" alt="${pet.name}" class="pet-result-image">
                        <div class="pet-result-info">
                            <h3 class="pet-result-name">${pet.name}</h3>
                            <div class="pet-result-details">
                                <p><strong>Type:</strong> ${pet.type}</p>
                                <p><strong>Breed:</strong> ${pet.breed}</p>
                                <p><strong>Gender:</strong> ${pet.gender}</p>
                                <p><strong>Age:</strong> ${pet.age}</p>
                            </div>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
        
        resultsContainer.innerHTML = resultsHTML;
    } else {
        resultsCount.textContent = 'No pets found';
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h3>😢 No Pets Found</h3>
                <p>We couldn't find any pets matching "${query}"</p>
                <p>Try searching for:</p>
                <ul style="list-style: none; padding: 0; margin: 20px 0;">
                    <li>• Pet breeds (e.g., "Golden Retriever", "Persian")</li>
                    <li>• Gender (e.g., "Male", "Female")</li>
                    <li>• Pet type (e.g., "Dog", "Cat")</li>
                    <li>• Pet names (e.g., "Cassidy", "Blacky")</li>
                </ul>
            </div>
        `;
    }
    
    // Scroll to results
    searchResultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Clear search and show original content
function clearSearch() {
    // Clear search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Get elements
    const searchResultsSection = document.getElementById('searchResultsSection');
    const adoptionSection = document.getElementById('adoptionSection');
    const searchSection = document.getElementById('searchSection');
    
    // Hide search results
    if (searchResultsSection) {
        searchResultsSection.classList.remove('active');
    }
    
    // Show adoption section and search section
    if (adoptionSection) {
        adoptionSection.classList.remove('hidden');
    }
    if (searchSection) {
        searchSection.classList.remove('hidden');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for search button
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
    }
    
    // Add event listener for Enter key in search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    
    // Donation form submission
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Thank you for your donation!');
            closeDonationModal();
        });
    }
});

function toggleDropdown() {
    const menu = document.querySelector('.header-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

function openDonationModal() {
    const modal = document.getElementById('donationModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeDonationModal() {
    const modal = document.getElementById('donationModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const donationModal = document.getElementById('donationModal');
    const signinModal = document.getElementById('signinModal');
    if (event.target == donationModal) {
        donationModal.style.display = 'none';
    }
    if (event.target == signinModal) {
        signinModal.style.display = 'none';
    }
}

// Handle adopt button click
function adoptPet(petName) {
    let message = '';
    
    switch(petName) {
        // Dogs
        case 'Tagpi':
            message = 'Thank you for adopting Tagpi! We will contact you soon with the next steps.';
            break;
        case 'Rusty':
            message = 'Thank you for adopting Rusty! We will contact you soon with the next steps.';
            break;
        case 'Blacky':
            message = 'Thank you for adopting Blacky! We will contact you soon with the next steps.';
            break;
        case 'Ballerina Doggia':
            message = 'Thank you for adopting Ballerina Doggia! We will contact you soon with the next steps.';
            break;
        case 'Henry Magikarp':
            message = 'Thank you for adopting Henry Magikarp! We will contact you soon with the next steps.';
            break;
        case 'Chingkong Bungkong':
            message = 'Thank you for adopting Chingkong Bungkong! We will contact you soon with the next steps.';
            break;
        // Cats
        case 'Cassidy':
            message = 'Thank you for adopting Cassidy! We will contact you soon with the next steps.';
            break;
        case 'Espresso':
            message = 'Thank you for adopting Espresso! We will contact you soon with the next steps.';
            break;
        case 'Skyflakes':
            message = 'Thank you for adopting Skyflakes! We will contact you soon with the next steps.';
            break;
        case 'Mike Kazowski':
            message = 'Thank you for adopting Mike Kazowski! We will contact you soon with the next steps.';
            break;
        case 'Tangerine':
            message = 'Thank you for adopting Tangerine! We will contact you soon with the next steps.';
            break;
        default:
            message = 'Thank you for your interest in adopting! We will contact you soon with the next steps.';
    }
    
    alert(message);
}

function openSigninModal() {
    const modal = document.getElementById('signinModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeSigninModal() {
    const modal = document.getElementById('signinModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function signinWithFacebook() {
    alert('Signing in with Facebook...');
}

function signinWithGoogle() {
    alert('Signing in with Google...');
}

function signinWithApple() {
    alert('Signing in with Apple...');
}

function handleSocialClick() {
    alert('Redirecting to PetLink social media pages...');
}

function renderPets(filterType) {
    const container = document.getElementById("petContainer");
    container.innerHTML = "";

    const filtered = pets.filter(p => p.type === filterType);

    filtered.forEach(p => {
        container.innerHTML += `
            <div class="pet-card">
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
            </div>
        `;
    });
}
