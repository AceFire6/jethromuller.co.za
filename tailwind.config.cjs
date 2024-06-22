/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        // I add styles here that are used by the remark plugins
        './astro.config.mjs',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: ['light', 'dracula'], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: 'dracula', // name of one of the included themes for dark mode
        logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    },
};
