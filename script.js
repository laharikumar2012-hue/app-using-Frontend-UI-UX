document.addEventListener('DOMContentLoaded', () => {
    /* =========================================================
       1. AUTHENTICATION & LOGIN WORKFLOW
    ========================================================= */
    const loginPage = document.querySelector('.login-page');
    const appLayout = document.querySelector('.app');
    const mobileNav = document.querySelector('.mobile-nav');
    const loginForm = document.querySelector('.login-page form');
    const googleBtn = document.querySelector('.google-btn');

    // Handle standard login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = loginForm.querySelector('input[type="text"]');
            const userDisplay = document.querySelector('.current-user strong');
            const welcomeDisplay = document.querySelector('.welcome');

            if (usernameInput && usernameInput.value.trim() !== '') {
                const name = usernameInput.value.split('@')[0];
                if (userDisplay) userDisplay.textContent = name;
                if (welcomeDisplay) welcomeDisplay.textContent = `Good morning, ${name} ✨`;
            }

            // Transition from login to application
            loginPage.style.display = 'none';
            appLayout.style.display = 'flex';
            if (mobileNav) mobileNav.style.display = 'flex';
        });

        // Attach click listener to primary button as fallback
        const primaryLoginBtn = loginForm.querySelector('.primary-btn');
        if (primaryLoginBtn) {
            primaryLoginBtn.addEventListener('click', () => {
                loginForm.dispatchEvent(new Event('submit'));
            });
        }
    }

    // Google Sign-In simulation
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            loginPage.style.display = 'none';
            appLayout.style.display = 'flex';
            if (mobileNav) mobileNav.style.display = 'flex';
        });
    }


    /* =========================================================
       2. NAVIGATION & SECTION SWITCHING
    ========================================================= */
    const navLinks = document.querySelectorAll('.sidebar-nav a, .mobile-nav a');
    const pageSections = document.querySelectorAll('.page-section');

    function navigateToSection(targetId) {
        pageSections.forEach(section => {
            if (`#${section.id}` === targetId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                navigateToSection(href);
            }
        });
    });

    // Default view setup: Hide all sections except #home
    pageSections.forEach(section => {
        if (section.id !== 'home') {
            section.style.display = 'none';
        }
    });


    /* =========================================================
       3. POST INTERACTION (Likes, Save, Comments)
    ========================================================= */
    const postCards = document.querySelectorAll('.post-card');

    postCards.forEach(post => {
        const actionBtns = post.querySelectorAll('.post-actions button');
        const likeBtn = actionBtns[0];
        const saveBtn = actionBtns[actionBtns.length - 1];
        const likesCountElem = post.querySelector('.post-content strong');

        // Like button functionality
        if (likeBtn && likesCountElem) {
            let isLiked = false;
            let currentLikes = parseInt(likesCountElem.textContent.replace(/[^0-9]/g, '')) || 0;

            likeBtn.addEventListener('click', () => {
                isLiked = !isLiked;
                if (isLiked) {
                    likeBtn.textContent = '❤️';
                    likeBtn.style.color = '#e75aa7';
                    currentLikes += 1;
                } else {
                    likeBtn.textContent = '♡';
                    likeBtn.style.color = '';
                    currentLikes -= 1;
                }
                likesCountElem.textContent = `${currentLikes.toLocaleString()} likes`;
            });
        }

        // Save button functionality
        if (saveBtn) {
            let isSaved = false;
            saveBtn.addEventListener('click', () => {
                isSaved = !isSaved;
                saveBtn.style.color = isSaved ? 'var(--purple)' : '';
            });
        }
    });


    /* =========================================================
       4. AURA AI SEARCH & ASSISTANT INTERACTION
    ========================================================= */
    const aiSearchInput = document.querySelector('.ai-search input');
    const aiSearchBtn = document.querySelector('.ai-search button');
    const aiSuggestions = document.querySelectorAll('.ai-suggestions button');

    function handleAiQuery(query) {
        if (!query.trim()) return;
        alert(`Aura AI is processing your request: "${query}"`);
        if (aiSearchInput) aiSearchInput.value = '';
    }

    if (aiSearchBtn && aiSearchInput) {
        aiSearchBtn.addEventListener('click', () => {
            handleAiQuery(aiSearchInput.value);
        });

        aiSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAiQuery(aiSearchInput.value);
            }
        });
    }

    aiSuggestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const queryText = btn.textContent.trim();
            handleAiQuery(queryText);
        });
    });


    /* =========================================================
       5. FRIEND REQUESTS & FOLLOW SUGGESTIONS
    ========================================================= */
    // Accept / Decline Requests
    const requestCards = document.querySelectorAll('.request');
    requestCards.forEach(req => {
        const acceptBtn = req.querySelector('.accept');
        const declineBtn = req.querySelector('.decline');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                req.style.transition = '0.3s opacity, 0.3s transform';
                req.style.opacity = '0';
                req.style.transform = 'scale(0.9)';
                setTimeout(() => req.remove(), 300);
            });
        }

        if (declineBtn) {
            declineBtn.addEventListener('click', () => {
                req.style.transition = '0.3s opacity, 0.3s transform';
                req.style.opacity = '0';
                req.style.transform = 'scale(0.9)';
                setTimeout(() => req.remove(), 300);
            });
        }
    });

    // Follow / Following Toggle
    const followBtns = document.querySelectorAll('.suggested-user button, .reel-user button');
    followBtns.forEach(btn => {
        let isFollowing = false;
        btn.addEventListener('click', () => {
            isFollowing = !isFollowing;
            btn.textContent = isFollowing ? 'Following' : 'Follow';
            btn.style.background = isFollowing ? '#ebe7ef' : '';
            btn.style.color = isFollowing ? 'var(--text)' : '';
        });
    });


    /* =========================================================
       6. MESSAGES & CHAT FUNCTIONALITY
    ========================================================= */
    const conversations = document.querySelectorAll('.conversation');
    const chatHeaderUser = document.querySelector('.chat-header .user-info strong');
    const chatHeaderAvatar = document.querySelector('.chat-header .user-info .avatar');
    const chatBody = document.querySelector('.chat-body');
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input .send-btn');

    // Switch active conversation
    conversations.forEach(conv => {
        conv.addEventListener('click', () => {
            conversations.forEach(c => c.classList.remove('active'));
            conv.classList.add('active');

            const name = conv.querySelector('strong').textContent;
            const avatarChar = conv.querySelector('.avatar').textContent;

            if (chatHeaderUser) chatHeaderUser.textContent = name;
            if (chatHeaderAvatar) chatHeaderAvatar.textContent = avatarChar;
        });
    });

    // Send message logic
    function sendMessage() {
        if (!chatInput || !chatBody) return;
        const text = chatInput.value.trim();
        if (text === '') return;

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const msgElem = document.createElement('div');
        msgElem.className = 'message sent';
        msgElem.innerHTML = `${text}<small>${time}</small>`;

        chatBody.appendChild(msgElem);
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }


    /* =========================================================
       7. EXPLORE CATEGORIES & FILTER TABS
    ========================================================= */
    const categoryBtns = document.querySelectorAll('.category');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const profileTabs = document.querySelectorAll('.profile-tabs button');
    profileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            profileTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });


    /* =========================================================
       8. REELS INTERACTION
    ========================================================= */
    const reelActions = document.querySelectorAll('.reel-actions button');
    if (reelActions.length > 0) {
        const reelLikeBtn = reelActions[0];
        let reelLiked = false;

        reelLikeBtn.addEventListener('click', () => {
            reelLiked = !reelLiked;
            const span = reelLikeBtn.querySelector('span');
            if (span) {
                span.textContent = reelLiked ? '❤️' : '♡';
                span.style.color = reelLiked ? '#e75aa7' : '';
            }
        });
    }
});
