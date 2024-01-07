import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue";
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: [
                'resources/scss/website/app.scss',
                'resources/js/website/app.js',
                'resources/scss/portal/app.scss',
                'resources/js/portal/app.js',
            ],
            refresh: true,
        }),
    ],
});
