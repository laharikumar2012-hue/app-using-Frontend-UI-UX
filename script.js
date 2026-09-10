// ==========================================
// FULL JAVASCRIPT
// ==========================================


// 1. GET STARTED BUTTON
// ==========================================

const startButton = document.getElementById("startBtn");

if (startButton) {
    startButton.addEventListener("click", function () {

        const aboutSection = document.getElementById("about");

        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    });
}


// ==========================================
// 2. NAVIGATION LINKS
// ==========================================

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const targetId = link.getAttribute("href");

        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            targetSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ==========================================
// 3. CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        // Stop the page from refreshing
        event.preventDefault();

    
        // Get input values
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();


        // Message display area
        const formMessage = document.getElementById("formMessage");


        // ======================================
        // VALIDATION
        // ======================================

        if (name === "") {

            formMessage.textContent =
                "Please enter your name.";

            nameInput.focus();

            return;
        }


        if (email === "") {

            formMessage.textContent =
                "Please enter your email.";

            emailInput.focus();

            return;
        }


        // Email validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            emailInput.focus();

            return;
        }


        if (message === "") {

            formMessage.textContent =
                "Please enter your message.";

            messageInput.focus();

            return;
        }


        // ======================================
        // SUCCESS MESSAGE
        // ======================================

        formMessage.textContent =
            "Your message has been submitted successfully!";


        // Clear form
        contactForm.reset();

    });

}


// ==========================================
// 4. INPUT VALIDATION WHILE TYPING
// ==========================================

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");


if (nameInput) {

    nameInput.addEventListener("input", function () {

        if (nameInput.value.trim() !== "") {

            nameInput.style.borderColor = "";

        }

    });

}


if (emailInput) {

    emailInput.addEventListener("input", function () {

        if (emailInput.value.trim() !== "") {

            emailInput.style.borderColor = "";

        }

    });

}


if (messageInput) {

    messageInput.addEventListener("input", function () {

        if (messageInput.value.trim() !== "") {

            messageInput.style.borderColor = "";

        }

    });

}


// ==========================================
// 5. CURRENT YEAR IN FOOTER
// ==========================================

const footerText = document.querySelector("footer p");

if (footerText) {

    const currentYear = new Date().getFullYear();

    footerText.textContent =
        `© ${currentYear} My Website`;

}


// ==========================================
// 6. PAGE LOAD MESSAGE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Website loaded successfully.");

});


// ==========================================
// 7. BACK TO TOP FUNCTION
// ==========================================

const backToTopButton = document.createElement("button");

backToTopButton.textContent = "↑";

backToTopButton.id = "backToTop";

backToTopButton.style.position = "fixed";
backToTopButton.style.bottom = "20px";
backToTopButton.style.right = "20px";
backToTopButton.style.display = "none";
backToTopButton.style.padding = "10px 15px";
backToTopButton.style.borderRadius = "50%";
backToTopButton.style.cursor = "pointer";

document.body.appendChild(backToTopButton);


// Show button when scrolling

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        backToTopButton.style.display = "block";

    } else {

        backToTopButton.style.display = "none";

    }

});


// Scroll to top

backToTopButton.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ==========================================
// 8. KEYBOARD ENTER SUPPORT
// ==========================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        const activeElement = document.activeElement;

        if (activeElement === nameInput ||
            activeElement === emailInput) {

            // Allow normal form behavior
            return;
        }

    }

});


// ==========================================
// 9. CONSOLE INFORMATION
// ==========================================

console.log("================================");
console.log("My Website JavaScript Started");
console.log("All functions are ready.");
console.log("================================");
