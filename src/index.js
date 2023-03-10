import './css/styles.css';
import ImagesApiService from './js/fetchImages';
import LoadMoreBtn from './js/loadMoreBtn';
import { createGalleryMarkup, resetGallery } from './js/createMarkup';
import { scrollSmoothly } from './js/scrollSmoothly';
import { lightbox } from './js/lightbox';
import {
  notiflixErrorMessage,
  notiflixEndOfResultsMessage,
  notiflixEmptyQueryMessage,
  notiflixNoMatchesMessage,
  notiflixResultsAmountMessage,
} from './js/notiflix';

const formRef = document.querySelector('.search-form');

const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn('.load-more');

formRef.addEventListener('submit', handleSearch);
loadMoreBtn.refs.button.addEventListener('click', handleClickOnLoadMoreBtn);

async function handleSearch(event) {
  event.preventDefault();

  imagesApiService.query =
    event.currentTarget.elements.searchQuery.value.trim();
  resetGallery();
  imagesApiService.resetPage();
  loadMoreBtn.hide();

  try {
    if (imagesApiService.query === '') {
      resetGallery();
      imagesApiService.resetPage();
      notiflixEmptyQueryMessage();
      return;
    }

    const { totalHits, hits } = await imagesApiService.fetchImages();

    if (imagesApiService.query === imagesApiService.searchQuery) {
      imagesApiService.data = 0;
      lightbox.refresh();
    }

    if (hits.length !== 0) {
      notiflixResultsAmountMessage(totalHits);
      createGalleryMarkup(hits);
      loadMoreBtn.show();
      imagesApiService.data += hits.length;
      lightbox.refresh();
    } else {
      notiflixNoMatchesMessage();
    }

    if (totalHits < 40) {
      loadMoreBtn.hide();
    } else if (imagesApiService.data >= totalHits) {
      notiflixEndOfResultsMessage();
      console.log(imagesApiService.data);
      imagesApiService.data = 0;
      imagesApiService.searchQuery = '';
      resetGallery();
    }
  } catch (error) {
    notiflixErrorMessage();
    imagesApiService.stopLoading();
    console.log(error);
  }
}

async function handleClickOnLoadMoreBtn() {
  imagesApiService.incrementPage();

  try {
    const { totalHits, hits } = await imagesApiService.fetchImages();
    createGalleryMarkup(hits);
    scrollSmoothly();
    lightbox.refresh();

    imagesApiService.data += hits.length;

    if (imagesApiService.data >= totalHits) {
      loadMoreBtn.hide();
      notiflixEndOfResultsMessage();
      imagesApiService.data = 0;
      imagesApiService.searchQuery = '';
    }
  } catch (error) {
    notiflixErrorMessage();
    imagesApiService.stopLoading();
  }
}
