// Lógica para o comparador de imagens "Antes e Depois"
        function updateSlider(element) {
            const slider = element;
            const container = slider.closest('.comparison-slider');
            const topImage = container.querySelector('.img-top');
            const sliderLine = container.querySelector('.slider-line');
            const sliderButton = container.querySelector('.slider-button');
            
            let value = slider.value;
            topImage.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0% 100%)`;
            sliderLine.style.left = `${value}%`;
            sliderButton.style.left = `${value}%`;
        }
        
        document.addEventListener('DOMContentLoaded', () => {

            // Animação do Canvas no Hero
            const canvas = document.getElementById('hero-canvas');
            const ctx = canvas.getContext('2d');
            let particles = [];

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resizeCanvas();

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2 + 1;
                    this.speedX = (Math.random() * 0.5 - 0.25);
                    this.speedY = (Math.random() * 0.5 - 0.25);
                    this.color = '#9d72ff';
                }
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;

                    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
                }
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            function initParticles() {
                particles = [];
                let numberOfParticles = (canvas.width * canvas.height) / 9000;
                for(let i=0; i < numberOfParticles; i++) {
                    particles.push(new Particle());
                }
            }
            initParticles();

            function connectParticles() {
                for (let a = 0; a < particles.length; a++) {
                    for (let b = a; b < particles.length; b++) {
                        let distance = Math.sqrt(
                            Math.pow(particles[a].x - particles[b].x, 2) + 
                            Math.pow(particles[a].y - particles[b].y, 2)
                        );

                        if(distance < 100) {
                            ctx.strokeStyle = `rgba(157, 114, 255, ${1 - distance/100})`;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            function animate() {
                ctx.clearRect(0,0, canvas.width, canvas.height);
                for(let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                }
                connectParticles();
                requestAnimationFrame(animate);
            }
            animate();
            window.addEventListener('resize', () => {
                resizeCanvas();
                initParticles();
            });


            // Menu Mobile
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            document.querySelectorAll('#mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });

            // Animação de Scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-in-section').forEach(section => {
                observer.observe(section);
            });
            
            // Lógica do Portfólio
            const portfolioData = [
                {
                    image_before: 'https://placehold.co/800x600/6b7280/f0e6ff?text=Antes',
                    image_after: 'https://placehold.co/800x600/2d2a5d/daa520?text=Depois',
                    title: 'Restaurante Sabor Real',
                    description: 'Aumento de 40% nas Reservas Online após a criação de uma identidade visual sofisticada e otimização da presença online.'
                },
                {
                    image_before: 'https://placehold.co/800x600/6b7280/f0e6ff?text=Antes',
                    image_after: 'https://placehold.co/800x600/333333/9d72ff?text=Depois',
                    title: 'Marca Pessoal - Digital Creator',
                    description: 'Crescimento de 200% em Engajamento com a nova identidade visual, que fortaleceu a marca e gerou mais parcerias.'
                },
                 {
                    image_before: 'https://placehold.co/800x600/6b7280/f0e6ff?text=Antes',
                    image_after: 'https://placehold.co/800x600/2d2a5d/f0e6ff?text=Depois',
                    title: 'Cafeteria Aroma',
                    description: 'Elevação da Percepção de Valor através de um rebranding completo, permitindo um reposicionamento no mercado.'
                },
                {
                    image_before: 'https://placehold.co/800x600/6b7280/f0e6ff?text=Antes',
                    image_after: 'https://placehold.co/800x600/daa520/2d2a5d?text=Depois',
                    title: 'E-commerce de Moda',
                    description: 'Aumento de 35% na taxa de conversão após redesign da interface do usuário e otimização das fotos de produto.'
                },
                {
                    image_before: 'https://placehold.co/800x600/6b7280/f0e6ff?text=Antes',
                    image_after: 'https://placehold.co/800x600/2d2a5d/9d72ff?text=Depois',
                    title: 'Advocacia & Consultoria',
                    description: 'Desenvolvimento de site institucional que aumentou a captação de leads qualificados em 50%, transmitindo credibilidade.'
                },
                {
                    image_before: 'https://placehold.co/800x600/6b7280/f0e6ff?text=Antes',
                    image_after: 'https://placehold.co/800x600/333333/daa520?text=Depois',
                    title: 'Embalagens de Café Especial',
                    description: 'Novas embalagens que resultaram em um aumento de 25% nas vendas em varejo e melhoraram o reconhecimento da marca.'
                }
            ];

            const portfolioGrid = document.getElementById('portfolio-grid');
            portfolioData.forEach(project => {
                const projectCard = `
                    <div class="portfolio-item">
                        <div class="comparison-slider">
                            <img src="${project.image_before}" alt="Imagem antes do tratamento para ${project.title}">
                            <img src="${project.image_after}" alt="Imagem depois do tratamento para ${project.title}" class="img-top">
                            <input type="range" min="0" max="100" value="50" class="slider" aria-label="Percentage of before photo shown" oninput="updateSlider(this)">
                            <div class="slider-line"></div>
                            <div class="slider-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 5l-10 7 10 7V5z"></path><path d="M7 5l10 7-10 7V5z"></path></svg>
                            </div>
                        </div>
                        <div class="mt-4">
                            <h3 class="text-xl font-bold text-dourado-prestigio">${project.title}</h3>
                            <p class="text-lavanda-palida opacity-90">${project.description}</p>
                        </div>
                    </div>
                `;
                portfolioGrid.innerHTML += projectCard;
            });

        });
