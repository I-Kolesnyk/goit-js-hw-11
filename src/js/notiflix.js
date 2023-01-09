import Notiflix from 'notiflix';

export function notiflixErrorMessage() {
  Notiflix.Notify.failure('There are some problems! Try again.');
}

export function notiflixNoMatchesMessage() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

export function notiflixEndOfResultsMessage() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}

export function notiflixEmptyQueryMessage() {
  Notiflix.Notify.failure('Please enter your search query!');
}

export function notiflixResultsAmountMessage(number) {
  Notiflix.Notify.success(`Hooray! We found ${number} images.`);
}
