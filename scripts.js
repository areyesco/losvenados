document.addEventListener('DOMContentLoaded', function() {
    // Hero Carousel
    const heroCarousel = document.querySelector('#hero .carousel #hero-carousel-img');
    const heroImages = [
        'cabana5_2.jpeg',
        'cabana1_1.jpeg',
        'cabana6y7_1.jpeg',
        'cabana6y7_5.jpeg',
        'cabana3_7.jpeg',
        'cabana4_6.jpeg',
        'cabana5_3.jpeg',
    ];
    let currentHeroImage = 0;

    function rotateHeroImage() {
        currentHeroImage = (currentHeroImage + 1) % heroImages.length;
        heroCarousel.src = `images/${heroImages[currentHeroImage]}`;
    }

    setInterval(rotateHeroImage, 3000);

    // Cabin Galleries
    const cabins = document.querySelectorAll('.cabin');
    cabins.forEach((cabin, index) => {
        const cabinNumber = cabin.getAttribute("cabinNumber");
        const gallery = cabin.querySelector('.cabin-gallery');

        // Add images
        for (let i = 1; i <= 8; i++) {
            const img = document.createElement('img');
            img.src = `images/cabana${cabinNumber}_${i}.jpeg`;
            img.alt = `Cabaña ${cabinNumber} - Imagen ${i}`;
            gallery.appendChild(img);
        }

        // Add video
        const video = document.createElement('video');
        video.src = `videos/cabana${cabinNumber}_1.mp4`;
        video.controls = true;
        gallery.appendChild(video);
    });

    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Toggle functionality for cabin details
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentDivCabin = this.closest('.cabin');;
            const cabinGallery = parentDivCabin.querySelector('.cabin-gallery');
            if (cabinGallery.classList.contains('show')) {
                cabinGallery.classList.remove('show');
            } else {
                cabinGallery.classList.add('show');
            }
        });
    });


    // Function to truncate text
    function truncateText(element, maxWords) {
        const fullText = element.innerText;
        const wordsArray = fullText.split(' ');

        if (wordsArray.length > maxWords) {
            const visibleText = wordsArray.slice(0, maxWords).join(' ');
            const hiddenText = wordsArray.slice(maxWords).join(' ');

            element.innerHTML = `${visibleText} <span class="show-more">más...</span><span class="hidden-text" style="display:none;"> ${hiddenText}</span>`;
        }
    }

    // Apply truncation to each p element within .cabin-details
    const cabinDetailsParagraphs = document.querySelectorAll('.cabin-details p');
    cabinDetailsParagraphs.forEach(paragraph => {
        truncateText(paragraph, 6); // Truncate to the first 4 words
    });

    // Add event listener to "más..." links
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('show-more')) {
            const hiddenText = event.target.nextElementSibling;
            event.target.style.display = 'none'; // Hide the "más..." link
            hiddenText.style.display = 'inline'; // Show the hidden text

            // Ensure only the clicked cabin's text is expanded
            const cabinDetails = event.target.closest('.cabin-details');
            const allHiddenTexts = cabinDetails.querySelectorAll('.hidden-text');
            const allShowMoreLinks = cabinDetails.querySelectorAll('.show-more');

            allShowMoreLinks.forEach(link => {
                if (link !== event.target) {
                    link.style.display = 'inline'; // Show other "más..." links
                }
            });

            allHiddenTexts.forEach(text => {
                if (text !== hiddenText) {
                    text.style.display = 'none'; // Hide other expanded texts
                }
            });
        }
    });
});