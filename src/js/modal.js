// Import of modal plugin
import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

export default function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const enlargedImage = `<img src= ${event.target.dataset.source}>`;
  basicLightbox.create(enlargedImage).show();
}
