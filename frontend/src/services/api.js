import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Accept': 'application/json' },
});

export const getSiteSettings   = () => api.get('/site-settings');
export const getHero            = () => api.get('/hero');
export const getAbout           = () => api.get('/about');
export const getProducts        = () => api.get('/products');
export const getWhyChooseUs     = () => api.get('/why-choose-us');
export const getGalleryImages   = () => api.get('/gallery/images');
export const getGalleryVideos   = () => api.get('/gallery/videos');
export const getContactInfo     = () => api.get('/contact-info');
export const sendContactMessage = (data) => api.post('/contact', data);

export default api;
