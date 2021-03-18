import './styles.css';
import ApiService from './js/apiService';
import galleryCardTpl from './templates/galleryCard.hbs';
import refs from './js/references';

// Import of notification plugin
import { alert } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

// Import of function to open modal
import onOpenModal from './js/modal';

import './js/theme';

//========================= <GALLERY RENDERING> ==================================
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onOpenModal);

function onSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  if (apiService.query === '' || apiService.query.trim().length === 0) {
    alert({
      text: 'Enter a more specific query!',
    });
    return;
  }

  apiService.resetPage();
  fetchGallery();
}

const fetchGallery = async () => {
  const data = await apiService.fetchArticles();
  clearGallery();
  printGallery(data);
};

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function printGallery(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryCardTpl(hits));
}
//========================= END <GALLERY RENDERING> ==================================

//========================= <INFINITE SCROLL> ==================================
const options = {
  rootMargin: '150px',
  threshold: 0.05,
};

const onEntry = entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || apiService.query === '') {
      return;
    }
    apiService.fetchArticles().then(data => {
      printGallery(data);
    });
  });
};

const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.scroll);
//========================= END <INFINITE SCROLL> ==================================
