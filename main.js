import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Menu Logic
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      hamburgerBtn.classList.toggle('active');
    });
  }

  // Mobile Dropdown Toggle Logic
  const dropdownTriggers = document.querySelectorAll('.nav-links .has-dropdown .dropdown-trigger, .nav-links .has-dropdown .dropdown-icon');
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Only apply toggle logic on mobile view
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const parentDropdown = trigger.closest('.has-dropdown');
        if (parentDropdown) {
          const menu = parentDropdown.querySelector('.dropdown-menu');
          const isOpening = !parentDropdown.classList.contains('mobile-dropdown-open');

          // Close other open dropdowns first
          document.querySelectorAll('.nav-links .has-dropdown').forEach(dropdown => {
            if (dropdown !== parentDropdown && dropdown.classList.contains('mobile-dropdown-open')) {
              dropdown.classList.remove('mobile-dropdown-open');
              const otherMenu = dropdown.querySelector('.dropdown-menu');
              if (otherMenu) {
                otherMenu.style.maxHeight = '0px';
                otherMenu.style.padding = '0px';
                otherMenu.style.marginTop = '0px';
                otherMenu.style.opacity = '0';
              }
            }
          });
          
          if (isOpening) {
            parentDropdown.classList.add('mobile-dropdown-open');
            // Temporarily set padding/margin to measure exact height
            menu.style.padding = '8px 0';
            menu.style.marginTop = '12px';
            menu.style.opacity = '1';
            // Add 20px to account for the top/bottom padding (16px) and borders (2px) that are currently transitioning from 0
            const realHeight = menu.scrollHeight + 20;
            menu.style.maxHeight = realHeight + 'px';
          } else {
            parentDropdown.classList.remove('mobile-dropdown-open');
            menu.style.maxHeight = '0px';
            menu.style.padding = '0px';
            menu.style.marginTop = '0px';
            menu.style.opacity = '0';
          }
        }
      }
    });
  });

  // Accordion Logic for Syllabus
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parentItem = trigger.closest('.accordion-item');
      
      // Close all other accordions
      document.querySelectorAll('.accordion-item').forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('active');
        }
      });
      
      // Toggle the clicked one
      parentItem.classList.toggle('active');
    });
  });

  // =========================================
  // LOADER AND SCROLL ANIMATIONS
  // =========================================

  // Capture start time to enforce cinematic loader duration
  const loadStartTime = Date.now();
  const minLoadingTime = 1600; // Matches CSS progress-line animation duration

  // Loader fade-out on window load
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      const elapsedTime = Date.now() - loadStartTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        loader.classList.add('hidden');
      }, remainingTime);
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add class to trigger CSS transition
        entry.target.classList.add('is-visible');
        
        // Stop observing so it only animates once
        observer.unobserve(entry.target);
        
        // Remove animation classes after transition completes
        // This prevents conflicts with native hover transitions (e.g. accordion)
        setTimeout(() => {
          entry.target.classList.remove('reveal-on-scroll', 'is-visible');
        }, 1000);
      }
    });
  }, observerOptions);

  // Start observing all reveal targets
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
});
