// ==================== Backend API Configuration ====================

const API_BASE_URL = 'http://localhost:3001';

// ==================== Contact Form Handling ====================

const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('contactName');
const contactClass = document.getElementById('contactClass');
const contactPhone = document.getElementById('contactPhone');
const formMessage = document.getElementById('formMessage');

// Error message elements
const nameError = document.getElementById('nameError');
const classError = document.getElementById('classError');
const phoneError = document.getElementById('phoneError');

// Form validation
function validateContactForm() {
    let isValid = true;

    // Reset errors
    nameError.textContent = '';
    classError.textContent = '';
    phoneError.textContent = '';
    nameError.classList.remove('show');
    classError.classList.remove('show');
    phoneError.classList.remove('show');

    // Validate name
    if (!contactName.value.trim()) {
        nameError.textContent = 'Please enter your name';
        nameError.classList.add('show');
        isValid = false;
    } else if (contactName.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameError.classList.add('show');
        isValid = false;
    }

    // Validate class
    if (!contactClass.value) {
        classError.textContent = 'Please select a class';
        classError.classList.add('show');
        isValid = false;
    }

    // Validate phone
    if (!contactPhone.value.trim()) {
        phoneError.textContent = 'Please enter your phone number';
        phoneError.classList.add('show');
        isValid = false;
    } else if (!/^[0-9]{10}$/.test(contactPhone.value.replace(/\D/g, ''))) {
        phoneError.textContent = 'Please enter a valid 10-digit phone number';
        phoneError.classList.add('show');
        isValid = false;
    }

    return isValid;
}

// Contact form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateContactForm()) {
        return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitButton.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: contactName.value.trim(),
                class: contactClass.value,
                phone: contactPhone.value.trim()
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Success
            formMessage.textContent = '✓ Your application has been submitted successfully! We will contact you soon.';
            formMessage.className = 'form-message show success';
            
            // Reset form
            contactForm.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        } else {
            // Error from backend
            formMessage.textContent = data.error || 'Failed to submit. Please try again.';
            formMessage.className = 'form-message show error';
        }
    } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = 'Connection error. Please check if the server is running on port 3001.';
        formMessage.className = 'form-message show error';
    } finally {
        // Restore button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});

// Real-time validation
contactName.addEventListener('blur', () => {
    if (contactName.value.trim()) {
        if (contactName.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameError.classList.add('show');
        } else {
            nameError.classList.remove('show');
        }
    }
});

contactPhone.addEventListener('blur', () => {
    if (contactPhone.value.trim()) {
        const phoneDigits = contactPhone.value.replace(/\D/g, '');
        if (!/^[0-9]{10}$/.test(phoneDigits)) {
            phoneError.textContent = 'Please enter a valid 10-digit phone number';
            phoneError.classList.add('show');
        } else {
            phoneError.classList.remove('show');
        }
    }
});

// ==================== Reviews Section ====================

const reviewsContainer = document.getElementById('reviewsContainer');
const addReviewModal = document.getElementById('addReviewModal');
const addReviewForm = document.getElementById('addReviewForm');
const reviewMessage = document.getElementById('reviewMessage');

// Fetch and display reviews
async function loadReviews() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/reviews`);
        const reviews = await response.json();

        // Clear loading spinner
        reviewsContainer.innerHTML = '';

        if (reviews.length === 0) {
            reviewsContainer.innerHTML = '<p style="text-align: center; color: var(--text-light); grid-column: 1/-1;">No reviews yet. Be the first to share your experience!</p>';
            return;
        }

        // Create review cards
        reviews.forEach((review, index) => {
            const reviewCard = createReviewCard(review, index);
            reviewsContainer.appendChild(reviewCard);
        });
    } catch (error) {
        console.error('Error loading reviews:', error);
        reviewsContainer.innerHTML = '<p style="text-align: center; color: #dc3545; grid-column: 1/-1;">Unable to load reviews. Please try again later.</p>';
    }
}

function createReviewCard(review, index) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.style.animationDelay = `${index * 0.1}s`;

    // Generate star rating
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

    const date = new Date(review.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    card.innerHTML = `
        <div class="review-stars">${stars}</div>
        <p class="review-text">"${review.review}"</p>
        <p class="review-author">${review.name}</p>
        <p class="review-role">${date}</p>
    `;

    return card;
}

// Open review form modal
function openReviewForm() {
    addReviewModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close review form modal
function closeReviewForm() {
    addReviewModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    addReviewForm.reset();
    reviewMessage.classList.remove('show');
}

// Close modal on outside click
addReviewModal.addEventListener('click', (e) => {
    if (e.target === addReviewModal) {
        closeReviewForm();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && addReviewModal.classList.contains('show')) {
        closeReviewForm();
    }
});

// Add review form submission
addReviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const reviewName = document.getElementById('reviewName').value.trim();
    const reviewText = document.getElementById('reviewText').value.trim();
    const ratingInput = document.querySelector('input[name="rating"]:checked');

    // Validation
    if (!reviewName) {
        showReviewMessage('Please enter your name', 'error');
        return;
    }

    if (reviewName.length < 2) {
        showReviewMessage('Name must be at least 2 characters', 'error');
        return;
    }

    if (!reviewText) {
        showReviewMessage('Please share your review', 'error');
        return;
    }

    if (reviewText.length < 10) {
        showReviewMessage('Review must be at least 10 characters', 'error');
        return;
    }

    if (!ratingInput) {
        showReviewMessage('Please select a rating', 'error');
        return;
    }

    const rating = parseInt(ratingInput.value);

    // Show loading state
    const submitButton = addReviewForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitButton.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/api/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: reviewName,
                review: reviewText,
                rating: rating
            })
        });

        const data = await response.json();

        if (response.ok) {
            showReviewMessage('✓ Thank you for your review! It will appear shortly.', 'success');
            addReviewForm.reset();
            
            // Reload reviews after 1.5 seconds
            setTimeout(() => {
                loadReviews();
                closeReviewForm();
            }, 1500);
        } else {
            showReviewMessage(data.error || 'Failed to submit review. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showReviewMessage('Connection error. Please check if the server is running.', 'error');
    } finally {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}
);

function showReviewMessage(message, type) {
    reviewMessage.textContent = message;
    reviewMessage.className = `form-message show ${type}`;
}

// ==================== Initialize ====================

// Load reviews on page load
document.addEventListener('DOMContentLoaded', () => {
    loadReviews();
    
    // Refresh reviews every 30 seconds
    setInterval(loadReviews, 30000);
});

// ==================== Phone input formatting ====================

contactPhone.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// ==================== Prevent form submission on Enter in review text ====================

document.getElementById('reviewText').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        addReviewForm.dispatchEvent(new Event('submit'));
    }
});

console.log('✨ Contact and reviews functionality loaded!');
console.log(`📡 API Base URL: ${API_BASE_URL}`);
