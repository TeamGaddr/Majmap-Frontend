import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        icon: true, // Allows using SVGs as components
      },
    }),
  ],
  assetsInclude: ['**/*.svg'], // Ensures raw SVG imports work too
});