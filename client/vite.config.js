import { defineConfig } from 'vite';

export default defineConfig({
	root: './src/client',
  	server: {
	    host: true,
	    port: 8080,
  	}
});