document.addEventListener('DOMContentLoaded', () => {

  // 1. EXTRAÇÃO DE COORDENADAS (Estilo Inventário Minecraft)
  const copyBtn = document.querySelector('.js-copy-coords');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const coords = copyBtn.getAttribute('data-coords');
      const originalText = copyBtn.innerText;

      navigator.clipboard.writeText(coords).then(() => {
        // Texto modificado para combinar com a temática
        copyBtn.innerText = 'SALVO NO INVENTÁRIO!';
        copyBtn.classList.add('copied');
        
        // Reset do botão
        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.classList.remove('copied');
        }, 2500);
      });
    });
  }

  // 2. SISTEMA DE LIGHTBOX PREMIUM (Renomeado de cyber para mc)
  const lightbox = document.getElementById('mc-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const btnClose = document.querySelector('.lightbox-close');
  const triggers = document.querySelectorAll('.js-lightbox');

  const openLightbox = (src) => {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(trigger.getAttribute('href'));
    });
  });

  if (btnClose) btnClose.addEventListener('click', closeLightbox);
  
  // Fechar ao clicar no fundo borrado
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target.classList.contains('lightbox-bg')) {
        closeLightbox();
      }
    });
  }

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

});