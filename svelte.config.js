import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: '/AlirezaModiriyan/berrys'
    },
    prerender: {
      entries: ['*']
    }
  }
};

export default config;
