/**
 * Website Initialization Module
 */
const CGHRI = (() => {
  // Configuration Constants
  const SLIDE_INTERVAL = 5000;
  const MOBILE_BREAKPOINT = 768;
  const SELECTORS = {
      MENU_TOGGLE: '.menu-toggle',
      NAV_LINKS: '.nav-links',
      DROPDOWN: '.dropdown',
      DROPDOWN_TOGGLE: '.dropdown > a',
      DROPDOWN_MENU: '.dropdown-menu'
  };

  /** Mobile Navigation Manager */
  class MobileMenu {
      constructor() {
          this.menuToggle = document.querySelector(SELECTORS.MENU_TOGGLE);
          this.navLinks = document.querySelector(SELECTORS.NAV_LINKS);
          this.isOpen = false;
      }

      init() {
          if (this.menuToggle && this.navLinks) {
              this.menuToggle.addEventListener('click', this.toggle.bind(this));
              this.initDropdowns();
          }
      }

      toggle() {
          this.isOpen = !this.isOpen;
          this.navLinks.classList.toggle('active');
          this.menuToggle.classList.toggle('active');
          document.body.style.overflow = this.isOpen ? 'hidden' : '';
      }

      initDropdowns() {
          document.querySelectorAll(SELECTORS.DROPDOWN_TOGGLE).forEach(link => {
              link.addEventListener('click', (e) => {
                  if (window.innerWidth <= MOBILE_BREAKPOINT) {
                      e.preventDefault();
                      const parent = link.parentElement;
                      parent.classList.toggle('active');
                      parent.style.zIndex = this.isOpen ? '1002' : 'auto';
                  }
              });
          });
      }
  }

  /** Dropdown Manager (Desktop + Mobile) */
  class DropdownManager {
      constructor() {
          this.dropdowns = document.querySelectorAll(SELECTORS.DROPDOWN);
          this.isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      }

      init() {
          if (this.isMobile) {
              this.initMobile();
          } else {
              this.initDesktop();
          }
          this.addResizeListener();
      }

      initDesktop() {
          this.dropdowns.forEach(dropdown => {
              dropdown.addEventListener('mouseenter', this.show.bind(this));
              dropdown.addEventListener('mouseleave', this.hide.bind(this));
          });
      }

      initMobile() {
          document.addEventListener('click', this.handleDocumentClick.bind(this));
      }

      show(e) {
          if (!this.isMobile) {
              this.hideAll();
              e.currentTarget.classList.add('active');
          }
      }

      hide(e) {
          if (!this.isMobile) {
              e.currentTarget.classList.remove('active');
          }
      }

      hideAll() {
          this.dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
      }

      handleDocumentClick(e) {
          if (!e.target.closest(SELECTORS.DROPDOWN)) {
              this.hideAll();
          }
      }

      addResizeListener() {
          window.addEventListener('resize', () => {
              const newMobileState = window.innerWidth <= MOBILE_BREAKPOINT;
              if (newMobileState !== this.isMobile) {
                  this.isMobile = newMobileState;
                  this.hideAll();
                  if (this.isMobile) {
                      this.initMobile();
                  } else {
                      this.initDesktop();
                  }
              }
          });
      }
  }

  /** Initialize All Components */
  const init = () => {
      // Initialize mobile menu
      const mobileMenu = new MobileMenu();
      mobileMenu.init();

      // Initialize dropdowns
      const dropdownManager = new DropdownManager();
      dropdownManager.init();

      // Initialize other components...
  };

  // Public API
  return { init };
})();

// Initialize when ready
document.addEventListener('DOMContentLoaded', CGHRI.init);


document.addEventListener("DOMContentLoaded", function () {
    // Select all tree nodes
    const nodes = document.querySelectorAll(".tree li");
    
    nodes.forEach(node => {
        const connector = node.querySelector("::before");
        if (connector) {
            // Dynamically adjust connector height based on parent-child distance
            const parent = node.parentElement.closest("li");
            if (parent) {
                const distance = parent.offsetTop - node.offsetTop;
                connector.style.height = `${Math.abs(distance)}px`;
            }
        }
    });

    // Ensure tree centers correctly on smaller screens
    function adjustTreeLayout() {
        const tree = document.querySelector(".tree");
        if (window.innerWidth < 768) {
            tree.style.zoom = "0.85";
        } else {
            tree.style.zoom = "1";
        }
    }

    // Apply layout adjustment on resize
    window.addEventListener("resize", adjustTreeLayout);
    adjustTreeLayout(); // Run once initially
});

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');

    let index = 0;
    const totalSlides = slides.length;

    function updateSlide(position) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === position ? '1' : '0';
        });

        dots.forEach(dot => dot.classList.remove('active'));
        dots[position].classList.add('active');
    }

    next.addEventListener('click', () => {
        index = (index + 1) % totalSlides;
        updateSlide(index);
    });

    prev.addEventListener('click', () => {
        index = (index - 1 + totalSlides) % totalSlides;
        updateSlide(index);
    });

    // Auto slide effect
    setInterval(() => {
        index = (index + 1) % totalSlides;
        updateSlide(index);
    }, 3000);

    // Ensure first slide is visible on load
    updateSlide(index);
});