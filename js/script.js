// Inicio del javascript para index.html

function openModal(elementOrImg) {
  // Si nos pasan el DIV .gallery-item, obtener el img dentro
  var imgElement = elementOrImg;
  if (!imgElement) return;

  if (imgElement.tagName && imgElement.tagName.toLowerCase() !== 'img') {
    // Intentamos encontrar la imagen dentro del elemento (p. ej. if: div.gallery-item)
    var found = imgElement.querySelector && imgElement.querySelector('img');
    if (found) imgElement = found;
    else return; // no hay <img> dentro, nada que hacer
  }

  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImage");
  var modalTitle = document.getElementById("modalTitle");
  var modalText = document.getElementById("modalText");
  var modalDate = document.getElementById("modalDate");

  // Carga la imagen y los datos (con fallback por si faltan)
  modalImg.src = imgElement.src || '';
  modalImg.alt = imgElement.alt || '';
  modalTitle.textContent = imgElement.alt || '';
  modalText.textContent = imgElement.dataset && imgElement.dataset.text ? imgElement.dataset.text : '';
  modalDate.textContent = imgElement.dataset && imgElement.dataset.date ? imgElement.dataset.date : '';

  modal.style.display = "flex";
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  var modal = document.getElementById("imageModal");
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true');
}
// Fin del javascript para index.html

// -------------------------------------------------------------------------------------------------------

// Inicio del javascript para internet.html 

// NUEVO: 1) animación de puntos / visual canvas en el hero
(function ixVisualCanvas() {
  var wrap = document.getElementById('ixCanvas');
  if (!wrap) return;
  var W = wrap.clientWidth, H = wrap.clientHeight;
  // create floating blobs
  for (var i = 0; i < 18; i++) {
    var el = document.createElement('div');
    el.className = 'ix-dot';
    el.style.position = 'absolute';
    el.style.left = (Math.random() * 100) + '%';
    el.style.top = (Math.random() * 100) + '%';
    var size = 8 + Math.random() * 28;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.borderRadius = '50%';
    el.style.background = ['#00c2ff', '#8c2df2', '#ffd166', '#ff6b6b'][Math.floor(Math.random() * 4)];
    el.style.opacity = 0.85;
    el.style.boxShadow = '0 0 18px rgba(0,0,0,0.12)';
    el.style.transition = 'transform 6s linear';
    wrap.appendChild(el);
    // animate loop
    (function (node) {
      var dx = (Math.random() * 2 - 1) * 40;
      var dy = (Math.random() * 2 - 1) * 40;
      function move() {
        node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        setTimeout(function () {
          node.style.transform = 'translate(0,0)';
        }, 6000);
        setTimeout(move, 12000);
      }
      setTimeout(move, Math.random() * 1000);
    })(el);
  }
})();

// NUEVO: 2) stat counters (re-usable)
(function ixStatCounter() {
  var els = document.querySelectorAll('.ix-stat-number');
  if (!els.length) return;
  els.forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target')) || 100;
    var current = 0;
    var step = Math.ceil(target / 60);
    var tid = setInterval(function () {
      current += step;
      if (current >= target) { current = target; clearInterval(tid); }
      el.textContent = current + '%';
    }, 25);
  });
})();

// NUEVO: 3) set card head colors from data-color attribute
(function ixCardColors() {
  var cards = document.querySelectorAll('.ix-card');
  cards.forEach(function (card, idx) {
    var color = card.getAttribute('data-color') || ['#00c2ff', '#8c2df2', '#ff6b6b', '#ffd166'][idx % 4];
    var head = card.querySelector('.ix-card-head');
    if (head) {
      head.style.background = color;
    }
  });

  function showCardDetail(card) {
    // create overlay detail
    var overlay = document.createElement('div');
    overlay.className = 'ix-card-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = 0;
    overlay.style.background = 'rgba(0,0,0,0.6)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = 2500;

    var box = document.createElement('div');
    box.style.width = 'min(880px, 92%)';
    box.style.background = '#fff';
    box.style.padding = '20px';
    box.style.borderRadius = '12px';
    box.innerHTML = '<h3 style="margin-top:0;">' + (card.querySelector('h4')?.textContent || 'Detalle') + '</h3>'
      + '<p>' + (card.querySelector('p')?.textContent || 'Información adicional sobre el beneficio.') + '</p>'
      + '<div style="text-align:right;"><button class="ix-close-detail" style="background:#072a40;color:#fff;border:none;padding:10px 14px;border-radius:8px;cursor:pointer">Cerrar</button></div>';
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    overlay.querySelector('.ix-close-detail').addEventListener('click', function () { document.body.removeChild(overlay); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) document.body.removeChild(overlay); });
  }
})();

// NUEVO: 4) simple testimonial slider
(function ixSlider() {
  var slides = document.querySelectorAll('.ix-slide');
  if (!slides.length) return;
  var idx = 0;
  slides[idx].classList.add('active');
  setInterval(function () {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 3500);
})();

// NUEVO: 5) video modal opener
(function ixVideoModal() {
  document.querySelectorAll('.ix-play').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = btn.getAttribute('data-video');
      var modal = document.getElementById('ixVideoModal');
      var frame = document.getElementById('ixVideoFrame');
      frame.src = url + "?autoplay=1&rel=0";
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    });
  });
  var close = document.querySelector('.ix-close-video');
  if (close) close.addEventListener('click', function () {
    var modal = document.getElementById('ixVideoModal');
    var frame = document.getElementById('ixVideoFrame');
    frame.src = '';
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  });
  // close if click outside
  var mod = document.getElementById('ixVideoModal');
  if (mod) mod.addEventListener('click', function (e) { if (e.target === mod) { document.querySelector('.ix-close-video').click(); } });
})();
// Fin del javascript para internet.html

// -------------------------------------------------------------------------------------------------------

// Inicio del javascript para herramientas.html 

// Interactividad (toggle y scroll reveal)
document.addEventListener('DOMContentLoaded', function () {
  // 1) toggling: al hacer click en cada tarjeta muestra/oculta la info (slide desde arriba)
  const tarjetas = document.querySelectorAll('#herramientas .tarjeta');
  function toggleTarjeta(t) { t.classList.toggle('activa'); }

  tarjetas.forEach(t => {
    t.addEventListener('click', () => toggleTarjeta(t));
    // accesibilidad: permitir Enter / Space
    t.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTarjeta(t); }
    });
  });

  // 2) reveal al hacer scroll (animación para cada categoría)
  const categorias = document.querySelectorAll('#herramientas .categoria');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.18 });
  categorias.forEach(c => observer.observe(c));
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector('#videoModal');
  const modalIframe = document.querySelector('#modalIframe');
  const closeModal = document.querySelector('#closeModal');
  const videoItems = document.querySelectorAll('.video-item');

  if (!modal || !modalIframe || !closeModal || videoItems.length === 0) return;

  videoItems.forEach(item => {
    item.addEventListener('click', async () => {
      const videoUrl = item.getAttribute('data-video');
      modalIframe.src = `${videoUrl}?autoplay=1`;
      modal.style.display = 'flex';

      await new Promise(r => setTimeout(r, 100));

      const modalEl = modal.querySelector('.modal-content');
      if (modalEl.requestFullscreen) modalEl.requestFullscreen();
      else if (modalEl.webkitRequestFullscreen) modalEl.webkitRequestFullscreen();
    });
  });

  function closeVideoModal() {
    modal.style.display = 'none';
    modalIframe.src = "";
    if (document.fullscreenElement) document.exitFullscreen();
  }

  closeModal.addEventListener('click', closeVideoModal);
  window.addEventListener('click', e => { if (e.target === modal) closeVideoModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideoModal(); });
});
// Fin del javascript para herramientas.html 

// -------------------------------------------------------------------------------------------------------

// Inicio del javascript para tips.html 

// Close nav when a link is clicked (for single-page navigation or to ensure it closes)
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav-open');
    toggleBtn.querySelector('i').classList.remove('fa-times');
    toggleBtn.querySelector('i').classList.add('fa-bars');
  });
});

// ====== Back to Top Functionality (Para todas las páginas largas) ======
function scrollFunction() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) { // Asegura que el botón exista en la página actual
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      backToTopBtn.style.display = "flex"; // Usar flex para centrar el icono
    } else {
      backToTopBtn.style.display = "none";
    }
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Llamar a scrollFunction en cada scroll
window.onscroll = function () {
  scrollFunction();
  revealSections(); // También llama a la función de revelar secciones
};

// ====== Animaciones al hacer Scroll (para tips.html y otras páginas) ======
function revealSections() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-from-left, .reveal-from-right');
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    // Cuando el elemento está a ~80% de la altura de la ventana visible
    if (rect.top < window.innerHeight - 150) {
      el.classList.add('active');
    } else {
      // Opcional: remover 'active' si se vuelve a scroll up
      // el.classList.remove('active');
    }
  });
}

// Llama a la función al cargar la página para que los elementos visibles ya estén animados
document.addEventListener('DOMContentLoaded', revealSections);

// Fin del javascript para tips.html 

// -------------------------------------------------------------------------------------------------------

// Inicio del javascript para testimonios.html

// CARRUSEL DE VIDEOS
let currentVideoIndex = 0;
// No cambiamos esto, sigue mostrando 3 a la vez
const videosPerView = 3;

function initVideoCarousel() {
  const carousel = document.querySelector('.video-carousel');
  const items = document.querySelectorAll('.video-item');
  const indicators = document.getElementById('videoIndicators');

  if (!carousel || !items.length) return;

  // Calcula cuántas "páginas" de 3 videos necesitamos (5 páginas para 13 videos)
  const totalSlides = Math.ceil(items.length / videosPerView);

  // Crear indicadores
  // ... (el código de los indicadores sigue igual)
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'indicator-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToVideoSlide(i);
    indicators.appendChild(dot);
  }

  updateVideoCarousel();
}

function moveVideoCarousel(direction) {
  const items = document.querySelectorAll('.video-item');
  // 5 slides para 13 videos (13/3 = 4.33 -> 5)
  const totalSlides = Math.ceil(items.length / videosPerView);

  currentVideoIndex += direction;

  if (currentVideoIndex < 0) {
    currentVideoIndex = totalSlides - 1;
  } else if (currentVideoIndex >= totalSlides) {
    currentVideoIndex = 0;
  }

  updateVideoCarousel();
}

function goToVideoSlide(index) {
  currentVideoIndex = index;
  updateVideoCarousel();
}

function updateVideoCarousel() {
  const carousel = document.querySelector('.video-carousel');
  const items = document.querySelectorAll('.video-item');

  if (!carousel || !items.length) return;

  // 1. Obtener el ancho exacto del primer elemento. (440px de tu CSS)
  const itemWidth = items[0].offsetWidth;
  const gap = 30; // El gap definido en style.css (30px)

  // 2. Calcular el ancho que se desplaza en cada paso
  // (Ancho del item + gap) * 3 videos
  const slideWidth = (itemWidth + gap) * videosPerView;

  // 3. Aplicar el desplazamiento
  // currentVideoIndex: 0 -> 0px; 1 -> slideWidth; 2 -> 2*slideWidth, etc.
  const offset = currentVideoIndex * slideWidth;

  carousel.style.transform = `translateX(-${offset}px)`;

  // Actualizar indicadores
  const dots = document.querySelectorAll('#videoIndicators .indicator-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentVideoIndex);
  });
}

// CARRUSEL DE IMÁGENES
let currentImageIndex = 0;

function initImageCarousel() {
  const indicators = document.getElementById('imageIndicators');
  const items = document.querySelectorAll('.image-item');

  if (!indicators || !items.length) return;

  // Crear indicadores
  items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'indicator-dot' + (index === 0 ? ' active' : '');
    dot.onclick = () => goToImageSlide(index);
    indicators.appendChild(dot);
  });

  // Auto-play
  setInterval(() => moveImageCarousel(1), 5000);
}

function moveImageCarousel(direction) {
  const items = document.querySelectorAll('.image-item');

  items[currentImageIndex].classList.remove('active');

  currentImageIndex += direction;

  if (currentImageIndex < 0) {
    currentImageIndex = items.length - 1;
  } else if (currentImageIndex >= items.length) {
    currentImageIndex = 0;
  }

  items[currentImageIndex].classList.add('active');

  // Actualizar indicadores
  const dots = document.querySelectorAll('#imageIndicators .indicator-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentImageIndex);
  });
}

function goToImageSlide(index) {
  const items = document.querySelectorAll('.image-item');
  items[currentImageIndex].classList.remove('active');
  currentImageIndex = index;
  items[currentImageIndex].classList.add('active');

  const dots = document.querySelectorAll('#imageIndicators .indicator-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentImageIndex);
  });
}

// Inicar los carruseles cuando se cargue la pagina
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.video-carousel')) {
    initVideoCarousel();
  }
  if (document.querySelector('.image-carousel')) {
    initImageCarousel();
  }

  // Ajustar carruseles en resize
  window.addEventListener('resize', function () {
    if (document.querySelector('.video-carousel')) {
      updateVideoCarousel();
    }
  });
});
// Fin del javascript para testimonios.html