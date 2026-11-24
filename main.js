/**
 * PlaySafe Recovery Hub - Shared Vanilla JavaScript
 * Handles:
 * 1. Mobile navigation menu toggle (with accessibility & keyboard support)
 * 2. Active nav link highlight based on current page URL
 */

(function () {
  'use strict';

  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', initApp);

  function initApp() {
    setupMobileMenu();
    highlightActiveNavLink();
  }

  /**
   * Sets up the mobile hamburger menu toggle, backdrop dismissal,
   * keyboard Escape handling, and window resize listeners.
   */
  function setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-btn');
    const primaryNav = document.getElementById('primary-nav');

    if (!menuToggle || !primaryNav) {
      return;
    }

    // Toggle menu open/close on button click
    menuToggle.addEventListener('click', function (event) {
      event.stopPropagation();
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      toggleMenu(!isExpanded);
    });

    // Close menu when clicking any nav link
    const navLinks = primaryNav.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 1025) {
          toggleMenu(false);
        }
      });
    });

    // Close menu when clicking outside of the header / nav
    document.addEventListener('click', function (event) {
      const isClickInside = primaryNav.contains(event.target) || menuToggle.contains(event.target);
      if (!isClickInside && primaryNav.classList.contains('is-open')) {
        toggleMenu(false);
      }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        toggleMenu(false);
        menuToggle.focus();
      }
    });

    // Close mobile menu on desktop viewport resize
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1025 && primaryNav.classList.contains('is-open')) {
        toggleMenu(false);
      }
    });

    function toggleMenu(open) {
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        primaryNav.classList.add('is-open');
      } else {
        primaryNav.classList.remove('is-open');
      }
    }
  }

  /**
   * Highlights the active navigation item matching the current page.
   * Handles local file URLs (file:///...) and web server paths.
   */
  function highlightActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navLinks.length) return;

    // Extract current filename from pathname (e.g., 'injury-finder.html')
    const pathname = window.location.pathname;
    let currentFileName = pathname.substring(pathname.lastIndexOf('/') + 1).toLowerCase();

    // Default to 'index.html' when accessing root directory
    if (!currentFileName || currentFileName === '' || currentFileName === '/') {
      currentFileName = 'index.html';
    }

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;

      // Extract target filename from href
      const targetFileName = href.substring(href.lastIndexOf('/') + 1).toLowerCase();

      // Check if filenames match
      if (targetFileName === currentFileName) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }
})();
