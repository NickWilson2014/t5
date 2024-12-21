import $ from 'jquery';
import 'trumbowyg';

let initialized = false;

export const initializeEditor = () => {
  if (initialized) return;
  
  // Initialize jQuery globally
  if (typeof window !== 'undefined') {
    window.jQuery = window.$ = $;
  }
  
  initialized = true;
};