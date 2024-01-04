import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue";
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
        vue(),
        laravel({
            input: [
                'resources/scss/website/app.scss',
                'resources/js/website/app.js',
                'resources/scss/portal/app.scss',
                'resources/js/portal/app.js',
                'resources/js/front/app.jsx'
            ],
            refresh: true,
        }),
    ],
});
