import { generateData } from './data.js';
import { createGallery } from './gallery/gallery.js';
import { createForm } from './upload-form/form.js';

createGallery(generateData());
createForm();
