// Ensure page loads at top to prevent jumping to last section
window.scrollTo(0, 0);
history.replaceState(null, null, ' ');

// Update footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Hero text animation
document.querySelector(".hero-text").style.animation = "fadeIn 1.2s ease-in-out";

const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);

// Timeline items scroll animation
const items = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

items.forEach(item => observer.observe(item));

// Smooth scroll 
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

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a, .bottom-nav-item");

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");

                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${id}`
                    );
                });
            }
        });
    },
    {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
    }
);

sections.forEach(section => navObserver.observe(section));



// Contact form submission handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        formStatus.textContent = 'Sending...';
        formStatus.style.color = '#ff9800';

        setTimeout(() => {
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formStatus.style.color = '#4caf50';
            contactForm.reset();

            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        }, 1500);
    });
}

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
    themeToggle.innerHTML =
        savedTheme === "dark"
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    themeToggle.innerHTML =
        newTheme === "dark"
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
});
