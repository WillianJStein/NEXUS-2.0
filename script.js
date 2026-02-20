// 1. MOUSE E CURSOR REATIVO
const cursor = document.getElementById('custom-cursor');
const blur = document.getElementById('cursor-blur');

document.addEventListener('mousemove', (e) => {
    // Posicionamento suave
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    blur.animate({
        left: e.clientX + 'px',
        top: e.clientY + 'px'
    }, { duration: 800, fill: "forwards" });

    // Efeito Magnético nos Cards (Bento Grid)
    const cards = document.querySelectorAll('.bento-item, .glass');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Lógica para o cursor "crescer" em links e botões
const clickables = document.querySelectorAll('a, button, .bento-item, .project-card');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// 2. PARTÍCULAS COM GLOW (BRILHO)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.x += this.speedX; 
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        // Adiciona Brilho (Glow) às partículas
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00f2ff";
        ctx.fillStyle = "rgba(0, 242, 255, 0.8)";
        
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fill();
        
        // Reset do shadow para não pesar o resto do canvas
        ctx.shadowBlur = 0;
    }
}

function init() { 
    particles = [];
    for(let i=0; i<100; i++) particles.push(new Particle()); 
}

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

init(); 
animate();

// Ajuste de tela
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Simples alternador de imagens para o portfólio
const portfolioImgs = [
    'link-da-foto-6-login.jpg',
    'link-da-foto-7-dashboard.jpg',
    'link-da-foto-8-kanban.jpg'
];
let currentImg = 0;

const viewer = document.querySelector('.image-viewer img');

if (viewer) {
    setInterval(() => {
        currentImg = (currentImg + 1) % portfolioImgs.length;
        viewer.style.opacity = 0;
        setTimeout(() => {
            viewer.src = portfolioImgs[currentImg];
            viewer.style.opacity = 1;
        }, 500);
    }, 4000); // Troca a cada 4 segundos
}
