export const prerender = true;

// src/routes/+layout.js
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

/** @type {import('./$types').LayoutLoad} */
export function load() {
  if (browser) {
    // Check if we have a stored path from a direct access to a deep route
    const storedPath = sessionStorage.getItem('spaPath');
    if (storedPath) {
      // Clear the stored path so we don't redirect again
      sessionStorage.removeItem('spaPath');
      
      // Strip the repo name from the path if it's there
      const basePath = '/berrys';
      const cleanPath = storedPath.startsWith(basePath) 
        ? storedPath.substring(basePath.length) || '/'
        : storedPath;
        
      // Navigate to the stored path
      if (window.location.pathname === basePath + '/' || window.location.pathname === '/') {
        goto(cleanPath);
      }
    }
  }
  
  return {};
}