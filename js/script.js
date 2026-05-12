/* ════════════════════════════════════════
   GLOBAL PORTFOLIO + DASHBOARD SCRIPT
   Merged JS File (No Function Removed)
   ════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

  /* ─────────────────────────────────────
     HAMBURGER MENU
     ───────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  /* ─────────────────────────────────────
     NAV SHADOW ON SCROLL
     ───────────────────────────────────── */
  const nav = document.getElementById('main-nav');

  if (nav) {

    window.addEventListener('scroll', () => {

      nav.style.boxShadow =
        window.scrollY > 40
          ? '0 4px 32px rgba(0,0,0,0.4)'
          : 'none';
    });
  }

  /* ─────────────────────────────────────
     SCROLL REVEAL
     ───────────────────────────────────── */
  const revealElements = document.querySelectorAll(
    '.reveal, .timeline-item, .project-card, .edu-card'
  );

  if (revealElements.length > 0) {

    // stagger effects
    document.querySelectorAll('.project-card').forEach((el, i) => {
      el.dataset.delay = i * 80;
    });

    document.querySelectorAll('.edu-card').forEach((el, i) => {
      el.dataset.delay = i * 100;
    });

    const observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          setTimeout(() => {

            entry.target.classList.add('visible');

          }, entry.target.dataset.delay || 0);

          observer.unobserve(entry.target);
        }
      });

    }, { threshold: 0.08 });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ─────────────────────────────────────
     FLOATING PARTICLES
     ───────────────────────────────────── */
  const canvas = document.createElement('canvas');

  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.35;
  `;

  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');

  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {

    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 28 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.4,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    o: Math.random() * 0.5 + 0.1
  }));

  function drawParticles() {

    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

      ctx.fillStyle = `rgba(0,212,170,${p.o})`;
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {

      for (let j = i + 1; j < particles.length; j++) {

        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {

          ctx.beginPath();

          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);

          ctx.strokeStyle =
            `rgba(0,212,170,${0.06 * (1 - dist / 120)})`;

          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }

  drawParticles();

  /* ─────────────────────────────────────
     CERTIFICATE MODAL
     ───────────────────────────────────── */
  const certModalOverlay =
    document.getElementById("certModalOverlay");

  window.openCertModal = function (card) {

    if (!certModalOverlay) return;

    const name = card.dataset.name;
    const org = card.dataset.org;
    const icon = card.dataset.icon;
    const type = card.dataset.type;
    const skills = card.dataset.skills;
    const link = card.dataset.link;
    const image = card.dataset.image;

    document.getElementById("certModalName").textContent = name;
    document.getElementById("certModalIssuer").textContent = org;
    document.getElementById("certModalIcon").textContent = icon;

    document.getElementById("certMetaType").textContent = type;
    document.getElementById("certMetaOrg").textContent = org;
    document.getElementById("certMetaSkills").textContent = skills;

    document.getElementById("certVerifyLink").href = link;

    const previewArea =
      document.getElementById("certPreviewArea");

    if (image && image !== "#") {

      previewArea.classList.add("has-image");

      previewArea.innerHTML = `
        <img src="${image}" alt="${name}">
      `;

    } else {

      previewArea.classList.remove("has-image");

      previewArea.innerHTML = `
        <div class="cert-preview-mock">

          <span class="cert-mock-logo">
            ${icon}
          </span>

          <div class="cert-mock-title">
            Certificate of Completion
          </div>

          <div class="cert-mock-name-display">
            Soumya Ranjan Rout
          </div>

          <div class="cert-mock-course">
            ${name}
          </div>

          <div class="cert-mock-divider"></div>

          <div class="cert-mock-issuer-label">
            Issued By
          </div>

          <div class="cert-mock-issuer-name">
            ${org}
          </div>

          <div class="cert-mock-seal">
            🏅
          </div>

        </div>
      `;
    }

    certModalOverlay.classList.add("open");

    document.body.style.overflow = "hidden";
  };

  window.closeCertModal = function () {

    if (!certModalOverlay) return;

    certModalOverlay.classList.remove("open");

    document.body.style.overflow = "auto";
  };

  window.closeCertModalOnOverlay = function (event) {

    if (event.target === certModalOverlay) {
      closeCertModal();
    }
  };

  document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {
      closeCertModal();
    }
  });

  /* ─────────────────────────────────────
     CAROUSEL
     ───────────────────────────────────── */
  (function () {

    const track =
      document.getElementById('activitiesTrack');

    const dotsContainer =
      document.getElementById('carouselDots');

    if (!track) return;

    const originalCards =
      Array.from(track.querySelectorAll('.activity-card'));

    // clone cards
    originalCards.forEach(card => {

      const clone = card.cloneNode(true);

      track.appendChild(clone);
    });

    let current = 0;

    let autoSlide;

    const speed = 3000;

    function buildDots() {

      if (!dotsContainer) return;

      dotsContainer.innerHTML = '';

      originalCards.forEach((_, i) => {

        const dot = document.createElement('button');

        dot.className =
          'carousel-dot' +
          (i === 0 ? ' active' : '');

        dot.addEventListener('click', () => {

          current = i;

          updateCarousel(true);
        });

        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {

      if (!dotsContainer) return;

      const realIndex =
        current % originalCards.length;

      dotsContainer
        .querySelectorAll('.carousel-dot')
        .forEach((dot, i) => {

          dot.classList.toggle(
            'active',
            i === realIndex
          );
        });
    }

    function getCardWidth() {

      const card =
        track.querySelector('.activity-card');

      return card.offsetWidth + 24;
    }

    function updateCarousel(animate = true) {

      track.style.transition =
        animate
          ? 'transform 0.6s ease'
          : 'none';

      track.style.transform =
        `translateX(-${current * getCardWidth()}px)`;

      updateDots();
    }

    function nextSlide() {

      current++;

      updateCarousel(true);

      if (current >= originalCards.length) {

        setTimeout(() => {

          track.style.transition = 'none';

          current = 0;

          updateCarousel(false);

        }, 600);
      }
    }

    function prevSlide() {

      if (current <= 0) {

        track.style.transition = 'none';

        current = originalCards.length;

        updateCarousel(false);

        setTimeout(() => {

          current--;

          updateCarousel(true);

        }, 20);

      } else {

        current--;

        updateCarousel(true);
      }
    }

    window.carouselMove = function (dir) {

      if (dir > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    };

    function startAutoSlide() {

      autoSlide = setInterval(() => {
        nextSlide();
      }, speed);
    }

    function stopAutoSlide() {

      clearInterval(autoSlide);
    }

    const wrapper =
      track.closest('.carousel-wrapper');

    if (wrapper) {

      wrapper.addEventListener(
        'mouseenter',
        stopAutoSlide
      );

      wrapper.addEventListener(
        'mouseleave',
        startAutoSlide
      );
    }

    // swipe
    let touchStartX = 0;

    track.addEventListener(
      'touchstart',
      e => {

        touchStartX =
          e.touches[0].clientX;
      },
      { passive: true }
    );

    track.addEventListener(
      'touchend',
      e => {

        const diff =
          touchStartX -
          e.changedTouches[0].clientX;

        if (Math.abs(diff) > 50) {

          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      }
    );

    window.addEventListener(
      'resize',
      () => updateCarousel(false)
    );

    buildDots();

    updateCarousel(false);

    startAutoSlide();

  })();

});