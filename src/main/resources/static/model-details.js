document.addEventListener('DOMContentLoaded', function() {
  // Image Gallery Functionality - FIXED
  const mainImage = document.querySelector('.main-image');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentImageIndex = 0;
  
  if (thumbnails.length > 0 && mainImage) {
    // Set up thumbnail click functionality
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', function() {
        const newSrc = this.getAttribute('src');
        mainImage.setAttribute('src', newSrc);
        
        // Update active thumbnail
        thumbnails.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Update current index
        currentImageIndex = index;
      });
    });
    
    // Set up navigation buttons if they exist
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
        updateMainImage();
      });
      
      nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
        updateMainImage();
      });
    }
    
    function updateMainImage() {
      const newSrc = thumbnails[currentImageIndex].getAttribute('src');
      mainImage.setAttribute('src', newSrc);
      
      // Update active thumbnail
      thumbnails.forEach(t => t.classList.remove('active'));
      thumbnails[currentImageIndex].classList.add('active');
    }
  }

  // Color Selector
  const colorOptions = document.querySelectorAll('.color-option');
  const selectedColorName = document.getElementById('selected-color');
  
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      const colorName = this.getAttribute('data-color-name');
      
      // Update active color
      colorOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      
      // Update color name display
      if (selectedColorName) {
        selectedColorName.textContent = colorName;
      }
      
      // Update main image if color variants exist
      const colorImageMap = {
        'Sunset Orange': '../img5.png', // Default orange image for Explorer Pro
        'Silver': '../img5.png', // Same image for silver (until you add silver pictures)
        // Urban Commuter colors
        'Midnight Black': '../img4.png',
        'Slate Gray': '../img4.png',
        'Ruby Red': '../img4.png',
        // Performance Pro colors
        'Carbon Black': '../img10.png',
        'Racing Red': '../img10.png',
        'Pearl White': '../img10.png'
      };
      
      if (colorImageMap[colorName]) {
        mainImage.setAttribute('src', colorImageMap[colorName]);
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Update prebook link with selected color
  const prebookLinks = document.querySelectorAll('.prebook-link-btn');
  const productTitle = document.querySelector('.product-title')?.textContent;
  const productPriceElement = document.querySelector('.product-price');
  
  if (prebookLinks.length > 0 && productTitle && productPriceElement) {
    // Extract price and clean it (remove ₹ and commas)
    const productPrice = productPriceElement.textContent.replace('₹', '').replace(/,/g, '');
    
    prebookLinks.forEach((link, index) => {
      // Create the preorder URL with correct parameters
      const preorderUrl = `/preorder?model=${encodeURIComponent(productTitle)}&price=${productPrice}`;
      
      // Set the href attribute
      link.href = preorderUrl;
      
      // Remove any existing click event listeners to avoid conflicts
      link.replaceWith(link.cloneNode(true));
      
      // Get the new link element
      const newLink = document.querySelectorAll('.prebook-link-btn')[index];
      
      // Add click event listener for better user experience
      newLink.addEventListener('click', function(e) {
        // The link will navigate naturally since href is set
      });
    });
  }

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.spec-card, .model-card');
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initialize elements for animation
  document.querySelectorAll('.spec-card, .model-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }
});