import { resolve } from 'path';
import commonjs from 'vite-plugin-commonjs';
import compression from 'vite-plugin-compression';
import { ViteMinifyPlugin  } from 'vite-plugin-minify';

export default {
  root: resolve(__dirname, 'src'), // Set the root directory for the project
  base: './', // Base URL for the project
  plugins: [
    commonjs(), // Use CommonJS modules
    compression({ // Configure file compression
      verbose: true, // Enable verbose logging
      disable: false, // Compression is enabled
      threshold: 10240, // Minimum file size for compression (10 KB)
      algorithm: 'gzip', // Compression algorithm (can also use 'brotli')
      ext: '.gz', // Extension for compressed files
    }),
    ViteMinifyPlugin({ // Configure JavaScript and CSS minification
      minifyCSS: true, // Enable CSS minification
      minifyJS: true,  // Enable JavaScript minification
    })
  ],
  build: {
    outDir: '../dist', // Output directory for the build
    assetsDir: 'assets', // Directory for assets
  },
  server: {
    port: 8080, // Port for the development server
  },
};
