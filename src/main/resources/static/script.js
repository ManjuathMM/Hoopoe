document.addEventListener('DOMContentLoaded', function () {
  // ===== Mobile Menu Toggle =====
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

  // ===== Navbar scroll effect =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // ===== Color selector for bike models =====
  const colorOptions = document.querySelectorAll('.color-option');
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      const parent = option.parentElement;
      parent.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
    });
  });

  // ===== Animate on scroll =====
  function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      const rectTop = el.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.2;
      if (rectTop < screenPos) el.classList.add('animated');
    });
  }
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);

  // ===== Smooth scroll for anchor links =====
  function smoothScrollTo(target) {
    const navOffset = 80;
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - navOffset, behavior: 'smooth' });

    if (navLinks?.classList.contains('active')) {
      navLinks.classList.remove('active');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') smoothScrollTo(targetId);
    });
  });

  document.querySelectorAll('.btn[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => smoothScrollTo(btn.getAttribute('data-scroll')));
  });

  // ===== HERO: Video Transition =====
  const heroMediaContainer = document.querySelector('.hero-media-container');
  if (heroMediaContainer) {
    const videos = Array.from(document.querySelectorAll('.hero-media'));
    let currentVideoIndex = 0;
    let videoTimeout;

    function playNextVideo() {
      // Hide current video
      videos[currentVideoIndex].classList.remove('active');
      
      // Move to next video (loop back to 0 if at end)
      currentVideoIndex = (currentVideoIndex + 1) % videos.length;

      // Show new video
      const nextVideo = videos[currentVideoIndex];
      nextVideo.classList.add('active');
      
      // Schedule next transition
      clearTimeout(videoTimeout);
      videoTimeout = setTimeout(playNextVideo, 8000); // 8 seconds per video
    }

    // Initialize - play first video
    videos[0].classList.add('active');
    
    // Start the rotation
    videoTimeout = setTimeout(playNextVideo, 8000);

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearTimeout(videoTimeout);
        videos.forEach(v => v.pause());
      } else {
        videos[currentVideoIndex].play().catch(e => console.log('Video play error:', e));
      }
    });
  }

  // ===== Ensure videos play when they come into view =====
  const videos = document.querySelectorAll('video');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(e => console.log('Video autoplay error:', e));
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.5 });

  videos.forEach(video => {
    observer.observe(video);
  });
});