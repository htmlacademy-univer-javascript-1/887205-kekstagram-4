import { debounce, sortRandomly, sortReversed } from '../util.js';
import { clearGallery } from './gallery.js';

const RANDOM_PICTURES_COUNT = 10;
const filtersNodes = document.querySelector('.img-filters');

const Filter = {
  'filter-default': (pictures) => pictures,
  'filter-random': (pictures) => sortRandomly(pictures).slice(0, RANDOM_PICTURES_COUNT),
  'filter-discussed': (pictures) => sortReversed(pictures)
};

const picturesData = [];
let activeFilter = 'default';

let debouncedRenderPictures;

const onFiltersClick = (event) => {
  if (!event.target.classList.contains('img-filters__button')) { return; }
  const filterButtonNode = event.target;
  const filterType = filterButtonNode.id;
  if (filterType === activeFilter) { return; }

  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  filterButtonNode.classList.add('img-filters__button--active');
  activeFilter = filterType;

  const pictures = Filter[activeFilter](picturesData);
  debouncedRenderPictures(pictures);
};

const initFilters = (pictures, renderPictures) => {
  picturesData.push(...pictures);
  filtersNodes.classList.remove('img-filters--inactive');
  const rerenderPictures = (newPictures) => {
    clearGallery();
    renderPictures(newPictures);
  };
  debouncedRenderPictures = debounce(rerenderPictures);
  filtersNodes.addEventListener('click', onFiltersClick);
};

export { initFilters };
