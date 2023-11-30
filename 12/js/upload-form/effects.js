const effectLevelNode = document.querySelector('.effect-level');
const effectSliderNode = document.querySelector('.effect-level__slider');
const effectListNode = document.querySelector('.effects__list');
const effectLevelInputNode = document.querySelector('.effect-level__value');
const uploadedImageNode = document.querySelector('.img-upload__preview img');

const Effects = {
  none: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    getCssFilter: () => 'none'
  },
  chrome: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    getCssFilter: (value) => `grayscale(${value})`
  },
  sepia: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    getCssFilter: (value) => `sepia(${value})`
  },
  marvin: {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    getCssFilter: (value) => `invert(${value}%)`
  },
  phobos: {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    getCssFilter: (value) => `blur(${value}px)`
  },
  heat: {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    getCssFilter: (value) => `brightness(${value})`
  },
};

let activeEffect = 'none';

const getEffectOptions = (name) => {
  const { MIN, MAX, STEP } = Effects[name];
  return {
    range: {
      min: MIN,
      max: MAX
    },
    connect: 'lower',
    start: MAX,
    step: STEP
  };
};

const updateEffect = (name) => {
  const value = effectSliderNode.noUiSlider.get();
  uploadedImageNode.style.filter = Effects[name].getCssFilter(value);
  effectLevelInputNode.value = value;
  effectLevelNode.classList.toggle('hidden', name === 'none');
};

const onChangeEffect = (event) => {
  const effectNode = event.target.closest('.effects__radio');
  if (!effectNode) { return; }
  activeEffect = effectNode.value;
  effectSliderNode.noUiSlider.updateOptions(getEffectOptions(activeEffect));
  updateEffect(activeEffect);
};

const createEffectSlider = () => {
  noUiSlider.create(effectSliderNode, getEffectOptions('none'));
  effectLevelNode.classList.add('hidden');
  effectListNode.addEventListener('click', onChangeEffect);
  effectSliderNode.noUiSlider.on('slide.one', () => {
    updateEffect(activeEffect);
  });
};

const resetEffectSlider = () => {
  activeEffect = 'none';
  effectSliderNode.noUiSlider.updateOptions(getEffectOptions(activeEffect));
  updateEffect(activeEffect);
};

export { createEffectSlider, resetEffectSlider };
