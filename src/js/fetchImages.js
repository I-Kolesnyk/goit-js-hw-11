import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
    this.data = 0;
  }

  async fetchImages() {
    const searchParams = new URLSearchParams({
      key: '32639885-f1e4dacd717d4e1c1fb5816a4',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.perPage,
    });

    this.startLoading();
    const { data } = await axios.get(`/?${searchParams}`);
    this.stopLoading();
    return data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  startLoading() {
    Loading.circle();
  }
  stopLoading() {
    Loading.remove();
  }
}
