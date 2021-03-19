const API_KEY = '20669309-c97d1ec468a66ad87fd39e114';
const BASE_URL = 'https://pixabay.com/api';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 12;
    this.isLastPage = false;
  }

  async fetchArticles() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Request was rejected');
    }

    const data = await response.json();
    // console.log(`Page: ${this.page}`, data);

    this.isLastPage = data.totalHits - this.perPage * this.page <= 0;
    // console.log(this.isLastPage);
    this.incrementPage();
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
