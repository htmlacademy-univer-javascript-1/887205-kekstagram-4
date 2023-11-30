const fillFragment = (data, createItemNode) => {
  const itemFragment = document.createDocumentFragment();
  data.forEach((itemData) => itemFragment.append(createItemNode(itemData)));
  return itemFragment;
};

const hasFocusOnInput = () => document.activeElement.hasAttribute('data-no-close-on-focus');

const onCloseModal = (event, closeModal) => {
  if (event.key === 'Escape' && !hasFocusOnInput()) {
    closeModal();
  }
};


const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const randomSort = (data) => [...data].sort(() => Math.random() - 0.5);

export { fillFragment, onCloseModal, randomSort, debounce };
