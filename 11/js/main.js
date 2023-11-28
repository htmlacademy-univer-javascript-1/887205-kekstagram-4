import { getUserImages } from './api.js';
import { createGallery } from './gallery/gallery.js';
import { createForm } from './upload-form/form.js';

async function init() {
  const pictures = await getUserImages();
  createGallery(pictures);
  createForm();
}

init();
