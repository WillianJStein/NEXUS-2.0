// 1. CURSOR
const cursor = document.getElementById('custom-cursor');
const blur = document.getElementById('cursor-blur');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    blur.animate({ left: e.clientX + 'px', top: e.clientY + 'px' }, { duration: 1000, fill: "forwards" });
});

// 2. PARTÍCULAS
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
    }
}
function init() { for(let i=0; i<100; i++) particles.push(new Particle()); }
function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init(); animate();

// 3. PARALLAX SUAVE (Apenas se houver scroll para não sumir com o conteúdo)
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if(heroContent) {
        heroContent.style.transform = `translateY(${scroll * 0.3}px)`;
        heroContent.style.opacity = 1 - (scroll / 700);
    }
});
