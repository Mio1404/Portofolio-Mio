document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("particles");

    if(canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            particles = [];

            for (let i = 0; i < 70; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 2 + 1,
                    speed: Math.random() * 0.5 + 0.2
                });
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(96, 165, 250, 0.7)";
                ctx.fill();

                p.y -= p.speed;

                if (p.y < 0) {
                    p.y = canvas.height;
                    p.x = Math.random() * canvas.width;
                }
            });

            requestAnimationFrame(animateParticles);
        }

        resizeCanvas();
        animateParticles();

        window.addEventListener("resize", resizeCanvas);
    }

    const revealElements = document.querySelectorAll(
        "main section h2, main section p, " +
        "#project button, .skill-image, #contact ul, " +
        ".foto-slider"
    );

    revealElements.forEach((el) => {
        el.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach((el) => observer.observe(el));
} else {
    revealElements.forEach((el) => el.classList.add("show"));
}

const track = document.querySelector(".foto-track");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");

if (track && prevBtn && nextBtn) {
    const photos =  track.querySelectorAll("img");
    let currentIndex = 0;

    function updateSlider() {
        track.style.transform = 
            `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % photos.length;
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        updateSlider();
    });
}

const typingText = document.getElementById("typing-text");

if (typingText) {
    const word = [
        "Hai, Saya Mio!",
        "Calon Software Engineer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = word[wordIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent = currentWord.substring(0, charIndex);
        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex == currentWord.length) {
            delay = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % word.length;
            delay = 400;
        }

        setTimeout(typeEffect, delay);
    }

    typeEffect();
}

const musicButton = document.getElementById('music-button');
const bgMusic = document.getElementById('bg-music');

musicButton.addEventListener('click', function () {
    if (bgMusic.paused) {
        bgMusic.play();
        musicButton.innerHTML = '<i class="fa-solid fa-music"></i> Musik On';
    } else {
        bgMusic.pause() 
        musicButton.innerHTML = '<i class="fa-solid fa-music"></i> Musik Off';
    }
}) 

    console.log("Efek partikel dan scroll berhasil dimuat");
});