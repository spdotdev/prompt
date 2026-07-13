import { defineConfig } from 'vite';

export default defineConfig({
    base: '/prompt/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
            },
        },
    },
});
