// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle ARIA expanded attribute for accessibility
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Smooth Scrolling for internal links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to the target element with smooth behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // For better accessibility, update URL hash after scroll
                history.pushState(null, null, targetId);
            }
        });
    });

    // Form Handling for Contact Form
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.querySelector('.form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop default form submission

            // Clear previous status message
            formStatus.textContent = '';
            formStatus.style.color = 'var(--text-color-dark)';

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic client-side validation
            if (name === '' || email === '' || message === '') {
                formStatus.textContent = 'Please fill in all fields.';
                formStatus.style.color = 'red'; // Use a distinct color for error
                return;
            }

            // Simple email format validation (more robust validation requires regex)
            if (!email.includes('@') || !email.includes('.')) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.style.color = 'red';
                return;
            }

            // Simulate form submission (no actual backend)
            // In a real application, you would send this data to a server using fetch() or XMLHttpRequest
            console.log('Form Submitted:', { name, email, message });

            // Display success message
            formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
            formStatus.style.color = 'green'; // Use a distinct color for success

            // Optionally, clear the form fields
            contactForm.reset();
        });
    }
});