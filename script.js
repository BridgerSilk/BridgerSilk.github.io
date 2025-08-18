document.addEventListener('DOMContentLoaded', () => {

    // const cursorGlow = document.getElementById('cursor-glow');
    // document.addEventListener('mousemove', (e) => {
    //     cursorGlow.style.left = `${e.clientX}px`;
    //     cursorGlow.style.top = `${e.clientY}px`;
    // });
    
    const glowContainer = document.getElementById('pixel-glow');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    glowContainer.appendChild(canvas);

    const mouse = { x: -1000, y: -1000 };
    const glow = { x: -1000, y: -1000 };
    const easing = 0.08;

    const PIXEL_SIZE = 25;
    let cols, rows;

    function setup() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cols = Math.ceil(canvas.width / PIXEL_SIZE);
        rows = Math.ceil(canvas.height / PIXEL_SIZE);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const glowRadius = 300;
        const purple = [160, 112, 255];

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * PIXEL_SIZE;
                const y = j * PIXEL_SIZE;
                const dx = x - glow.x;
                const dy = y - glow.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < glowRadius) {
                    const falloff = (glowRadius - dist) / glowRadius;
                    const alpha = Math.pow(falloff, 2) * 0.25;
                    const alphaStroke = Math.pow(falloff, 2) * 0.1;

                    ctx.fillStyle = `rgba(${purple[0]}, ${purple[1]}, ${purple[2]}, ${alpha})`;
                    ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);

                    ctx.lineWidth = 2;
                    ctx.strokeStyle = `rgba(${purple[0]}, ${purple[1]}, ${purple[2]}, ${alphaStroke})`;
                    ctx.strokeRect(x + 1, y + 1, PIXEL_SIZE - 2, PIXEL_SIZE - 2);
                }
            }
        }
    }

    function animate() {
        glow.x += (mouse.x - glow.x) * easing;
        glow.y += (mouse.y - glow.y) * easing;
        
        draw();
        requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    document.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    window.addEventListener('resize', setup);
    
    setup();
    animate();


    const typed = new Typed('#role', {
        strings: ['Front-End Developer', 'Back-End Developer', 'Problem Solver', 'Minecraft Plugin Developer', 'Minecraft Mod Developer', 'Server Administrator'],
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 1000,
        loop: true,
    });

    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();


    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.header .navbar a');

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('.header .navbar a[href*=' + id + ']').classList.add('active');
                });
            }
        });
    };
});