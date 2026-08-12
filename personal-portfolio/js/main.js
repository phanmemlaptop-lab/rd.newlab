/**
 * R&D & Automation Portfolio - Main Script
 * Handles dynamic rendering, filters, search, animations, and form interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if data is loaded
  if (typeof PORTFOLIO_DATA === 'undefined') {
    console.error('PORTFOLIO_DATA is not defined. Please verify js/data.js is loaded.');
    return;
  }

  // --- Initialize Web Components & Data ---
  initNavigation();
  initProfileData();
  initExpertise();
  initSkills();
  initProjects();
  initLibrary();
  initContactForm();
  initFlaskBubbles();
  
  // --- Initialize Premium Animations & Effects ---
  initCursorGlow();
  initParticleCanvas();
  init3DTilt();
  initTypingAnimation();
  initScrollReveal();
});

/* ==========================================
   NAVIGATION & HEADER CONTROL
   ========================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show-menu');
      // Change icon
      const icon = navToggle.querySelector('i');
      if (navMenu.classList.contains('show-menu')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars-staggered';
      }
    });
  }

  // Close mobile menu when clicking nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) {
        navMenu.classList.remove('show-menu');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars-staggered';
      }
    });
  });

  // Active Link Highlighting on Scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset for sticky header
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`) || 
                         document.querySelector(`.nav-list a[href*=${sectionId}]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-link'));
          activeLink.classList.add('active-link');
        }
      }
    });
  });
}

/* ==========================================
   PROFILE BIO & INFO RENDERING
   ========================================== */
function initProfileData() {
  const profile = PORTFOLIO_DATA.profile;

  // Render Bio
  const bioEl = document.getElementById('hero-bio');
  if (bioEl) bioEl.textContent = profile.bio;

  // Render contacts
  const emailEl = document.getElementById('contact-email');
  if (emailEl) {
    emailEl.textContent = profile.contact.email;
    emailEl.href = `mailto:${profile.contact.email}`;
  }

  const phoneEl = document.getElementById('contact-phone');
  if (phoneEl) phoneEl.textContent = profile.contact.phone;

  const addressEl = document.getElementById('contact-address');
  if (addressEl) addressEl.textContent = profile.contact.address;

  // Update socials
  const zaloBtn = document.getElementById('social-zalo');
  if (zaloBtn) zaloBtn.href = profile.contact.zalo;

  const githubBtn = document.getElementById('social-github');
  if (githubBtn) githubBtn.href = profile.contact.github;
}

/* ==========================================
   EXPERTISE SECTION RENDERING (R&D Fields)
   ========================================== */
function initExpertise() {
  const container = document.getElementById('expertise-container');
  if (!container) return;

  const cardsHtml = PORTFOLIO_DATA.expertises.map(exp => {
    const tagsHtml = exp.tags.map(tag => `<span class="expertise-tag">${tag}</span>`).join('');
    
    return `
      <div class="expertise-card glass">
        <div class="expertise-icon-box">
          <span>${exp.icon}</span>
        </div>
        <h3 class="expertise-card-title">${exp.title}</h3>
        <p class="expertise-desc">${exp.desc}</p>
        <div class="expertise-tags">
          ${tagsHtml}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = cardsHtml;
}

/* ==========================================
   SKILLS & PROGRESS BARS
   ========================================== */
function initSkills() {
  const container = document.getElementById('skills-list-container');
  if (!container) return;

  // Render bars structure
  const barsHtml = PORTFOLIO_DATA.skills.map(skill => {
    return `
      <div class="skill-bar-group">
        <div class="skill-bar-info">
          <span class="skill-bar-label">${skill.name}</span>
          <span class="skill-bar-percent" data-target="${skill.level}">0%</span>
        </div>
        <div class="skill-bar-bg">
          <div class="skill-bar-fill" style="width: 0%"></div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = barsHtml;

  // Animate on Enter Viewport using IntersectionObserver
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillsBars();
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, { threshold: 0.15 });

  skillObserver.observe(container);
}

function animateSkillsBars() {
  const bars = document.querySelectorAll('.skill-bar-group');
  
  bars.forEach(bar => {
    const percentEl = bar.querySelector('.skill-bar-percent');
    const fillEl = bar.querySelector('.skill-bar-fill');
    const target = parseInt(percentEl.getAttribute('data-target'), 10);
    
    // Animate width
    fillEl.style.width = target + '%';
    
    // Animate percentage text count-up
    let current = 0;
    const duration = 1500; // ms
    const stepTime = Math.abs(Math.floor(duration / target));
    
    const timer = setInterval(() => {
      current += 1;
      percentEl.textContent = current + '%';
      if (current >= target) {
        clearInterval(timer);
        percentEl.textContent = target + '%';
      }
    }, stepTime);
  });
}

/* ==========================================
   PORTFOLIO PROJECTS RENDERING & FILTERS
   ========================================== */
let activeProjectFilter = 'all';

function initProjects() {
  const container = document.getElementById('projects-container');
  const filtersContainer = document.getElementById('portfolio-filters');
  if (!container) return;

  renderProjects(activeProjectFilter);

  // Bind Filter Events
  if (filtersContainer) {
    const filterButtons = filtersContainer.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Update active class
        filterButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Apply filter
        activeProjectFilter = e.currentTarget.getAttribute('data-filter');
        renderProjects(activeProjectFilter);
      });
    });
  }
}

function renderProjects(filter) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const filtered = PORTFOLIO_DATA.projects.filter(p => filter === 'all' || p.category === filter);

  if (filtered.length === 0) {
    container.innerHTML = '<p class="text-center" style="grid-column: 1/-1; color: var(--text-muted);">Không tìm thấy ứng dụng nào phù hợp.</p>';
    return;
  }

  const cardsHtml = filtered.map(p => {
    const featuresHtml = p.features.map(f => `
      <li class="project-feature-item">
        <i class="fa-solid fa-circle-check"></i>
        <span>${f}</span>
      </li>
    `).join('');

    return `
      <div class="project-card glass">
        ${p.badge ? `<span class="project-badge">${p.badge}</span>` : ''}
        ${p.image ? `
          <div class="project-img-wrapper">
            <img src="${p.image}" class="project-img" alt="${p.title}" loading="lazy">
          </div>
        ` : ''}
        <div class="project-icon-box">
          <span>${p.icon}</span>
        </div>
        <span class="project-subtitle">${p.subtitle}</span>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        
        <h4 class="project-features-title">Tính năng cốt lõi:</h4>
        <ul class="project-features-list">
          ${featuresHtml}
        </ul>
        
        <a href="${p.demoLink}" class="btn btn-secondary btn-sm project-btn">
          <i class="fa-solid fa-square-arrow-up-right"></i> Xem chi tiết
        </a>
      </div>
    `;
  }).join('');

  container.innerHTML = cardsHtml;
}

/* ==========================================
   LIBRARY SECTION: SEARCH & FILTERS
   ========================================== */
function initLibrary() {
  const container = document.getElementById('library-container');
  const searchInput = document.getElementById('library-search');
  const filterSelect = document.getElementById('library-filter');
  
  if (!container) return;

  // Initial render
  renderLibrary();

  // Bind search input event
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderLibrary();
    });
  }

  // Bind select filter event
  if (filterSelect) {
    filterSelect.addEventListener('change', () => {
      renderLibrary();
    });
  }
}

function renderLibrary() {
  const container = document.getElementById('library-container');
  const searchInput = document.getElementById('library-search');
  const filterSelect = document.getElementById('library-filter');
  if (!container) return;

  const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const filterCategory = filterSelect ? filterSelect.value : 'all';

  // Filter logic
  const filtered = PORTFOLIO_DATA.documents.filter(doc => {
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery) || 
                          doc.desc.toLowerCase().includes(searchQuery) ||
                          doc.format.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Empty state
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="glass text-center" style="grid-column: 1/-1; padding: 40px; color: var(--text-muted);">
        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 16px; color: var(--primary-color);"></i>
        <p>Không tìm thấy tài liệu nào phù hợp với từ khóa "${searchQuery}".</p>
        <p style="font-size: 0.85rem; margin-top: 8px;">Vui lòng thử lại với từ khóa khác.</p>
      </div>
    `;
    return;
  }

  // Render cards
  const cardsHtml = filtered.map(doc => {
    // Format badge classes
    let formatClass = 'badge-format';
    const fmt = doc.format.toLowerCase();
    if (fmt.includes('pdf')) formatClass += ' format-pdf';
    else if (fmt.includes('xlsx') || fmt.includes('excel')) formatClass += ' format-xlsx';
    else if (fmt.includes('docx') || fmt.includes('word')) formatClass += ' format-docx';
    else if (fmt.includes('sheet')) formatClass += ' format-sheet';

    let categoryLabel = '';
    let categoryClass = 'badge-category';
    if (doc.category === 'legal') {
      categoryLabel = 'Văn bản pháp luật';
      categoryClass += ' cat-legal';
    } else if (doc.category === 'research') {
      categoryLabel = 'Tài liệu nghiên cứu';
      categoryClass += ' cat-research';
    } else if (doc.category === 'design') {
      categoryLabel = 'Ứng dụng thiết kế';
      categoryClass += ' cat-design';
    }

    return `
      <div class="doc-card glass">
        <div class="doc-header">
          <div class="doc-badges">
            <span class="${formatClass}">${doc.format}</span>
            <span class="${categoryClass}">${categoryLabel}</span>
          </div>
          <span class="doc-size">${doc.size}</span>
        </div>
        <h3 class="doc-title">${doc.title}</h3>
        <p class="doc-desc">${doc.desc}</p>
        <div class="doc-footer">
          <span class="doc-stats">
            <i class="fa-solid fa-circle-down"></i> ${doc.downloads.toLocaleString()} lượt tải
          </span>
          <a href="${doc.driveLink}" class="doc-download-btn" target="_blank" rel="noopener noreferrer">
            <i class="fa-solid fa-arrow-down-to-line"></i> Tải về từ Drive
          </a>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = cardsHtml;
}

/* ==========================================
   CONTACT FORM INTEGRATION (GOOGLE APPS SCRIPT)
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertEl = document.getElementById('form-alert');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  if (!form) return;

  // Đã tích hợp link Web App của Google Apps Script
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzxoyrJmekh12kyP-bS3NH3CFKW1NQLD7OsDPWhKuVIDS7EwRF4YkmJnwsVjx4Rr205Xg/exec';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value;

    if (alertEl) {
      alertEl.style.display = 'none';
      alertEl.className = 'form-alert';
    }

    // Đổi trạng thái nút bấm thành Đang gửi
    const originalBtnText = submitBtn.innerHTML;
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...';
      submitBtn.disabled = true;
    }

    try {
      if (APPS_SCRIPT_URL === 'YOUR_WEB_APP_URL_HERE') {
        throw new Error('Chưa cấu hình đường link Apps Script (APPS_SCRIPT_URL). Vui lòng cập nhật file main.js!');
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('message', message);

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.status === 'success') {
        if (alertEl) {
          alertEl.className = 'form-alert success';
          alertEl.innerHTML = `
            <i class="fa-solid fa-circle-check"></i> 
            <strong>Gửi thành công!</strong> Cảm ơn <strong>${name}</strong>, thông tin của bạn đã được gửi. Chúng tôi sẽ phản hồi sớm nhất qua email.
          `;
          alertEl.style.display = 'block';
        }
        form.reset();
      } else {
        throw new Error('Lỗi từ máy chủ Apps Script');
      }
    } catch (error) {
      if (alertEl) {
        alertEl.className = 'form-alert error';
        alertEl.innerHTML = `
          <i class="fa-solid fa-circle-xmark"></i> 
          <strong>Có lỗi xảy ra:</strong> ${error.message}. Vui lòng thử lại sau!
        `;
        alertEl.style.display = 'block';
      }
    } finally {
      // Khôi phục nút bấm
      if (submitBtn) {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    }

      // Hide message after 8 seconds
      setTimeout(() => {
        alertEl.style.display = 'none';
      }, 8000);
    }
  });
}

/* ==========================================
   FLASK BUBBLE MICRO-ANIMATION
   ========================================== */
function initFlaskBubbles() {
  const container = document.querySelector('.flask-bubbles');
  if (!container) return;

  // Create bubbles at intervals
  setInterval(() => {
    createBubble(container);
  }, 600);
}

function createBubble(container) {
  const bubble = document.createElement('div');
  
  // Random size
  const size = Math.random() * 6 + 3; // 3px to 9px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  
  // Style properties for bubble
  bubble.style.position = 'absolute';
  bubble.style.bottom = '15px';
  // Random horizontal position inside flask belly (about 40% to 60%)
  bubble.style.left = `${Math.random() * 20 + 40}%`;
  bubble.style.backgroundColor = 'rgba(16, 185, 129, 0.6)';
  bubble.style.borderRadius = '50%';
  bubble.style.boxShadow = '0 0 4px rgba(16, 185, 129, 0.8)';
  bubble.style.opacity = '0.7';
  
  // Transition speed
  const speed = Math.random() * 2 + 1.5; // 1.5s to 3.5s
  bubble.style.transition = `all ${speed}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
  
  container.appendChild(bubble);
  
  // Animation action
  setTimeout(() => {
    // Float upwards and fade out
    bubble.style.transform = `translateY(-60px) translateX(${(Math.random() - 0.5) * 20}px)`;
    bubble.style.opacity = '0';
  }, 50);
  
  // Cleanup after animation completes
  setTimeout(() => {
    bubble.remove();
  }, speed * 1000);
}

/* ==========================================
   PREMIUM VISUAL EFFECT FUNCTIONS
   ========================================== */

/**
 * 1. Spotlight Mouse Follower Glow Effect
 */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  
  // Disable glow on mobile devices with touch screens
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  glow.style.display = 'block';
  
  window.addEventListener('mousemove', (e) => {
    // translate3d uses GPU acceleration for smooth 60fps rendering
    glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  });
}

/**
 * 2. Interactive Network/Constellation Particle Canvas Background
 */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let particlesArray = [];
  let mouse = {
    x: null,
    y: null,
    radius: 130
  };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    
    update() {
      // Bounce off walls
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }
      
      // Slight interactive push away from mouse
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
          this.x += 1.5;
        }
        if (mouse.x > this.x && this.x > this.size * 10) {
          this.x -= 1.5;
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
          this.y += 1.5;
        }
        if (mouse.y > this.y && this.y > this.size * 10) {
          this.y -= 1.5;
        }
      }
      
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }
  
  function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 16000;
    if (numberOfParticles > 90) numberOfParticles = 90; // cap density for performance
    
    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2.2) + 0.8;
      let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 0.3) - 0.15;
      let directionY = (Math.random() * 0.3) - 0.15;
      
      let color = 'rgba(6, 182, 212, 0.22)'; // Glowing cyan
      if (Math.random() > 0.6) color = 'rgba(168, 85, 247, 0.16)'; // Soft purple
      
      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }
  
  function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 115) {
          opacityValue = 1 - (distance / 115);
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacityValue * 0.08})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
      
      // Connecting line directly to mouse position
      if (mouse.x !== null && mouse.y !== null) {
        let dx = particlesArray[a].x - mouse.x;
        let dy = particlesArray[a].y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          opacityValue = 1 - (distance / mouse.radius);
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacityValue * 0.12})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connectParticles();
    requestAnimationFrame(animate);
  }
  
  initParticles();
  animate();
}

/**
 * 3. 3D Tilt Card Effect
 */
function init3DTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip mobile
  
  // Cards target list
  const cards = document.querySelectorAll('.expertise-card, .project-card, .doc-card, .contact-info, .contact-form');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      
      // Calculate cursor position relative to card center (-0.5 to 0.5)
      const mouseX = (e.clientX - rect.left) / w - 0.5;
      const mouseY = (e.clientY - rect.top) / h - 0.5;
      
      // Rotation intensity (max 10 degrees)
      const rX = -(mouseY * 10).toFixed(2);
      const rY = (mouseX * 10).toFixed(2);
      
      card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Float inner elements outward in Z axis
      const layers = card.querySelectorAll('.expertise-icon-box, .project-icon-box, .project-img-wrapper, .doc-badges, .doc-title');
      layers.forEach(ly => {
        ly.style.transform = 'translateZ(25px)';
        ly.style.transition = 'transform 0.1s ease';
      });
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      
      const layers = card.querySelectorAll('.expertise-icon-box, .project-icon-box, .project-img-wrapper, .doc-badges, .doc-title');
      layers.forEach(ly => {
        ly.style.transform = 'translateZ(0px)';
      });
    });
  });
}

/**
 * 4. Typing Loop Effect on Hero Subtitle
 */
function initTypingAnimation() {
  const target = document.getElementById('typing-text');
  if (!target) return;
  
  const textArray = [
    "KỸ SƯ R&D SINH - HÓA - DƯỢC",
    "KỸ SƯ LẬP TRÌNH TỰ ĐỘNG HÓA KHOA HỌC",
    "NHÀ PHÁT TRIỂN HỆ SINH THÁI AUTO APP",
    "THIẾT KẾ BẢN VẼ AutoCAD & sơ đồ Visio",
    "NGHIÊN CỨU & ỨNG DỤNG AI ĐỘT PHÁ"
  ];
  
  let wIdx = 0;
  let cIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function play() {
    const fullWord = textArray[wIdx];
    
    if (isDeleting) {
      target.textContent = fullWord.substring(0, cIdx - 1);
      cIdx--;
      typingSpeed = 40; // faster deleting
    } else {
      target.textContent = fullWord.substring(0, cIdx + 1);
      cIdx++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && cIdx === fullWord.length) {
      typingSpeed = 2200; // wait at end of word
      isDeleting = true;
    } else if (isDeleting && cIdx === 0) {
      isDeleting = false;
      wIdx = (wIdx + 1) % textArray.length;
      typingSpeed = 400; // pause before typing next word
    }
    
    setTimeout(play, typingSpeed);
  }
  
  setTimeout(play, 800);
}

/**
 * 5. Scroll Reveal Animation Observer
 */
function initScrollReveal() {
  const sections = document.querySelectorAll('.section');
  if (sections.length === 0) return;
  
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });
  
  sections.forEach(sec => {
    obs.observe(sec);
  });
}
