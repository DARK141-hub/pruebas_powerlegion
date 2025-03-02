    document.addEventListener('DOMContentLoaded', function() {
        const track = document.querySelector('.carousel-track');
        const slides = document.querySelectorAll('.carousel-slide');
        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');
        const dotsContainer = document.querySelector('.carousel-dots');
        
        let currentIndex = 0;
        const slidesToShow = 4;
        const slideWidth = 100 / slidesToShow;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        const dots = document.querySelectorAll('.dot');
        
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
            updateDots();
        }
        
        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - slidesToShow) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0);
            }
        });
        
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(slides.length - slidesToShow);
            }
        });
        
        // Auto advance slides
        setInterval(() => {
            if (currentIndex < slides.length - slidesToShow) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0);
            }
        }, 5000); // Change slides every 5 seconds
    });