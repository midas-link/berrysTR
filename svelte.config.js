import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: 'index.html', // Important for routing to work on GitHub Pages
      assets: 'build', // Set the assets directory
      pages: 'build', // Set the pages directory
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/berrys' : '',
    },
    appDir: 'internal', // Changes the _app directory name to avoid GitHub Pages issues
  },
};

export default config;