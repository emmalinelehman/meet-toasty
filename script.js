const canvas = document.getElementById('ember-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let embers = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

class Ember {
    constructor() {
        this.reset();
        // Start loose in the view initially
        this.y = Math.random() * height;
    }

    reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100; // Start below screen
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.fadeRate = Math.random() * 0.005 + 0.002;
        this.color = `255, ${Math.floor(Math.random() * 100 + 100)}, 0`; // Orange-Yellow range
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity -= this.fadeRate;

        // Oscillate x slightly
        this.x += Math.sin(this.y * 0.05) * 0.2;

        if (this.y < -10 || this.opacity <= 0) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance
    }
}

function initEmbers() {
    for (let i = 0; i < 150; i++) {
        embers.push(new Ember());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    embers.forEach(ember => {
        ember.update();
        ember.draw();
    });

    requestAnimationFrame(animate);
}

initEmbers();
animate();

/* Lightbox Logic */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('lightbox-caption');
const closeBtn = document.getElementsByClassName('lightbox-close')[0];

// Get all images in the gallery grid and concept sketches
const galleryImages = document.querySelectorAll('.gallery-grid img, .concept-sketches img, .motivation-image img, .audience-visuals figure img');

galleryImages.forEach(img => {
    img.addEventListener('click', function () {
        lightbox.style.display = "block";
        lightboxImg.src = this.src;
        captionText.innerHTML = this.alt;
    });
});

// Close when clicking the close button
closeBtn.onclick = function () {
    lightbox.style.display = "none";
}

// Close when clicking outside the image
lightbox.onclick = function (event) {
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
}

// Close on Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        lightbox.style.display = "none";
    }
});
