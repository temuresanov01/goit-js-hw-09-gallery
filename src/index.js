import './sass/main.scss';
import galleryItems from './galleryItems.js';

// ===== ADD MARKUP =====

const gallery = document.querySelector('.gallery');
const largeImage = document.querySelector('.lightbox__image');
const modal = document.querySelector('.lightbox');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');


const galleryMarkup = [];
for (let galleryItem of galleryItems) {
  galleryMarkup.push(`<li class ="gallery__item">
   <a class="gallery__link" href="${galleryItem.original}">
    <img
      class="gallery__image"
      src="${galleryItem.preview}" 
      alt="${galleryItem.description}"
      data-source="${galleryItem.original}"
      />
  </a>
  </li>`);
};
document.querySelector("ul").insertAdjacentHTML("beforeEnd", [...galleryMarkup].join(""));

// ===== OPEN MODAL =====

const openModal = () => {
  modal.classList.add('is-open');
  overlay.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onEscPress); //cLOSE MODAL USING ESC
  };

// ===== CLOSE MODAL =====

const closeModal = () => {
  modal.classList.remove('is-open');
  overlay.removeEventListener('click', onOverlayClick);
  window.removeEventListener('keydown', onEscPress); //cLOSE MODAL USING ESC
};

const onGalleryClick = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  let imageRef = event.target;
  let largeImageURL = imageRef.dataset.source;
  largeImage.src = largeImageURL;
   openModal();
};

const onOverlayClick = event =>
  event.currentTarget === event.target ? closeModal() : '';

gallery.addEventListener('click', onGalleryClick);
closeBtn.addEventListener('click', closeModal);

// ===== CLOSE MODAL USING ESC =====

const onEscPress = event => {
  if (event.code === 'Escape') {
    closeModal();
  }
}