export default class LoadMoreBtn {
  constructor(selector) {
    this.refs = this.getRefs(selector);
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    return refs;
  }
  show() {
    this.refs.button.removeAttribute('hidden');
  }
  hide() {
    this.refs.button.setAttribute('hidden', true);
  }
}
