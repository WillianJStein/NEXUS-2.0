// 1. Mouse e Brilho Magnético para os Cards
document.addEventListener('mousemove', (e) => {
    // Cursor customizado
    const cursor = document.getElementById('custom-cursor');
    const blur = document.getElementById('cursor-blur');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    blur.animate({ left: e.clientX + 'px', top: e.clientY + 'px' }, { duration: 800, fill: "forwards" });

    // Efeito Magnético nos Cards
    const cards = document.querySelectorAll('.bento-item, .glass');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// 2. Partículas Suaves
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
    }
}
function init() { for(let i=0; i<80; i++) particles.push(new Particle()); }
function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init(); animate();
