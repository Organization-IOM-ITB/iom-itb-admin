import type { Configuration } from 'webpack';

const config: Configuration = {
  // Your existing configuration
  resolve: {
    fallback: {
      fs: false, // Do not use fs in the browser
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
    },
  },
  // Other configuration options...
};

export default config;
