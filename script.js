// Global scope variable
let currentTheme = "light";

// Part 2: Functions with Params + Return Values
function flipCard(card) {
    card.classList.toggle("flipped");
}

function toggleTheme() {
    const body = document.body;
    if (currentTheme === "light") {
        body.classList.add("dark");
        currentTheme = "dark";
    } else {
        body.classList.remove("dark");
        currentTheme = "light";
    }
}

function showModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
    modal.classList.add("show");
}

function hideModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("show");
    setTimeout(() => modal.classList.add("hidden"), 500);
    launchConfetti();
}

// Confetti Animation
function launchConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: 10,
        h: 10,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        speed: Math.random() * 3 + 2
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.w, p.h);
            p.y += p.speed;
            if (p.y > canvas.height) p.y = -p.h;
        });
        requestAnimationFrame(draw);
    }
    draw();

  // Stop confetti after 3s
    setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 3000);
}

// Scroll-triggered animation
    function handleScroll() {
        const elements = document.querySelectorAll(".scroll-animate");
        const triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            el.classList.add("visible");
        }
    });
}

// Event Listeners
document.getElementById("themeToggle").addEventListener("click", toggleTheme);
document.getElementById("modalBtn").addEventListener("click", showModal);
document.getElementById("closeModal").addEventListener("click", hideModal);
window.addEventListener("scroll", handleScroll);

// Run once on load
handleScroll();