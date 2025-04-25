import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: 'index.html', // Important for routing to work on GitHub Pages
    }),
    paths: {
      base: '/berrys', // This matches your GitHub Pages path
    },
  },
};

export default config;
