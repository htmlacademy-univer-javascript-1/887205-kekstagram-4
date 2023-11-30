import { debounce, randomSort } from '../util.js';
import { clearGallery } from './gallery.js';

const RANDOM_PHOTOS_COUNT = 10;
const filtersNode = document.querySelector('.img-filters');

const Filter = {
  'filter-default': (photos) => photos,
  'filter-random': (photos) => randomSort([...photos]).slice(0, RANDOM_PHOTOS_COUNT),
  'filter-discussed': (photos) => [...photos].sort((firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length)
};

let picturesData = [];
let activeFilter = 'default';

let debouncedRenderPhotos;

const onFiltersClick = (event) => {
  if (!event.target.classList.contains('img-filters__button')) { return; }
  const filterButtonNode = event.target;
  const filterType = filterButtonNode.id;
  if (filterType === activeFilter) { return; }
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  filterButtonNode.classList.add('img-filters__button--active');
  activeFilter = filterType;
  const photos = Filter[activeFilter](picturesData);
  debouncedRenderPhotos(photos);
};

const initFilters = (pictures, renderPhotos) => {
  picturesData = pictures;
  filtersNode.classList.remove('img-filters--inactive');
  const rerenderPhotos = (photos) => {
    clearGallery();
    renderPhotos(photos);
  };
  debouncedRenderPhotos = debounce(rerenderPhotos);
  filtersNode.addEventListener('click', onFiltersClick);
};

export { initFilters };
