document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navCtaLink = document.querySelector('.nav-cta a');

  if (!navbar || !hamburger || !navLinks) {
    return;
  }

  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  mobileNav.setAttribute('aria-hidden', 'true');

  const mobileLinks = [...navLinks.querySelectorAll('a')].map((link) => {
    const clone = link.cloneNode(true);
    clone.removeAttribute('id');
    return clone;
  });

  if (navCtaLink) {
    const ctaClone = navCtaLink.cloneNode(true);
    ctaClone.removeAttribute('id');
    mobileLinks.push(ctaClone);
  }

  mobileLinks.forEach((link) => mobileNav.appendChild(link));
  body.appendChild(mobileNav);

  const revealNodes = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));

  const setMenuState = (isOpen) => {
    mobileNav.classList.toggle('open', isOpen);
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    hamburger.setAttribute('aria-expanded', String(isOpen));
    body.classList.toggle('menu-open', isOpen);
  };

  const closeMenu = () => setMenuState(false);

  hamburger.setAttribute('aria-controls', 'mobile-navigation');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.id = 'mobile-navigation';

  hamburger.addEventListener('click', () => {
    setMenuState(!mobileNav.classList.contains('open'));
  });

  mobileNav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (
      mobileNav.classList.contains('open') &&
      event.target instanceof Node &&
      !mobileNav.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });

  window.addEventListener(
    'scroll',
    () => {
      navbar.classList.toggle('scrolled', window.scrollY > 12);
    },
    { passive: true }
  );

  navbar.classList.toggle('scrolled', window.scrollY > 12);
});
